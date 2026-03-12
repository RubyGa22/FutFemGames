import { obtenerRachaPerfil } from '/static/usuarios/js/rachas.js';
import { handleAutocompletePlayer } from '/static/futfem/js/jugadora.js';
import { updateJugadoraPerfil } from '/static/usuarios/js/users.js';

// Obtenemos el ID del usuario del perfil (no necesariamente el mío)
const perfilId = document.getElementById('perfil-usuario-id').value;
const btnEditar = document.getElementById('btn-editar-jugadora');
const displaySpan = document.getElementById('jugadora-nombre-display');
const inputContainer = document.getElementById('edit-input-container');
const inputField = document.getElementById('jugadora-input');
const btnGuardarJugadora = document.getElementById('btn-guardar-jugadora');
const usuarioH1 = document.getElementById('username');

// Si el perfil es propio, permitimos editar el nombre de usuario
if (usuarioH1) {
    usuarioH1.addEventListener('click', () => {
        // Lógica para editar el nombre de usuario
    });
}
if(btnGuardarJugadora){
btnGuardarJugadora.addEventListener('click', async () => {
    const nuevaJugadora = inputField.getAttribute('data-id');
    if (nuevaJugadora) {
        const exito = await updateJugadoraPerfil(nuevaJugadora);
        if (exito) {
            displaySpan.textContent = inputField.value; // Actualizamos el nombre mostrado
            displaySpan.style.display = 'inline';
            btnEditar.style.display = 'inline';
            inputContainer.style.display = 'none';
            location.reload();
        } else {
                alert('Error al actualizar la jugadora favorita. Por favor, inténtalo de nuevo.');
        }
    }
});
}

if (btnEditar) {
    btnEditar.addEventListener('click', () => {
        // Intercambiamos visibilidad
        displaySpan.style.display = 'none';
        btnEditar.style.display = 'none';
        inputContainer.style.display = 'block';
            
        inputField.focus(); // Ponemos el foco automáticamente
    });

    // Listener para el autocompletado
    inputField.addEventListener('input', handleAutocompletePlayer, 300); // Debounce de 300ms


    // Opcional: Cerrar si el usuario pulsa Esc o hace click fuera
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            displaySpan.style.display = 'inline';
            btnEditar.style.display = 'inline';
            inputContainer.style.display = 'none';
        }
    });
}

const rachas = await obtenerRachaPerfil(perfilId);
const rachasDiv = document.getElementById('rachas');
rachasDiv.innerHTML = '';

const table = document.createElement('table');
table.classList.add('racha-table');

const thead = document.createElement('thead');
thead.innerHTML = `
        <tr>
            <th>Juego</th>
            <th>Actual</th>
            <th>Mejor</th>
        </tr>
    `;

    const tbody = document.createElement('tbody');

    rachas.forEach(racha => {
        const tr = document.createElement('tr');

        const tdJuego = document.createElement('td');
        tdJuego.textContent = racha.juego.nombre;

        const tdRacha = document.createElement('td');
        tdRacha.textContent = racha.racha_actual;
        tdRacha.classList.add('racha-num');

        const tdMejor = document.createElement('td');
        tdMejor.textContent = racha.mejor_racha;
        tdMejor.classList.add('racha-num');

        tr.appendChild(tdJuego);
        tr.appendChild(tdRacha);
        tr.appendChild(tdMejor);
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    rachasDiv.appendChild(table);