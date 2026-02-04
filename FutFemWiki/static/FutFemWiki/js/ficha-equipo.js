import { jugadorasxTemporadaYEquipo } from "../../../static/js/api/equipos.js";
//import { displayEquipos } from "./wiki.js"; 

export async function crearFichaJugadorasActuales(equipo, color) {
    const jugadoras = await jugadorasxTemporadaYEquipo(equipo, 2026);
    if (jugadoras.error) {
        console.error('Error al obtener jugadoras:', jugadoras.error);
        return;
    }
    displayJugadoras('jugadoras-actuales-container', jugadoras.success, color);
}

export async function crearFichaJugadorasDeSiempre(equipo, color) {
    const jugadoras = await jugadorasxTemporadaYEquipo(equipo, '');
    if (jugadoras.error) {
        console.error('Error al obtener jugadoras:', jugadoras.error);
        return;
    }
    displayJugadoras('jugadoras-container', jugadoras.success, color);
}

function displayJugadoras(id, jugadoras, color) {
    console.log(jugadoras);
    const container = document.getElementById(id);
    container.innerHTML = '';
    jugadoras.forEach((jugadora, index) => {
        const jugadoraElement = document.createElement('div');
        jugadoraElement.className = 'jugadora-item';
        jugadoraElement.id = jugadora.id_jugadora;
        jugadoraElement.innerHTML = `
            <!--<img src="/${jugadora.imagen || '/static/img/predeterm.jpg'}" alt="${jugadora.nombre}" class="jugadora-img">-->
            <div class="jugadora-info">
                <h3>${jugadora.Apodo}</h3>
                <p>${jugadora.años}</p>
            </div>
        `;  
        jugadoraElement.style.backgroundImage = `
            linear-gradient(
                to bottom,
                color-mix(in srgb, ${color} 30%, transparent),
                color-mix(in srgb, transparent 30%, transparent)
            ),
            url('/${jugadora.imagen || '/static/img/predeterm.jpg'}')
        `;

        jugadoraElement.style.backgroundSize = 'cover';
        jugadoraElement.style.backgroundPosition = 'center';
        jugadoraElement.style.backgroundRepeat = 'no-repeat';
        container.appendChild(jugadoraElement);
        // Retraso progresivo para efecto fade
        setTimeout(() => {
            jugadoraElement.classList.add('visible');
        }, index * 150); // cada jugadora 150ms después de la anterior
    });
}