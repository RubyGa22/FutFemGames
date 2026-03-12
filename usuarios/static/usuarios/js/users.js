export async function updateJugadoraPerfil(id_jugadora) {
    const inputField = document.getElementById('jugadora-input');
    const nuevoNombre = inputField.value.trim();

    if (nuevoNombre.length < 3) {
        alert('El nombre de la jugadora debe tener al menos 3 caracteres.');
        return;
    }
    try {
        const response = await fetch(`/accounts/jugadora_favorita/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                jugadora: id_jugadora, // Enviamos el ID en el body
                nombre: nuevoNombre 
            })
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar la jugadora: ${response.statusText}`);
        }
        const result = await response.json();
        console.log('Jugadora actualizada:', result);
        return result;
    } catch (error) {
        console.error('Error al actualizar la jugadora:', error);
        return null;
    }
}

// Función genérica para enviar datos al servidor
async function actualizarCampoPerfil(campo, valor, extraData = {}) {
    const payload = { campo, valor, ...extraData };
    
    try {
        const response = await fetch('/accounts/actualizar_perfil/', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (e) {
        console.error("Error:", e);
        return null;
    }
}

// Lógica de UI para CUALQUIER campo editable
document.querySelectorAll('.editable-group').forEach(group => {
    const btnEdit = group.querySelector('.edit-trigger');
    const btnSave = group.querySelector('.save-trigger');
    const display = group.querySelector('.display-value');
    const editMode = group.querySelector('.edit-mode');
    const input = group.querySelector('.edit-input');
    const fieldType = group.dataset.field;

    btnEdit?.addEventListener('click', () => {
        btnEdit.style.display = 'none';
        display.style.display = 'none';
        editMode.style.display = 'inline-flex';
        input.focus();
    });

    btnSave?.addEventListener('click', async () => {
        let value = input.value.trim();
        let extra = {};

        // Caso especial: Jugadora favorita
        if (fieldType === 'jugadora_favorita') {
            extra.jugadora_id = input.getAttribute('data-id');
        }

        const result = await actualizarCampoPerfil(fieldType, value, extra);

        if (result?.status === 'ok') {
            display.textContent = value;
            if (result.reload) location.reload(); // Por si cambia el username o hay nueva foto
            
            // Revertir a vista normal
            editMode.style.display = 'none';
            display.style.display = 'inline';
            btnEdit.style.display = 'inline';
        } else {
            alert("Error al actualizar: " + (result?.message || "inténtalo de nuevo"));
        }
    });
});

/**
 * Obtener usuarios al escribir en un input
 * @param {event}
 * @returns {}
 */
export async function handleAutocompleteUser(event) {
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById("sugerencias");

    // Limpiar sugerencias previas
    suggestionsList.innerHTML = '';

    if (texto.length > 2) { // Solo si hay más de 2 caracteres
        const url = `/accounts/usuarioxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();

            // Evitar duplicados
            const idsMostrados = new Set();

            results.forEach(usuarioObj => {
                const { id, usuario, Nombre, Apellidos, jugadora_favorita, es_jugadora, miembro } = usuarioObj;

                console.log(es_jugadora, miembro);

                if (!idsMostrados.has(id)) { // Verificar que no se haya mostrado este ID
                    idsMostrados.add(id);

                    const listItem = document.createElement('li');
                    listItem.classList.add('suggestion-item');

                    listItem.innerHTML = `
                        <img src="/${jugadora_favorita}" alt="${usuario}" class="jugadora-img">
                        <div class="jugadora-info">
                            <strong>${usuario}</strong>
                            <p>${Nombre} ${Apellidos}</p>
                        </div>
                    `;

                    if (miembro) {
                        const strong = listItem.querySelector('strong');

                        // 1. Creamos el elemento imagen
                        const iconMiembro = document.createElement('img');

                        // 2. Configuramos la ruta y el estilo
                        iconMiembro.src = '/static/img/logo.png'; // Ajusta la ruta a tu estático
                        iconMiembro.alt = 'Miembro';
                        iconMiembro.style.width = '18px';  // Ajusta el tamaño según tu fuente
                        iconMiembro.style.height = '18px';
                        iconMiembro.style.marginLeft = '8px'; // Espacio entre el nombre y el icono
                        iconMiembro.style.verticalAlign = 'middle'; // Alineación perfecta con el texto

                        // 3. (Opcional) Si quieres mantener el color dorado en el texto también
                        strong.style.color = 'gold';

                        // 4. Insertamos la imagen dentro del strong (al final del texto)
                        strong.appendChild(iconMiembro);
                    }else if (es_jugadora) {
                        const strong = listItem.querySelector('strong');
                        // 1. Creamos el elemento imagen
                        const iconJugadora = document.createElement('img');
                        // 2. Configuramos la ruta y el estilo
                        iconJugadora.src = '/static/img/verified.png'; // Ajusta la ruta a tu estático
                        iconJugadora.alt = 'Jugadora';
                        iconJugadora.style.width = '18px';  // Ajusta el tamaño según tu fuente
                        iconJugadora.style.height = '18px';
                        iconJugadora.style.marginLeft = '8px';
                        iconJugadora.style.verticalAlign = 'middle'; // Alineación perfecta con el texto
                        // 3. Insertamos la imagen dentro del strong (al final del texto)
                        strong.appendChild(iconJugadora);
                    }

                    listItem.addEventListener('click', () => {
                        // Insertar el nombre en el input al hacer clic
                        input.value = usuario;
                        input.setAttribute('data-id', id);
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