import { handleAutocompletePais } from '/static/futfem/js/pais.js';
import { handleAutocompletePosicion } from '/static/futfem/js/posiciones.js';
import { equiposxliga, handleAutocompleteEquipo, fetchEquipoById } from '/static/futfem/js/equipos.js';
import { fetchAllJugadoras, formatearValorMercado } from '/static/futfem/js/jugadora.js';
import { calcularEdad } from '/static/js/games/funciones-comunes.js';
import { getDominantColors, rgbToRgba } from '/static/js/utils/color.thief.js';

let jugadorasOriginal;
let currentPage = 1;
const itemsPerPage = 14;
let totalPages = 1;
let jugadorasGlobal = []; // Guardaremos todas las jugadoras aquí
const btnMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa-equipos");
const item = document.getElementById("items-container");

/*btnMapa.addEventListener("click", () => {
    const visible = mapa.style.display === 'block';

    

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
                map.resize();
                centrarMapaEnEquipos(); 
            }
        }, 50);
    }
});*/


export async function inicializarWiki(arg) {

    const inputPaises = document.getElementsByClassName('input-pais');

    const sectionWiki = document.getElementById('wiki-equipos');

    const cabecera = document.getElementById('cabecera-wiki-equipos');

    const inputPosiciones = document.getElementById('input-posicion');

    const cabeceraLigas = document.getElementById('cabecera-equipo');

    const cabeceraJugadoras = document.getElementById('cabecera-jugadora');

    const ligasContainer = document.getElementById('ligas-container');

    const inputEquipo = document.getElementById('input-equipo');

    const botonConfirmar = document.getElementById('confirmarPais');

    //const botonJugadoras = document.getElementById('jugadoras-btn');

    const botonFiltro = document.getElementById('jugadoras-filtros');

    if(arg === 'jugadoras'){
        cabeceraJugadoras.classList.add('active');
        cabeceraLigas.classList.remove('active');
        manejarJugadoras().then(cantidad => {
            console.log(`Total jugadoras cargadas: ${cantidad}`);
            displayJugadoras(jugadorasOriginal);
        });
    }else if(arg === 'equipos'){
        sectionWiki.classList.add('equipos');
        cabecera.classList.add('equipos');
        cabeceraJugadoras.classList.remove('active');
        cabeceraLigas.classList.add('active');
        await ligasxpais(1).then(ligas => {
            displayLigas(ligas.success);
        });
        await equiposxliga(1).then(equipos => {
            displayEquipos(equipos.success);
        });
        console.log(ligasContainer.firstChild)
        ligasContainer.firstChild.classList.add('selected');
    }

    botonFiltro.addEventListener('click', () => {
        const paisInput = inputPaises[1];
        if (!paisInput) return;
        console.log(inputPaises)
        filtroJugadoras(Number(inputEquipo.dataset.id), Number(paisInput.dataset.id), Number(inputPosiciones.dataset.id));
    });

    /*botonJugadoras.addEventListener('click', async (event) => {
        manejarJugadoras();
    });*/

    inputEquipo.addEventListener('input', async (event) => {
        handleAutocompleteEquipo(event, 'sugerencias-equipo');
    });

    inputPosiciones.addEventListener('input', async (event) => {
        handleAutocompletePosicion(event);
    });

        inputPaises[0].addEventListener('input', async (event) => {
            handleAutocompletePais(event, 'sugerencias-pais1', ligasxpais);
        });
        inputPaises[1].addEventListener('input', async (event) => {
            handleAutocompletePais(event, 'sugerencias-pais2');
        });
    


    botonConfirmar.addEventListener('click', async () => {
        const paisId = Number(inputPaises[0].dataset.id);
        if (paisId) {
            await ligasxpais(paisId);
        } else {
            alert('Por favor, selecciona un país válido de las sugerencias.');
        }
    });

    // default equipo display
    /*ligasxpais(1).then(ligas => {
        ligasContainer.firstElementChild.classList.add('selected');
        cabeceraLigas.style.display = 'flex';
    });
    equiposxliga(1).then(equipos => {
        displayEquipos(equipos.success);
    });*/

    
}


export async function manejarJugadoras() {
    if (jugadorasOriginal && jugadorasOriginal.length > 0) {
        return;
    }
    jugadorasOriginal = await fetchAllJugadoras();
    return jugadorasOriginal.length;
}

function filtroJugadoras(equipo, nacionalidad, posicion) {
    
    let nuevasJugadoras = jugadorasOriginal.filter(jugadora => {
        // 1. Filtro de Equipo
        // Comparamos el ID del equipo (o club) según cómo venga en tu JSON
        if (equipo && jugadora.equipo.id !== parseInt(equipo)) return false;

        // 2. Filtro de Nacionalidad
        // Si hay una nacionalidad seleccionada, comprobamos si está en su lista de IDs
        if (nacionalidad) {
            const nacioId = parseInt(nacionalidad);
            if (!jugadora.nacionalidades_ids.includes(nacioId)) {
                return false;
            }
        }

        // 3. Filtro de Posición
        if (posicion && !jugadora.posiciones_ids.includes(parseInt(posicion))) return false;

        // Si sobrevive a todos los 'return false', la jugadora es válida
        return true;
    });

    if (window.screen.width < 768) {
        document.getElementById('cabecera-wiki-equipos').classList.remove('active');
    }

    displayJugadoras(nuevasJugadoras);
}


function displayJugadoras(jugadoras){
    console.log(jugadoras)
    jugadorasGlobal = jugadoras; // Guardar todas las jugadoras
    currentPage = 1;
    totalPages = Math.ceil(jugadorasGlobal.length / itemsPerPage);
    renderJugadorasPage(currentPage);
}

function renderJugadorasPage(page = 1) {
    const container = document.getElementById('items-container');
    const cabecera = document.getElementById('cabecera-wiki-equipos');
    const containerLigas = document.getElementById('ligas-container');
    container.innerHTML = '';
    containerLigas.innerHTML = '';
    container.className = '';
    container.className = 'jugadoras';
    cabecera.classList.add('jugadoras');
    cabecera.style.borderBottom = 'none';    
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const jugadoras = jugadorasGlobal.slice(start, end);
    
    container.innerHTML = ''; // Limpiamos
    containerLigas.innerHTML = '';
    container.className = 'jugadoras-grid-container'; // Clase para el contenedor padre

    // --- CREACIÓN DEL ENCABEZADO ---
    /*const header = document.createElement('div');
    header.className = 'jugadora-item header-list'; // Usamos la misma clase para heredar el grid
    header.innerHTML = `
        <div class="jugadora-div1"><p><b>${gettext('JUGADORA')}</b></p></div>
        <div class="header-label"><p><b>${gettext('EDAD')}</b></p></div>
        <div class="header-label"><p><b>${gettext('CLUB')}</b></p></div>
        <div class="header-label"><p><b>${gettext('VALOR')}</b></p></div>
    `;
    container.appendChild(header);*/

    jugadoras.forEach((jugadora, index) => {
        const nombreCompleto = jugadora.nombre_completo || 'Desconocida';
        const slugNombre = nombreCompleto.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''); // Limpiamos caracteres especiales para el slug
        const div = document.createElement('div');
        div.classList.add('jugadora-item');
        div.classList.add('glass');

        const div1 = document.createElement('div');
        const div1_2 = document.createElement('div');
        div1.className = 'jugadora-div1';

        const img = document.createElement('img');
        img.src = '/static/img/predeterm.jpg';
        if(jugadora.imagen) {img.src = '/' + jugadora.imagen;}
        img.className = 'jugadora-imagen';
        img.alt = jugadora.apodo;
        div1.appendChild(img)

        const imgClub = document.createElement('img');
        const foto = "/"+jugadora.equipo.escudo;
        const fotoMini = foto.replace('/clubes/', '/clubes/mini/');
        imgClub.src = fotoMini;
        imgClub.className = 'equipo-imagen';
        imgClub.alt = jugadora.equipo.nombre;

        const pNombre = document.createElement('p');
        pNombre.className = 'jugadora-nombre';
        pNombre.textContent = nombreCompleto; 
        div1_2.appendChild(pNombre);

        const pValor = document.createElement('p');
        pValor.className = 'jugadora-valor';
        pValor.textContent = formatearValorMercado(jugadora.market_value) || 'N/A';

        const divBanderaYPosicion = document.createElement('div');
        divBanderaYPosicion.className = 'jugadora-banderas-posicion';

        // Contenedor para las banderas
        const divBanderas = document.createElement('div');
        divBanderas.className = 'jugadora-banderas';

        // Recorremos la lista de ISOs para crear los iconos
        jugadora.nacionalidades_isos.forEach((iso, index) => {
            const icon = document.createElement('span');
            icon.className = `fi fi-${iso}`; 

            icon.onclick = filtroJugadoras.bind(null, null, jugadora.nacionalidades_ids[index], null);
            
            // Si el index es 0, es la primaria. Si es mayor, es secundaria.
            if (index > 0) {
                icon.style.opacity = "0.5";       // La "apagamos" un poco
                icon.style.filter = "grayscale(20%)"; // Opcional: le quitamos un poco de color
                icon.style.transform = "scale(0.9)";   // Opcional: la hacemos un pelín más pequeña
            } else {
                icon.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)"; // Destacamos la principal
            }

            icon.title = `País ID: ${jugadora.nacionalidades_ids[index]}`;
            divBanderas.appendChild(icon);
        });

        const pNacimiento = document.createElement('p');
        pNacimiento.textContent = calcularEdad(jugadora.nacimiento);

        const pPosicion = document.createElement('div');
        pPosicion.className = 'jugadora-posicion';
        jugadora.posiciones_abrev.forEach(pos => {
            const span = document.createElement('span');
            span.textContent = gettext(pos);
            span.id = jugadora.posiciones_ids[jugadora.posiciones_abrev.indexOf(pos)];
            span.className = 'pos-'+pos;
            pPosicion.appendChild(span);
        });
        div1_2.appendChild(divBanderaYPosicion);
        divBanderaYPosicion.appendChild(divBanderas);
        divBanderaYPosicion.appendChild(pPosicion);
        
        
        div1.appendChild(div1_2)
        const colorPrimario = jugadora.equipo.color || 'var(--color-primario)'; // fallback
        const colorSecundario = jugadora.equipo.colorSecundario || 'transparent'; // fallback
        if(colorPrimario){
        div.style.background = `
            linear-gradient(
                to bottom,
                color-mix(in srgb, ${colorPrimario} 70%, transparent),
                color-mix(in srgb, ${colorSecundario} 70%, transparent)
            )
        `;
        }

        div.style.border = `1px solid color-mix(in srgb, ${colorPrimario} 50%, transparent)`;

        pNombre.addEventListener('click', () => {
            window.location.href = `/jugadora/${jugadora.id_jugadora}/${slugNombre}/`;
        });
        div.appendChild(div1);
        div.appendChild(pNacimiento);
        div.appendChild(imgClub);
        div.appendChild(pValor);
        container.appendChild(div);

        // Retraso progresivo para efecto fade
        setTimeout(() => {
            div.classList.add('visible');
        }, index * 150); // cada liga 150ms después de la anterior
    });
    // Actualizar paginación
    updatePaginationUI();
}

function updatePaginationUI() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const prevBtn = document.createElement('button');
    prevBtn.id = 'prevPage';
    prevBtn.textContent = '←';

    const nextBtn = document.createElement('button');
    nextBtn.id = 'nextPage';
    nextBtn.textContent = '→';

    const indicator = document.createElement('span');
    indicator.id = 'pageIndicator';

    paginationContainer.innerHTML = '';
    paginationContainer.appendChild(prevBtn);
    paginationContainer.appendChild(indicator);
    paginationContainer.appendChild(nextBtn);

    // Texto tipo "Página 2 / 8"
    indicator.textContent = `Página ${currentPage} / ${totalPages}`;

    // Estado de botones
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderJugadorasPage(currentPage);
        }
    };

    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderJugadorasPage(currentPage);
        }
    };
}

async function ligasxpais(id_pais) {
    try {
        const response = await fetch(`/api/ligasxpais?pais=${id_pais}`); 
        const data = await response.json();
        if (data.success) {
            displayLigas(data.success);
        } 
        else{
            displayLigas(data);
        }
        return data;
    } catch (error) {
        console.error("Error fetching ligas:", error);
        return { error: "Error fetching ligas" };
    }
}

function displayLigas(data) {
    const container = document.getElementById('ligas-container');
    const containerEquipos = document.getElementById('items-container');
    containerEquipos.innerHTML = '';
    container.innerHTML = '';

    if (data.error) {
        container.innerHTML = `<p>Error: ${data.error}</p>`;
        return;
    }



    data.forEach((liga, index) => {
        const ligaElement = document.createElement('div');
        const foto = "/"+liga.logo;
        const fotoMini = foto.replace('/ligas/', '/ligas/mini/');
        ligaElement.classList.add('liga-item');
        ligaElement.classList.add('glass');
        ligaElement.id = liga.liga;
        ligaElement.innerHTML = `
            <img src="${fotoMini}" alt="${liga.nombre} Logo" class="liga-logo">
            <div class="liga-info">
            <h3>${liga.nombre}</h3>
            <p>2025/2026</p>
            </div>
        `;

        const img = ligaElement.querySelector('.liga-logo');
        img.onload = async () => {
            try {
                const colors = await getDominantColors(img, 3);

                ligaElement.style.background = `
                    linear-gradient(
                        to bottom,
                        color-mix(in srgb, ${rgbToRgba(colors[0], 1)} 50%, transparent),
                        color-mix(in srgb, ${rgbToRgba(colors[1], 1)} 100%, transparent)
                    )
                `;
                ligaElement.style.borderColor = rgbToRgba(colors[2], 0.7);
                // Guardamos color[2] en variable CSS del elemento
                ligaElement.style.setProperty('--liga-shadow-color', rgbToRgba(colors[2], 1));
        } catch (err) {
            console.error("Error obteniendo colores:", err);
        }
        };

        ligaElement.addEventListener('click', async () => {
            seleccionarLiga(ligaElement);
            const equipos = await equiposxliga(liga.liga);
            /*displayEquiposMapa(equipos.success)*/
            displayEquipos(equipos.success);
        });
        container.appendChild(ligaElement);

        if(index===0){
            ligaElement.click();
        }


        // Retraso progresivo para efecto fade
        setTimeout(() => {
            ligaElement.classList.add('visible');
        }, index * 150); // cada liga 150ms después de la anterior
    });
}

function seleccionarLiga(ligaElement) {
    const ligas = document.getElementsByClassName('liga-item');
    for (const liga of ligas) {
        liga.classList.remove('selected');
    }
    ligaElement.classList.add('selected');
}

export function displayEquipos(equipos, container) {
    if (!container) {
        container = document.getElementById('items-container');
    }
    container.innerHTML = '';
    container.className = '';
    container.className = 'equipos';
    if (equipos.error) {
        container.innerHTML = `<p>Error: ${equipos.error}</p>`;
        return;
    }
    equipos.forEach((equipo, index) => {
        const equipoSlug = equipo.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        const equipoElement = document.createElement('div');
        const foto = "/"+equipo.escudo;
        const fotoMini = foto.replace('/clubes/', '/clubes/mini/');
        equipoElement.className = 'equipo-item';
        equipoElement.innerHTML = `
            <img src="${fotoMini}" alt="${equipo.nombre} Escudo" class="equipo-escudo">
            <div class="equipo-info">
            <h4>${equipo.nombre}</h4>  
            </div>
        `;

        // Aplicar degradado usando los colores de la BD
        const colorPrimario = equipo.color || 'var(--color-primario)'; // fallback
        const colorSecundario = equipo.colorSecundario || 'transparent'; // fallback
        equipoElement.style.background = `
            linear-gradient(
                to bottom,
                color-mix(in srgb, ${colorPrimario} 70%, transparent 0%),
                color-mix(in srgb, ${colorSecundario} 70%, transparent)
            )
        `;
        
        equipoElement.style.setProperty('--equipo-shadow-color', colorPrimario);

        container.appendChild(equipoElement);

        equipoElement.addEventListener('click', () => {
            window.location.href = `/equipo/${equipo.id}/${equipoSlug}/`;
        });

        // Retraso progresivo para efecto fade
        setTimeout(() => {
            equipoElement.classList.add('visible');
        }, index * 150); // cada liga 150ms después de la anterior
    });
}

/*export function displayEquiposMapa(equipos) {
    inicializarMapaEquipos();

    // Guardamos los equipos para añadirlos cuando el mapa esté listo
    let equiposPendientes = equipos.filter(e => e.lat && e.lon);

    map.once("idle", () => {
        map.resize();

        requestAnimationFrame(() => {
            equiposPendientes.forEach(e => {
                añadirEquipoMapa(
                    e.id,
                    e.nombre,
                    e.lat,
                    e.lon,
                    '/' + e.escudo,
                    e.color
                );
            });

            requestAnimationFrame(() => {
                centrarMapaEnEquipos();
            });
        });
    });

}*/