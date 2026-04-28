import { obtenerRachaPerfil } from '/static/usuarios/js/rachas.js';
import { handleAutocompletePlayer } from '/static/futfem/js/jugadora.js';
import { updateJugadoraPerfil } from '/static/usuarios/js/users.js';

// Obtenemos el ID del usuario del perfil (no necesariamente el mío)
const perfilId = document.getElementById('perfil-usuario-id').value;
const btnEditar = document.getElementById('btn-editar-jugadora');
const btnEditarEquipo = document.getElementById('btn-editar-equipo');
const displaySpan = document.getElementById('jugadora-nombre-display');
const inputContainer = document.getElementById('edit-input-container');
const inputField = document.getElementById('jugadora-input');
const equopinputField = document.getElementById('equipo-input');
const btnGuardarJugadora = document.getElementById('btn-guardar-jugadora');
const btnGuardarEquipo = document.getElementById('btn-guardar-equipo');
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
}if(btnGuardarEquipo){
btnGuardarEquipo.addEventListener('click', async () => {
    const nuevoEquipo = equopinputField.getAttribute('data-id');
    if (nuevoEquipo) {
        const exito = await updateEquipoPerfil(nuevoEquipo);
        if (exito) {
            displaySpan.textContent = equopinputField.value; // Actualizamos el nombre mostrado
            displaySpan.style.display = 'inline';
            btnEditar.style.display = 'inline';
            inputContainer.style.display = 'none';
            location.reload();
        } else {
                alert('Error al actualizar el equipo favorito. Por favor, inténtalo de nuevo.');
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
    inputField.addEventListener('input', event => {
        handleAutocompletePlayer(event);
    }); // Debounce de 300ms


    // Opcional: Cerrar si el usuario pulsa Esc o hace click fuera
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            displaySpan.style.display = 'inline';
            btnEditar.style.display = 'inline';
            inputContainer.style.display = 'none';
        }
    });
}if (btnEditarEquipo) {
    btnEditarEquipo.addEventListener('click', () => {
        // Intercambiamos visibilidad
        displaySpan.style.display = 'none';
        btnEditarEquipo.style.display = 'none';
        inputContainer.style.display = 'block';
            
        inputField.focus(); // Ponemos el foco automáticamente
    });

    // Listener para el autocompletado
    equopinputField.addEventListener('input', event => {
        handleAutocompletePlayer(event);
    }); // Debounce de 300ms


    // Opcional: Cerrar si el usuario pulsa Esc o hace click fuera
    equopinputField.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            displaySpan.style.display = 'inline';
            btnEditarEquipo.style.display = 'inline';
            inputContainer.style.display = 'none';
        }
    });
}

const rachas = await obtenerRachaPerfil(perfilId);
const rachasDiv = document.getElementById('rachas');

// 1. Creamos la estructura del Slider
rachasDiv.innerHTML = `
    <div class="slider-header">
        <h2>Rachas</h2>
        <div class="slider-controls">
            <button class="nav-btn prev" id="prevBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </button>
            <button class="nav-btn next" id="nextBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
        </div>
    </div>
    <div class="streak-slider-viewport">
        <div class="streak-grid" id="streakTrack"></div>
    </div>
`;

const track = document.getElementById('streakTrack');

rachas.forEach(racha => {
    const card = document.createElement('div');
    const porcentaje = Math.min((racha.racha_actual / racha.mejor_racha) * 100, 100);
    const foto = racha.juego.slug 
    ? `/static/img/${racha.juego.slug}-logo-fondo.webp` 
    : '/static/img/logo.webp';
    card.classList.add('discord-streak-card');
    if (racha.racha_actual > 5) card.classList.add('on-fire');

    card.innerHTML = `
        <div class="card-inner">
            <div class="game-icon-wrapper">
                <img src="${foto}" class="game-mini-icon">
                ${racha.racha_actual > 0 ? `<div class="status-dot"></div>` : ''}
            </div>
            <div class="game-details">
                <div class="game-name">${racha.juego.nombre}</div>
                <div class="streak-stats">
                    <span class="current">Racha: <strong>${racha.racha_actual}</strong></span>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${porcentaje}%"></div>
                    </div>
                    <span class="separator">•</span>
                    <span class="best">Mejor: ${racha.mejor_racha}</span>
                </div>
            </div>
            <div class="streak-visual">
                <i class="fas fa-fire ${racha.racha_actual > 5 ? 'burning' : ''}"></i>
            </div>
        </div>
    `;
    track.appendChild(card);
});

// 2. Lógica de Navegación con GSAP
let scrollAmount = 0;
const cardWidth = 312; // Ancho de la card (300px) + gap (12px)

document.getElementById('nextBtn').addEventListener('click', () => {
    const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
    if (scrollAmount < maxScroll) {
        scrollAmount += cardWidth;
        gsap.to(track, { x: -scrollAmount, duration: 0.5, ease: "power2.out" });
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (scrollAmount > 0) {
        scrollAmount -= cardWidth;
        gsap.to(track, { x: -scrollAmount, duration: 0.5, ease: "power2.out" });
    }
});