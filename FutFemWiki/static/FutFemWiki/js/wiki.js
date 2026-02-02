import { handleAutocompletePais } from '../../../static/js/api/pais.js';
import { equiposxliga, handleAutocompleteEquipo } from '/static/js/api/equipos.js';
import { fetchAllJugadoras } from '../../../static/js/api/jugadora.js';
import { fetchEquipoById } from '../../../static/js/api/equipos.js';
import { getDominantColors, rgbToRgba } from '../../../static/js/utils/color.thief.js';
let jugadorasOriginal;

function inicializarWiki() {

    const inputPaises = document.getElementsByClassName('input-pais');

    const inputEquipo = document.getElementById('input-equipo');

    const botonConfirmar = document.getElementById('confirmarPais');

    const botonJugadoras = document.getElementById('jugadoras-btn');

    const botonFiltro = document.getElementById('jugadoras-filtros');

    botonFiltro.addEventListener('click', () => {
        const paisInput = inputPaises[1];
        if (!paisInput) return;
        console.log(inputPaises)
        filtroJugadoras(Number(inputEquipo.dataset.id), Number(paisInput.dataset.id), null);
    });

    botonJugadoras.addEventListener('click', async (event) => {
        manejarJugadoras();
    });

    inputEquipo.addEventListener('input', async (event) => {
        handleAutocompleteEquipo(event, 'sugerencias-equipo');
    });

    for(const input of inputPaises){
        input.addEventListener('input', async (event) => {
            handleAutocompletePais(event, 'sugerencias-pais');
        });
    }
    

    botonConfirmar.addEventListener('click', async () => {
        const paisId = Number(inputPaises[0].dataset.id);
        if (paisId) {
            await ligasxpais(paisId);
        } else {
            alert('Por favor, selecciona un país válido de las sugerencias.');
        }
    });
}


inicializarWiki();


async function manejarJugadoras() {
    if (jugadorasOriginal && jugadorasOriginal.length > 0) {
        return;
    }
    jugadorasOriginal = await fetchAllJugadoras();

    // Usamos for...of para poder await dentro del loop
    for (const jugadora of jugadorasOriginal) {
        if (jugadora.equipo) {
            jugadora.equipo = await fetchEquipoById(jugadora.equipo);
        } else {
            jugadora.equipo = null; // si no tiene equipo actual
        }
    }

    //return jugadorasOriginal;
}


function displayJugadoras(jugadoras){
    const container = document.getElementById('items-container');
    const containerLigas = document.getElementById('ligas-container');
    container.innerHTML = '';
    containerLigas.innerHTML = '';
    container.className = '';
    container.className = 'jugadoras';
    jugadoras.forEach((jugadora, index) => { 
        const nombreCompleto = jugadora.nombre + jugadora.apellido;
        const div = document.createElement('div');
        div.classList.add('jugadora-item');
        div.classList.add('glass');

        const img = document.createElement('img');
        img.src = '/static/img/predeterm.jpg';
        if(jugadora.imagen) {img.src = '/' + jugadora.imagen;}
        img.className = 'jugadora-imagen';
        img.alt = jugadora.apodo;

        const imgClub = document.createElement('img');
        imgClub.src = '/' + jugadora.equipo[0].escudo;
        imgClub.className = 'equipo-imagen';
        imgClub.alt = jugadora.equipo[0].nombre;

        const pNombre = document.createElement('p');
        pNombre.textContent = jugadora.apodo; 

        const pNacionalidad = document.createElement('p');
        pNacionalidad.textContent = jugadora.nacionalidad;

        const pNacimiento = document.createElement('p');
        pNacimiento.textContent = jugadora.nacimiento;

        const pPosicion = document.createElement('p');
        pPosicion.textContent = jugadora.posicion;
        
        const colorPrimario = jugadora.equipo[0].color || 'var(--color-primario)'; // fallback
        const colorSecundario = jugadora.equipo[0].colorSecundario || 'transparent'; // fallback
        if(colorPrimario){
        div.style.background = `
            linear-gradient(
                to bottom,
                color-mix(in srgb, ${colorPrimario} 30%, transparent),
                color-mix(in srgb, ${colorSecundario} 30%, transparent)
            )
        `;
        }

        div.addEventListener('click', () => {
            window.location.href = `/wiki/jugadora/${jugadora.id_jugadora}/`;
        });

        div.appendChild(img);
        div.appendChild(pNombre);
        div.appendChild(imgClub);
        div.appendChild(pNacionalidad);
        div.appendChild(pNacimiento);
        div.appendChild(pPosicion);
        container.appendChild(div);

        // Retraso progresivo para efecto fade
        setTimeout(() => {
            div.classList.add('visible');
        }, index * 150); // cada liga 150ms después de la anterior


    });
   
}


async function ligasxpais(id_pais) {
    try {
        const response = await fetch(`/api/ligasxpais?pais=${id_pais}`); 
        const data = await response.json();
        console.log(data);
        displayLigas(data.success);
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
        ligaElement.classList.add('liga-item');
        ligaElement.classList.add('glass');
        ligaElement.id = liga.liga;
        ligaElement.innerHTML = `
            <img src="/${liga.logo}" alt="${liga.nombre} Logo" class="liga-logo">
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
                        color-mix(in srgb, ${rgbToRgba(colors[0], 0.3)} 50%, transparent),
                        color-mix(in srgb, ${rgbToRgba(colors[1], 0.3)} 100%, transparent)
                    )
                `;
                ligaElement.style.borderColor = rgbToRgba(colors[2], 0.7);
        } catch (err) {
            console.error("Error obteniendo colores:", err);
        }
        };

        ligaElement.addEventListener('click', async () => {
            const equipos = await equiposxliga(liga.liga);
            displayEquipos(equipos.success);
        });
        container.appendChild(ligaElement);


        // Retraso progresivo para efecto fade
        setTimeout(() => {
            ligaElement.classList.add('visible');
        }, index * 150); // cada liga 150ms después de la anterior
    });
}

function displayEquipos(equipos) {
    const container = document.getElementById('items-container');
    container.innerHTML = '';
    container.className = '';
    container.className = 'equipos';
    if (equipos.error) {
        container.innerHTML = `<p>Error: ${equipos.error}</p>`;
        return;
    }
    equipos.forEach((equipo, index) => {
        const equipoElement = document.createElement('div');
        equipoElement.className = 'equipo-item';
        equipoElement.innerHTML = `
            <img src="/${equipo.escudo}" alt="${equipo.nombre} Escudo" class="equipo-escudo">
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
                color-mix(in srgb, ${colorPrimario} 30%, transparent),
                color-mix(in srgb, ${colorSecundario} 30%, transparent)
            )
        `;
        container.appendChild(equipoElement);

        equipoElement.addEventListener('click', () => {
            window.location.href = `/wiki/equipo/${equipo.id}/`;
        });

        // Retraso progresivo para efecto fade
        setTimeout(() => {
            equipoElement.classList.add('visible');
        }, index * 150); // cada liga 150ms después de la anterior
    });
}

function filtroJugadoras(equipo, nacionalidad, posicion){
    let nuevasJugadoras = jugadorasOriginal.filter(jugadora => {

        if (equipo && jugadora.equipo[0].club !== equipo) return false;
        if (nacionalidad && jugadora.nacionalidad !== nacionalidad) return false;
        if (posicion && jugadora.posicion !== posicion) return false;

        return true;
    });



    displayJugadoras(nuevasJugadoras);
     
}