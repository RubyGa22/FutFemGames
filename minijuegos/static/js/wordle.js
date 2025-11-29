let answer = "";
let currentRow = 0;
const maxRows = 6;
async function ini() {
    let jugadora = await fetchData(2);
    console.log(jugadora)
    let answers = localStorage.getItem("Attr2");
    // Llamada a la API para obtener la palabra
    fetch(`../api/jugadora_apodo?id_jugadora=${jugadora.idJugadora}`)
        .then(response => response.json())
        .then(data => {
            answer = data.toLowerCase(); // Asigna la palabra obtenida a la variable 'answer'
            createBoard();
            updateActiveRow(); // Inicialmente habilitar solo la fila 0
        })
        .catch(error => {
            console.error('Error fetching word:', error);
            displayMessage('Error loading word.');
        });
}
ini();
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

function checkWord() {
    const guess = [];
    for (let i = 0; i < 5; i++) {
        const input = document.getElementById(`row-${currentRow}-tile-${i}`);
        guess.push(input.value.toLowerCase());
    }

    if (guess.join("") === answer) {
        displayMessage("¡Correcto! Has ganado.");
        colorTiles(guess);
        fillRowWithAnswer(); // Completar la fila con la respuesta
        lockAllRows(); // Bloquear todas las filas al ganar
    } else {
        colorTiles(guess);
        disableRowInputs(currentRow); // Desactivar la fila actual
        currentRow++;
        if (currentRow === maxRows) {
            displayMessage(`¡Has perdido! La palabra era: ${answer}.`);
            lockAllRows(); // Bloquear todas las filas al perder
        } else {
            updateActiveRow(); // Habilitar la siguiente fila
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
