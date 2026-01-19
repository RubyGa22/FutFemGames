// Variables de Juego
let jugadoraId;
let nombreCompleto;

// Componentes html usados recurrentemente
let popup;
let resultText;
let trayectoriaDiv;
let myst;
let jugadoraInput;
let boton;
let answer;

import { fetchJugadoraTrayectoriaById } from "../api/jugadora.js";
import { updateRacha } from "../user/rachas.js";
// Función principal que controla el flujo de carga
async function iniciar(dificultad) {

    // Componentes html usados recurrentemente
    popup = document.getElementById('popup-ex');
    resultText =  document.getElementById('result');
    trayectoriaDiv = document.getElementById('trayectoria');
    myst = document.getElementById('jugadora');
    jugadoraInput = document.getElementById('jugadoraInput');
    boton = document.getElementById('botonVerificar');
    answer = localStorage.getItem('Attr1');
    const name = localStorage.getItem('nombre');
    const btn = document.getElementById('botonVerificar');
    
    if (btn) {
        btn.addEventListener('click', checkAnswer); // Habilitar el botón al iniciar el juego
    }
    
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    
    let jugadora = await fetchData(1);
    jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    localStorage.setItem('res1', jugadoraId);

    // Definir los segundos según la dificultad
    let segundos;
    switch (dificultad) {
        case "facil":
            segundos = 120;
            break;
        case "medio":
            segundos = 60;
            break;
        case "dificil":
            segundos = 30;
            break;
        default:
            segundos = localStorage.getItem('trayectoria'); // Valor por defecto si la dificultad no es válida
    }

    // Verificar si el usuario ha ganado
    const isAnswerTrue = (answer === jugadoraId);
    console.log('Has won:', isAnswerTrue);

    if (isAnswerTrue) {
        console.log("Deteniendo contador..."); // Verificar si llega aquí
        await loadJugadoraById(jugadoraId, true);
        stopCounter("trayectoria");  // ⬅️ Detenemos el temporizador si el usuario gana
        Ganaste('trayectoria');
        resultText.textContent = name;
    } else {
        await loadJugadoraById(jugadoraId, false);

        if (!answer || answer.trim() === '') {
            startCounter(segundos, "trayectoria", async () => {
                console.log("El contador llegó a 0. Ejecutando acción...");
                await trayectoriaPerder();
            });
        } else if (answer === 'loss') {
            await trayectoriaPerder();
        } else {
            startCounter(segundos, "trayectoria", async () => {
                console.log("El contador llegó a 0. Ejecutando acción...");
                await trayectoriaPerder();
            });
        }
    }
}

async function loadJugadoraById(id, ganaste) {
    const data = await fetchJugadoraTrayectoriaById(id);
    if (data.length > 0) {
        displayTrayectoria(data, ganaste);
    } else {
        console.warn('No se encontraron datos de trayectoria para la jugadora con ID:', id);
    }
}

function displayTrayectoria(data, acertaste) {
    trayectoriaDiv.setAttribute('Attr1', data[0].jugadora)
    trayectoriaDiv.innerHTML = ''; // Limpiar contenido previo

    const maxPerRow = 5;
    let currentRow;

    data.forEach((item, index) => {
        if (index % maxPerRow === 0) {
            currentRow = document.createElement('div');
            currentRow.classList.add('trayectoria-row');
            trayectoriaDiv.appendChild(currentRow);
        }

        const flipContainer = document.createElement('div');
        flipContainer.classList.add('flip-container');

        const flipper = document.createElement('div');
        flipper.classList.add('flipper');

        // Lado frontal
        const front = document.createElement('div');
        front.classList.add('front');

        if (item.escudo) {
            const escudoImg = document.createElement('img');
            escudoImg.src = item.escudo;
            escudoImg.alt = item.nombre;
            front.appendChild(escudoImg);

            const anyos = document.createElement('p');
            anyos.textContent = item.años;
            anyos.style.textAlign = 'center';
            front.appendChild(anyos);
        }else{
            const escudoImg = document.createElement('img');
            //escudoImg.src = "/static/img/predeterm.jpg";
            escudoImg.alt = item.nombre;
            front.appendChild(escudoImg);}

        flipper.appendChild(front);

        // Solo mostrar la parte trasera si el usuario ha ganado
        if (acertaste) {
            if (data.length > 0) {
                myst.src = data[0].ImagenJugadora; // Asignar imagen de jugadora
            }
            const back = document.createElement('div');
            back.classList.add('back');

            if (item.imagen) {
                const jugadoraImg = document.createElement('img');
                jugadoraImg.src = item.imagen;
                jugadoraImg.alt = 'Imagen de la Jugadora';
                back.appendChild(jugadoraImg);

                const anyos = document.createElement('p');
                anyos.textContent = item.años;
                anyos.style.textAlign = 'center';
                back.appendChild(anyos);

                flipper.appendChild(back);
            }else{
                const jugadoraImg = document.createElement('img');
                jugadoraImg.src = "/static/img/predeterm.jpg";
                jugadoraImg.alt = 'Imagen de la Jugadora';
                back.appendChild(jugadoraImg);

                const anyos = document.createElement('p');
                anyos.textContent = item.años;
                anyos.style.textAlign = 'center';
                back.appendChild(anyos);

                flipper.appendChild(back);
            }
        }

        flipContainer.appendChild(flipper);
        currentRow.appendChild(flipContainer);
    });
}

async function checkAnswer() {
    const nombreCompleto = jugadoraInput.value.trim();
    const idJugadora = jugadoraInput.getAttribute('data-id');

    if (!idJugadora) {
        console.warn('No se encontró data-id en el input.');
        return;
    }else if(trayectoriaDiv.getAttribute('Attr1')===idJugadora){
        if(!localStorage.getItem('Attr1')){
            await updateRacha(1, 1);
        }else{
            //await updateRacha(1, 1);
    }
        resultText.textContent = nombreCompleto;
        localStorage.setItem('Attr1', idJugadora);
        localStorage.setItem('nombre', nombreCompleto);

        await loadJugadoraById(idJugadora, true);
        stopCounter('trayectoria');
        Ganaste('trayectoria');
    }else{
        resultText.textContent = 'Sigue intentando!'
    }
}

async function trayectoriaPerder() {
    // Bloquear el botón y el input
    const jugadora = await sacarJugadora(jugadoraId);

    boton.disabled = true;
    jugadoraInput.disabled = true;

    //resultText.textContent = 'Has perdido, era: '+jugadora[0].Nombre_Completo;
    const jugadora_id = 'loss';
    localStorage.setItem('Attr1', jugadora_id);
    await loadJugadoraById(jugadoraId, true);
    // Agregar un delay de 2 segundos (2000 ms)
    if(localStorage.length>0){
        await updateRacha(1, 0);
    }
    setTimeout(() => {
        cambiarImagenConFlip();
    }, 1000);
}

const texto = 'Adivina la Jugadora de Fútbol es un juego de trivia donde debes identificar a una futbolista según los equipos en los que ha jugado. Usa las pistas, demuestra tu conocimiento y compite para ver quién acierta más.';
const imagen = '/static/img/trayectoria.jpg';
play().then(r => r);
async function play() {
    const lastAnswer= localStorage.getItem('Attr1');
    let jugadora = await fetchData(1);
    console.log(jugadora)
    jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    const res = localStorage.getItem('res1');
    if(res !== jugadoraId || !res){
        if(lastAnswer !== res || !lastAnswer){
            updateRacha(1, 0);
        }
        localStorage.removeItem('Attr1');
        crearPopupInicialJuego('Guess Trayectoria', texto, imagen, '', iniciar);
    } else {
        await iniciar('');
    }
}
