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
                        console.log(pais)
                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        const span = document.createElement('span');
                        span.classList.add(`fi`);
                        span.classList.add(`fi-${pais.iso}`);
                        span.style.fontSize = 'xx-large';
                        img.alt = pais.nombre;
                        img.src = '#';
                        img.id='logo';
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add('pais'+pais.pais);
                        img.style.display = 'none'

                        // Añadir imagen y texto al elemento th
                        th.appendChild(img);
                        th.appendChild(span);
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

                data.success.forEach((club, index) => {
                    const th = document.getElementById(posiciones[index]);

                    if (th) {
                        const p = document.getElementById('nombre');
                        if(p){
                            p.textContent = pais.nombre;
                        }
                        th.innerHTML = ''; // Limpiar el contenido previo

                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        img.alt = club.nombre;
                        img.src = club.escudo;
                        img.id='logo';
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add('club'+club.club);
                          // Aplicar degradado usando los colores de la BD
                        const colorPrimario = club.color || 'var(--color-primario)'; // fallback
                        const colorSecundario = club.colorSecundario || 'transparent'; // fallback
                        th.style.background = `
                            linear-gradient(
                                to bottom,
                                color-mix(in srgb, ${colorPrimario} 30%, transparent),
                                color-mix(in srgb, ${colorSecundario} 30%, transparent)
                            )
                        `;

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
async function ponerLigas(ids, posiciones) {
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

                data.success.forEach((liga, index) => {
                    const th = document.getElementById(posiciones[index]);

                    if (th) {
                        const p = document.getElementById('nombre');
                        if(p){
                            p.textContent = liga.nombre;
                        }
                        th.innerHTML = ''; // Limpiar el contenido previo

                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        img.alt = liga.nombre;
                        img.src = liga.logo;
                        img.id='logo';
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add('liga'+liga.liga);
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
//--------------------Poner Trofeos--------------------------------------------------
function ponerTrofeos(ids, posiciones) {
    const url = `/api/trofeosxid?id[]=${ids.join('&id[]=')}`;
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
                data.success.forEach((trofeo, index) => {
                    const th = document.getElementById(posiciones[index]);
                    if (th) {
                        const p = document.getElementById('nombre');
                        if(p){
                            p.textContent = trofeo.nombre;
                        }
                        th.innerHTML = ''; // Limpiar el contenido previo
                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        img.alt = trofeo.nombre;
                        img.src = trofeo.icono;
                        img.id = trofeo.tipo;
                        //img.id='logo';
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add('trofeo'+trofeo.id);
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
//--------------------Poner Edades--------------------------------------------------
function ponerEdades(id1, id2, rutaImagen1, rutaImagen2) {
    // Obtener las celdas por sus IDs
    const cell1 = document.getElementById(id1);
    const cell2 = document.getElementById(id2);

    // Limpiar el contenido previo en cada celda
    cell1.innerHTML = '';
    cell2.innerHTML = '';

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

    // Insertar las imágenes en las celdas correspondientes
    cell1.appendChild(img1);
    cell2.appendChild(img2);
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
        //if (Array.isArray(data) && data.length > 0 && data[0].Posicion !== undefined) {
            const posicion = parseInt(data.success[0].Posicion); // Acceder al valor 'Posicion' del primer objeto
            if (isNaN(posicion)) {
                console.error('Error: la posición obtenida no es un número válido.');
                return null;
            }

            return posicion; // Devolver la posición como número
        } /*else {
            console.error('Error: La estructura de los datos recibidos no es la esperada.');
            return null;
        }

    }*/ catch (error) {
        console.error('Error al obtener la posición de la jugadora:', error);
        return null; // En caso de error, devolver null
    }
}

async function paisesAll() {
    try {
        const response = await fetch('../api/paisesall');
        const data = await response.json();

        console.log(data.success);  
        return data.success;

    } catch (error) {
        console.error("Error fetching paises:", error);
        return [];
    }    
}

const resultDiv = document.getElementById('result');

function Ganaste(modo) {
    // Guardar en localStorage que el usuario ha ganado
    localStorage.setItem('hasWon', 'true');
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
        const input = document.getElementById('jugadoraInput');
        const div = document.getElementById('trayectoria');
        const jugadora_id = div.getAttribute('Attr1');
        localStorage.setItem('Attr1', jugadora_id);
        input.disabled=true;
        cambiarImagenConFlip();
    }else if(modo==='compañeras'){
        const div = document.getElementById('compañeras');
        const jugadora_id = div.getAttribute('Attr8');
        localStorage.setItem('Attr8', jugadora_id);
        cambiarImagenConFlip();
    }else if(modo === 'Guess Player'){
        const input = document.querySelector('input');
        const result = document.getElementById('resultado');
        const button = document.querySelector('button');
        result.textContent = '¡Has Ganado!';
        button.disabled=true;
        input.disabled=true;
    }else if(modo === 'wordle'){
        const textoDiv = document.getElementById('message');
        textoDiv.textContent = '¡Has Ganado!';
    }
}


function cambiarImagenConFlip() {
    // Seleccionar todos los contenedores de flip
    const flipContainers = document.querySelectorAll('.flip-container');

    flipContainers.forEach(container => {
        const flippers = container.querySelectorAll('.flipper');

        // Iterar sobre cada flipper dentro del contenedor
        flippers.forEach(flipper => {
            // Quitar clase si ya estaba aplicada
            flipper.classList.remove('flipping');

            // Forzar reflow para reiniciar la animación
            void flipper.offsetHeight;

            // Añadir la clase para empezar el volteo
            flipper.classList.add('flipping');

            // Opcional: cambiar la imagen frontal a la trasera después del flip
            const imagenTrasera = container.querySelector('.back img');
            const imagenFrontal = container.querySelector('.front img');
            setTimeout(() => {
                imagenFrontal.src = imagenTrasera.src;
            }, 600); // Ajusta según la duración de tu animación
        });
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
                const { id_jugadora, Nombre_Completo, imagen, Nacimiento, Apodo } = jugadora;

                if (!idsMostrados.has(id_jugadora)) { // Verificar que no se haya mostrado este ID
                    idsMostrados.add(id_jugadora);

                    const listItem = document.createElement('li');
                    listItem.classList.add('suggestion-item');

                    listItem.innerHTML = `
                        <img src="${imagen}" alt="${Nombre_Completo}" class="jugadora-img">
                        <div class="jugadora-info">
                            <strong>${Nombre_Completo}</strong>
                            <!--<p>Nacimiento: ${Nacimiento}</p>-->
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
           //console.log(segundos);
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

function crearPopupInicialJuego(titulo, explicacion, imagen, tipo, iniciarCallback) {
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
    popup.appendChild(explicar);

    if(tipo){
        // BOTÓN ÚNICO DE INICIAR
        const contenedorBoton = document.createElement('div');
        contenedorBoton.classList.add('boton-unico');

        const botonIniciar = document.createElement('button');
        botonIniciar.textContent = "Iniciar";
        botonIniciar.addEventListener('click', () => iniciarCallback());

        contenedorBoton.appendChild(botonIniciar);
        popup.appendChild(contenedorBoton);
    } else{

    // Crear el contenedor de los botones de dificultad
    const selectorDificultad = document.createElement('div');
    selectorDificultad.classList.add('selector-dificultad');
    const textoSelectorDificultad = document.createElement('p');
    textoSelectorDificultad.textContent = 'Selecciona dificultad';
    const botonesSelectorDificultad = document.createElement('div');


    // Crear los botones de dificultad
    const botonFacil = document.createElement('button');
    botonFacil.textContent = 'Fácil';
    botonFacil.addEventListener('click', () => iniciarCallback('facil'));  // Usamos una función de flecha para pasar el parámetro 'facil'

    const botonMedio = document.createElement('button');
    botonMedio.textContent = 'Medio';
    botonMedio.addEventListener('click', () => iniciarCallback('medio'));  // Usamos una función de flecha para pasar el parámetro 'normal'
    
    const botonDificil = document.createElement('button');
    botonDificil.textContent = 'Difícil';
    botonDificil.addEventListener('click', () => iniciarCallback('dificil'));  // Usamos una función de flecha para pasar el parámetro 'dificil'

    // Añadir los botones al contenedor de dificultad
    selectorDificultad.appendChild(textoSelectorDificultad);
    botonesSelectorDificultad.appendChild(botonFacil);
    botonesSelectorDificultad.appendChild(botonMedio);
    botonesSelectorDificultad.appendChild(botonDificil);
    selectorDificultad.appendChild(botonesSelectorDificultad);

    // Añadir los contenedores de la explicación y los botones al popup
    
    popup.appendChild(selectorDificultad);
    }
    // Añadir el popup al cuerpo del documento o a un contenedor específico
    document.body.appendChild(popup);
}



