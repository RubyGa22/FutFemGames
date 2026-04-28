import { fetchJugadoraCompanyerasById, handleAutocompletePlayer, fetchJugadoraById } from "/static/futfem/js/jugadora.js";
import { updateRacha, obtenerUltimaRespuesta } from "/static/usuarios/js/rachas.js";
import { inicializarCounter, startCounter, stopCounter } from '../utils/counter.js'; 
import { Ganaste, crearPopupInicialJuego } from "./funciones-comunes.js";
import { cambiarImagenConFlip } from "/static/js/animations/generales.js";


let jugadoraId, jugadoraObj;
let currentRonda = 1;
// Añadir el evento de input al campo de texto
const textoInput = document.getElementById("jugadoraInput");
const imgJugadora = document.querySelector("#foto-jug .back img");
textoInput.addEventListener('input', debounce(handleAutocompletePlayer, 200)); // Debounce de 300ms

// Función principal que controla el flujo de carga
async function iniciar(dificultad) {
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    //const name = await sacarJugadora(jugadoraId);
    const ultima = await obtenerUltimaRespuesta(5);
    const ultimaObj = JSON.parse(ultima); 

    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    const btn = document.getElementById('botonVerificar');
    
    if (btn) {
        btn.addEventListener('click', checkJugadora); // Habilitar el botón al iniciar el juego
    }

    let jugadora = await fetchData(5);
    jugadoraId = jugadora.idJugadora;
    jugadoraObj = await fetchJugadoraById(jugadoraId);
    localStorage.setItem('res8', jugadoraId);

    if(ultimaObj.answer === jugadoraId){
        console.log('Se ha guardado la respuesta'); 
        localStorage.setItem('Attr8', ultima);
    }

    if(ultimaObj.answer === 'loss'+jugadoraId){
        console.log('Se ha guardado la perdida'); 
        localStorage.setItem('Attr8', ultima);
    }

    let userAnswer = JSON.parse(localStorage.getItem('Attr8')) || [];
    let userRes = null;
    
    if(userAnswer){
        userRes = userAnswer.answer || null;
        currentRonda = userAnswer.ronda || 1;
    }

    // Definir los segundos según la dificultad
    let segundos = inicializarCounter(1000000000000000000000, 60, 30, 'Futfem Relations', dificultad);

    const div = document.getElementById('compañeras');
    div.classList.add(`id-${jugadoraId}`);
    div.setAttribute('Attr8', jugadoraId);

    // Convertir el valor a booleano, ya que localStorage almacena todo como cadenas
    const isAnswerTrue = (userRes === jugadoraId);
    console.log('Has won:', isAnswerTrue);
    if (isAnswerTrue) {
        await loadCompanyerasJugadoraById(jugadoraId);
        console.log("Deteniendo contador..."); // Verificar si llega aquí
        currentRonda = 5;
        imgJugadora.src = jugadoraObj.Imagen;
        stopCounter("Futfem Relations");  // ⬅️ Detenemos el temporizador si el usuario gana
        Ganaste('compañeras');
    } else {
        await loadCompanyerasJugadoraById(jugadoraId);
        gestionarRespuesta();
        if (!userRes || userRes.trim() === '') {
            startCounter(segundos, "Futfem Relations", async () => {
                console.log("El contador llegó a 0. Ejecutando acción...");
                await companyerasPerder();
            });
        } else if (userRes === 'loss') {
            await companyerasPerder();
        } else {
            startCounter(segundos, "Futfem Relations", async () => {
                console.log("El contador llegó a 0. Ejecutando acción...");
                await companyerasPerder();
            });
        }
    }
}

async function loadCompanyerasJugadoraById(id) {

    const companyeras = await fetchJugadoraCompanyerasById(id, 5);
    console.log(companyeras);
    if (companyeras.length > 0) {
        displayCompanyeras(companyeras);
    } else {
        console.warn('No se encontraron datos de compañeras para la jugadora con ID:', id);
    }

}


function displayCompanyeras(data) {
    const compisDiv = document.getElementById('compañeras');
    compisDiv.innerHTML = ''; // Limpiar contenido previo
    data.forEach((item, index) => {
        // Crear el contenedor del flip
        const flipContainer = document.createElement('div');
        flipContainer.classList.add('flip-container');

        const flipper = document.createElement('div');
        flipper.classList.add('flipper');

        // Crear y añadir el lado frontal
        const front = document.createElement('div');
        front.classList.add('front');

        // Crear y añadir el lado trasero
        const back = document.createElement('div');
        back.classList.add('back');
        const jugadoraImg = document.createElement('img');
        const jugadoraMystery = document.createElement('img');
        jugadoraMystery.src = '/static/img/mystery.jpg';
        if (item.imagen) {
            
                jugadoraImg.src = item.imagen;            
                jugadoraImg.alt = 'Imagen de la Jugadora';
                
        }else{
           jugadoraImg.src = '/static/img/predeterm.jpg';
        }
        back.appendChild(jugadoraImg);
        front.appendChild(jugadoraMystery);
        flipper.appendChild(front);
        flipper.appendChild(back);
        flipContainer.appendChild(flipper);

        // Añadir el flipContainer al div hijo correspondiente
        compisDiv.appendChild(flipContainer);

    });
}

async function checkJugadora() {
    const textoInput = document.getElementById('jugadoraInput');
    const texto = textoInput.value.trim();
    const idJugadora = textoInput.getAttribute('data-id');
    const div = document.getElementById('compañeras');
    const idClass = `id-${idJugadora}`;
    const found = div.classList.contains(idClass);
    const resultDiv = document.getElementById('result');
    if (found) {
        gestionarAciertos(idJugadora);
        resultDiv.textContent = `${texto}`;
        //cambiarImagenConFlip();
        await updateRacha(5, 1, localStorage.getItem('Attr8'));
        Ganaste('compañeras');
        stopCounter("Futfem Relations");
    }else {
        cambiarImagenFlipRonda(div);
        gestionarAciertos(idJugadora);
    }


}

function cambiarImagenFlipRonda(div) {
    if(currentRonda>4){
        cambiarImagenConFlip();
        return;
    }
    // Seleccionar todos los contenedores de flip dentro del div pasado como parámetro
    const flipContainers = div.querySelectorAll('.flip-container');
    console.log(flipContainers.length);
    if (flipContainers.length === 0) return;

    // Obtener el contenedor actual basado en el índice
    const container = flipContainers[currentRonda];

    const imagenTrasera = container.querySelector('.back img');
    const imagenFrontal = container.querySelector('.front img');

    // Añadir la clase para empezar el volteo
    container.querySelector('.flipper').classList.add('flipping');


    // Opcional: Si deseas cambiar la imagen frontal a la misma que la trasera después del volteo
    setTimeout(() => {


    }, 600); // Ajusta el tiempo según la duración de tu animación
    console.log(currentRonda)
    // Incrementar el índice para la próxima llamada
    currentRonda = currentRonda + 1;
}

function gestionarAciertos(idJugadora) {

    // Obtener objeto actual o crear estructura inicial
    let data = localStorage.getItem('Attr8');
    let gameState = data ? JSON.parse(data) : {
        ronda: currentRonda,
        answer: null
    };

    // Actualizar vidas
    gameState.ronda = currentRonda;

    // Guardar respuesta
    if (idJugadora === jugadoraId) {
        gameState.answer = idJugadora;
    } else if(currentRonda > 5){
        gameState.answer = `loss`+jugadoraId;
    }

    // Guardar en localStorage
    localStorage.setItem('Attr8', JSON.stringify(gameState));
}

function gestionarRespuesta() {
    const div = document.getElementById('compañeras');
    const flipContainers = div.querySelectorAll('.flip-container');
    
    // Recorremos desde la 0 hasta la ronda donde se quedó el usuario
    for (let i = 0; i < currentRonda; i++) {
        if (flipContainers[i]) {
            const flipper = flipContainers[i].querySelector('.flipper');
            flipper.classList.add('flipping'); // Las dejamos ya volteadas
        }
    }
}

async function companyerasPerder() {
    // Bloquear el botón y el input
    const boton = document.getElementById('botonVerificar');
    const resultDiv = document.getElementById('result');
    imgJugadora.src = jugadoraObj.Imagen;

    boton.disabled = true;
    textoInput.disabled = true;

    // Agregar un delay de 2 segundos (2000 ms)
    if(localStorage.length>0){
        await updateRacha(5, 0, localStorage.getItem('Attr8'));
    }
    setTimeout(() => {
        cambiarImagenConFlip();
    }, 1000);
}

const texto = '"Futfem Relations" es un juego de trivia en el que los jugadores deben adivinar el nombre de una jugadora de fútbol basándose en los equipos en los que ha jugado a lo largo de su carrera. El juego presenta una serie de pistas sobre los clubes y selecciones nacionales en los que la jugadora ha jugado, y el objetivo es identificar correctamente a la jugadora lo más rápido posible. A medida que avanzas, las pistas se hacen más desafiantes y los jugadores deben demostrar su conocimiento sobre el fútbol femenino y sus estrellas. ¡Pon a prueba tus conocimientos y compite para ver quién adivina más jugadoras correctamente!';
const imagen = '/static/img/ComingSoon.webp';
play().then(r => r);
async function play() {
    const lastAnswer= localStorage.getItem('Attr8');
    let jugadora = await fetchData(5);
    jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    const res = localStorage.getItem('res8');
    if(res !== jugadoraId || !res){
        /*if(lastAnswer !== res || !lastAnswer){
            await updateRacha(5, 0);
        }*/
        localStorage.removeItem('Attr8');
        crearPopupInicialJuego('Futfem Relations', texto, imagen, '', iniciar);
    } else {
        await iniciar('');
    }
}