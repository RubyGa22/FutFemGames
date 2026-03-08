import {calcularEdad, fetchJugadoraTrayectoriaById, fetchJugadoraPalmaresById, cargarJugadoraDatos} from '/static/futfem/js/jugadora.js'; 
import {fetchEquipoById} from '/static/futfem/js/equipos.js';    

let trayectorias, palmares, jugadora;
const edad = document.getElementById('edad');
const mostrador = document.getElementById('mostrador-tarjetas');
const pais = document.getElementById('pais');
const posicion = document.getElementById('posicion');
const info = document.getElementById('jugadora-info');
const palmaresIndiv = document.getElementById('palmares-individual');
const contenedorPais = document.getElementById('pais');

export async function cargarFichaJugadora(id_jugadora) {
    [jugadora, trayectorias, palmares] = await Promise.all([
        cargarJugadoraDatos(id_jugadora),
        fetchJugadoraTrayectoriaById(id_jugadora),
        fetchJugadoraPalmaresById(id_jugadora)
    ]);    

    // Variables globales (o pasadas por parámetro) para usar en cargarTrayectorias
    window.trayectorias = trayectorias;
    window.palmares = palmares;

    edad.textContent = jugadora.Nacimiento + '(' + calcularEdad(jugadora.Nacimiento) + ')';

    jugadora.Posiciones.forEach(pos => {
        const abrev = pos.abreviatura || pos.nombre.substring(0, 3).toUpperCase();
        const span = document.createElement('span');
        span.textContent = abrev;
        span.classList.add('pos-'+pos.abreviatura);
        posicion.appendChild(span);
    });
    // 1. Limpiamos el contenido previo (por si cambias de jugadora)
    contenedorPais.innerHTML = ''; 
    // 2. Comprobamos que existan nacionalidades
    if (jugadora.pais_iso && jugadora.pais_iso.length > 0) {
        
        jugadora.pais_iso.forEach((iso, index) => {
            const bandera = document.createElement('span');
            
            // Añadimos las clases de la librería
            bandera.classList.add('fi', `fi-${iso.toLowerCase()}`);
            
            // Estilos para diferenciar principal de secundarias
            bandera.style.marginRight = '6px';
            bandera.style.display = 'inline-block';
            
            if (index > 0) {
                // Nacionalidades secundarias: apagadas
                bandera.style.opacity = '0.4';
                bandera.style.transform = 'scale(0.85)';
                bandera.style.filter = 'saturate(0.6)';
            } else {
                // Nacionalidad principal: destacada
                bandera.style.opacity = '1';
                bandera.style.transform = 'scale(1.1)';
                bandera.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
            }

            // Añadimos la bandera al contenedor principal
            contenedorPais.appendChild(bandera);
        });
    }
    if (!palmares.individual) {palmares.individual = [];}
    palmaresIndiv.innerHTML = `
        ${
            palmares.individual.length
            ? palmares.individual.map(t => `
                <img src="/${t.icono}" title="${t.nombre}">
            `).join('')
            : `<p class="sin-trofeos">Sin trofeos individuales</p>`
        }
    `;

    await cargarTrayectorias(jugadora, trayectorias, palmares);

}

     // Asegúrate de tener Swiper importado o cargado en el HTML
async function cargarTrayectorias(jugadora, trayectorias, palmares) {
    console.log('Cargando trayectorias para:', jugadora);
    const mostrador = document.getElementById('mostrador-tarjetas');
    mostrador.innerHTML = ''; // Limpiar

    // 1. PETICIONES EN PARALELO: Pedimos todos los equipos a la vez
    const equiposData = await Promise.all(
        trayectorias.map(t => fetchEquipoById(t.equipo))
    );

    trayectorias.forEach((trayectoria, index) => {
        const equipo = equiposData[index];

        info.style.background = equipo.color;
        
        // 1. Crear el Slide de Swiper
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        // 2. Crear el Wrapper de la Tarjeta (para el flip)
        const tarjetaWrapper = document.createElement('div');
        tarjetaWrapper.classList.add('tarjeta-wrapper');

        const tarjetaInner = document.createElement('div');
        tarjetaInner.classList.add('tarjeta-inner');

        // Crear Front y Back (Tu lógica actual corregida)
        const front = document.createElement('div');
        front.classList.add('tarjeta-front', 'glass', 'tarjeta-jugadora');
        
        const back = document.createElement('div');
        back.classList.add('tarjeta-back', 'glass');

        // Lógica de colores y contenido...
        const imgSrc = trayectoria.imagen ? `/${trayectoria.imagen}` : `/${jugadora.imagen}`;
        const iso = jugadora.pais_iso && jugadora.pais_iso.length > 0 ? jugadora.pais_iso[0] : 'xx';
        const trofeosEquipo = palmares.equipo[index].success || [];
        const trofeosAgrupados = agruparTrofeos(trofeosEquipo);
        
        front.innerHTML = `
            <img class="imagen-jugadora" src="${imgSrc}">
            <p class="nombre">${jugadora.nombre_completo}</p>
            <div class="detalles">
                <div class="equipo-pais">
                    <p>${jugadora.Posiciones[0].abreviatura}</p>
                    <img src="/${equipo.escudo}">
                    <span class="fi fi-${iso}" style="font-size: xx-large;"></span>
                </div>
                <p>${trayectoria.fecha_inicio ? (trayectoria.fecha_inicio.substring(0, 4) + (trayectoria.fecha_fin ? ' - ' + trayectoria.fecha_fin.substring(0, 4) : ' - Act.')) : null}</p>            </div>
        `;
        if(equipo.club === 83){
            info.querySelector('img').classList.add('vintage');
            front.querySelector('.imagen-jugadora').classList.add('vintage');
        }

        back.innerHTML = `
            <h4>Palmarés</h4>
            <div class="trofeos" style="display: grid; grid-template-columns: repeat(2, 1fr);">
                ${trofeosAgrupados.map(t => `
                    <div class="trofeo-item">
                        <img src="/${t.icono}" title="${t.nombre}">
                        <p class="veces-ganado">${t.count}</p>
                    </div>
                `).join('') || '<p>Sin trofeos</p>'}
            </div>
        `;

        // Estilos dinámicos de gradiente
        const detalles = front.querySelector('.detalles');
        const nombre = front.querySelector('.nombre');
        if (detalles && nombre) {
            const gradiente = `linear-gradient(to right, ${equipo.color}, transparent)`;
            detalles.style.background = gradiente;
            nombre.style.background = gradiente;
        }

        // Ensamblaje
        tarjetaInner.appendChild(front);
        tarjetaInner.appendChild(back);
        tarjetaWrapper.appendChild(tarjetaInner);
        
        // El wrapper de flip va dentro del slide de swiper
        swiperSlide.appendChild(tarjetaWrapper);
        mostrador.appendChild(swiperSlide);
        
        // Evento Click para el Flip
        tarjetaWrapper.addEventListener('click', () => {
            tarjetaInner.classList.toggle('flipped');
        });
    });

    // 3. INICIALIZAR SWIPER (Fuera del bucle)
    new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false, // Desactivar si tus tarjetas ya tienen sombras
        },
        spaceBetween: 30,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });
}

// Agrupar trofeos por ID y juntar temporadas
function agruparTrofeos(trofeos) {
    const agrupado = {};
    trofeos.forEach(t => {
        if (!agrupado[t.id]) {
            agrupado[t.id] = { ...t, count: 0 };
        }
        agrupado[t.id].count += 1;
    });
    return Object.values(agrupado);
}