let jugadoraId;

// Función principal que controla el flujo de carga
async function iniciar(dificultad) {
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    const name = await sacarJugadora(jugadoraId);
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    let jugadora = await fetchData(5);
    jugadoraId = jugadora.idJugadora;
    //jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    localStorage.setItem('res8', jugadoraId);

    const player = await getJugadora(jugadoraId);

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
            segundos = localStorage.getItem('Futfem Relations'); // Valor por defecto si la dificultad no es válida
    }
    const div = document.getElementById('compañeras');
    div.classList.add(`id-${jugadoraId}`);
    div.setAttribute('Attr8', jugadoraId);

    // Obtener el valor de localStorage
    const answer2 = localStorage.getItem('hasWon8');
    const nombre = localStorage.getItem('nombre');
    const answer = localStorage.getItem('Attr8');
    // Convertir el valor a booleano, ya que localStorage almacena todo como cadenas
    const isAnswerTrue = (answer === jugadoraId);
    console.log('Has won:', isAnswerTrue);
    if (isAnswerTrue) {
        await loadCompanyerasJugadoraById(jugadoraId);
        console.log("Deteniendo contador..."); // Verificar si llega aquí
        //await loadJugadoraById(jugadoraId, true);
        stopCounter("Futfem Relations");  // ⬅️ Detenemos el temporizador si el usuario gana
        Ganaste('compañeras');
        document.getElementById('result').textContent = name[0].Nombre_Completo;
    } else {
        await loadCompanyerasJugadoraById(jugadoraId);
        cambiarImagenFlipRonda(div);
        if (!answer || answer.trim() === '') {
            startCounter(segundos, "Futfem Relations", async () => {
                console.log("El contador llegó a 0. Ejecutando acción...");
                await companyerasPerder();
            });
        } else if (answer === 'loss') {
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
    try {
        const response = await fetch(`../api/jugadora_companyeras?id_jugadora=${id}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (Array.isArray(data) && data.length > 0) {
            displayCompanyeras(data);
        } else {
            console.warn('No hay datos de la jugadora disponibles.');
        }
    } catch (error) {
        console.error('Error al cargar la jugadora:', error);
        document.getElementById('result').textContent = 'Error al cargar los datos.';
    }
}
async function getJugadora(id) {
    try {
        const response = await fetch(`../api/jugadora_datos?id=${id}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (data) {
            const mystery = document.getElementById('jugadora');
            mystery.src = data['success'].imagen;
            return data;
        } else {
            console.warn('No hay datos de la jugadora disponibles.');
        }
    } catch (error) {
        console.error('Error al cargar la jugadora:', error);
        document.getElementById('result').textContent = 'Error al cargar los datos.';
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

        /*if (item.escudo) {
            const escudoImg = document.createElement('img');
            escudoImg.src = item.escudo;
            escudoImg.alt = item.nombre;
            front.appendChild(escudoImg);

            // Crear y añadir el texto de los años
            const anyos = document.createElement('p');
            anyos.textContent = item.años;
            anyos.style.textAlign = 'center'; // Centrar el texto debajo del escudo
            front.appendChild(anyos);
        }*/

        // Crear y añadir el lado trasero
        const back = document.createElement('div');
        back.classList.add('back');

        if (item.imagen) {
            const jugadoraImg = document.createElement('img');
            jugadoraImg.src = item.imagen;
            jugadoraImg.alt = 'Imagen de la Jugadora';
            back.appendChild(jugadoraImg);
        }

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
        resultDiv.textContent = `${texto}`;
        //cambiarImagenConFlip();
        Ganaste('compañeras');
    }else {
        cambiarImagenFlipRonda(div);
    }
}

let currentIndex = 0;

function cambiarImagenFlipRonda(div) {
    if(currentIndex>4){
        cambiarImagenConFlip();
        localStorage.setItem('Attr8', jugadoraId);
        localStorage.setItem('hasWon8', null);
        return;
    }
    // Seleccionar todos los contenedores de flip dentro del div pasado como parámetro
    const flipContainers = div.querySelectorAll('.flip-container');
    console.log(flipContainers.length);
    if (flipContainers.length === 0) return;

    // Obtener el contenedor actual basado en el índice
    const container = flipContainers[currentIndex];

    const imagenTrasera = container.querySelector('.back img');
    const imagenFrontal = container.querySelector('.front img');

    // Añadir la clase para empezar el volteo
    container.querySelector('.flipper').classList.add('flipping');


    // Opcional: Si deseas cambiar la imagen frontal a la misma que la trasera después del volteo
    setTimeout(() => {


    }, 600); // Ajusta el tiempo según la duración de tu animación
    console.log(currentIndex)
    // Incrementar el índice para la próxima llamada
    currentIndex = currentIndex + 1;
}

async function companyerasPerder() {
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
    //await loadJugadoraById(jugadoraId, true);
    // Agregar un delay de 2 segundos (2000 ms)
    if(localStorage.length>0){
        await updateRacha(1, 0);
    }
    setTimeout(() => {
        cambiarImagenConFlip();
    }, 1000);
}

const texto = '"Futfem Relations" es un juego de trivia en el que los jugadores deben adivinar el nombre de una jugadora de fútbol basándose en los equipos en los que ha jugado a lo largo de su carrera. El juego presenta una serie de pistas sobre los clubes y selecciones nacionales en los que la jugadora ha jugado, y el objetivo es identificar correctamente a la jugadora lo más rápido posible. A medida que avanzas, las pistas se hacen más desafiantes y los jugadores deben demostrar su conocimiento sobre el fútbol femenino y sus estrellas. ¡Pon a prueba tus conocimientos y compite para ver quién adivina más jugadoras correctamente!';
const imagen = '../img/ComingSoon.png';
play().then(r => r);
async function play() {
    let jugadora = await fetchData(5);
    jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    const res = localStorage.getItem('res8');
    if(res !== jugadoraId || !res){
        localStorage.removeItem('Attr8');
        crearPopupInicialJuego('Futfem Relations', texto, imagen);
    } else {
        await iniciar('');
    }
}