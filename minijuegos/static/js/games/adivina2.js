import { updateRacha, obtenerUltimaRespuesta } from "/static/usuarios/js/rachas.js";
import { handleAutocompletePlayer, cargarJugadoraDatos } from "/static/futfem/js/jugadora.js";
import { Ganaste, crearPopupInicialJuego } from "./funciones-comunes.js";
import { victory } from "../sounds.js";

const texto = 'Guess Player" es un juego de trivia en el que los jugadores deben adivinar el nombre de una jugadora de fútbol basándose en los equipos en los que ha jugado a lo largo de su carrera. El juego presenta una serie de pistas sobre los clubes y selecciones nacionales en los que la jugadora ha jugado, y el objetivo es identificar correctamente a la jugadora lo más rápido posible. A medida que avanzas, las pistas se hacen más desafiantes y los jugadores deben demostrar su conocimiento sobre el fútbol femenino y sus estrellas. ¡Pon a prueba tus conocimientos y compite para ver quién adivina más jugadoras correctamente!';
const imagen = '/static/img/ComingSoon.webp';
const btn = document.getElementById('botonVerificar');
const div = document.getElementById('game-results');
const vidasContainer = document.getElementById('vidas');
const input = document.getElementById('jugadoraInput');
// Añadir el evento de input al campo de texto
input.addEventListener('input', handleAutocompletePlayer); // Debounce de 300ms

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
    vidasContainer.textContent = gettext('Vidas restantes: ') + vidas;

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
    if(vidas<=0){
        updateRacha(3, 0, localStorage.getItem('Attr3'))
        return;
    }
    // 1. Validar entrada
    const nombreJugadora = validarEntrada();
    if (!nombreJugadora) return;

    const jugadoraAnswer = await obtenerJugadora(nombreJugadora)

    const stats = {
        edad: compararMayorMenorIgual(jugadora.edad, jugadoraAnswer.edad, "edad"),
        altura: compararMayorMenorIgual(jugadora.altura, jugadoraAnswer.altura, "altura"),
        equipo: compararIgualONo(jugadora.equipo, jugadoraAnswer.equipo, "equipo"),
        pais: compararIgualONo(jugadora.pais, jugadoraAnswer.pais, "pais"),
        pie: compararIgualONo(jugadora.pie, jugadoraAnswer.pie, "pie"),
        posicion: compararIgualONo(jugadora.Posiciones[0].id, jugadoraAnswer.Posiciones[0].id, "posicion")
    }

    Object.assign(jugadoraAnswer, stats);

    displayRespuesta(jugadoraAnswer)
    if(nombreJugadora === jugadoraId){
        victory.play()
        updateRacha(3, 1, localStorage.getItem('Attr3'))
    }else{
        vidas--;
        gestionarAciertos(nombreJugadora)
        vidasContainer.textContent = gettext('Vidas restantes: ') + vidas;
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

    function displayRespuesta(jugadora, insertarDirecto = true) {
        console.log(jugadora)   
        const template = document.getElementById("jugadora-template");
        const clone = template.content.cloneNode(true);
        
        // Side effect: registrar que esta jugadora ya salió
        if (!jugadorasProhibidas.includes(jugadora.id)) {
            jugadorasProhibidas.push(jugadora.id);
        }

        // Poblamos el clon (tu lógica impecable)
        clone.querySelector(".player-img").src = jugadora.imagen || "/static/img/predeterm.jpg";
        clone.querySelector(".equipo-escudo").src = jugadora.equipo?.equipo.escudo || "/static/img/predeterm.jpg";
        clone.querySelector(".nombre").textContent = jugadora.nombre_completo;
        
        // Clases de acierto/error y textos
        const campos = ['equipo', 'edad', 'pie', 'altura', 'pais', 'posicion'];
        campos.forEach(campo => {
            const el = clone.querySelector(`.${campo}`);
            if (el) {
                el.classList.add(jugadora[campo].res); // 'correct', 'partial', 'incorrect'
                
                // Lógica específica para textos si existen
                const txt = clone.querySelector(`.${campo}-texto`);
                if (txt) {
                    if (campo === 'altura') txt.textContent = `${jugadora.altura.altura} cm`;
                    else if (campo === 'posicion') txt.textContent = jugadora.Posiciones[0].abreviatura;
                    else txt.textContent = jugadora[campo][campo]; 
                }
            }
        });

        // Iconos de banderas
        const iso = jugadora.nacionalidad?.iso || jugadora.pais_iso;
        if (iso) {
            const flagEl = clone.querySelector(".fi") || clone.querySelector(".flag");
            if (flagEl) flagEl.classList.add(`fi-${iso[0].toLowerCase()}`);
        }

        // SI estamos cargando una sola (jugada actual)
        if (insertarDirecto) {
            const contenedorPrincipal = document.getElementById("game-results");
            contenedorPrincipal.prepend(clone);
        }

        // Devolvemos el clon por si queremos usarlo en un Fragment
        return clone;
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

        vidas = gameState.vidas;

        let jugadoras = gameState.jugadoras;
        vidasContainer.textContent = gettext("Vidas restantes: ") + gameState.vidas;

        try{

            // 1. LANZAMOS TODAS LAS PETICIONES AL MISMO TIEMPO
            // Map crea un array de promesas, y Promise.all las resuelve todas juntas
            const jugadorasData = await Promise.all(
                jugadoras.map(nombre => obtenerJugadora(nombre))
            );

            // 2. DOCUMENT FRAGMENT: Para no "machacar" el DOM en cada iteración
            const fragmento = document.createDocumentFragment();

            // 3. PROCESAMIENTO SÍNCRONO: 
            // Como ya tenemos todos los datos en respuestasJugadoras, 
            // el forEach aquí es instantáneo y seguro.
            jugadorasData.forEach(jugadoraAnswer => {
                console.log(jugadora.Posiciones[0], jugadoraAnswer.Posiciones[0])

                // Realizamos las comparaciones (que son síncronas)
                const stats = {
                    edad: compararMayorMenorIgual(jugadora.edad, jugadoraAnswer.edad, "edad"),
                    altura: compararMayorMenorIgual(jugadora.altura, jugadoraAnswer.altura, "altura"),
                    equipo: compararIgualONo(jugadora.equipo, jugadoraAnswer.equipo, "equipo"),
                    pais: compararIgualONo(jugadora.pais, jugadoraAnswer.pais, "pais"),
                    pie: compararIgualONo(jugadora.pie, jugadoraAnswer.pie, "pie"),
                    posicion: compararIgualONo(jugadora.Posiciones[0].id, jugadoraAnswer.Posiciones[0].id, "posicion")
                };

                // Inyectamos los resultados en el objeto
                Object.assign(jugadoraAnswer, stats);

                // Generamos el elemento visual y lo añadimos al fragmento
                // Nota: Aquí podrías usar tu función displayRespuesta adaptada para devolver un elemento
                const fila = displayRespuesta(jugadoraAnswer, false); 
                fragmento.prepend(fila);

            });

            // 4. UN SOLO PINTADO: El navegador solo trabaja una vez
            const contenedor = document.getElementById('game-results');
            contenedor.prepend(fragmento);
        }
        catch (error) {
            console.error("Error al cargar las jugadoras anteriores:", error);
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
