export async function handleAutocompletePais(event, id, funcion) {
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById(id);

    // Limpiar sugerencias previas
    suggestionsList.innerHTML = '';

    if (texto.length > 2) { // Solo si hay más de 2 caracteres
        const url = `/api/paisxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();

            // Evitar duplicados
            const idsMostrados = new Set();

            results.forEach(nation => {
                const { pais, nombre, iso } = nation;
                if (!idsMostrados.has(pais)) { // Verificar que no se haya mostrado este ID
                    idsMostrados.add(pais);

                    const listItem = document.createElement('li');
                    listItem.classList.add('suggestion-item');

                   /* listItem.innerHTML = `
                        <img src="/${bandera}" alt="${nombre}" class="jugadora-img">
                        <div class="jugadora-info">
                            <strong>${nombre}</strong>
                        </div>
                    `;*/

                    listItem.innerHTML = `
                        <span class="fi fi-${iso} fis"></span>
                        <div class="jugadora-info">
                            <strong>${nombre}</strong>
                        </div>
                    `;

                    listItem.addEventListener('click', () => {
                        // 1. Crear el "Chip" (el elemento visual que verá el usuario)
                        const chip = document.createElement('div');
                        chip.classList.add('input-chip');
                        chip.innerHTML = `
                            <span class="fi fi-${iso} fis"></span>
                            <span class="chip-text">${nombre}</span>
                            <span class="chip-cancel">&times;</span>
                        `;

                        // 2. Insertar el Chip y ocultar el input
                        input.insertAdjacentElement('beforebegin', chip);
                        input.style.display = 'none'; // Ocultamos el input real
                        input.value = nombre; // Guardamos el nombre por si el form se envía
                        input.setAttribute('data-id', pais);
                        
                        suggestionsList.innerHTML = ''; // Limpiar sugerencias

                        // 3. Lógica para el botón 'X' (Cancelar)
                        chip.querySelector('.chip-cancel').addEventListener('click', () => {
                            chip.remove(); // Quitamos el chip
                            input.style.display = 'block'; // Mostramos el input
                            input.value = ''; // Limpiamos el texto
                            input.setAttribute('data-id', null);
                            input.focus();
                            if (funcion) funcion(null); // Avisar que se canceló
                        });

                        if (funcion) {
                            funcion(pais);
                        }
                    });

                    suggestionsList.appendChild(listItem);
                }
            });
        } catch (error) {
            console.error('Error al buscar la jugadora:', error);
        }
    }else{
        input.setAttribute('data-id', null); // Guardar el ID del equipo
    }
}

export async function fetchPaisesById(ids){
    // Generar la URL para obtener las banderas con IDs como parámetros de consulta
    const response = await fetch(`../api/paisesxid?id[]=${ids.join('&id[]=')}`)
    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json();
    if (data !== null) {
        return data.success;
    } else {
        return null;
    }
} 