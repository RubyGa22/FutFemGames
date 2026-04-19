import {calcularEdad, fetchJugadoraTrayectoriaById, fetchJugadoraPalmaresById, cargarJugadoraDatos, fetchJugadoraCompanyerasById} from '/static/futfem/js/jugadora.js'; 
import {fetchEquipoById} from '/static/futfem/js/equipos.js';    

let trayectorias, palmares, jugadora, companyeras;
// Variable global o superior para guardar las compañeras
let todasLasCompanyeras = [];
const edad = document.getElementById('edad');
const mostrador = document.getElementById('mostrador-tarjetas');
const pais = document.getElementById('pais');
const posicion = document.getElementById('posicion');
const info = document.getElementById('jugadora-info');
const palmaresIndiv = document.getElementById('palmares-individual');
const contenedorPais = document.getElementById('pais');

export async function cargarFichaJugadora(id_jugadora) {
    [jugadora, trayectorias] = await Promise.all([
        cargarJugadoraDatos(id_jugadora),
        fetchJugadoraTrayectoriaById(id_jugadora)
    ]);   
    // 2. Cargamos lo secundario sin bloquear el primer render
    const companyeras = fetchJugadoraCompanyerasById(id_jugadora, 1000);
    palmares = fetchJugadoraPalmaresById(id_jugadora, trayectorias);

    // Variables globales (o pasadas por parámetro) para usar en cargarTrayectorias
    window.trayectorias = trayectorias;
    window.palmares = palmares;
    window.companyeras = companyeras;

    //edad.textContent = jugadora.Nacimiento + '(' + calcularEdad(jugadora.Nacimiento) + ')';

    jugadora.Posiciones.forEach(pos => {
        const abrev = pos.abreviatura || pos.nombre.substring(0, 3).toUpperCase();
        const span = document.createElement('span');
        span.textContent = gettext(abrev);
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
    /*palmaresIndiv.innerHTML = `
        ${
            palmares.individual.length
            ? palmares.individual.map(t => `
                <img src="/${t.icono}" title="${t.nombre}">
            `).join('')
            : `<p class="sin-trofeos">Sin trofeos individuales</p>`
        }
    `;*/
    window.todasLasCompanyeras = await companyeras;
    await cargarTrayectorias(jugadora, trayectorias, palmares);
    

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
        },
        on: {
            init: function () {
                // Al cargar por primera vez, pillamos el equipo del primer slide
                const initialId = this.slides[this.activeIndex].getAttribute('data-equipo-id');
                cargarCompanyeras(initialId);
            },
            slideChange: function () {
                // Al cambiar, pillamos el ID del slide que ha quedado activo
                const activeId = this.slides[this.activeIndex].getAttribute('data-equipo-id');
                cargarCompanyeras(activeId);
            }
        }
    });

}

// Asegúrate de tener Swiper importado o cargado en el HTML
async function cargarTrayectorias(jugadora, trayectorias, palmaresPromise) {
    const mostrador = document.getElementById('mostrador-tarjetas');
    const fragment = document.createDocumentFragment();
    mostrador.innerHTML = ''; // Limpiar

    const palmares = await palmaresPromise;

    trayectorias.forEach((trayectoria, index) => {
        console.log(`Procesando trayectoria ${index + 1}/${trayectorias.length}:`, trayectoria);
        info.style.background = `linear-gradient(to top, color-mix(in srgb, transparent 30%, transparent), color-mix(in srgb, ${trayectoria.color} 100%, transparent 30%))`;
        info.style.border = `1px solid ${trayectoria.color}`
        // 1. Crear el Slide de Swiper
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const equipoId = trayectoria.equipo.id || trayectoria.equipo;
        swiperSlide.setAttribute('data-equipo-id', equipoId);

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
        const imgSrc = trayectoria.imagen ? `/${trayectoria.imagen}` : '/static/img/predeterm.jpg';
        const iso = jugadora.pais_iso && jugadora.pais_iso.length > 0 ? jugadora.pais_iso[0] : 'xx';
        const trofeosEquipo = palmares.equipo[index].success || [];
        const trofeosAgrupados = agruparTrofeos(trofeosEquipo);
        
        front.innerHTML = `
            <img class="imagen-jugadora" src="${imgSrc}" alt="${jugadora.nombre_completo} - ${trayectoria.equipo.nombre}" width="300" height="400" style="width: 100%; height: auto; object-fit: cover;" fetchpriority="high" loading="eager">
            <p class="nombre">${jugadora.nombre_completo}</p>
            <div class="detalles">
                <div class="equipo-pais">
                    <p>${gettext(jugadora.Posiciones[0].abreviatura)}</p>
                    <img src="/${trayectoria.escudo}" alt="${trayectoria.equipo.nombre}" title="${trayectoria.equipo.nombre}">
                    <span class="fi fi-${iso}" style="font-size: xx-large;"></span>
                </div>
                <p>${trayectoria.fecha_inicio ? (trayectoria.fecha_inicio.substring(0, 4) + (trayectoria.fecha_fin ? ' - ' + trayectoria.fecha_fin.substring(0, 4) : ' - Act.')) : null}</p>            </div>
        `;
        if(trayectoria.equipo.club === 83){
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
            const gradiente = `linear-gradient(to right, ${trayectoria.color}, transparent)`;
            detalles.style.background = gradiente;
            nombre.style.background = gradiente;
        }

        // Ensamblaje
        tarjetaInner.appendChild(front);
        tarjetaInner.appendChild(back);
        tarjetaWrapper.appendChild(tarjetaInner);
        
        // El wrapper de flip va dentro del slide de swiper
        swiperSlide.appendChild(tarjetaWrapper);
        fragment.appendChild(swiperSlide);
        
        // Evento Click para el Flip
        tarjetaWrapper.addEventListener('click', () => {
            tarjetaInner.classList.toggle('flipped');
        });
    });
    mostrador.appendChild(fragment);
}

async function cargarCompanyeras(equipoId) {
    const contenedor = document.getElementById('companyeras-container');
    contenedor.innerHTML = '';
    // Validación de seguridad: si aún no hay datos, no ejecutamos el filtro
    if (!window.todasLasCompanyeras || !Array.isArray(window.todasLasCompanyeras)) {
        console.warn("Las compañeras aún no se han cargado.");
        return;
    }
    // Filtrar las compañeras que coincidan con el equipo del slide activo
    // Asegúrate de comparar el ID como número o string según tu BD
    const filtradas = window.todasLasCompanyeras.filter(c => String(c.equipo) === String(equipoId));
    filtradas.forEach(compañera => {
        const slugNombre = (compañera.Nombre_Completo || compañera.nombre).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''); // Limpiamos caracteres especiales para el slug
        const card = document.createElement('div');
        card.classList.add('companyera-card', 'glass');
        const imgSrc = compañera.imagen ? `${compañera.imagen}` : 'static/img/predeterm.jpg';
        card.innerHTML = `
            <img src="/${imgSrc}" alt="${compañera.Nombre_Completo}" width="100" height="130" style="width: 100%; height: auto; object-fit: cover;" loading="lazy">
            <p>${compañera.Nombre_Completo}</p>
        `;
        card.style.borderColor = compañera.color || '#ccc';
        card.style.background = `linear-gradient(to bottom, 
        color-mix(in srgb, ${compañera.color} 30%, transparent), 
        color-mix(in srgb, ${compañera.color} 50%, transparent))`;
        // Evento click para redirigir a la ficha de la compañera
        card.addEventListener('click', () => {
            window.location.href = `/jugadora/${compañera.id_jug_comp}/${slugNombre}/`;
        });
        contenedor.appendChild(card);
    });
    // Si no hay compañeras, crear tarjeta de "Sin compañeras"
    if (filtradas.length === 0) {
        const card = document.createElement('div');
        card.classList.add('companyera-card', 'glass', 'sin-companyeras');
        card.innerHTML = `
            <p>Sin compañeras en este equipo</p>
        `;
        contenedor.appendChild(card);
    }
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