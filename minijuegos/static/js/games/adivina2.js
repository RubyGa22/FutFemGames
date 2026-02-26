import { updateRacha, obtenerUltimaRespuesta } from "/static/usuarios/js/rachas.js";
import { handleAutocompletePlayer, cargarJugadoraDatos } from "/static/futfem/js/jugadora.js";
import { Ganaste, crearPopupInicialJuego } from "./funciones-comunes.js";
import { victory } from "../sounds.js";

const texto = 'Guess Player" es un juego de trivia en el que los jugadores deben adivinar el nombre de una jugadora de fútbol basándose en los equipos en los que ha jugado a lo largo de su carrera. El juego presenta una serie de pistas sobre los clubes y selecciones nacionales en los que la jugadora ha jugado, y el objetivo es identificar correctamente a la jugadora lo más rápido posible. A medida que avanzas, las pistas se hacen más desafiantes y los jugadores deben demostrar su conocimiento sobre el fútbol femenino y sus estrellas. ¡Pon a prueba tus conocimientos y compite para ver quién adivina más jugadoras correctamente!';
const imagen = '/static/img/ComingSoon.png';
const btn = document.getElementById('botonVerificar');
const div = document.getElementById('game-results');
const vidasContainer = document.getElementById('vidas');
const input = document.getElementById('jugadoraInput');
// Añadir el evento de input al campo de texto
input.addEventListener('input', debounce(handleAutocompletePlayer, 300)); // Debounce de 300ms

let jugadora;
let answer;
let vidas = 10;
let jugadoraId;
let jugadorasProhibidas = [];

async function iniciar(dificultad) {
    
    btn.addEventListener('click', verificar); // Habilitar el botón al iniciar el juego
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    const ultima = await obtenerUltimaRespuesta(3);
    const ultimaObj = JSON.parse(ultima); 
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    let jugadoraid = await fetchData(3);
    //jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    jugadora = jugadoraid.idJugadora;
    localStorage.setItem('res3', jugadora);
    vidasContainer.textContent = 'Vidas restantes: '+vidas;

     if(ultimaObj.answer === jugadoraId){
        console.log('Se ha guardado la respuesta'); 
        localStorage.setItem('Attr3', ultima);
    }

    if(ultimaObj.answer === 'loss'+jugadoraId){
        console.log('Se ha guardado la perdida'); 
        localStorage.setItem('Attr3', ultima);
    }

    let userAnswer = JSON.parse(localStorage.getItem('Attr3')) || [];
    let userRes = null;
    
    if(userAnswer){
        userRes = userAnswer.answer || null;
        console.log(userRes)
    }

    // Verificar si el usuario ha ganado
    jugadora = await cargarJugadoraDatos(jugadoraId, false);
    await colocarAciertos();
    const isAnswerTrue = (jugadoraId === userRes);
    if(isAnswerTrue) {
        //stopCounter("Guess Player");
        console.log('ganaste')
        Ganaste('Guess Player');
        //document.getElementById('result').textContent = name[0].Nombre_Completo;    
    }else{

        if (!userRes || userRes.trim() === '') {
            console.log("El usuario no ha respondido aún.");
            return; // Esperar a que el usuario responda
        }else if (userRes === 'loss'+jugadoraId) {
            await adivinaJugadoraPerder();
        } else {
            //await adivinaJugadoraPerder();
        }
    }
}

play().then(r => r);
async function play() {
    let jugadora = await fetchData(3);
    jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    const res = localStorage.getItem('res3');
    if(res !== jugadoraId || !res){
        localStorage.removeItem('Attr3');
        jugadorasProhibidas.pop()
        crearPopupInicialJuego('Guess Player', texto, imagen, '', iniciar);
    } else {
        await iniciar('');
    }
}

async function verificar(){
    if(vidas===0){
        updateRacha(3, 0, localStorage.getItem('Attr3'))
    }
    // 1. Validar entrada
    const nombreJugadora = validarEntrada();
    if (!nombreJugadora) return;

    const jugadoraAnswer = await obtenerJugadora(nombreJugadora)
    const edad = compararMayorMenorIgual(jugadora.edad, jugadoraAnswer.edad, "edad")
    const altura = compararMayorMenorIgual(jugadora.altura, jugadoraAnswer.altura, "altura");
    const equipo = compararIgualONo(jugadora.equipo, jugadoraAnswer.equipo, "equipo");
    const pais = compararIgualONo(jugadora.pais, jugadoraAnswer.pais, "pais");
    const pie = compararIgualONo(jugadora.pie, jugadoraAnswer.pie, "pie");
    const posicion = compararIgualONo(jugadora.posicionObj, jugadoraAnswer.posicionObj, "posicion");
    jugadoraAnswer.pie = pie
    jugadoraAnswer.edad = edad
    jugadoraAnswer.altura = altura
    jugadoraAnswer.equipo = equipo
    jugadoraAnswer.pais = pais
    jugadoraAnswer.posicion = posicion
    

    displayRespuesta(jugadoraAnswer)
    gestionarAciertos(nombreJugadora)
    if(nombreJugadora === jugadoraId){
        victory.play()
        updateRacha(3, 1, localStorage.getItem('Attr3'))
    }else{
        vidas--;
        vidasContainer.textContent = 'Vidas restantes: '+vidas;
        if(vidas===0){
            //ponerBanderas()
            console.log('perdiste')
        }
    }


}

    function validarEntrada() {
        input.value = "";
        const nombreJugadora = input.getAttribute('data-id');

        if (!nombreJugadora) {
            alert("Por favor, introduce el nombre de la jugadora.");
            return null;
        }

        if (jugadorasProhibidas.includes(nombreJugadora)) {
            console.log(`La jugadora "${nombreJugadora}" está prohibida.`);
            return null;
        }

        return nombreJugadora;
    }

    async function obtenerJugadora(id){
        const jugadora = await cargarJugadoraDatos(id, false)
        return jugadora;
    }

    function displayRespuesta(jugadora){

        const template = document.getElementById("jugadora-template");
        const clone = template.content.cloneNode(true);
        const container = clone.querySelector(".jugadora-item");
        console.log(jugadora.id)

        jugadorasProhibidas.push(jugadora.id)

        clone.querySelector(".player-img").src = jugadora.imagen || "/static/img/predeterm.jpg";
        clone.querySelector(".equipo").classList.add(jugadora.equipo.res);
        clone.querySelector(".equipo-escudo").src = jugadora.equipo.equipo.escudo;
        clone.querySelector(".nombre").textContent = jugadora.nombre;
        clone.querySelector(".edad").classList.add(jugadora.edad.res);
        clone.querySelector(".edad-texto").textContent = jugadora.edad.edad;
        clone.querySelector(".pie").classList.add(jugadora.pie.res);
        clone.querySelector(".pie-texto").textContent = jugadora.pie.pie;
        clone.querySelector(".altura").classList.add(jugadora.altura.res);
        clone.querySelector(".altura-texto").textContent = jugadora.altura.altura+" cm";
        clone.querySelector(".fi").classList.add(`fi-${jugadora.pais_iso}`);
        clone.querySelector(".pais").classList.add(jugadora.pais.res);

        if (jugadora.nacionalidad?.iso) {
            clone.querySelector(".flag").classList.add(`fi-${jugadora.nacionalidad.iso.toLowerCase()}`);
        }
        clone.querySelector(".posicion").classList.add(jugadora.posicion.res);
        clone.querySelector(".posicion-texto").textContent = jugadora.posicion.posicion.abreviatura;

        div.prepend(clone);
    }

    function compararMayorMenorIgual(item1, item2, tipo){
        let res = { [tipo]:item2, "res": null }

        if(item1>item2){
            res.res = "mayor"
        }else if(item1<item2){
            res.res = "menor"
        }else{
            res.res = "igual"
        }
        return res;
    }

    function compararIgualONo(item1, item2, tipo){
        let res = { [tipo]:item2, "res": null }

        let e1 = item1;
        let e2 = item2;

        if (typeof item1 === "object" && item1) {
            e1 = item1.id
            e2 = item2.id
        }
        if(e1===e2){
            res.res = "igual"
        }else{
            res.res = "incorrecto"
        }
        return res;
    }

    async function colocarAciertos() {
        const storage = localStorage.getItem('Attr3');
        let gameState = storage ? JSON.parse(storage) : {
            jugadoras: [],
            vidas: vidas,
            answer: null
        };

        let jugadoras = gameState.jugadoras;
        vidasContainer.textContent = "Vidas restantes: "+gameState.vidas;

        for (const nombreJugadora of jugadoras) {
            const jugadoraAnswer = await obtenerJugadora(nombreJugadora);
            console.log(jugadora.posicionObj, jugadoraAnswer.posicionObj)

            const edad = compararMayorMenorIgual(jugadora.edad, jugadoraAnswer.edad, "edad");
            const altura = compararMayorMenorIgual(jugadora.altura, jugadoraAnswer.altura, "altura");
            const equipo = compararIgualONo(jugadora.equipo, jugadoraAnswer.equipo, "equipo");
            const pais = compararIgualONo(jugadora.pais, jugadoraAnswer.pais, "pais");
            const pie = compararIgualONo(jugadora.pie, jugadoraAnswer.pie, "pie");
            const posicion = compararIgualONo(jugadora.posicionObj, jugadoraAnswer.posicionObj, "posicion");

            jugadoraAnswer.pie = pie;
            jugadoraAnswer.edad = edad;
            jugadoraAnswer.altura = altura;
            jugadoraAnswer.equipo = equipo;
            jugadoraAnswer.pais = pais;
            jugadoraAnswer.posicion = posicion;

            displayRespuesta(jugadoraAnswer);
        }
    }


    function gestionarAciertos(idJugadora) {

        // Obtener objeto actual o crear estructura inicial
        let data = localStorage.getItem('Attr3');
        let gameState = data ? JSON.parse(data) : {
            jugadoras: [],
            vidas: vidas,
            answer: null
        };

        // Asegurar estructura correcta (por si había datos antiguos)
        if (!gameState.jugadoras) gameState.jugadoras = [];

        // Agregar jugadora al array
        gameState.jugadoras.push(idJugadora);

        // Actualizar vidas
        gameState.vidas = vidas;

        // Guardar respuesta
        if (idJugadora === jugadoraId) {
            gameState.answer = idJugadora;
        } else if(vidas === 0){
            gameState.answer = `loss+${idJugadora}`;
        }

        // Guardar en localStorage
        localStorage.setItem('Attr3', JSON.stringify(gameState));
    }

    async function adivinaJugadoraPerder() {
        // Bloquear el botón y el input
        const jugadora = await obtenerJugadora(jugadoraId);
    
        btn.disabled = true;
        input.disabled = true;
    
        //resultText.textContent = 'Has perdido, era: '+jugadora[0].Nombre_Completo;
        const jugadora_id = 'loss';
        localStorage.setItem('Attr3', jugadora_id);
        await loadJugadoraById(jugadoraId, true);
        // Agregar un delay de 2 segundos (2000 ms)
        if(localStorage.length>0){
            await updateRacha(3, 0, localStorage.getItem('Attr3'));
        }
        setTimeout(() => {
            cambiarImagenConFlip();
        }, 1000);
    }
