import {calcularEdad, fetchJugadoraTrayectoriaById, fetchJugadoraPalmaresById} from '../../../minijuegos/static/js/api/jugadora.js'; 
import {fetchEquipoById} from '../../../minijuegos/static/js/api/equipos.js'; 

    const mostrador = document.getElementById('mostrador-tarjetas');

    const jugadora = JSON.parse(mostrador.dataset.id);

    const edad = document.getElementById('edad');
    edad.textContent = jugadora.nacimiento + '(' + calcularEdad(jugadora.nacimiento) + ')'

    const trayectorias = await fetchJugadoraTrayectoriaById(jugadora.id)
    for(const trayectoria of trayectorias){
        const equipo = await fetchEquipoById(trayectoria.equipo);
        const tarjeta = document.createElement('div');

        // Si es el equipo 83 → vintage
        if (equipo[0].club === 83) {
            tarjeta.classList.add('vintage');
        }
        tarjeta.classList.add('glass');
        tarjeta.classList.add('tarjeta-jugadora')
        const imgSrc = trayectoria.imagen
        ? `/${trayectoria.imagen}`
        : jugadora.imagen;

        tarjeta.innerHTML = `
            <img class="imagen-jugadora" src="${imgSrc}" alt="${ jugadora.apodo }">

            <p class="nombre">{{ jugadora.Apodo }}</p>

            <div class="detalles">
                <div class="equipo-pais">
                <p>${jugadora.Posicion.abreviatura}</p>
                <img src="/${equipo[0].escudo}" alt="${equipo.nombre}">
                <img src="/{{ jugadora.Nacionalidad.bandera }}" alt="{{ jugadora.Nacionalidad.nombre }}">
                </div>
                <p>${trayectoria.años}</p>
            </div>
            
        `;

        const detalles = tarjeta.querySelector('.detalles');
        const nombre = tarjeta.querySelector('.nombre');

        if (detalles && nombre) {
            detalles.style.background = `
                linear-gradient(
                    to right,
                    ${equipo[0].color},
                    transparent
                )
            `;
            nombre.style.background = `
                linear-gradient(
                    to right,
                    ${equipo[0].color},
                    transparent
                )
            `;
        }


        mostrador.appendChild(tarjeta);
    }