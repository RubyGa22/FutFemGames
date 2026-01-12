let equipo;
let temporada;
let vidas;

let paises = [];
CrearAlineacion('433(3)');
function CrearAlineacion(formacion){
    let celdas=[];
    if(formacion==='433'){
      celdas=['c53','c41','c42','c44','c45','c32','c34','c22','c11','c13','c15'];
    }
    if(formacion==='433(4)'){
        celdas=['c53','c41','c42','c44','c45','c32','c34','c23','c11','c13','c15'];
    }
    if(formacion==='433(3)'){
        celdas=['c53','c41','c42','c44','c45','c33','c24','c22','c11','c13','c15'];
    }
    if(formacion==='442'){
        celdas=['c53','c41','c42','c44','c45','c21','c22','c24','c25','c12','c14'];
    }
    activarCeldas(celdas);
}


function activarCeldas(celdas) {
    // Iterar sobre el array de ids proporcionado
    celdas.forEach(id => {
        // Seleccionar la celda (td) con el id actual
        let celda = document.getElementById(id);

        // Crear un contenedor div para la imagen y el contenido de la celda
        let contenedor = document.createElement("div");

        // Crear la imagen
        let img = document.createElement("img");
        img.src = '../img/predeterm.jpg';

        // Crear el párrafo que contendrá el contenido original de la celda
        let parrafo = document.createElement("p");
        parrafo.innerHTML = celda.innerHTML; // Insertar el contenido original de la celda en el párrafo

        // Vaciar el contenido de la celda
        celda.innerHTML = '';

        // Añadir la imagen y el párrafo al contenedor
        contenedor.appendChild(img); // Primero la imagen
        contenedor.appendChild(parrafo); // Luego el párrafo

        // Insertar el contenedor en la celda
        celda.appendChild(contenedor);

        // Mostrar la celda si estaba oculta
        celda.classList.add('activado');
    });
}


async function iniciar(dificultad) {
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    const answer = localStorage.getItem('Attr7');
    paises = await paisesAll();
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }

    let equipoRes = await fetchData(7);
    equipo = equipoRes.equipo;
    temporada = equipoRes.temporada;

    switch (dificultad) {
        case "facil":
            vidas = 3;
            break;
        case "medio":
            vidas = 1;
            break;
        case "dificil":
            vidas = 1;
            break;
        default:
            segundos = localStorage.getItem('Guess Player'); // Valor por defecto si la dificultad no es válida
    }

    // Verificar si el usuario ha ganado
    const isAnswerTrue = (answer === equipo);
    if(isAnswerTrue) {
        await cargarEquipo(equipo, temporada, true);
        Ganaste('XI_Clubs');
        //document.getElementById('result').textContent = name[0].Nombre_Completo;    
    }else{
        await cargarEquipo(equipo, temporada, false);

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

async function cargarEquipo(equipoId, temporada) {

    let equipo;
    let jugadoras = [];
    const url = `../api/equiposxid?id[]=${equipoId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            equipo = data.success; // Asigna los datos de la jugadora obtenida a la variable 'player'
        })
        .catch(error => {
            console.error('Error fetching word:', error);
            // displayMessage('Error loading word.');
        });
    jugadoras = await sacarJugadoras(equipoId, temporada); console.log(jugadoras);

    for (let i = 0; i < jugadoras.length; i++) {
            await introducirJugadora(jugadoras[i]);
        }
}

async function sacarJugadoras(equipoId, temporada) {

    const url2 = `../api/jugadorasxequipo_temporada?equipo=${equipoId}&temporada=${temporada}`;

    try {
        const response = await fetch(url2);
        const data = await response.json();

        console.log(data.success);  
        return data.success;

    } catch (error) {
        console.error("Error fetching jugadoras:", error);
        return [];
    }
}


async function introducirJugadora(jugadora) {
    
        let pos = await obtenerPosicion(jugadora.id_jugadora);
        console.log(jugadora.id_jugadora, pos);
        let respos = verificarPosicion(pos);
        console.log(respos)
        if (respos) {
            console.log("Encontrado");
            await colocarImagen(respos, jugadora);
        } else {
            console.log("NO Encontrado");
        }
    
}


async function comprobarPaisEquipo(id) {
    let res = false; // Inicializar res como false por defecto
    const pais = await obtenerIdPais(id);
    const club = await obtenerEquipos(id);
    const clubes = club.reverse();
    const requisito = document.getElementById('requisito');

    // Verifica si existe el elemento 'requisito'
    if (!requisito) {
        console.error('El elemento con ID "requisito" no fue encontrado.');
        return res;
    }

    const img = requisito.querySelector('img'); // Selecciona la primera imagen dentro del elemento

    // Verifica si la imagen fue encontrada
    if (!img) {
        console.error('No se encontró ninguna imagen en el elemento "requisito".');
        return res;
    }

    console.log('Atributos de la imagen:', { alt: img.alt, className: img.className });

    // Comprobar el atributo 'alt' de la imagen
    if (img.alt === 'Pais') {
        console.log('Verificando país:', pais, 'con la clase:', img.className);
        if (img.className === 'pais' + pais) {
            res = true;
        } else {
            console.log('Clase de país no coincide.');
        }
    } else if (img.alt === 'Club') {
        console.log('Verificando equipo:', clubes[0]?.equipo, 'con la clase:', img.className);
        if (img.className === 'club' + clubes[0].equipo) {
            res = true;
        } else {
            console.log('Clase de equipo no coincide.');
        }
    } else {
        console.log('El alt de la imagen no es "Pais" ni "Equipo".');
    }

    return res; // Devolver res (true o false)
}


function verificarPosicion(posicion) {
    let res; // Array para almacenar celdas disponibles

    // Seleccionar todas las celdas con data-pos en lugar de clases numéricas
    const celdas = document.querySelectorAll(`td[data-pos="${posicion}"]`);
    for (const celda of celdas) {
        // Solo celdas activadas y no ocupadas
        if (celda.classList.contains('activado') && !celda.classList.contains('ocupado')) {
            const img = celda.querySelector('img');
            
            // Si no hay imagen o src vacío
            if (!img || img.src != '') {
                celda.classList.add('ocupado'); // marcar como ocupada
                return celda.id; // devolver la primera celda libre y detener bucle
            }
        }
    }

    // Si no hay ninguna celda libre
    return null;
}

async function colocarImagen(celdaId, data) {
    const td = document.getElementById(celdaId);

    if (celdaId.length > 1) {
       
    }
    if (!td) {
        console.warn(`No se encontró la celda con id ${celdaId}`);
        return;
    }

    // Verificar si ya hay imagen
    let img = td.querySelector('img');
    if (!img) {
        img = document.createElement('img');
        td.appendChild(img);
    }

    // Asignar imagen (base64 o predeterminada)
    img.src = data.imagen && data.imagen !== '' ? data.imagen : "/static/img/predeterm.jpg";
    img.alt = data.Apodo || `Jugador en fila ${celdaId}`;

    // Párrafo para el apodo
    let p = td.querySelector('p');
    if (!p) {
        p = document.createElement('p');
        td.appendChild(p);
    }
    p.textContent = data.Apodo || '';

    // Manejo de bandera como background
    if (data.Nacionalidad) {
        const pais = paises.find(p => p.id === data.Nacionalidad);
        if (pais && pais.bandera) {
            p.style.backgroundImage = `url(${pais.bandera})`;
            p.style.backgroundSize = 'cover';
            p.style.backgroundPosition = 'center';
            p.style.backgroundRepeat = 'no-repeat';
            p.style.backgroundColor = 'rgba(221,221,221,0.5)'; // tinte semitransparente
            p.style.backgroundBlendMode = 'multiply';
        }
    }
    console.log(`Imagen y apodo colocados en la celda ${celdaId}`);
}



const texto = 'Guess Player" es un juego de trivia en el que los jugadores deben adivinar el nombre de una jugadora de fútbol basándose en los equipos en los que ha jugado a lo largo de su carrera. El juego presenta una serie de pistas sobre los clubes y selecciones nacionales en los que la jugadora ha jugado, y el objetivo es identificar correctamente a la jugadora lo más rápido posible. A medida que avanzas, las pistas se hacen más desafiantes y los jugadores deben demostrar su conocimiento sobre el fútbol femenino y sus estrellas. ¡Pon a prueba tus conocimientos y compite para ver quién adivina más jugadoras correctamente!';
const imagen = '../img/ComingSoon.png';
play().then(r => r);
async function play() {
    let equipoRes = await fetchData(7);
    equipoId = equipoRes.equipo.toString(); // Convertir a string para comparación segura
    const res = localStorage.getItem('res7');
    if(res !== equipoId || !res){
        localStorage.removeItem('Attr7');
        crearPopupInicialJuego('XI_Clubs', texto, imagen);
    } else {
        await iniciar('');
    }
}





// A ordenar
async function obtenerIdPais(nombre) {
    try {
        // Realizar la solicitud fetch
        const response = await fetch(`../api/jugadora_pais?nombre=${encodeURIComponent(nombre)}`);

        // Verificar que la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        // Verificar si hubo un error en el JSON recibido
        if (data.error) {
            throw new Error(data.error);
        }

        // Comprobar si data es un array y contiene al menos un objeto
        if (Array.isArray(data) && data.length > 0 && data[0].Pais) {
            return parseInt(data[0].Pais, 10); // Convertir a entero
        } else if(data){
            return data;
        } else {
            console.warn('ID del país no proporcionado en la respuesta:', data);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el ID del país:', error);
        return null;
    }
}
