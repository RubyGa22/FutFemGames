import { fetchJugadoraNacionalidadById, fetchJugadoraTrayectoriaById } from "../api/jugadora.js";

let idres;
let paises, equipos, ligas;
let lastPlayer;
async function iniciar(dificultad) {
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    const answer = localStorage.getItem('Attr6');
    const btn = document.getElementsByClassName('skip-button')[0];
    lastPlayer = localStorage.getItem('last-player-bingo');

    if (btn) {
        btn.addEventListener('click', () => skipPlayer(paises, equipos, ligas)); // Habilitar el botón al iniciar el juego
    }
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    let valor = await fetchData(6);
    paises = valor.paises;
    equipos = valor.equipos;
    ligas = valor.ligas;
    idres = paises.map(String).concat(equipos.map(String), ligas.map(String)).join('');
    if (lastPlayer) {
        mostrarJugadora(JSON.parse(lastPlayer), paises, equipos, ligas);
    }else{
        skipPlayer(paises, equipos, ligas);
    }
    // Definir los segundos según la dificultad
    let segundos;
    switch (dificultad) {
        case "facil":
            segundos = 180;
            break;
        case "medio":
            segundos = 120;
            break;
        case "dificil":
            segundos = 60;
            break;
        default:
            segundos = localStorage.getItem('bingo'); // Valor por defecto si la dificultad no es válida
    }
    ponerBanderas(paises, ["c21", "c32", "c33"]); // Asigna banderas a ciertos países por su ID.
    ponerLigas(ligas, ["c13", "c34",'c23']); // Asigna ligas a los países por su ID.
    ponerClubes(equipos, ["c12", "c14", "c31"]); // Asigna clubes a los países.
    ponerEdades("c11", "c24", "c22", '../img/edades/menor20.png', '../img/edades/mayor30.png', '../img/edades/igual25.png'); // Asigna imágenes basadas en las edades.
    localStorage.setItem('res6', idres);

    setTimeout(async () => {
        await colocarAciertos();
        const celdas = comprobarFotosEnCeldas();
        console.log(celdas);
        if (celdas) {
            console.log("Deteniendo contador..."); // Verificar si llega aquí
            stopCounter("bingo");  // ⬅️ Detenemos el temporizador si el usuario gana
            Ganaste('bingo');
        }
        else{
            if (!answer || answer.trim() === '') {
                startCounter(segundos, "bingo", async () => {
                    console.log("El contador llegó a 0. Ejecutando acción...");
                    await bingoPerder();
                });
            } else if (answer === 'loss') {
                    await bingoPerder();
            } else {
                startCounter(segundos, "bingo", async () => {
                    console.log("El contador llegó a 0. Ejecutando acción...");
                    await bingoPerder();
                });
            }
        }
    }, 500); // espera 500m
}

function calcularEdad(fechaNacimiento) {
    const hoy = new Date(); // Fecha actual
    const nacimiento = new Date(fechaNacimiento); // Convertir la fecha de nacimiento a un objeto Date
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Calcular la diferencia de años
    const mes = hoy.getMonth() - nacimiento.getMonth(); // Calcular la diferencia de meses

    // Ajustar la edad si el cumpleaños de este año aún no ha ocurrido
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}
function handleCellClick(event, jugador) {
    const cell = event.currentTarget;
    console.log(cell.id);
    const cellId = cell.id;
    const paisJugadora = jugador.pais;
    console.log(jugador)
    // Obtener la imagen dentro de la celda clicada
    const img = event.currentTarget.querySelector('img');
    if (!img) {
        console.log("No hay imagen en esta celda.");
        return false;
    }

    const imgClass = img.className; // Obtener la clase de la imagen
    //console.log("Clase de la imagen:", imgClass);

    let hasMatch = false;

    // Verificar si es un país o un club según el atributo alt de la imagen
    if (img.className.toLowerCase().includes("pais")) {
        if (imgClass === `pais${paisJugadora.Pais}`) { // Compara con el campo de país del jugador
            //console.log("¡Coincidencia de país encontrada!");
            bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
            gestionarAciertos(cellId, jugador.foto);
            hasMatch = true;
        } else {
            console.log("No hay coincidencia de país.");
        }
    }
    if (img.className.toLowerCase().includes("Liga")) {
        if (Array.isArray(jugador.liga)) { // Verificar que trayectoria sea un array
            const ligaMatch = jugador.liga.some(liga => `liga${liga}` === imgClass);

            if (ligaMatch) {
                console.log("¡Coincidencia de liga encontrada!");
                bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                gestionarAciertos(cellId, jugador.foto);
                hasMatch = true;
            } else {
                console.log("No hay coincidencia de liga.");
            }
        } else {
            console.log("La trayectoria no es un array o está vacía.");
        }
    }


    if (img.className.toLowerCase().includes("Club")) {
        if (Array.isArray(jugador.trayectoria)) { // Verificar que trayectoria sea un array
            const clubMatch = jugador.trayectoria.some(club => `club${club}` === imgClass);

            if (clubMatch) {
                console.log("¡Coincidencia de club encontrada!");
                bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                gestionarAciertos(cellId, jugador.foto);
                hasMatch = true;
            } else {
                console.log("No hay coincidencia de club.");
            }
        } else {
            console.log("La trayectoria no es un array o está vacía.");
        }
    }
    if (img.className.toLowerCase().includes("Edad")) {
        // Verificar si la clase contiene 'EdadMenor'
        const claseEdadMenor = Array.from(img.classList).find(cls => cls.startsWith('EdadMenor'));
        const claseEdadMayor = Array.from(img.classList).find(cls => cls.startsWith('EdadMayor'));
        const claseEdad = Array.from(img.classList).find(cls => cls.startsWith('EdadIgual'));
        if (claseEdadMenor) {
            // Extraer el número después de 'EdadMenor'
            const edadLimite = parseInt(claseEdadMenor.replace('EdadMenor', ''), 10);

            if (jugador.edad < edadLimite) {
                console.log(`¡Coincidencia de edad menor de ${edadLimite}!`);
                bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                gestionarAciertos(cellId, jugador.foto);
                hasMatch = true;
            } else {
                console.log(`No hay coincidencia de edad menor de ${edadLimite}.`);
                hasMatch = false;
            }
        }
        if (claseEdadMayor) {
            // Extraer el número después de 'EdadMayor'
            const edadLimite = parseInt(claseEdadMayor.replace('EdadMayor', ''), 10);

            if (jugador.edad > edadLimite) {
                console.log(`¡Coincidencia de edad mayor de ${edadLimite}!`);
                bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                gestionarAciertos(cellId, jugador.foto)
                hasMatch = true;
            } else {
                console.log(`No hay coincidencia de edad mayor de ${edadLimite}.`);
                hasMatch = false;
            }
        }
        // Si no es 'EdadMenor', verificar las otras clases de edad
        if (claseEdad) {
            // Extraer el número después de 'EdadMenor'
            const edadLimite = parseInt(claseEdad.replace('EdadIgual', ''), 10);

            if (jugador.edad === edadLimite) {
                console.log(`¡Coincidencia de edad igual a ${edadLimite}!`);
                bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                gestionarAciertos(cellId, jugador.foto);
                hasMatch = true;
            } else {
                console.log(`No hay coincidencia de edad igual a ${edadLimite}.`);
                hasMatch = false;
            }
        }

    }
    return hasMatch;
}

let jugadorasCache = [];
let indexJugadora = 0;

function skipPlayer(paises, clubes, ligas) {
    // Si ya hay jugadoras en caché y no se agotaron, mostrar la siguiente
    if (jugadorasCache.length > 0 && indexJugadora < jugadorasCache.length) {
        mostrarJugadora(jugadorasCache[indexJugadora++], paises, clubes, ligas);
        return;
    }

    // Si no hay más jugadoras, volver a pedir al servidor
    indexJugadora = 0;
    jugadorasCache = [];

    const url = new URL('../api/jugadora_aleatoria', window.location.origin);
    if (paises.length > 0) paises.forEach(pais => url.searchParams.append('nacionalidades[]', pais));
    if (clubes.length > 0) clubes.forEach(club => url.searchParams.append('equipos[]', club));
    if (ligas.length > 0) ligas.forEach(liga => url.searchParams.append('ligas[]', liga));

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                console.warn('No se encontraron jugadoras.');
                return;
            }

            jugadorasCache = data;
            indexJugadora = 0;
            mostrarJugadora(jugadorasCache[indexJugadora++], paises, clubes, ligas);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
        });
}


async function mostrarJugadora(jugadora, paises, clubes, ligas) {
    document.getElementById("player-name").textContent = jugadora.nombre;
    const img = document.getElementById("player-image");
    localStorage.setItem('last-player-bingo', JSON.stringify(jugadora));
    img.src = (!jugadora.imagend)
        ? "/static/img/predeterm.jpg"
        : jugadora.imagen;
    img.className = jugadora.id;

    const edad = calcularEdad(jugadora.Nacimiento);
    const pais = await fetchJugadoraNacionalidadById(jugadora.id);
    const equipos = await fetchJugadoraTrayectoriaById(jugadora.id);
    console.log(pais)

    if (equipos && equipos.length > 0) {
        const nombresEquipos = equipos.map(e => e.equipo);
        const ligasEquipos = equipos.map(e => e.liga);
        let data = {
            'pais': pais,
            'edad': edad,
            'trayectoria': nombresEquipos,
            'foto': jugadora.imagen,
            'liga': ligasEquipos
        };

        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            let newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);

            newCell.addEventListener('click', function (event) {
                let click = handleCellClick(event, data);
                if (click) {
                    newCell.removeEventListener('click', handleCellClick);
                    skipPlayer(paises, clubes, ligas); // Avanza a la siguiente jugadora
                } else {
                    newCell.classList.add('tremble');
                    setTimeout(() => newCell.classList.remove('tremble'), 500);
                }
            });
        });
    } else {
        console.error('No se encontraron equipos para la jugadora:', jugadora.nombre);
    }
}


function bloquearCeldaEstilo(celda, jugadoraImagen) {
    if (!celda) {
        console.error("Celda no válida.");
        return;
    }

    // Añadir clase bloqueada y asegurar posición relativa
    celda.classList.add('blocked');
    celda.style.position = 'relative';

    // Buscar imagen de fondo (la que ya estaba antes)
    const backgroundImg = celda.querySelector('img:not(.player-imagen)');
    if (backgroundImg) {
        backgroundImg.classList.add('background-img');
    } else {
        console.warn('No se encontró una imagen de fondo en la celda. Se continuará de todas formas.');
    }

    // Verificar si ya existe una imagen de jugador para evitar duplicados
    const yaTieneJugador = celda.querySelector('img.player-imagen');
    if (yaTieneJugador) {
        console.log('La celda ya tiene una imagen de jugador. No se añade otra.');
        return;
    }

    // Crear y añadir la imagen del jugador
    const playerImg = document.createElement('img');
    playerImg.src = jugadoraImagen;
    playerImg.alt = 'Jugador';
    playerImg.classList.add('player-imagen');
    playerImg.style.zIndex = 3;
    playerImg.style.position = 'absolute';
    playerImg.style.opacity = 1;

    celda.appendChild(playerImg);
}
// Función para verificar si todas las celdas están bloqueadas

function comprobarFotosEnCeldas() {
    // Selecciona todas las celdas cuyo id empieza con 'c'
    const celdas = document.querySelectorAll('td[id^="c"]');

    let todasConDosFotos = true;

    celdas.forEach(celda => {
        // Obtiene todas las imágenes dentro de la celda
        const imagenes = celda.querySelectorAll('img');

        // Si la cantidad de imágenes no es exactamente 2, cambia la variable a false
        if (imagenes.length !== 2) {
            todasConDosFotos = false;
        }
    });

    return todasConDosFotos;
}



function gestionarAciertos(celda, foto) {
    let grid = localStorage.getItem('Attr6');

    // Asegurarse de que retrievedGrid es un array
    let retrievedGrid = grid ? JSON.parse(grid) : [];

    let item = { celda, foto };
    retrievedGrid.push(item); // Agregar el nuevo objeto

    // Guardar de nuevo en localStorage
    localStorage.setItem('Attr6', JSON.stringify(retrievedGrid));
}



async function colocarAciertos() {
    let grid = localStorage.getItem('Attr6');

    // Asegurarse de que retrievedGrid es un array
    let retrievedGrid = grid ? JSON.parse(grid) : [];
    const celdas = comprobarFotosEnCeldas();
    if(celdas){
        stopCounter('bingo');
        Ganaste('bingo');
    }

    // Verificar si retrievedGrid es un array (puede haber errores en la conversión)
    if (!Array.isArray(retrievedGrid)) {
        retrievedGrid = []; // Reiniciar como array vacío si no es un array válido
        localStorage.setItem('Attr6', JSON.stringify(retrievedGrid));
    } else {
        for (let i = 0; i < retrievedGrid.length; i++) {
            let celda = retrievedGrid[i].celda;
            let celdaObj = document.getElementById(celda);
            console.log(celdaObj)
            await bloquearCeldaEstilo(celdaObj, retrievedGrid[i].foto);
        }
    }
}

play().then(r => r)
async function play() {
    let jugadora = await fetchData(6);
    let paises = [jugadora.paises[0], jugadora.paises[1], jugadora.paises[2]];
    let clubes = [jugadora.equipos[0], jugadora.equipos[1], jugadora.equipos[2]];
    let ligas = [jugadora.ligas[0], jugadora.ligas[1], jugadora.ligas[2]];
    idres = paises.map(String).concat(clubes.map(String), ligas.map(String)).join('');
    const res = localStorage.getItem('res6');
    if(res !== idres || !res){
        localStorage.removeItem('Attr6');
        localStorage.removeItem('last-player-bingo');
        crearPopupInicialJuego('Futfem Bingo', texto, imagen, '', iniciar);
    } else {
        await iniciar('');
    }
}

async function bingoPerder() {
    // Bloquear el botón y el input
    const boton = document.querySelector('.skip-button');
    const resultDiv = document.getElementById('resultado');
    const celdas = document.querySelectorAll('td');
    celdas.disabled = true;
    boton.disabled = true;
    resultDiv.textContent = 'Has perdido';
    //const jugadora_id = 'loss';
    //localStorage.setItem('Attr6', jugadora_id);
    // Agregar un delay de 2 segundos (2000 ms)
    if(localStorage.length>0){
        //await updateRacha(1, 0);
    }
}


const texto = '¡Pon a prueba tu memoria en "Futfem Bingo"! En este juego recibirás jugadoras al azar y deberás colocarlas en las casillas de país, equipo o liga que coincidan con su trayectoria.\n' +
    'Cada jugadora tiene varias características, y tu objetivo es encajarla correctamente en el tablero.\n' +
    'Gana quien logre completar su tarjeta como en un bingo tradicional, ¡pero con fútbol femenino!\n';
const imagen = '../img/Captura de pantalla 2024-09-01 192457.png';