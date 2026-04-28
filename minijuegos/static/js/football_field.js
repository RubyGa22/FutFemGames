export function ponerJugadoraEnField(jugadora, positionId, color) {
    // 1. Buscamos TODAS las celdas que coincidan con esa posición y estén ACTIVADAS por la formación
    const celdasPosibles = document.querySelectorAll(`#grid td[data-pos="${positionId}"].activado`);
    const slugNombre = (jugadora.nombre_completo || jugadora.nombre).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''); // Limpiamos caracteres especiales para el slug
    
    // 2. Buscamos la primera celda de esas que NO tenga todavía una jugadora (un badge)
    let targetCell = null;
    for (let td of celdasPosibles) {
        if (!td.querySelector('.jugadora-badge')) {
            targetCell = td;
            break; // Encontramos un hueco libre para esta posición, paramos de buscar
        }
    }

    // Si no hay celdas libres para esa posición en esta formación, no hacemos nada
    if (!targetCell) {
        // console.log(`Posición ${positionId} completa o no disponible en esta formación para ${jugadora.Apodo}`);
        return;
    }

    // 3. Limpiamos el texto original (ej: "DFC") para poner la ficha
    targetCell.innerHTML = ''; 

    // 4. Crear el contenedor de la "ficha"
    const badge = document.createElement('div');
    badge.className = 'jugadora-badge visible';
    badge.id = `badge-${jugadora.id_jugadora}`;
    // 5. Contenido HTML
    badge.innerHTML = `
        <div class="badge-img">
            <img src="/${jugadora.imagen || 'static/img/predeterm.jpg'}" alt="${jugadora.apodo}" width="70" height="70" style="width: 50px; height: 50px; object-fit: cover;" fetchpriority="high" loading="eager">
        </div>
        <span class="badge-name">${jugadora.apodo || jugadora.nombre}</span>
    `;

    // Cambiamos el estilo del contenedor .badge-img
    const containerImg = badge.querySelector('.badge-img');

    containerImg.style.position = 'relative';
    containerImg.style.overflow = 'hidden';
    containerImg.style.borderRadius = '20px'; // Para que sea circular

    // El gradiente lo aplicamos al fondo del contenedor
    containerImg.style.background = `
        linear-gradient(
            to bottom,
            color-mix(in srgb, ${color} 80%, transparent),
            transparent
        )
    `;
    
    // 6. Evento de clic
    badge.addEventListener('click', (e) => {
        e.stopPropagation();
        location.href = `/jugadora/${jugadora.id_jugadora}/${slugNombre}/`;
    });

    // 7. Inyectar
    targetCell.appendChild(badge);
}


export function crearAlineacion(formacion) {
    // Definimos el mapa de coordenadas para cada dibujo táctico
    const esquemas = {
        // --- LÍNEA DE 4 ---
        "4-3-3":        ['c53', 'c41','c42','c44','c45', 'c32','c33','c34', 'c11','c13','c15'],
        "4-3-3(4)":     ['c53', 'c41','c42','c44','c45', 'c32','c23','c34', 'c11','c13','c15'], // Ofensivo
        "4-3-3(2)":     ['c53', 'c41','c42','c44','c45', 'c33', 'c22','c24', 'c11','c13','c15'], // Con MCD
        "4-4-2":        ['c53', 'c41','c42','c44','c45', 'c21','c32','c34','c25', 'c12','c14'],
        "4-4-2(2)":     ['c53', 'c41','c42','c44','c45', 'c32','c34', 'c21','c25', 'c12','c14'], // MCDs
        "4-1-2-1-2":    ['c53', 'c41','c42','c44','c45', 'c33', 'c22','c24', 'c23', 'c12','c14'], // Rombo
        "4-2-3-1":      ['c53', 'c41','c42','c44','c45', 'c32','c34', 'c21', 'c23','c25', 'c13'],
        "4-5-1":        ['c53', 'c41','c42','c44','c45', 'c21','c22','c23','c24','c25', 'c13'],

        // --- LÍNEA DE 3 ---
        "3-4-3":        ['c53', 'c42','c43','c44', 'c21','c22','c24','c25', 'c11','c13','c15'],
        "3-5-2":        ['c53', 'c42','c43','c44', 'c21','c22','c23','c24','c25', 'c12','c14'],
        "3-4-1-2":      ['c53', 'c42','c43','c44', 'c22','c24', 'c21','c25', 'c23', 'c12','c14'],

        // --- LÍNEA DE 5 ---
        "5-3-2":        ['c53', 'c41','c42','c43','c44','c45', 'c22','c33','c24', 'c12','c14'],
        "5-4-1":        ['c53', 'c41','c42','c43','c44','c45', 'c21','c32','c34','c25', 'c13'],
        "5-2-1-2":      ['c53', 'c41','c42','c43','c44','c45', 'c32','c34', 'c23', 'c12','c14'],

        // --- FORMACIONES EXTRAÑAS / ATAQUE TOTAL ---
        "4-2-4":        ['c53', 'c41','c42','c44','c45', 'c22','c24', 'c11','c12','c14','c15'],
        "3-3-4":        ['c53', 'c42','c43','c44', 'c22','c23','c24', 'c11','c12','c14','c15']
    };

    // Buscamos las celdas en el mapa. Si no existe la formación, 
    // podrías devolver una por defecto (ej. 4-4-2) para que no rompa el campo.
    const celdas = esquemas[formacion] || esquemas["4-4-2"];

    // console.log(`Activando formación: ${formacion}`);
    activarCeldas(celdas);
}

export function activarCeldas(celdas) {
    // 1. Limpiamos TODO el campo antes de aplicar la nueva formación
    const todasLasCeldas = document.querySelectorAll('#grid td');
    
    todasLasCeldas.forEach(celda => {
        // Quitamos las clases de estado
        celda.classList.remove('activado', 'oculto-total'); 
        
        // Restauramos el texto original si existe un párrafo previo
        const pOriginal = celda.querySelector('p');
        if (pOriginal) {
            celda.innerHTML = pOriginal.innerHTML;
        }
    });

    // 2. Iterar sobre los IDs de la nueva formación para activarlos
    celdas.forEach(id => {
        let celda = document.getElementById(id);
        if (!celda) return;

        let textoPosicion = celda.innerHTML;

        let contenedor = document.createElement("div");
        contenedor.className = "celda-wrapper"; 

        let img = document.createElement("img");
        img.src = '/static/img/predeterm.jpg'; 
        img.alt = textoPosicion;
        img.className = "jugadora-placeholder";

        let parrafo = document.createElement("p");
        parrafo.innerHTML = textoPosicion;

        celda.innerHTML = '';
        contenedor.appendChild(img);
        contenedor.appendChild(parrafo);
        celda.appendChild(contenedor);

        celda.classList.add('activado');
    });

    // 3. LOGICA EXTRA: Si hay más de 2 activos en la fila, ocultamos el resto totalmente
    const filas = document.querySelectorAll('#grid tr');
    
    filas.forEach(fila => {
        const activosEnEstaFila = fila.querySelectorAll('td.activado');
        
        // Si hay 3 o más jugadoras (ej: 3 centrales o 4 medios)
        if (activosEnEstaFila.length > 2) {
            const inactivos = fila.querySelectorAll('td:not(.activado)');
            inactivos.forEach(td => {
                td.classList.add('oculto-total'); // Aplicamos el display: none
            });
        }
    });
}
