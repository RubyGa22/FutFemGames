export async function equiposxliga(ligaId) {
    return fetch(`/api/equiposxliga?liga=${ligaId}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error fetching equipos by liga:', error);
            throw error;
        });
}

export async function fetchAllEquipos() {
    return fetch(`/api/equiposall`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error fetching all equipos:', error);
            throw error;
        }
    );
}


export async function jugadorasxTemporadaYEquipo(equipo, temporada) {
    return fetch(`/api/jugadorasxequipo_temporada?equipo=${equipo}&temporada=${temporada}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error fetching jugadoras actuales by equipo:', error);
            throw error;
        });
}

export async function fetchEquipoById(id){
    return fetch(`/api/equipoxid?id=${id}`)
    .then(response => response.json())
        .then(data => data.success)
        .catch(error => {
            console.error('Error fetching jugadoras actuales by equipo:', error);
            throw error;
        });
}

export async function fetchEquiposById(ids) {
    // Generar la URL para obtener las banderas con IDs como parámetros de consulta
    const response = await fetch(`../api/equiposxid?id[]=${ids.join('&id[]=')}`)
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

export async function handleAutocompleteEquipo(event, id) {
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById(id);

    // Limpiar sugerencias previas
    suggestionsList.innerHTML = '';

    if (texto.length > 2) { // Solo si hay más de 2 caracteres
        const url = `/api/equipoxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();

            results.forEach(equipo => {
                const { id_equipo, nombre, escudo, color } = equipo;
                const listItem = document.createElement('li');
                listItem.classList.add('suggestion-item');

                listItem.innerHTML = `
                        <img src="/${escudo}" alt="${nombre}" class="equipo-img">
                        <div class="equipo-info">
                            <strong>${nombre}</strong>
                        </div>
                    `;

                listItem.addEventListener('click', () => {
                    // Insertar el nombre del equipo en el input al hacer clic
                    input.value = nombre;
                    input.setAttribute('data-id', id_equipo); // Guardar el ID del equipo
                    suggestionsList.innerHTML = '';  // Limpiar las sugerencias
                });

                suggestionsList.appendChild(listItem);

            });
        } catch (error) {
            console.error('Error al buscar el equipo:', error);
        }
    }else{
        input.setAttribute('data-id', null); // Guardar el ID del equipo
    }
}

export async function fetchEquipoPalmaresByTemporadas(id_equipo, temporadas) {
    console.log(`Fetching palmares for equipo ID: ${id_equipo} and temporadas: ${temporadas}`);
    try {
        const url = `/api/equipo_palmares?equipo=${encodeURIComponent(id_equipo)}&temporadas=${encodeURIComponent(temporadas)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching equipo palmares: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching equipo palmares:', error);
        throw error;
    }
}