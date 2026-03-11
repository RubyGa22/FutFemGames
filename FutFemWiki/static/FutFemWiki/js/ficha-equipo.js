import { jugadorasxTemporadaYEquipo } from "/static/futfem/js/equipos.js";
import { fetchEquipoPalmaresByTemporadas } from "/static/futfem/js/equipos.js";

const divPalmares = document.getElementById('palmares'); 
export async function displayPalmares(equipo) {
    const data = await fetchEquipoPalmaresByTemporadas(equipo, '1950-act');
    console.log("Datos originales:", data.success);

    const palmaresAgrupado = agruparTrofeos(data.success);
    console.log("Agrupado:", palmaresAgrupado);

    palmaresAgrupado.forEach(trofeo => {
        const div = document.createElement("div");
        div.classList.add("trofeo");
        
        div.innerHTML = `
            <img src="/${trofeo.icono}" alt="${trofeo.nombre}">
            <h3>${trofeo.nombre}</h3>
            <p>${gettext("Ganado")} ${trofeo.count} ${gettext("veces")}</p>
            <!--<p>Temporadas: ${trofeo.temporadas.join(", ")}</p>-->
        `;

        divPalmares.appendChild(div);
    });
}


// Agrupar trofeos por ID y juntar temporadas
function agruparTrofeos(trofeos) {
    const agrupado = {};

    trofeos.forEach(t => {
        if (!agrupado[t.id]) {
            agrupado[t.id] = {
                id: t.id,
                nombre: t.nombre,
                icono: t.icono,
                tipo: t.tipo,
                count: 0,
                temporadas: []
            };
        }

        agrupado[t.id].count += 1;
        agrupado[t.id].temporadas.push(t.temporada);
    });

    return Object.values(agrupado);
}


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
    const container = document.getElementById(id);
    container.innerHTML = '';

    // 1. Agrupamos las jugadoras por su ID
    const jugadorasAgrupadas = [];
    const mapaJugadoras = {};

    jugadoras.forEach(j => {
        const anyoInicio = j.fecha_inicio ? j.fecha_inicio.toString().split('-')[0] : '????';

        // Si fecha_fin existe y no es 'act', sacamos el año; si no, ponemos 'act'
        const anyoFin = (j.fecha_fin && j.fecha_fin !== 'act') ? j.fecha_fin.toString().split('-')[0] : 'act';
        const fechaTexto = `${anyoInicio} - ${anyoFin}`;
        
        if (!mapaJugadoras[j.id_jugadora]) {
            // Si es la primera vez que vemos a esta jugadora, la añadimos al mapa
            mapaJugadoras[j.id_jugadora] = {
                ...j,
                etapas: [fechaTexto] // Creamos un array para guardar sus etapas
            };
            jugadorasAgrupadas.push(mapaJugadoras[j.id_jugadora]);
        } else {
            // Si ya existe, solo añadimos la nueva etapa a su array
            mapaJugadoras[j.id_jugadora].etapas.push(fechaTexto);
        }
    });

    jugadorasAgrupadas.forEach((jugadora, index) => {
        const jugadoraElement = document.createElement('div');
        jugadoraElement.className = 'jugadora-item';
        jugadoraElement.id = jugadora.id_jugadora;

        // Unimos todas las etapas con una coma
        const todasLasEtapas = jugadora.etapas.join(', ');
        jugadoraElement.innerHTML = `
            <!--<img src="/${jugadora.imagen || '/static/img/predeterm.jpg'}" alt="${jugadora.nombre}" class="jugadora-img">-->
            <div class="jugadora-info">
                <h3>${jugadora.Apodo}</h3>
                <p>${todasLasEtapas}</p>
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