let intervalos = {}; // Objeto para almacenar los intervalos
import { countdown } from '../sounds.js'; // Asegúrate de que el nombre coincida
export function inicializarCounter(facil, medio, dificil, juego , dificultad){
        // Definir los segundos según la dificultad
    let segundos;
    switch (dificultad) {
        case "facil":
            segundos = facil;
            break;
        case "medio":
            segundos = medio;
            break;
        case "dificil":
            segundos = dificil;
            break;
        case "infinito":
            segundos = 86400;
        default:
            segundos = localStorage.getItem(juego); // Valor por defecto si la dificultad no es válida
    }

    return segundos;

}

export function startCounter(segundos, juego, onFinish) {
    let reloj = document.getElementById('reloj');

    // Limpiar cualquier intervalo previo asociado a este juego
    if (intervalos[juego]) clearInterval(intervalos[juego]);

    intervalos[juego] = setInterval(() => {
        reloj.textContent = segundos;

        // --- LÓGICA DEL SONIDO ---
        if (segundos > 0 && segundos<=30) {
            countdown.currentTime = 0; // Reinicia el audio para que suene en cada segundo
            countdown.play().catch(e => console.log("El usuario aún no ha interactuado con la web"));
            reloj.classList.remove('countdown-tick'); // Quitamos la clase del segundo anterior
            void reloj.offsetWidth;                    // fuerza al navegador a "renderizar"
            reloj.classList.add('countdown-tick');    // La volvemos a poner
        }

        if (segundos <= 0) {
            clearInterval(intervalos[juego]);
            delete intervalos[juego];
            console.log("Tiempo agotado");
            if (onFinish) onFinish();
        } else {
            localStorage.setItem(juego, segundos);
            segundos--;
        }
    }, 1000);
}

export function stopCounter(juego) {
    if (intervalos[juego]) {
        clearInterval(intervalos[juego]); // Detiene el intervalo
        delete intervalos[juego]; // Elimina la referencia
        console.log(`Contador de ${juego} detenido`);
        countdown.pause()
    } else {
        console.log(`No hay un contador en ejecución para ${juego}`);
    }
}