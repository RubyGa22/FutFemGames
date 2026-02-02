export async function handleAutocompletePais(event, id) {
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById(id);

    // Limpiar sugerencias previas
    suggestionsList.innerHTML = '';

    if (texto.length > 2) { // Solo si hay más de 2 caracteres
        const url = `../api/paisxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();

            // Evitar duplicados
            const idsMostrados = new Set();

            results.forEach(equipo => {
                const { pais, nombre, bandera } = equipo;
                if (!idsMostrados.has(pais)) { // Verificar que no se haya mostrado este ID
                    idsMostrados.add(pais);

                    const listItem = document.createElement('li');
                    listItem.classList.add('suggestion-item');

                    listItem.innerHTML = `
                        <img src="/${bandera}" alt="${nombre}" class="jugadora-img">
                        <div class="jugadora-info">
                            <strong>${nombre}</strong>
                        </div>
                    `;

                    listItem.addEventListener('click', () => {
                        // Insertar el nombre en el input al hacer clic
                        input.value = nombre;
                        input.setAttribute('data-id', pais);
                        suggestionsList.innerHTML = '';  // Limpiar las sugerencias
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