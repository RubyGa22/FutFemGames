export async function handleAutocompletePosicion(event) {
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById("sugerencias-posicion");

    // Limpiar sugerencias previas
    suggestionsList.innerHTML = '';

    if (texto.length > 2) { // Solo si hay más de 2 caracteres
        const url = `/api/posicionxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();

            // Evitar duplicados
            const idsMostrados = new Set();

            results.forEach(posicion => {
                const { id_posicion, abreviatura, nombre } = posicion;

                if (!idsMostrados.has(id_posicion)) { // Verificar que no se haya mostrado este ID
                    idsMostrados.add(id_posicion);

                    const listItem = document.createElement('li');
                    listItem.classList.add('suggestion-item');
                    
                    listItem.innerHTML = `
                        <span class="pos-${abreviatura.toUpperCase()}">
                            ${gettext(abreviatura.toUpperCase())}
                        </span>
                        <div class="jugadora-info">
                            <strong>${nombre}</strong>
                        </div>
                    `;
                    console.log(listItem.innerHTML);
                    listItem.addEventListener('click', () => {
                        // Insertar el nombre en el input al hacer clic
                        input.value = nombre;
                        input.setAttribute('data-id', id_posicion);
                        suggestionsList.innerHTML = '';  // Limpiar las sugerencias
                        /*document.getElementById("jugadora_id").value = id_jugadora;
                        loadPlayerById(id_jugadora);  // Cargar los detalles de la jugadora*/
                    });

                    suggestionsList.appendChild(listItem);
                }
            });
        } catch (error) {
            console.error('Error al buscar la posicion:', error);
        }
    }
}