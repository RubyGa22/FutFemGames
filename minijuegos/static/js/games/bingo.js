import { fetchJugadoraNacionalidadById, fetchJugadoraTrayectoriaById, fetchJugadoraPalmaresById } from "/static/futfem/js/jugadora.js";
import { updateRacha, obtenerUltimaRespuesta } from '/static/usuarios/js/rachas.js';
import { inicializarCounter, startCounter, stopCounter } from '../utils/counter.js'; 
import { victory, wrong, correct } from "../sounds.js";
import { ponerBanderas, ponerLigas, ponerClubes, ponerTrofeos, ponerEdades, crearPopupInicialJuego, Ganaste, calcularEdad } from "./funciones-comunes.js";

let idres, currentPlayerData, paises, equipos, ligas, trofeos, lastPlayer;
const texto = '¡Pon a prueba tu memoria en "Futfem Bingo"! En este juego recibirás jugadoras al azar y deberás colocarlas en las casillas de país, equipo o liga que coincidan con su trayectoria.\n' +
    'Cada jugadora tiene varias características, y tu objetivo es encajarla correctamente en el tablero.\n' +
    'Gana quien logre completar su tarjeta como en un bingo tradicional, ¡pero con fútbol femenino!\n';
const imagen = '/static/img/Bingo.png';


async function iniciar(dificultad) {
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    const btn = document.getElementsByClassName('skip-button')[0];
    lastPlayer = localStorage.getItem('last-player-bingo');

    if (btn) {
        btn.addEventListener('click', () => skipPlayer(paises, equipos, ligas, trofeos)); // Habilitar el botón al iniciar el juego
    }
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    let valor = await fetchData(6);
    paises = valor.paises;
    equipos = valor.equipos;
    ligas = valor.ligas;
    trofeos = valor.trofeos;
    idres = paises.map(String).concat(equipos.map(String), ligas.map(String), trofeos.map(String)).join('');

    const ultima = await obtenerUltimaRespuesta(6);
    let ultimaArray = JSON.parse(ultima);
    let usuarioAnswer = null;   // ← AQUÍ sí
    if(Array.isArray(ultimaArray)){usuarioAnswer = ultimaArray[ultimaArray.length - 1].answer || null;}

    if(usuarioAnswer === idres){
        console.log('Se ha guardado la respuesta'); 
        localStorage.setItem('Attr6', ultima);
    }
    
    if(usuarioAnswer === 'loss'+idres){
        console.log('Se ha guardado la perdida'); 
        localStorage.setItem('Attr6', ultima);
    }

    if (lastPlayer) {
        mostrarJugadora(JSON.parse(lastPlayer), paises, equipos, ligas, trofeos);
    }else{
        skipPlayer(paises, equipos, ligas, trofeos);
    }
    // Definir los segundos según la dificultad
    let segundos = inicializarCounter(180000000000000000000000000000000000000000000000000000000000, 120 , 60, 'bingo', dificultad);

    // Se ejecutan todas a la vez. El tiempo total es lo que tarde la más lenta.
    await Promise.all([
        ponerBanderas(paises, ["c21", "c32", "c33"]),
        ponerLigas(ligas, ["c13", "c34", "c23"]),
        ponerClubes(equipos, ["c12", "c14", "c31"]),
        ponerTrofeos(trofeos, ["c11"])
    ]);
    ponerEdades("c24", "c22", '/static/img/edades/mayor30.png', '/static/img/edades/igual25.png'); // Asigna imágenes basadas en las edades.
    localStorage.setItem('res6', idres);
             
    let userAnswer = JSON.parse(localStorage.getItem('Attr6')) || [];
    let userRes = null;
    if(userAnswer.length > 0){
        userRes = userAnswer[userAnswer.length - 1].answer || null;
    }
    const isAnswerTrue = (idres === userRes);

    setTimeout(async () => {
        //await pintarCeldas();
        await Promise.all([
            colocarAciertos(),   // Recupera el progreso guardado
            iniciarHoverFondos() // Activa los efectos visuales
        ]);
        //Asegurar que los <td> ya existen y están pintados 
        const celdas = comprobarFotosEnCeldas();
        console.log(celdas, userRes);
        if (/*isAnswerTrue &&*/ celdas) {
            console.log("Deteniendo contador..."); // Verificar si llega aquí
            stopCounter("bingo");  // ⬅️ Detenemos el temporizador si el usuario gana
            Ganaste('bingo');
        }
        else{
            initBingoEvents(paises, clubes, ligas, trofeos);
            if (!userRes || userRes.trim() === '') {
                startCounter(segundos, "bingo", async () => {
                    console.log("El contador llegó a 0. Ejecutando acción...");
                    await bingoPerder();
                });
            } else if (userRes === 'loss'+idres) {
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

play().then(r => r)
async function play() {
    let jugadora = await fetchData(6);
    let paises = [jugadora.paises[0], jugadora.paises[1], jugadora.paises[2]];
    let clubes = [jugadora.equipos[0], jugadora.equipos[1], jugadora.equipos[2]];
    let ligas = [jugadora.ligas[0], jugadora.ligas[1], jugadora.ligas[2]];
    let trofeos = [jugadora.trofeos[0]];
    idres = paises.map(String).concat(clubes.map(String), ligas.map(String), trofeos.map(String)).join('');
    const res = localStorage.getItem('res6');
    if(res !== idres || !res){
        localStorage.removeItem('Attr6');
        localStorage.removeItem('last-player-bingo');
        crearPopupInicialJuego('Futfem Bingo', texto, imagen, '', iniciar);
    } else {
        await iniciar('');
    }
}

function handleCellClick(cell, jugador) {
    const cellId = cell.id;
    const paisJugadora = jugador.pais;
    const trayectoria = jugador.trayectoria; // Array de nombres de equipos
    const trofeos = jugador.trofeos; // Array de trofeos
    let celdasLlenas = false;
    // Obtener la imagen dentro de la celda clicada
    const img = cell.querySelector('img');
    if (!img) {
        console.log("No hay imagen en esta celda.");
        return false;
    }

    const imgClass = img.className; // Obtener la clase de la imagen

    let hasMatch = false;

    // Verificar si es un país o un club según el atributo alt de la imagen
    if (img.className.toLowerCase().includes("pais")) {
        if (imgClass === `pais${paisJugadora.Pais}`) { // Compara con el campo de país del jugador
            //console.log("¡Coincidencia de país encontrada!");
            hasMatch = true;
        } else {
            console.log("No hay coincidencia de país.");
        }
    }
    if (img.className.toLowerCase().includes("liga")) {
        if (Array.isArray(jugador.liga)) { // Verificar que trayectoria sea un array
            const ligaMatch = jugador.liga.some(liga => `liga${liga}` === imgClass);

            if (ligaMatch) {
                console.log("¡Coincidencia de liga encontrada!");
                hasMatch = true;
            } else {
                console.log("No hay coincidencia de liga.");
            }
        } else {
            console.log("La trayectoria no es un array o está vacía.");
        }
    }
    if (img.className.toLowerCase().includes("club")) {
        if (Array.isArray(trayectoria)) { // Verificar que trayectoria sea un array
            const clubMatch = trayectoria.some(club => `club${club}` === imgClass);

            if (clubMatch) {
                console.log("¡Coincidencia de club encontrada!");
                hasMatch = true;
            } else {
                console.log("No hay coincidencia de club.");
            }
        } else {
            console.log("La trayectoria no es un array o está vacía.");
        }
    }
    if (img.className.toLowerCase().includes("trofeo")) {
        if (Array.isArray(trofeos.equipo && trofeos.equipo)) { // Verificar que trayectoria sea un array
            let trofeoMatch = false;
            let trofeosIndividuales = [];
            let trofeosEquipo = [];

            if(trofeos.individual){
                trofeos.individual.forEach(item => {
                    trofeosIndividuales.push(item);
                    
                });
            }
            
            if(trofeos.equipo){
                trofeos.equipo.forEach(item => {
                    if (Array.isArray(item.success)) {
                        trofeosEquipo.push(...item.success);
                    }
                });
            }

            if(img.id === 'jugadora'){
                trofeoMatch = trofeosIndividuales.some(trofeo => `trofeo${trofeo.id}` === imgClass);
            } else if(img.id === 'clubes'){
                trofeoMatch = trofeosEquipo.some(trofeo => `trofeo${trofeo.id}` === imgClass);
            }
            if (trofeoMatch) {
                console.log("¡Coincidencia de trofeo encontrada!");
                hasMatch = true;
            } else {
                console.log("No hay coincidencia de trofeo.");
            }
        } else {
            console.log("La trayectoria no es un array o está vacía.");
        }
    }
    if (img.className.toLowerCase().includes("edad")) {
        // Verificar si la clase contiene 'EdadMenor'
        const claseEdadMenor = Array.from(img.classList).find(cls => cls.startsWith('EdadMenor'));
        const claseEdadMayor = Array.from(img.classList).find(cls => cls.startsWith('EdadMayor'));
        const claseEdad = Array.from(img.classList).find(cls => cls.startsWith('EdadIgual'));
        if (claseEdadMenor) {
            // Extraer el número después de 'EdadMenor'
            const edadLimite = parseInt(claseEdadMenor.replace('EdadMenor', ''), 10);

            if (jugador.edad < edadLimite) {
                console.log(`¡Coincidencia de edad menor de ${edadLimite}!`);
                hasMatch = true;
            } else {
                console.log(`No hay coincidencia de edad menor de ${edadLimite}.`);
            }
        }
        if (claseEdadMayor) {
            // Extraer el número después de 'EdadMayor'
            const edadLimite = parseInt(claseEdadMayor.replace('EdadMayor', ''), 10);

            if (jugador.edad > edadLimite) {
                console.log(`¡Coincidencia de edad mayor de ${edadLimite}!`);
                hasMatch = true;
            } else {
                console.log(`No hay coincidencia de edad mayor de ${edadLimite}.`);
            }
        }
        // Si no es 'EdadMenor', verificar las otras clases de edad
        if (claseEdad) {
            // Extraer el número después de 'EdadMenor'
            const edadLimite = parseInt(claseEdad.replace('EdadIgual', ''), 10);

            if (jugador.edad === edadLimite) {
                console.log(`¡Coincidencia de edad igual a ${edadLimite}!`);
                hasMatch = true;
            } else {
                console.log(`No hay coincidencia de edad igual a ${edadLimite}.`);
            }
        }

    }
    if(hasMatch){
        bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
        gestionarAciertos(cellId, jugador.foto);
        correct.play();
        celdasLlenas = comprobarFotosEnCeldas();
    }
    if(celdasLlenas){
        stopCounter('bingo');
        victory.play();
        updateRacha(6, 1, localStorage.getItem('Attr6'));
        Ganaste('bingo');
    }
    return hasMatch;
}

let jugadorasCache = [];
let indexJugadora = 0;

function skipPlayer(paises, clubes, ligas, trofeos) {
    requestAnimationFrame(() => { iniciarHoverFondos(); });
    // Si ya hay jugadoras en caché y no se agotaron, mostrar la siguiente
    if (jugadorasCache.length > 0 && indexJugadora < jugadorasCache.length) {
        mostrarJugadora(jugadorasCache[indexJugadora++], paises, clubes, ligas, trofeos);
        return;
    }

    // Si no hay más jugadoras, volver a pedir al servidor
    indexJugadora = 0;
    jugadorasCache = [];

    const url = new URL('../api/jugadora_aleatoria', window.location.origin);
    if (paises.length > 0) paises.forEach(pais => url.searchParams.append('nacionalidades[]', pais));
    if (clubes.length > 0) clubes.forEach(club => url.searchParams.append('equipos[]', club));
    if (ligas.length > 0) ligas.forEach(liga => url.searchParams.append('ligas[]', liga));
    if (trofeos.length > 0) trofeos.forEach(trofeo => url.searchParams.append('trofeos[]', trofeo));

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
            mostrarJugadora(jugadorasCache[indexJugadora++], paises, clubes, ligas, trofeos);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
        });
}

// 2. Configura el evento de clic UNA SOLA VEZ al cargar el Bingo
function initBingoEvents(paises, clubes, ligas, trofeos) {
    const table = document.querySelector('table'); 
    
    table.addEventListener('click', function(event) {
        // Buscamos la celda TD más cercana al clic (por si pulsas el texto de dentro)
        const cell = event.target.closest('td');

        // Si el clic no fue en una celda, o no hay jugadora, o ya está marcada: ignorar
        if (!cell || !currentPlayerData || cell.classList.contains('correcto')) return;

        console.log("Celda detectada:", cell); // Para depurar

        // PASO CLAVE: Pasamos la 'cell' directamente, no el evento genérico
        let esAcierto = handleCellClick(cell, currentPlayerData);
        
        if (esAcierto) {
            cell.classList.add('correcto');
            // Sonido de acierto si tienes uno
            skipPlayer(paises, clubes, ligas, trofeos);
        } else {
            cell.classList.add('tremble');
            wrong.currentTime = 0;
            wrong.play();
            setTimeout(() => cell.classList.remove('tremble'), 500);
        }
    });
}


async function mostrarJugadora(jugadora, paises, clubes, ligas, trofeos) {

    document.getElementById("player-name").textContent = jugadora.nombre;
    const img = document.getElementById("player-image");
    localStorage.setItem('last-player-bingo', JSON.stringify(jugadora));
    img.src = (!jugadora.imagen) ? "/static/img/predeterm.jpg": jugadora.imagen;
    img.className = jugadora.id;

    const edad = calcularEdad(jugadora.Nacimiento);
    // En lugar de 3 awaits secuenciales, haz esto:
    const [pais, equipos, palmares] = await Promise.all([
        fetchJugadoraNacionalidadById(jugadora.id),
        fetchJugadoraTrayectoriaById(jugadora.id),
        fetchJugadoraPalmaresById(jugadora.id)
    ]);

    if (equipos && equipos.length > 0) {
        const nombresEquipos = equipos.map(e => e.equipo);
        const ligasEquipos = equipos.map(e => e.liga);
        currentPlayerData = {
            'pais': pais,
            'edad': edad,
            'trayectoria': nombresEquipos,
            'foto': jugadora.imagen,
            'liga': ligasEquipos,
            'trofeos': palmares
        };
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

    // Buscar imagen de fondo (la que ya estaba antes)
    const span = celda.querySelector('span');
    if (span) {
        span.classList.add('background-img');
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

    gsap.to(playerImg, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
    });
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
    if( retrievedGrid.length == 11){
        item.answer = idres
    }
    
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

async function bingoPerder() {
    // Bloquear el botón y el input
    const boton = document.querySelector('.skip-button');
    const resultDiv = document.getElementById('resultado');
    const celdas = document.querySelectorAll('td');
    celdas.disabled = true;
    boton.disabled = true;
    resultDiv.textContent = 'Has perdido';
    let grid = localStorage.getItem('Attr6');
    let retrievedGrid = grid ? JSON.parse(grid) : [];
    retrievedGrid[retrievedGrid.length - 1].answer = 'loss'+idres;
    // Guardar de nuevo 
    localStorage.setItem('Attr6', JSON.stringify(retrievedGrid));
    if(localStorage.length>0){
        await updateRacha(6, 0, localStorage.getItem('Attr6'));
    }
}