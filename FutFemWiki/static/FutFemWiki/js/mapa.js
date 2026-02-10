const btnMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa-equipos");
const item = document.getElementById("items-container");

btnMapa.addEventListener("click", () => {
    const visible = mapa.style.display === "block";

    if (visible) {
        // Ocultar mapa
        mapa.style.display = 'none';
        item.style.display = "grid";
        btnMapa.textContent = "Ver mapa";
    } else {
        // Mostrar mapa
        mapa.style.display = 'block';
        item.style.display = "none";
        btnMapa.textContent = "Ocultar mapa";

        setTimeout(() => { 
            if (map) {
                //map.invalidateSize();
                centrarMapaEnEquipos(); 
            }
        }, 50);
    }
});


const iconoEscudo = (url) => L.icon({
    iconUrl: url,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

const iconoPunto = L.divIcon({
    className: "punto-marker",
    html: "",
    iconSize: [10, 10]
});



export let map = null;
//let markersGroup = L.featureGroup();
let markersGroup = [];

/*export function inicializarMapaEquipos() {
    if (map) {markersGroup.clearLayers(); return;} // evitar reinicializar

    map = L.map('mapa-equipos', {
        minZoom: 5, // ← NO permite alejar más que esto 
        zoomControl: true
    }).setView([40.4, -3.7], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        'attribution': 'Map data &copy; OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);

    //obtenerEstiloMapa();
    map.on("zoomend", () => {
        const zoom = map.getZoom();

        markersGroup.eachLayer(marker => {
            if (zoom < 7) {
                marker.setIcon(iconoPunto);
            } else {
                marker.setIcon(iconoEscudoBonito(marker.options.escudoUrl));
            }
        });
    });


    markersGroup = L.featureGroup().addTo(map);

    // limpiar marcadores cada vez que se llama 
    markersGroup.clearLayers();
}*/

/*export function añadirEquipoMapa(id, nombre, lat, lng, escudoUrl) {
    const marker = L.marker([lat, lng], { 
        icon: iconoEscudoBonito(escudoUrl),
        escudoUrl: escudoUrl // guardamos el escudo
    });

    marker.bindPopup(`<b>${nombre}</b>`);
    marker.addEventListener('click', () => {
        window.location.href = `/wiki/equipo/${id}/`;
    });
    markersGroup.addLayer(marker);

    /*marker.on("click", () => {
        seleccionarEquipoDesdeMapa(nombre);
    });*/
//}

export function inicializarMapaEquipos() {
    if (map) {
        markersGroup.forEach(m => m.marker.remove());
        markersGroup = []; 
        return
    };

    map = new maplibregl.Map({
        container: 'mapa-equipos',
        style: '/static/FutFemWiki/mapstyles/style-morado.json', // luego lo cambiamos por tu estilo
        center: [-3.7, 40.4],
        zoom: 5,
        minZoom: 5
    });

    map.addControl(new maplibregl.NavigationControl());

    map.on("zoom", () => {
    const zoom = map.getZoom();

    generarHeatmap();

    markersGroup.forEach(m => {
        const el = m.el;

        // 🔥 2. Tamaño según zoom
        const scale = Math.min(1.3, Math.max(0.5, zoom / 7));
        el.style.transform = `scale(${scale})`;

        // 🔥 3. Punto vs escudo
        if (zoom < 6) {
            el.classList.add("marker-punto");
            el.classList.remove("marker-escudo");
        } else {
            el.classList.add("marker-escudo");
            el.classList.remove("marker-punto");
        }
    });
    });

}


export function añadirEquipoMapa(id, nombre, lat, lng, escudoUrl, color) {

    const el = document.createElement('div');
    el.className = 'marker-escudo';
    el.innerHTML = `
        <div class="marker-wrapper">
            <!--<div class="marker-pin"></div>-->
            <img src="${escudoUrl}" class="marker-escudo-img" />
        </div>
    `;

    const img = el.querySelector('img');

    img.style.background = `
            linear-gradient(
                to bottom,
                color-mix(in srgb, ${color} 30%, transparent),
                color-mix(in srgb, transparent 30%, transparent)
            )
        `;
        

    el.addEventListener('click', () => {
        window.location.href = `/wiki/equipo/${id}/`;
    });

    // Crear marcador MapLibre
    const marker = new maplibregl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map);

    // Guardar el marcador completo
    markersGroup.push({
        marker,
        el,
        lng,
        lat
    });

    //setTimeout(() => evitarColision(el, marker), 50);
}


function iconoEscudoBonito(url) {
    return L.divIcon({
        className: "marker-escudo",
        html: `
            <div class="marker-wrapper">
                <div class="marker-pin"></div>
                <img src="${url}" class="marker-escudo-img" />
            </div>
        `,
        iconSize: [50, 70],
        iconAnchor: [25, 70],
        popupAnchor: [0, -70]
    });
}



export async function obtenerCoordenadasClub(nombreClub) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(nombreClub)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.length === 0) return null;

    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        display: data[0].display_name
    };
}

/*export function centrarMapaEnEquipos() {
    if (!map) return;
    if (markersGroup.getLayers().length === 0) return;

    map.fitBounds(markersGroup.getBounds(), {
        padding: [50, 50]
    });
}*/

export function centrarMapaEnEquipos() {
    if (!map) return;
    if (markersGroup.length === 0) return;

    const bounds = new maplibregl.LngLatBounds();

    markersGroup.forEach(m => bounds.extend([m.lng, m.lat]));

    map.fitBounds(bounds, { padding: 50 });
}



function evitarColision(el, marker, intentos = 0) {
    if (intentos > 20) return; // evitar bucles infinitos

    const rect1 = el.getBoundingClientRect();

    for (const m of markersGroup) {
        if (!m.el || m.el === el) continue;

        const rect2 = m.el.getBoundingClientRect();

        const overlap = !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );

        if (overlap) {
            // mover ligeramente el marcador
            const offsetLng = (Math.random() - 0.5) * 0.05;
            const offsetLat = (Math.random() - 0.5) * 0.05;

            const pos = marker.getLngLat();
            marker.setLngLat([pos.lng + offsetLng, pos.lat + offsetLat]);

            // volver a comprobar
            setTimeout(() => evitarColision(el, marker, intentos + 1), 10);
            return;
        }
    }
}

function generarHeatmap() {
    if (!map || markersGroup.length === 0) return;

    const equiposGeoJSON = {
        type: "FeatureCollection",
        features: markersGroup.map(m => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [m.lng, m.lat]
            }
        }))
    };

    // Si ya existe, actualizar
    if (map.getSource("equipos")) {
        map.getSource("equipos").setData(equiposGeoJSON);
        return;
    }

    // Crear fuente
    map.addSource("equipos", {
        type: "geojson",
        data: equiposGeoJSON
    });

    // Crear capa heatmap
    map.addLayer({
        id: "equipos-heatmap",
        type: "heatmap",
        source: "equipos",
        paint: {
            "heatmap-radius": 45,
            "heatmap-intensity": 1.4,
            "heatmap-opacity": 0.55,
            "heatmap-weight": 1,
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(0,0,0,0)",
                0.2, "rgba(120,0,120,0.4)",
                0.4, "rgba(172,0,172,0.7)",
                0.7, "rgba(255,0,255,0.9)",
                1, "rgba(255,255,255,1)"
            ]
        }
    }, "water"); // lo ponemos debajo de los escudos
}

