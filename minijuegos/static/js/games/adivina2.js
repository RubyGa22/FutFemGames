import { updateRacha, obtenerUltimaRespuesta } from "/static/usuarios/js/rachas.js";

const texto = 'Guess Player" es un juego de trivia en el que los jugadores deben adivinar el nombre de una jugadora de fútbol basándose en los equipos en los que ha jugado a lo largo de su carrera. El juego presenta una serie de pistas sobre los clubes y selecciones nacionales en los que la jugadora ha jugado, y el objetivo es identificar correctamente a la jugadora lo más rápido posible. A medida que avanzas, las pistas se hacen más desafiantes y los jugadores deben demostrar su conocimiento sobre el fútbol femenino y sus estrellas. ¡Pon a prueba tus conocimientos y compite para ver quién adivina más jugadoras correctamente!';
const imagen = '/static/img/ComingSoon.png';
const btn = document.getElementById('botonVerificar');
const div = document.getElementById('game-results');
const vidasContainer = document.getElementById('vidas');
const input = document.getElementById('jugadoraInput');

let jugadora;
let answer;
let vidas = 10;
let jugadoraId;
let jugadorasProhibidas = [];

async function iniciar(dificultad) {
    
    btn.addEventListener('click', verificar); // Habilitar el botón al iniciar el juego
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    const ultima = await obtenerUltimaRespuesta(3);
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    let jugadoraid = await fetchData(3);
    //jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura
    jugadora = jugadoraid.idJugadora;
    localStorage.setItem('res3', jugadora);
    vidasContainer.textContent = 'Vidas restantes: '+vidas;

     if(ultima === jugadoraId){
        console.log('Se ha guardado la respuesta'); 
        localStorage.setItem('Attr3', ultima);
    }

    if(ultima === 'loss'+jugadoraId){
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
    jugadora = await cargarJugadora(jugadoraId, false);
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
            await adivinaJugadoraPerder();
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


async function cargarJugadora(id, ganaste){
    try {
        const url = `../api/jugadora_datos?id=${encodeURIComponent(id)}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        //console.log('Datos recibidos:', data);

            if (data !== null) {
                // Solo un resultado, no es necesario mostrar el modal
                //console.log(data.success)
                return data.success
            } else {
                // Múltiples resultados, mostrar el modal
                return null;
            }

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function verificar(){
    // 1. Validar entrada
    const nombreJugadora = validarEntrada();
    if (!nombreJugadora) return;

    const jugadoraAnswer = await obtenerJugadora(nombreJugadora)
    const edad = compararEdad(jugadora.edad, jugadoraAnswer.edad)
    const altura = compararAltura(jugadora.altura, jugadoraAnswer.altura);
    const equipo = compararEquipos(jugadora.equipo, jugadoraAnswer.equipo)
    const pais = compararPaises(jugadora.pais, jugadoraAnswer.pais)
    const pie = compararPies(jugadora.pie, jugadoraAnswer.pie)
    const posicion = compararPosiciones(jugadora.posicionObj, jugadoraAnswer.posicionObj)
    jugadoraAnswer.pie = pie
    jugadoraAnswer.edad = edad
    jugadoraAnswer.altura = altura
    jugadoraAnswer.equipo = equipo
    jugadoraAnswer.pais = pais
    jugadoraAnswer.posicion = posicion
    

    displayRespuesta(jugadoraAnswer)

    if(nombreJugadora === jugadoraId){
        updateRacha(3, 1, localStorage.getItem('Attr3'))
    }else{
        vidas--;
        vidasContainer.textContent = 'Vidas restantes: '+vidas;
        if(vidas===0){
            //ponerBanderas()
            console.log('perdiste')
        }
    }
    gestionarAciertos(nombreJugadora)

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
        const jugadora = await cargarJugadora(id, false)
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

    function compararEdad(edad1, edad2){
        let res = { "edad": edad2, "res": null }

        if(edad1>edad2){
            res.res = "mayor"
        }else if(edad1<edad2){
            res.res = "menor"
        }else{
            res.res = "igual"
        }
        return res;
    }

    function compararAltura(altura1, altura2){
        let res = { "altura": altura2, "res": null }

        if(altura1>altura2){
            res.res = "mayor"
        }else if(altura1<altura2){
            res.res = "menor"
        }else{
            res.res = "igual"
        }
        return res;
    }

    function compararEquipos(equipo1, equipo2){
        let res = { "equipo": equipo2, "res": null }

        let e1 = equipo1.id
        let e2 = equipo2.id

        if(e1===e2){
            res.res = "igual"
        }else{
            res.res = "incorrecto"
        }
        return res;
    }

    function compararPaises(pais1, pais2){
        let res = { "pais": pais2, "res": null }

        let e1 = pais1
        let e2 = pais2

        if(e1===e2){
            res.res = "igual"
        }else{
            res.res = "incorrecto"
        }
        return res;
    }

    function compararPosiciones(posicion1, posicion2){
        let res = { "posicion": posicion2, "res": null }

        let e1 = posicion1.id
        let e2 = posicion2.id

        if(e1===e2){
            res.res = "igual"
        }else{
            res.res = "incorrecto"
        }
        return res;
    }

    function compararPies(pie1, pie2){
        let res = { "pie": pie2, "res": null }

        if(pie1===pie2){
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

        for (const nombreJugadora of jugadoras) {
            const jugadoraAnswer = await obtenerJugadora(nombreJugadora);

            const edad = compararEdad(jugadora.edad, jugadoraAnswer.edad);
            const altura = compararAltura(jugadora.altura, jugadoraAnswer.altura);
            const equipo = compararEquipos(jugadora.equipo, jugadoraAnswer.equipo);
            const pais = compararPaises(jugadora.pais, jugadoraAnswer.pais);
            const pie = compararPies(jugadora.pie, jugadoraAnswer.pie);
            const posicion = compararPosiciones(jugadora.posicionObj, jugadoraAnswer.posicionObj);

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
