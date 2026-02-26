import { fetchJugadoraById } from '/static/futfem/js/jugadora.js'
import { fetchPaisesById } from '/static/futfem/js/pais.js';
import { fetchLigasById } from '/static/futfem/js/ligas.js';
import { fetchEquiposById } from '/static/futfem/js/equipos.js';
import { fetchTrofeosById } from '/static/futfem/js/trofeos.js';
import { cambiarImagenConFlip } from "/static/js/animations/generales.js";
//----------------------------------------------------------------------------------
//---------------Funciones para colocar banderas, clubes, edades--------------------
//----------------------------------------------------------------------------------
//------------------Poner Banderas--------------------------------------------------
export async function ponerBanderas(ids, posiciones) {

    const data = await fetchPaisesById(ids)

    data.forEach((pais, index) => {
        const th = document.getElementById(posiciones[index]);

            if (th) {

                th.innerHTML = ''; // Limpiar el contenido previo
                const p = document.getElementById('nombre');
                if(p){
                     p.textContent = pais.nombre;
                }
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
}
//--------------------Poner Clubes--------------------------------------------------
export async function ponerClubes(ids, posiciones) {

    const data = await fetchEquiposById(ids);
    data.forEach((club, index) => {
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
                    color-mix(in srgb, ${colorPrimario} 50%, transparent),
                    color-mix(in srgb, ${colorSecundario} 50%, transparent)
                )
                `;

            // Añadir imagen y texto al elemento th
            th.appendChild(img);
            //th.appendChild(text);
        } else {
            console.error(`Elemento con id ${posiciones[index]} no encontrado.`);
        }
    });
}//f()
//--------------------Poner Ligas---------------------------------------------------
export async function ponerLigas(ids, posiciones) {

    const data = await fetchLigasById(ids);
    data.forEach((liga, index) => {
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
            // Añadir imagen y texto al elemento th
            th.appendChild(img);
        } else {
            console.error(`Elemento con id ${posiciones[index]} no encontrado.`);
        }
    });
}//f()
//--------------------Poner Trofeos--------------------------------------------------
export async function ponerTrofeos(ids, posiciones) {

    const data = await fetchTrofeosById(ids);
    data.forEach((trofeo, index) => {
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
            img.style.width = "50px";
            img.style.height = "auto";
            img.classList.add('trofeo'+trofeo.id);
            // Añadir imagen y texto al elemento th
            th.appendChild(img);
        } else {
            console.error(`Elemento con id ${posiciones[index]} no encontrado.`);
        }
    });
}//f()
//--------------------Poner Edades--------------------------------------------------
export function ponerEdades(id1, id2, rutaImagen1, rutaImagen2) {
    // Obtener las celdas por sus IDs
    const cell1 = document.getElementById(id1);
    const cell2 = document.getElementById(id2);

    // Limpiar el contenido previo en cada celda
    cell1.innerHTML = '';
    cell2.innerHTML = '';

    // Crear imágenes y asignarles la ruta, clase y alt correspondiente
    const img1 = document.createElement('img');
    img1.src = rutaImagen1;
    img1.classList.add('EdadMayor30');  // Clase para edad menor de 20
    img1.alt = 'Edad';  // Asignar atributo alt
    img1.style.width = '50px';

    const img2 = document.createElement('img');
    img2.src = rutaImagen2;
    img2.classList.add('EdadIgual25');  // Clase para edad 25
    img2.alt = 'Edad';  // Asignar atributo alt
    img2.style.width = '50px';

    // Insertar las imágenes en las celdas correspondientes
    cell1.appendChild(img1);
    cell2.appendChild(img2);
}//f()
//----------------------------------------------------------------------------------
//---------------Funciones para verificar banderas, clubes, edades------------------
//----------------------------------------------------------------------------------
async function sacarJugadora(id) {
    const data = await fetchJugadoraById(id)
    return data;
}

export function Ganaste(modo) {
    const input = document.querySelectorAll('input');
    const button = document.querySelector('button');
    const result = document.getElementById('resultado');
    const reloj = document.getElementById('reloj');
    const vidas = document.getElementById('vidas');
    if(button){
        button.disabled=true;
        button.style.pointerEvents = 'none';
    }
    input.disabled=true;
    // Llamar a la función que cambia la imagen con flip
    if(modo==='grid'){
        result.textContent = '¡Has Ganado!';
    }
    if(modo==='bingo'){
        const button = document.querySelector('.skip-button'); // usa querySelector
        button.disabled = true;
        reloj.style.display = 'none';
        result.textContent = '¡Has Ganado!';
    }else if(modo==='trayectoria'){
        const div = document.getElementById('trayectoria');
        const jugadora_id = div.getAttribute('Attr1');
        reloj.textContent = '¡Has Ganado!';
        localStorage.setItem('Attr1', jugadora_id);
        cambiarImagenConFlip();
    }else if(modo==='compañeras'){
        const div = document.getElementById('compañeras');
        const jugadora_id = div.getAttribute('Attr8');
        localStorage.setItem('Attr8', jugadora_id);
        cambiarImagenConFlip();
    }else if(modo === 'Guess Player'){
        const button = document.querySelector('button');
        result.textContent = '¡Has Ganado!';
        vidas.style.display = 'none';
    }else if(modo === 'wordle'){
        const textoDiv = document.getElementById('message');
        textoDiv.textContent = '¡Has Ganado!';
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

export function crearPopupInicialJuego(titulo, explicacion, imagen, tipo, iniciarCallback) {
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
    const botonSinTiempo = document.createElement('button');
    botonSinTiempo.innerHTML = '<i class="bi bi-infinity"></i>';
    botonSinTiempo.addEventListener('click', () => iniciarCallback('infinito'));  // Usamos una función de flecha para pasar el parámetro 'facil'
    
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
    botonesSelectorDificultad.appendChild(botonSinTiempo);
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