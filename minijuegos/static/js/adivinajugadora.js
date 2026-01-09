let jugadora;
let preguntas = 10;
let vidas = 3;
let player;
async function iniciar(dificultad) {
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    const answer = localStorage.getItem('Attr3');
    const name = await sacarJugadora(jugadoraId);
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    let jugadoraid = await fetchData(3);
    //jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    localStorage.setItem('res3', jugadora);
    jugadora = jugadoraid.idJugadora;

    // Definir los segundos según la dificultad
    let segundos;
    switch (dificultad) {
        case "facil":
            segundos = 90;
            break;
        case "medio":
            segundos = 60;
            break;
        case "dificil":
            segundos = 30;
            break;
        default:
            segundos = localStorage.getItem('Guess Player'); // Valor por defecto si la dificultad no es válida
    }

    // Verificar si el usuario ha ganado
    const isAnswerTrue = (answer === jugadoraId);
    if(isAnswerTrue) {
        await cargarJugadora(jugadoraId, true);
        stopCounter("Guess Player");
        Ganaste('Guess Player');
        document.getElementById('result').textContent = name[0].Nombre_Completo;    
    }else{
        await cargarJugadora(jugadoraId, false);

        if (!answer || answer.trim() === '') {
            startCounter(segundos, "Guess Player", async () => {
                console.log("El contador llegó a 0. Ejecutando acción...");
                await adivinaJugadoraPerder();
            });
        }else if (answer === 'loss') {
            await trayectoriaPerder();
        } else {
            startCounter(segundos, "Guess Player", async () => {
                console.log("El contador llegó a 0. Ejecutando acción...");
                await adivinaJugadoraPerder();
            });
        }
    }
}

let namePlayer = document.getElementById('player-name');
namePlayer.style.display = "none";
// let lifeLeft = document.getElementById('lifeLeft');
// lifeLeft.style.display = "none";

let tipoAsk = document.getElementById('pregunta');
let opciones = document.getElementById('opciones');

let inputEdad = document.getElementById('edad');
let resultEdad = document.getElementById('showAgeText');

resultEdad.textContent = `${inputEdad.value}`;

// Añade un event listener para detectar cambios en el input
inputEdad.addEventListener("input", (event) => {
    resultEdad.textContent = `${event.target.value}`;
});

// Añade un event listener para detectar cambios en el select
tipoAsk.addEventListener("change", (event) => {
    let tipo = parseInt(event.target.value);

    if (tipo === 5 || tipo === 6 || tipo === 7) {
        opciones.classList.add('oculto');
        inputEdad.parentElement.classList.remove('oculto');
    } else {
        cargarCombo(tipo);

        inputEdad.parentElement.classList.add('oculto');
        opciones.classList.remove('oculto');
    }
});

async function cargarJugadora(id) {
    // Llamada a la API para obtener la jugadora
    const url = `../api/jugadora_datos?id=${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            player = data.success; // Asigna los datos de la jugadora obtenida a la variable 'player'
        })
        .catch(error => {
            console.error('Error fetching word:', error);
            // displayMessage('Error loading word.');
        });
 }

function cargarCombo(tipo) {
    switch (tipo) {
        case 1:
        case 2:
            equipos();
            break;

        case 3:
            paises();
            break;

        case 4:
            posiciones();
            break;

        case 8:
        case 9:
            ligas();
            break;

        default:
            break;
    }
}

async function equipos() {
    fetch('../api/equiposall')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.success)) {
                empty(opciones); // Limpiar el contenido previo
                const option = document.createElement('option');
                option.text = "Seleccionar equipo";
                opciones.appendChild(option);

                data.success.forEach((equipo, index) => {
                    const option = document.createElement('option');
                    option.value = equipo.id;
                    option.text = equipo.nombre;

                    opciones.appendChild(option);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function ligas() {
    fetch('../api/ligasall')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.success)) {
                empty(opciones); // Limpiar el contenido previo
                const option = document.createElement('option');
                option.text = "Seleccionar liga";
                opciones.appendChild(option);

                data.success.forEach((liga, index) => {
                    const option = document.createElement('option');
                    option.value = liga.id;
                    option.text = liga.nombre;

                    opciones.appendChild(option);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function paises() {
    fetch('../api/paisesall')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.success)) {
                empty(opciones); // Limpiar el contenido previo
                const option = document.createElement('option');
                option.text = "Seleccionar país";
                opciones.appendChild(option);

                data.success.forEach((pais, index) => {
                    const option = document.createElement('option');
                    option.value = pais.id;
                    option.text = pais.nombre;

                    opciones.appendChild(option);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function posiciones() {
    fetch('../api/posicionesall')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.success)) {
                empty(opciones); // Limpiar el contenido previo
                const option = document.createElement('option');
                option.text = "Seleccionar posicion";
                opciones.appendChild(option);

                data.success.forEach((posicion, index) => {
                    const option = document.createElement('option');
                    option.value = posicion.id;
                    option.text = posicion.nombre;

                    opciones.appendChild(option);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function askQuestion() {
    if (preguntas > 0) {
        let tipo = parseInt(tipoAsk.value);

        //Comprobar que haya una pregunta
        if (tipo > 0) {
            let valor = "";
            if (tipo === 5 || tipo === 6 || tipo === 7) {
                valor = parseInt(inputEdad.value);
                id = valor;
            } else {
                let i = opciones.options.selectedIndex;
                valor = opciones.options[i].text;
                id = parseInt(opciones.value);
            }

            if (id > 0) {
                let itipo = tipoAsk.options.selectedIndex;
                let tipotxt = tipoAsk.options[itipo].text;
                let question = tipotxt.replace('___', valor);

                let answer = obtenerRespuesta(tipo, id);

                //Agregar la pregunta al panel con la respuesta
                let panel = document.getElementById('preguntas');
                panel.innerHTML += `<p> ${question} ${answer}</p>`;

                preguntas -= 1;

                //Actualizar el contador
                let questionsLeft = document.getElementById('questionsLeft');
                questionsLeft.innerHTML = `Te quedan ${preguntas} preguntas`;

                if (preguntas === 0) {
                    let askQuestion = document.getElementById('askQuestion');

                    tipoAsk.classList.add('oculto');
                    opciones.classList.add('oculto');
                    inputEdad.parentElement.classList.add('oculto');
                    askQuestion.classList.add('oculto');

                    let msgResultado = document.getElementById('msgResultado');
                    msgResultado.innerHTML = 'Debes escribir el nombre de la jugadora';
                }
            }
        }
    }
}

function obtenerRespuesta(tipo, valor) {
    let correct = '<span class="correct">Si</span>';
    let error = '<span class="error">No</span>';
    let respuesta = "";

    switch (tipo) {
        case 1:
            if (player.equipo === valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 2:
            if (player.equipos.includes(valor)) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 3:
            if (player.pais === valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 4:
            if (player.posicion === valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 5:
            if (player.edad === valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 6:
            if (player.edad >= valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 7:
            if (player.edad < valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 8:
            if (player.liga === valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 9:
            if (player.ligas.includes(valor)) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;
        default:
            break;
    }


    return respuesta;
}

async function validarJugadora() {
    if (vidas > 1) {
            const textoInput = document.getElementById('nombre');
            const texto = textoInput.value.trim();
            const idJugadora = textoInput.getAttribute('data-id');
            console.log(idJugadora)
            AdivinaJugadora(idJugadora);
            //empty(textoInput);
    } else {
        let idVida = "#vida" + vidas;
        let img = document.querySelector(idVida);
        img.classList.add('oculto');

        await adivinaJugadoraPerder();
        let imgPlayer = document.getElementById('player-image');
        imgPlayer.src = player.imagen;
        let namePlayer = document.getElementById('player-name');
        namePlayer.innerHTML = `Has perdido la jugadora era ${player.nombre}`;
        namePlayer.style.display = 'block';

        lifeLeft.innerHTML = "Te has quedado sin vidas";
        lifeLeft.style.display = "block";
    }
}


function empty(element) {
    element.innerHTML = "";
}

function AdivinaJugadora(idJugadora) {
    console.log(idJugadora)
    console.log(jugadora)
    if (jugadora === idJugadora) {
        let imgPlayer = document.getElementById('player-image');
        imgPlayer.src = player.imagen;

        namePlayer.innerHTML = player.nombre;

        lifeLeft.innerHTML = "Ehorabuena";
        lifeLeft.style.display = "block";
    } else {
        let idVida = "#vida" + vidas;
        let img = document.querySelector(idVida);
        img.classList.add('oculto');

        vidas -= 1;

        lifeLeft.innerHTML = `¡Respuesta equivocada! Te quedan ${vidas} intentos`;
        lifeLeft.style.display = "block";
    }

}

async function adivinaJugadoraPerder() {
    // Bloquear el botón y el input
    const boton = document.getElementById('botonVerificar');
    const input = document.getElementById('input');
    const resultDiv = document.getElementById('result');
    const jugadora = await sacarJugadora(jugadoraId);

    boton.disabled = true;
    input.disabled = true;

    resultDiv.textContent = 'Has perdido, era: '+jugadora[0].Nombre_Completo;
    const div = document.getElementById('trayectoria');
    const jugadora_id = 'loss';
    localStorage.setItem('Attr3', jugadora_id);
    await loadJugadoraById(jugadoraId, true);
    // Agregar un delay de 2 segundos (2000 ms)
    if(localStorage.length>0){
        await updateRacha(1, 0);
    }
    setTimeout(() => {
        cambiarImagenConFlip();
    }, 1000);
}

const texto = 'Guess Player" es un juego de trivia en el que los jugadores deben adivinar el nombre de una jugadora de fútbol basándose en los equipos en los que ha jugado a lo largo de su carrera. El juego presenta una serie de pistas sobre los clubes y selecciones nacionales en los que la jugadora ha jugado, y el objetivo es identificar correctamente a la jugadora lo más rápido posible. A medida que avanzas, las pistas se hacen más desafiantes y los jugadores deben demostrar su conocimiento sobre el fútbol femenino y sus estrellas. ¡Pon a prueba tus conocimientos y compite para ver quién adivina más jugadoras correctamente!';
const imagen = '../img/ComingSoon.png';
play().then(r => r);
async function play() {
    let jugadora = await fetchData(3);
    jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    const res = localStorage.getItem('res3');
    if(res !== jugadoraId || !res){
        localStorage.removeItem('Attr3');
        crearPopupInicialJuego('Guess Player', texto, imagen);
    } else {
        await iniciar('');
    }
}