import { fetchRandomPlayer } from '/static/futfem/js/jugadora.js'
import { animarContador, animarEntrada, animarSalida } from '/static/js/animations/higher_lower.js'
import { getDominantColors , rgbToRgba } from '/static/js/utils/color.thief.js'
const player1 = document.getElementById('option1');
const player2 = document.getElementById('option2');
const p2 = player2.querySelector('p');
player1.addEventListener('click', verificar);
player2.addEventListener('click', verificar);


let data1;
let data2;
let rachaActual=0;
let racha = 0;      // cuántas rondas lleva la jugadora actual
let currentChampionId = null; // id de la jugadora que está dominando

async function initGame() {
    data1 = await fetchRandomPlayer();
    data2 = await fetchRandomPlayer();

    // Evitar duplicados
    while (data1.id === data2.id) {
        data2 = await fetchRandomPlayer();
    }

    renderPlayer(player1, data1, false); // visible
    renderPlayer(player2, data2, true);  // ocultar valor
}

async function renderPlayer(container, data, hideValue) {
    let colors = []
    const img = container.querySelector('img');
    container.querySelector('h3').textContent = data.nombre;
    img.src = data.imagen;

    const p = container.querySelector('p');
    p.textContent = hideValue ? '' : data.market_value.toLocaleString() + " €";
    p.style.visibility = hideValue ? "hidden" : "visible";

    console.log(img)

    colors = await getDominantColors(img, 4)

    //container.style.backgroundImage = `url(${data.imagen})`
}

async function verificar(event){
    const pulsado = event.currentTarget;

    const valor1 = data1.market_value;
    const valor2 = data2.market_value;

    // Revelar el valor oculto de option2
    player2.querySelector('p').textContent = valor2.toLocaleString() + " €";
    player2.querySelector('p').style.visibility = "visible";

    await animarContador(p2, valor2, 1);

    let acierto = false;

    if (pulsado.id === "option1") {
        // Está diciendo que option1 >= option2
        acierto = valor1 >= valor2;
    } else {
        // Está diciendo que option2 >= option1
        acierto = valor2 >= valor1;
    }

    if (acierto) {
        console.log("Correcto");
        rachaActual++;
        console.log(rachaActual)
        siguienteRonda(pulsado.id);
    } else {
        console.log("Fallaste");
        finDelJuego();
    }
}

async function siguienteRonda(ganadoraId){

    player1.style.pointerEvents = "none";
    player2.style.pointerEvents = "none";

    let forzarCambio = false;

    // --- Determinar nueva campeona ---
    if (ganadoraId === "option1") {
        racha++;
        if (racha >= 2) {
            forzarCambio = true;
        }
    } else {
        // Gana la retadora
        data1 = data2;
        racha = 1;
    }

    // Si ha llegado al límite → forzar que la campeona sea la otra
    if (forzarCambio) {
        console.log("🔄 Límite alcanzado → se fuerza cambio");
        data1 = data2;
        racha = 1;
    }

    // --- Animar salida de la que se va ---
    await animarSalida(player2, "right");

    // --- Renderizar campeona en option1 ---
    renderPlayer(player1, data1, false);
    gsap.set(player1, { x: 0, autoAlpha: 1 });

    // --- Cargar nueva retadora ---
    let nuevaRetadora = await fetchRandomPlayer();
    while (nuevaRetadora.id === data1.id) {
        nuevaRetadora = await fetchRandomPlayer();
    }

    data2 = nuevaRetadora;
    renderPlayer(player2, data2, true);

    await animarEntrada(player2, "right");

    player1.style.pointerEvents = "auto";
    player2.style.pointerEvents = "auto";
}


function finDelJuego(){
    alert("Game Over");
}





initGame();