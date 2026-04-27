import { formatearValorMercado } from "/static/futfem/js/jugadora.js";
import { jugadorasxTemporadaYEquipo, fetchEquipoPalmaresByTemporadas } from "/static/futfem/js/equipos.js";
import { calcularEdad } from '/static/js/games/funciones-comunes.js';
import { ponerJugadoraEnField } from "/static/js/football_field.js";

const divPalmares = document.getElementById('palmares'); 
const ligaElement = document.getElementById('liga-item');
/*const colors = await getDominantColors(ligaElement, 3);

ligaElement.style.background = `
    linear-gradient(
        to bottom,
            color-mix(in srgb, ${rgbToRgba(colors[0], 0.5)} 50%, transparent),
            color-mix(in srgb, ${rgbToRgba(colors[1], 0.5)} 100%, transparent)
            )
    `;
ligaElement.style.borderColor = rgbToRgba(colors[2], 0.7);
// Guardamos color[2] en variable CSS del elemento
ligaElement.style.setProperty('--liga-shadow-color', rgbToRgba(colors[2], 1));*/



export async function displayPalmares(equipo) {
    const data = await fetchEquipoPalmaresByTemporadas(equipo, '1950-act');
    const palmaresAgrupado = agruparTrofeos(data.success);

    palmaresAgrupado.forEach(trofeo => {
        const div = document.createElement("div");
        div.classList.add("trofeo");
        
        div.innerHTML = `
            <img src="/${trofeo.icono}" alt="${trofeo.nombre}" loading="lazy" style="width: 50px; height: 50px; object-fit: contain;">
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
    await displayJugadorasActuales('jugadoras-actuales-container', jugadoras.success, color);
}

export async function crearFichaJugadorasDeSiempre(equipo, color) {
    const jugadoras = await jugadorasxTemporadaYEquipo(equipo, '');
    if (jugadoras.error) {
        console.error('Error al obtener jugadoras:', jugadoras.error);
        return;
    }
    displayJugadoras('jugadoras-container', jugadoras.success, color, false);
}

function displayJugadoras(id, jugadoras, color, actuales) {
    const container = document.getElementById(id);
    if (!container) return;

    // 1. Agrupamos las jugadoras por su ID (Mantenemos tu lógica de trayectoria)
    const jugadorasAgrupadas = [];
    const mapaJugadoras = {};

    jugadoras.forEach(j => {
        const anyoInicio = j.trayectoria.inicio ? j.trayectoria.inicio.toString().split('-')[0] : '????';
        const anyoFin = (j.trayectoria.fin && j.trayectoria.fin !== 'act') ? j.trayectoria.fin.toString().split('-')[0] : 'act';
        const fechaTexto = `${anyoInicio} - ${anyoFin}`;
        
        if (!mapaJugadoras[j.id_jugadora]) {
            mapaJugadoras[j.id_jugadora] = {
                ...j,
                etapas: [fechaTexto]
            };
            jugadorasAgrupadas.push(mapaJugadoras[j.id_jugadora]);
        } else {
            mapaJugadoras[j.id_jugadora].etapas.push(fechaTexto);
        }
    });

    // Ordenar por fecha de inicio
    jugadorasAgrupadas.sort((a, b) => {
        const fechaA = a.trayectoria.inicio ? new Date(a.trayectoria.inicio) : new Date(0);
        const fechaB = b.trayectoria.inicio ? new Date(b.trayectoria.inicio) : new Date(0);
        return fechaA - fechaB;
    });

    const fragment = document.createDocumentFragment();

    jugadorasAgrupadas.forEach((jugadora, index) => {
        const nombreCompleto = jugadora.nombre_completo || 'Desconocida';
        const slugNombre = nombreCompleto.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

        // --- CONSTRUCCIÓN DE LA TARJETA (Estilo Actuales) ---
        
        const wrapper = document.createElement('div');
        wrapper.className = 'jugadora-wrapper';

        const div = document.createElement('div');
        div.classList.add('jugadora-item', 'glass');
        if(jugadora.equipo.id === 83) div.classList.add('icono')

        const div1 = document.createElement('div');
        div1.className = 'jugadora-div1';

        // Imagen de perfil
        const img = document.createElement('img');
        img.src = jugadora.imagen ? '/' + jugadora.imagen : '/static/img/predeterm.jpg';
        img.width = 70;
        img.height = 70;
        img.className = 'jugadora-imagen';
        img.loading = 'lazy';
        img.alt = nombreCompleto;
        div1.appendChild(img);

        const div1_2 = document.createElement('div');
        div1_2.className = 'jugadora-div1_2';

        // Nombre
        const pNombre = document.createElement('p');
        pNombre.className = 'jugadora-nombre';
        pNombre.textContent = nombreCompleto;
        pNombre.style.background = jugadora.equipo?.color || color;
        div1_2.appendChild(pNombre);

        // Contenedor de iconos y posición
        const divBanderaYPosicion = document.createElement('div');
        divBanderaYPosicion.className = 'jugadora-banderas-posicion';

        const divBanderas = document.createElement('div');
        divBanderas.className = 'jugadora-banderas';

        // Bandera (Nacionalidad)
        if (jugadora.nacionalidades_isos && jugadora.nacionalidades_isos.length > 0) {
            const iso = jugadora.nacionalidades_isos[0];
            const icon = document.createElement('span');
            icon.className = `fi fi-${iso.toLowerCase()}`;
            divBanderas.appendChild(icon);
        }
        const imgLiga = document.createElement('img');
        // Logo Liga
        if (jugadora.equipo?.liga_logo) {
            imgLiga.src = "/" + jugadora.equipo.liga_logo;
        }else if(jugadora.equipo.id === 83){ imgLiga.src = "/" + jugadora.equipo.escudo;}      

        divBanderas.appendChild(imgLiga);
  

        // Escudo Club
        if (jugadora.equipo?.escudo) {
            const imgClub = document.createElement('img');
            imgClub.src = '/' + jugadora.equipo.escudo;
            imgClub.className = 'equipo-imagen';
            divBanderas.appendChild(imgClub);
        }

        // Posiciones
        const pPosicion = document.createElement('div');
        pPosicion.className = 'jugadora-posicion';
        (jugadora.posiciones_abrev || []).forEach(pos => {
            const span = document.createElement('span');
            span.textContent = pos; // Aquí puedes usar gettext(pos) si es necesario
            span.className = 'pos-' + pos;
            pPosicion.appendChild(span);
        });

        divBanderaYPosicion.appendChild(divBanderas);
        divBanderaYPosicion.appendChild(pPosicion);
        div1_2.appendChild(divBanderaYPosicion);
        div1.appendChild(div1_2);
        div.appendChild(div1);

        // Fondo dinámico
        const colPrimario = jugadora.equipo?.color || color || 'var(--color-primario)';
        div.style.background = `
            linear-gradient(
                to bottom,
                color-mix(in srgb, ${colPrimario} 30%, transparent),
                transparent
            )
        `;
        div.style.border = '1px solid '+colPrimario

        // Click para ir al perfil
        div.addEventListener('click', () => {
            window.location.href = `/jugadora/${jugadora.id_jugadora}/${slugNombre}/`;
        });

        // --- INFO DE ETAPAS (Fuera de la tarjeta, tal como pediste) ---
        const etapasDiv = document.createElement('div');
        etapasDiv.className = 'jugadora-etapas-outside';
        etapasDiv.textContent = jugadora.etapas.join(', ');
        etapasDiv.style.fontSize = '0.7em';
        etapasDiv.style.textAlign = 'center';
        etapasDiv.style.marginTop = '5px';

        wrapper.appendChild(div);
        wrapper.appendChild(etapasDiv);
        fragment.appendChild(wrapper);

        // Efecto fade-in
        setTimeout(() => {
            wrapper.classList.add('visible');
        }, index * 100);
    });

    container.appendChild(fragment);
}

async function displayJugadorasActuales(id, jugadoras, color){
    const container = document.getElementById(id);
    const footballField = document.getElementsByClassName('football-field');
    const fragment = document.createDocumentFragment();
        // 0. Limpiar y Validar
        const destacadosContainer = document.getElementById('jugadoras-destacadas-container');
        if (destacadosContainer) destacadosContainer.innerHTML = '';
        
        if (!jugadoras || jugadoras.length === 0) return;

        // 1. Encontrar las 3 destacadas (con validación de datos)
        const masCara = [...jugadoras].reduce((prev, curr) => 
            (Number(curr.market_value || 0) >= Number(prev.market_value || 0)) ? curr : prev
        );

        const masJoven = [...jugadoras].reduce((prev, curr) => {
            const fechaCurr = curr.nacimiento ? new Date(curr.nacimiento) : new Date(0);
            const fechaPrev = prev.nacimiento ? new Date(prev.nacimiento) : new Date(0);
            return (fechaCurr > fechaPrev) ? curr : prev;
        });

        const masMayor = [...jugadoras].reduce((prev, curr) => {
            const fechaCurr = curr.nacimiento ? new Date(curr.nacimiento) : new Date();
            const fechaPrev = prev.nacimiento ? new Date(prev.nacimiento) : new Date();
            return (fechaCurr < fechaPrev) ? curr : prev;
        });

        // 2. Función de creación mejorada
        const crearCardDestacada = (jugadora, etiqueta) => {
            const cardContainer = document.createElement('div');
            const slugNombre = (jugadora.nombre_completo || jugadora.nombre).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''); // Limpiamos caracteres especiales para el slug
            const card = document.createElement('div');
            // IMPORTANTE: Añadimos 'visible' para que no herede el opacity 0 si lo tienes en el CSS
            card.className = 'jugadora-item glass destacada-card visible'; 

            cardContainer.style.display = 'flex';
            cardContainer.style.flexDirection = 'column';
            cardContainer.style.alignItems = 'center';
            cardContainer.style.flex = 1;
            
            const badge = document.createElement('span');
            badge.className = 'badge-destacada';
            badge.textContent = etiqueta;
            badge.style.textWrap = 'nowrap';
            badge.style.fontSize = '0.8em';

            const img = document.createElement('img');
            img.src = jugadora.imagen ? '/' + jugadora.imagen : '/static/img/predeterm.jpg';
            img.className = 'jugadora-imagen';
            img.loading = 'lazy';
            img.alt = jugadora.nombre_completo || jugadora.apodo || jugadora.nombre;
            
            const info = document.createElement('div');
            info.className = 'info-destacada';
            
            let datoExtra = etiqueta === 'MÁS CARA' 
                ? (formatearValorMercado(jugadora.market_value) || 'N/A')
                : (calcularEdad(jugadora.nacimiento) + ' años');

            info.innerHTML = `
                <!--<h4>${jugadora.apodo || jugadora.nombre}</h4>-->
                <p>${datoExtra}</p>
            `;

            cardContainer.appendChild(badge);
            card.appendChild(img);
            cardContainer.appendChild(card);
            cardContainer.appendChild(info);
            destacadosContainer.appendChild(cardContainer);
            
            card.onclick = () => window.location.href = `/jugadora/${jugadora.id_jugadora}/${slugNombre}/`;
            return cardContainer;
        };

        // 3. Inserción inmediata
        if (destacadosContainer) {
            destacadosContainer.appendChild(crearCardDestacada(masCara, 'MÁS CARA'));
            destacadosContainer.appendChild(crearCardDestacada(masJoven, 'MÁS JOVEN'));
            destacadosContainer.appendChild(crearCardDestacada(masMayor, 'MÁS MAYOR'));
        }

        // Ordenamos directamente por el primer ID de posición del array
        jugadoras.sort((a, b) => {
            const idA = a.posiciones_ids?.[0] || 999;
            const idB = b.posiciones_ids?.[0] || 999;
            return idA - idB;
        });
    

        for (let i = 0; i < jugadoras.length; i++) {
            const jugadora = jugadoras[i];
            ponerJugadoraEnField(jugadora, jugadora.posiciones_ids[0], color);
            const nombreCompleto = jugadora.nombre_completo || 'Desconocida';
            const slugNombre = nombreCompleto.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''); // Limpiamos caracteres especiales para el slug
            const div = document.createElement('div');
            div.classList.add('jugadora-item');
            div.classList.add('glass');
            if(jugadora.equipo.id === 83) div.classList.add('icono')

            const div1 = document.createElement('div');
            const div1_2 = document.createElement('div');
            div1.className = 'jugadora-div1';
            div1_2.className = 'jugadora-div1_2';

            const img = document.createElement('img');
            img.src = jugadora.imagen ? '/' + jugadora.imagen : '/static/img/predeterm.jpg';
            img.width = 70;  // <-- Obligatorio para CLS
            img.height = 70; // <-- Obligatorio para CLS
            img.className = 'jugadora-imagen';
            img.loading = 'lazy';
            img.alt = jugadora.nombre_completo;
            div1.appendChild(img)

            const imgClub = document.createElement('img');
            imgClub.src = '/' + jugadora.equipo.escudo;
            imgClub.className = 'equipo-imagen';
            imgClub.alt = jugadora.equipo.nombre;

            const pNombre = document.createElement('p');
            pNombre.className = 'jugadora-nombre';
            pNombre.textContent = nombreCompleto; 
            pNombre.style.background = jugadora.equipo.color;
            div1_2.appendChild(pNombre);

            const pValor = document.createElement('p');
            pValor.className = 'jugadora-valor';
            pValor.textContent = formatearValorMercado(jugadora.market_value) || 'N/A';
            pValor.style.textWrap = 'nowrap';

            const imgLiga = document.createElement('img');
            // Logo Liga
            if (jugadora.equipo?.liga_logo) {
                imgLiga.src = "/" + jugadora.equipo.liga_logo;
            }else if(jugadora.equipo.id === 83){ imgLiga.src = "/" + jugadora.equipo.escudo;}      

            const divBanderaYPosicion = document.createElement('div');
            divBanderaYPosicion.className = 'jugadora-banderas-posicion';

            // Contenedor para las banderas
            const divBanderas = document.createElement('div');
            divBanderas.className = 'jugadora-banderas';

            // Recorremos la lista de ISOs para crear los iconos
            // Usamos (jugadora.nacionalidades_isos || []) para asegurar que SIEMPRE haya un array, aunque sea vacío
            /*(jugadora.nacionalidades_isos || []).forEach((iso, index) => {
                if (!iso) return; // Salta si la ISO es null o vacía

                const icon = document.createElement('span');
                icon.className = `fi fi-${iso.toLowerCase()}`; // Forzamos minúsculas por si acaso                
                icon.title = `País ID: ${jugadora.nacionalidades_ids?.[index] || '?'}`;
                divBanderas.appendChild(icon);
            });*/

            const iso = jugadora.nacionalidades_isos[0];
            const icon = document.createElement('span');
            icon.className = `fi fi-${iso.toLowerCase()}`; // Forzamos minúsculas por si acaso                
            icon.title = `País ID: ${jugadora.nacionalidades_ids?.[0] || '?'}`;
            divBanderas.appendChild(icon);

            const pNacimiento = document.createElement('p');
            pNacimiento.textContent = calcularEdad(jugadora.nacimiento)+' años';

            const pPosicion = document.createElement('div');
            pPosicion.className = 'jugadora-posicion';
            (jugadora.posiciones_abrev || []).forEach(pos => {
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
                    color-mix(in srgb, ${colorPrimario} 30%, transparent),
                    color-mix(in srgb, ${colorSecundario} 30%, transparent)
                )
            `;
            div.style.border = '1px solid '+colorPrimario
            }

            pNombre.addEventListener('click', () => {
                window.location.href = `/jugadora/${jugadora.id_jugadora}/${slugNombre}/`;
            });
            div.appendChild(div1);
            divBanderas.appendChild(imgLiga);
            divBanderas.appendChild(imgClub);
            //div.appendChild(pNacimiento);
            //div.appendChild(pValor);
            container.appendChild(div);

            // Retraso progresivo para efecto fade
            /*setTimeout(() => {
                div.classList.add('visible');
            }, index * 150); // cada liga 150ms después de la anterior*/
            fragment.appendChild(div);
        };
        container.appendChild(fragment);
    return;
}