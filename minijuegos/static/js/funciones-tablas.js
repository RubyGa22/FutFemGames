//----------------------------------------------------------------------------------
//---------------Funciones para colocar banderas, clubes, edades--------------------
//----------------------------------------------------------------------------------
//------------------Poner Banderas--------------------------------------------------
function ponerBanderas(ids, posiciones) {
    // Generar la URL para obtener las banderas con IDs como parámetros de consulta
    const url = `../api/paisesxid?id[]=${ids.join('&id[]=')}`;
    console.log(`URL generada: ${url}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta recibida:", data);

            if (data.success && Array.isArray(data.success)) {
                // Comprobar que las posiciones proporcionadas son las correctas
                if (data.success.length !== posiciones.length) {
                    console.error("Error: La cantidad de posiciones no coincide con la cantidad de países recibidos.");
                    return;
                }

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(posiciones[index]);

                    if (th) {

                        th.innerHTML = ''; // Limpiar el contenido previo
                        const p = document.getElementById('nombre');
                        if(p){
                            p.textContent = pais.nombre;
                        }
                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        img.alt = "Pais";
                        img.src = pais.bandera;
                        img.id='logo';
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add('pais'+pais.pais);

                        // Añadir imagen y texto al elemento th
                        th.appendChild(img);
                    } else {
                        console.error(`Elemento con id ${posiciones[index]} no encontrado.`);
                    }
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}//f()
//--------------------Poner Clubes--------------------------------------------------
function ponerClubes(ids, posiciones) {
    const url = `../api/equiposxid?id[]=${ids.join('&id[]=')}`;
    console.log(`URL generada: ${url}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta recibida:", data);

            if (data.success && Array.isArray(data.success)) {
                // Comprobar que las posiciones proporcionadas son las correctas
                if (data.success.length !== posiciones.length) {
                    console.error("Error: La cantidad de posiciones no coincide con la cantidad de países recibidos.");
                    return;
                }

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(posiciones[index]);

                    if (th) {
                        const p = document.getElementById('nombre');
                        if(p){
                            p.textContent = pais.nombre;
                        }
                        th.innerHTML = ''; // Limpiar el contenido previo

                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        img.alt = "Club";
                        img.src = pais.escudo;
                        img.id='logo';
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add('club'+pais.club);

                        // Crear y configurar el texto (si se desea incluir)
                        /*
                        const text = document.createElement('p');
                        text.textContent = pais.nombre;
                        text.style.margin = "0";
                        */

                        // Añadir imagen y texto al elemento th
                        th.appendChild(img);
                        //th.appendChild(text);
                    } else {
                        console.error(`Elemento con id ${posiciones[index]} no encontrado.`);
                    }
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}//f()
//--------------------Poner Ligas---------------------------------------------------
function ponerLigas(ids, posiciones) {
    const url = `../api/ligasxid?id[]=${ids.join('&id[]=')}`;
    //console.log(`URL generada: ${url}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta recibida:", data);

            if (data.success && Array.isArray(data.success)) {
                // Comprobar que las posiciones proporcionadas son las correctas
                if (data.success.length !== posiciones.length) {
                    console.error("Error: La cantidad de posiciones no coincide con la cantidad de países recibidos.");
                    return;
                }

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(posiciones[index]);

                    if (th) {
                        const p = document.getElementById('nombre');
                        if(p){
                            p.textContent = pais.nombre;
                        }
                        th.innerHTML = ''; // Limpiar el contenido previo

                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        img.alt = "Liga";
                        img.src = pais.logo;
                        img.id='logo';
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add('liga'+pais.liga);

                        // Crear y configurar el texto (si se desea incluir)
                        /*
                        const text = document.createElement('p');
                        text.textContent = pais.nombre;
                        text.style.margin = "0";
                        */

                        // Añadir imagen y texto al elemento th
                        th.appendChild(img);
                        //th.appendChild(text);
                    } else {
                        console.error(`Elemento con id ${posiciones[index]} no encontrado.`);
                    }
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}//f()
//--------------------Poner Edades--------------------------------------------------
function ponerEdades(id1, id2, id3, rutaImagen1, rutaImagen2, rutaImagen3) {
    // Obtener las celdas por sus IDs
    const cell1 = document.getElementById(id1);
    const cell2 = document.getElementById(id2);
    const cell3 = document.getElementById(id3);

    // Limpiar el contenido previo en cada celda
    cell1.innerHTML = '';
    cell2.innerHTML = '';
    cell3.innerHTML = '';

    // Crear imágenes y asignarles la ruta, clase y alt correspondiente
    const img1 = document.createElement('img');
    img1.src = rutaImagen1;
    img1.classList.add('EdadMenor20');  // Clase para edad menor de 20
    img1.alt = 'Edad';  // Asignar atributo alt
    img1.style.width = '50px';

    const img2 = document.createElement('img');
    img2.src = rutaImagen2;
    img2.classList.add('EdadMayor30');  // Clase para edad 25
    img2.alt = 'Edad';  // Asignar atributo alt
    img2.style.width = '50px';

    const img3 = document.createElement('img');
    img3.src = rutaImagen3;
    img3.classList.add('EdadIgual25');  // Clase para edad 30
    img3.alt = 'Edad';  // Asignar atributo alt
    img3.style.width = '50px';

    // Insertar las imágenes en las celdas correspondientes
    cell1.appendChild(img1);
    cell2.appendChild(img2);
    cell3.appendChild(img3);
}//f()
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//---------------Funciones para verificar banderas, clubes, edades------------------
//----------------------------------------------------------------------------------
async function sacarJugadora(id) {
    try {
        const urlj = `../api/jugadoraxid?id=${encodeURIComponent(id)}`;

        const response = await fetch(urlj);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

            if (data !== null) {
                // Solo un resultado, no es necesario mostrar el modal
                return data;
            } else {
                // Múltiples resultados, mostrar el modal
                return null;
            }

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}
async function obtenerPosicion(id) {
    try {
        // Realizar la solicitud fetch
        const response = await fetch(`../api/posicionxjugadora?id=${encodeURIComponent(id)}`);

        // Verificar que la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();
        console.log("Respuesta del servidor:", data); // Ver el array completo

        // Asegurarse de que el dato devuelto es un array y contiene el campo 'Posicion'
        if (Array.isArray(data) && data.length > 0 && data[0].Posicion !== undefined) {
            const posicion = parseInt(data[0].Posicion); // Acceder al valor 'Posicion' del primer objeto
            if (isNaN(posicion)) {
                console.error('Error: la posición obtenida no es un número válido.');
                return null;
            }

            return posicion; // Devolver la posición como número
        } else {
            console.error('Error: La estructura de los datos recibidos no es la esperada.');
            return null;
        }

    } catch (error) {
        console.error('Error al obtener la posición de la jugadora:', error);
        return null; // En caso de error, devolver null
    }
}

function numeroAleatorioArray(valores) {
    // Generar un índice aleatorio basado en la longitud del array
    const indiceAleatorio = Math.floor(Math.random() * valores.length);

    // Devolver el valor correspondiente al índice aleatorio
    return valores[indiceAleatorio];
}

const resultDiv = document.getElementById('result');

function Ganaste(modo) {
    // Bloquear el botón y el input
    /*const boton = document.getElementById('botonVerificar');
    const input = document.getElementById('jugadoraInput');

    boton.disabled = true;
    input.disabled = true;*/

    // Guardar en localStorage que el usuario ha ganado
    localStorage.setItem('hasWon', 'true');
    //if(modo!=='grid') localStorage.setItem('nombre',resultDiv.textContent)
    // Llamar a la función que cambia la imagen con flip
    if(modo==='grid'){
    const input = document.querySelector('input');
    const result = document.getElementById('resultado');
    const button = document.querySelector('button');
    result.textContent = '¡Has Ganado!';
    button.disabled=true;
    input.disabled=true;
    }
    if(modo==='bingo'){
        const result = document.getElementById('resultado');
        const button = document.querySelector('.skip-button'); // usa querySelector
        result.textContent = '¡Has Ganado!';
        button.disabled=true;
        button.style.pointerEvents = 'none';
    }else if(modo==='trayectoria'){
        const div = document.getElementById('trayectoria');
        const jugadora_id = div.getAttribute('Attr1');
        localStorage.setItem('Attr1', jugadora_id);
        cambiarImagenConFlip();
    }else if(modo==='compañeras'){
        const div = document.getElementById('compañeras');
        const jugadora_id = div.getAttribute('Attr8');
        localStorage.setItem('Attr8', jugadora_id);
        cambiarImagenConFlip();
    }
}


function cambiarImagenConFlip() {
    // Seleccionar todos los contenedores de flip
    const flipContainers = document.querySelectorAll('.flip-container');

    flipContainers.forEach(container => {
        const imagenTrasera = container.querySelector('.back img');
        const imagenFrontal = container.querySelector('.front img');


        // Añadir la clase para empezar el volteo
        container.querySelector('.flipper').classList.add('flipping');

        // Opcional: Si deseas cambiar la imagen frontal a la misma que la trasera después del volteo
        setTimeout(() => {


        }, 600); // Ajusta el tiempo según la duración de tu animación
    });
}


async function handleAutocompletePlayer(event) {
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById("sugerencias");

    // Limpiar sugerencias previas
    suggestionsList.innerHTML = '';

    if (texto.length > 2) { // Solo si hay más de 2 caracteres
        const url = `../api/jugadoraxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();

            // Evitar duplicados
            const idsMostrados = new Set();

            results.forEach(jugadora => {
                const { id_jugadora, Nombre_Completo, imagen, Nacimiento } = jugadora;

                if (!idsMostrados.has(id_jugadora)) { // Verificar que no se haya mostrado este ID
                    idsMostrados.add(id_jugadora);

                    const listItem = document.createElement('li');
                    listItem.classList.add('suggestion-item');

                    listItem.innerHTML = `
                        <img src="${imagen}" alt="${Nombre_Completo}" class="jugadora-img">
                        <div class="jugadora-info">
                            <strong>${Nombre_Completo}</strong>
                            <p>Nacimiento: ${Nacimiento}</p>
                        </div>
                    `;

                    listItem.addEventListener('click', () => {
                        // Insertar el nombre en el input al hacer clic
                        input.value = Nombre_Completo;
                        input.setAttribute('data-id', id_jugadora);
                        suggestionsList.innerHTML = '';  // Limpiar las sugerencias
                        /*document.getElementById("jugadora_id").value = id_jugadora;
                        loadPlayerById(id_jugadora);  // Cargar los detalles de la jugadora*/
                    });

                    suggestionsList.appendChild(listItem);
                }
            });
        } catch (error) {
            console.error('Error al buscar la jugadora:', error);
        }
    }
}

// Función debounce para limitar las solicitudes
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

async function getSesion() {
    try {
        const respuesta = await fetch('../api/sesion/');
        if (!respuesta.ok) throw new Error('No se pudo obtener la sesión');

        const data = await respuesta.json();
        return data.id ?? null;
    } catch (error) {
        console.error("Error al obtener la sesión:", error);
        return null;
    }
}

async function obtenerRacha(juego) {
    try {
        let usuario = await getSesion();
        if (!usuario) {
            console.error("Error: No se pudo obtener el usuario de la sesión.");
            return null;
        }

        const url = `../api/juego_racha?juego=${juego}&user=${usuario}`;
        console.log("URL generada:", url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        displayRacha(data[0].Racha, data[0].Juego);
        return data ?? null;  // Devuelve `data` si existe, si no, `null`
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return null;
    }
}

async function updateRacha(juego, condicion) {
    let rachaActual;
    try {
        // Obtén el ID del usuario de la sesión
        let usuario = await getSesion();

        // Verificar la condición, si es 0, establecer la racha como 0
        if (condicion === 0) {
            rachaActual = 0;
        }else if(condicion === 2){
            rachaActual = await obtenerRacha(juego);
            rachaActual = rachaActual[0].Racha; // Asumimos que 'obtenerRacha' devuelve un array
        } else {
            // Si la condición no es 0, obtenemos la racha actual
            rachaActual = await obtenerRacha(juego);
            rachaActual = rachaActual[0].Racha; // Asumimos que 'obtenerRacha' devuelve un array
            rachaActual = rachaActual + 1;
        }

        // Crear una nueva instancia de FormData
        const formData = new FormData();

        // Agregar los datos al FormData
        formData.append('racha', rachaActual);
        formData.append('juego', juego);
        formData.append('user', parseInt(usuario, 10));  // Convertir usuario a entero

        console.log(formData); // Verificar el contenido del FormData (para debugging)

        // Realizamos el POST con fetch
        const response = await fetch('../api/juego_racha', {
            method: 'POST',
            body: formData // Usar FormData directamente
        });

        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error al actualizar la racha: ${response.statusText}`);
        }

        // Si la respuesta es exitosa, puedes hacer algo con los datos
        const responseData = await response.json();
        console.log('Racha actualizada:', responseData);
        return responseData;

    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return null;
    }
}


function displayRacha(racha, juego){
    const displayJuego = document.getElementById('racha-'+juego)
    if(racha === 0 || !racha){
        displayJuego.style.opacity = '0';
    }else{
        displayJuego.style.display = '100%';
        displayJuego.textContent = racha;
    }
}

let intervalos = {}; // Objeto para almacenar los intervalos

function startCounter(segundos, juego, onFinish) {
    let reloj = document.getElementById('reloj');

    // Limpiar cualquier intervalo previo asociado a este juego
    if (intervalos[juego]) clearInterval(intervalos[juego]);

    intervalos[juego] = setInterval(() => {
        reloj.textContent = segundos;

        if (segundos <= 0) {
            clearInterval(intervalos[juego]);
            delete intervalos[juego];
            console.log("Tiempo agotado");
            if (onFinish) onFinish();
        } else {
            localStorage.setItem(juego, segundos);
            segundos--;
            console.log(segundos);
        }
    }, 1000);
}

function stopCounter(juego) {
    if (intervalos[juego]) {
        clearInterval(intervalos[juego]); // Detiene el intervalo
        delete intervalos[juego]; // Elimina la referencia
        console.log(`Contador de ${juego} detenido`);
    } else {
        console.log(`No hay un contador en ejecución para ${juego}`);
    }
}

function crearPopupInicialJuego(titulo, explicacion, imagen) {
    // Crear el contenedor del popup
    const popup = document.createElement('div');
    popup.classList.add('popup-ex');
    popup.id = 'popup-ex';

    // Crear el contenedor de la explicación
    const explicar = document.createElement('div');
    explicar.classList.add('explicar');

    // Crear el contenedor de la imagen
    const imagenDiv = document.createElement('div');
    const imagenElemento = document.createElement('img');
    imagenElemento.src = imagen;
    imagenDiv.appendChild(imagenElemento);

    // Crear el contenedor de la explicación con el título y el texto
    const textoExplicacion = document.createElement('div');
    const tituloElemento = document.createElement('h2');
    tituloElemento.textContent = titulo;
    const parrafoExplicacion = document.createElement('p');
    parrafoExplicacion.textContent = explicacion;

    // Añadir el título y el párrafo a la sección de explicación
    popup.appendChild(tituloElemento);
    textoExplicacion.appendChild(parrafoExplicacion);

    // Añadir la imagen y la explicación al contenedor "explicar"
    explicar.appendChild(imagenDiv);
    explicar.appendChild(textoExplicacion);

    // Crear el contenedor de los botones de dificultad
    const selectorDificultad = document.createElement('div');
    selectorDificultad.classList.add('selector-dificultad');
    const textoSelectorDificultad = document.createElement('p');
    textoSelectorDificultad.textContent = 'Selecciona dificultad';
    const botonesSelectorDificultad = document.createElement('div');


    // Crear los botones de dificultad
    const botonFacil = document.createElement('button');
    botonFacil.textContent = 'Fácil';
    botonFacil.onclick = () => iniciar('facil');  // Usamos una función de flecha para pasar el parámetro 'facil'

    const botonMedio = document.createElement('button');
    botonMedio.textContent = 'Medio';
    botonMedio.onclick = () => iniciar('medio');  // Usamos una función de flecha para pasar el parámetro 'normal'

    const botonDificil = document.createElement('button');
    botonDificil.textContent = 'Difícil';
    botonDificil.onclick = () => iniciar('dificil');  // Usamos una función de flecha para pasar el parámetro 'dificil'


    // Añadir los botones al contenedor de dificultad
    selectorDificultad.appendChild(textoSelectorDificultad);
    botonesSelectorDificultad.appendChild(botonFacil);
    botonesSelectorDificultad.appendChild(botonMedio);
    botonesSelectorDificultad.appendChild(botonDificil);
    selectorDificultad.appendChild(botonesSelectorDificultad);

    // Añadir los contenedores de la explicación y los botones al popup
    popup.appendChild(explicar);
    popup.appendChild(selectorDificultad);

    // Añadir el popup al cuerpo del documento o a un contenedor específico
    document.body.appendChild(popup);
}



