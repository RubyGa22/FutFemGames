import { updateRacha } from "../user/rachas.js";

let answer = "";
let currentRow = 0;
let jugadora;
const maxRows = 6;
async function iniciar() {
    jugadora = await fetchData(2);
    localStorage.setItem('res2', jugadora.idJugadora);
    answer = jugadora.idJugadora;
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    let userAnswer = localStorage.getItem('Attr2');
    console.log('Respuesta del usuario:', answer);
    //let res = att[att.length - 1].guess;
    //console.log('Respuesta:', answer);
    // Verificar si el usuario ha ganado
    const isAnswerTrue = (userAnswer === answer);

    if (isAnswerTrue) {
        console.log("Deteniendo contador..."); // Verificar si llega aquí
        await loadJugadoraApodo(jugadora.idJugadora, true);
        localStorage.setItem('res2', jugadora.idJugadora);
        //stopCounter("wordle");  // ⬅️ Detenemos el temporizador si el usuario gana
        Ganaste('wordle');
        displayMessage("¡Correcto! Has ganado.");
    } else {
        await loadJugadoraApodo(jugadora.idJugadora, false);

        if (!userAnswer || userAnswer.trim() === '') {
            console.log("El usuario no ha respondido aún.");
            return; // Esperar a que el usuario responda

        } else if (userAnswer === 'loss') {
            console.log("El usuario ya ha perdido anteriormente.");
            await wordlePerder();
        } else {
            console.log("El usuario ha respondido incorrectamente.");
            await wordlePerder();
        }
    }   
}

async function loadJugadoraApodo(id, ganaste) {
    let answers = localStorage.getItem("Attr2");
    let intentosPrevios = answers ? JSON.parse(answers) : [];
        // Llamada a la API para obtener la palabra
    fetch(`../api/jugadora_apodo?id_jugadora=${id}`)
        .then(response => response.json())
        .then(data => {
            answer = data.toLowerCase(); // Asigna la palabra obtenida a la variable 'answer'
            createBoard();
            // Colocar respuestas anteriores si existen
            if (intentosPrevios.length > 0) {
                for (let i = 0; i < intentosPrevios.length; i++) {
                    colocarRespuestas(intentosPrevios[i].guess, intentosPrevios[i].result, i);
                }
            }else{
                updateActiveRow(); // Inicialmente habilitar solo la fila 0
            }
        })
        .catch(error => {
            console.error('Error fetching word:', error);
            displayMessage('Error loading word.');
        });
}

function createBoard() {
    const board = document.getElementById("board");
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < 5; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1; // Limitar a un solo carácter
            input.classList.add("tile");
            input.setAttribute("id", `row-${i}-tile-${j}`);
            input.addEventListener("input", handleInputChange); // Mover al siguiente input automáticamente
            input.addEventListener("keydown", handleKeyDown); // Manejar el retroceso
            board.appendChild(input);
        }
    }
}

function handleInputChange(event) {
    const input = event.target;
    const currentTileId = input.getAttribute("id");
    const [_, row, __, tile] = currentTileId.split("-");

    if (input.value.length === 1 && parseInt(tile) < 4) {
        const nextTile = document.getElementById(`row-${row}-tile-${parseInt(tile) + 1}`);
        nextTile.focus();
    } else if (input.value.length === 1 && parseInt(tile) === 4) {
        // Automatically check the word if on the last tile
        checkWord();
    }
}

function handleKeyDown(event) {
    const input = event.target;
    const currentTileId = input.getAttribute("id");
    const [_, row, __, tile] = currentTileId.split("-");

    if (event.key === "Backspace" && input.value.length === 0 && parseInt(tile) > 0) {
        // Move focus to the previous tile
        const previousTile = document.getElementById(`row-${row}-tile-${parseInt(tile) - 1}`);
        previousTile.focus();
    }
}

function quitarAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


async function checkWord() {
    const guess = [];
    for (let i = 0; i < 5; i++) {
        const input = document.getElementById(`row-${currentRow}-tile-${i}`);
        guess.push(input.value.toLowerCase());
    }

    const guessSanitized = quitarAcentos(guess.join(""));
    const answerSanitized = quitarAcentos(answer.toLowerCase());

    if (guessSanitized === answerSanitized) {
        displayMessage("¡Correcto! Has ganado.");
        if(localStorage.length>0){
            await updateRacha(2, 1);
            localStorage.setItem('Attr2', jugadora.idJugadora);
        }
        localStorage.setItem('hasWon2', jugadora.idJugadora);
        colorTiles(guess);
        fillRowWithAnswer();
        lockAllRows();
    } else {
        colorTiles(guess);
        disableRowInputs(currentRow);
        currentRow++;

        if (currentRow === maxRows) {
            displayMessage(`¡Has perdido! La palabra era: ${answer}.`);
            lockAllRows();
        } else {
            updateActiveRow();
        }
    }
}


function fillRowWithAnswer() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-tile-${i}`);
        tile.value = answer[i]; // Rellenar la respuesta en la fila
    }
}

function disableRowInputs(row) {
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.getElementById(`row-${i}-tile-${j}`);
            tile.disabled = i < row; // Desactivar todas las filas anteriores
        }
    }
}

function updateActiveRow() {
    // Habilitar la fila actual y deshabilitar las demás
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.getElementById(`row-${i}-tile-${j}`);
            tile.disabled = i !== currentRow; // Solo habilitar la fila actual
        }
    }
    if(currentRow >= maxRows) return; // Si ya se alcanzó el máximo de filas, no hacer nada
    const firstTile = document.getElementById(`row-${currentRow}-tile-0`);
    firstTile.focus(); // Mover el foco a la primera casilla de la fila activa
}

function colorTiles(guess) {
    const letterCount = {};
    const resultStates = []; // aquí guardamos correct/present/absent

    // Contar las letras en la palabra correcta
    for (let i = 0; i < answer.length; i++) {
        const letter = answer[i];
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    // Primero, marcar las letras correctas
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-tile-${i}`);
        const letter = guess[i];

        if (letter === answer[i]) {
            tile.classList.add("correct");
            resultStates[i] = "correct";
            letterCount[letter]--;
        }
    }

    // Luego, marcar las letras presentes
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-tile-${i}`);
        const letter = guess[i];

        if (letter !== answer[i] && answer.includes(letter) && letterCount[letter] > 0) {
            tile.classList.add("present");
            resultStates[i] = "present";
            letterCount[letter]--;
        } else if (!tile.classList.contains("correct")) {
            tile.classList.add("absent");
            resultStates[i] = "absent";
        }
    }
    saveWordleRow(guess, resultStates);
}

function displayMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
}

function lockAllRows() {
    // Bloquear todas las filas
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.getElementById(`row-${i}-tile-${j}`);
            tile.disabled = true;
        }
    }
}

//******************************************************************************************* 
// Funciones de Local Storage
//*******************************************************************************************
function saveWordleRow(guess, resultStates) {
    let data = localStorage.getItem("Attr2");

    // Si no existe, iniciar vacío
    let arr = data ? JSON.parse(data) : [];

    // Añadir entrada
    arr.push({
        guess: guess,     // letras
        result: resultStates        // correct/present/absent
    });

    // Guardar de vuelta
    localStorage.setItem("Attr2", JSON.stringify(arr));
}

function colocarRespuestas(palabra, results, row) {
    disableRowInputs(row);
    // Rellenar cada letra
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${row}-tile-${i}`);
      
        tile.value = palabra[i];
        tile.classList.add("filled");
        tile.disabled = true;

        // Aplicar el color correspondiente
        if (results[i] === "correct") tile.classList.add("correct");
        if (results[i] === "present") tile.classList.add("present");
        if (results[i] === "absent") tile.classList.add("absent");
    }
    currentRow = row + 1;
    updateActiveRow();
    
    if(localStorage.getItem('hasWon2')){
        lockAllRows();
    }
}

async function wordlePerder() {
    // Bloquear el botón y el input
    //lockAllRows();
    
    const resultDiv = document.getElementById('message');
    const jugadora = await sacarJugadora(jugadoraId);

    resultDiv.textContent = 'Has perdido, era: '+jugadora.Nombre_Completo;
    const div = document.getElementById('trayectoria');
    /*const jugadora_id = 'loss';
    localStorage.setItem('Attr2', jugadora_id);*/
    //await loadJugadoraById(jugadoraId, true);
    // Agregar un delay de 2 segundos (2000 ms)
    if(localStorage.length>0){
        await updateRacha(2, 0);
    }
    setTimeout(() => {
        cambiarImagenConFlip();
    }, 1000);
}


const texto = 'Adivina la Jugadora de Fútbol es un juego de trivia donde debes identificar a una futbolista según los equipos en los que ha jugado. Usa las pistas, demuestra tu conocimiento y compite para ver quién acierta más.';
const imagen = "static/img/wordle.png";
play().then(r => r);
async function play() {
    const lastAnswer= localStorage.getItem('Attr2');
    let jugadora = await fetchData(2);
    let jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    const res = localStorage.getItem('res2');
    if(res !== jugadoraId || !res){
        if(lastAnswer !== res || !lastAnswer){
            await updateRacha(2, 0);
        }
        localStorage.removeItem('Attr2');
        crearPopupInicialJuego('Wordle', texto, imagen, 'wordle', iniciar);
    } else {
        await iniciar();
    }
}
