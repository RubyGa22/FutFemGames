document.addEventListener('DOMContentLoaded', () => {
    const selectAccess = document.getElementById('select-accessibility');
    const body = document.documentElement;

    // 1. Aplicar el filtro guardado inmediatamente al cargar CUALQUIER página
    const filtroGuardado = localStorage.getItem('filtro-accesibilidad');
    if (filtroGuardado && filtroGuardado !== 'none') {
        body.classList.add(filtroGuardado);
    }

    // 2. Solo configurar el Listener si el select existe en esta página
    if (selectAccess) {
        // Sincronizar el valor del select con lo guardado
        if (filtroGuardado) selectAccess.value = filtroGuardado;

        selectAccess.addEventListener('change', (e) => {
            const filtro = e.target.value;

            // Limpiar clases viejas
            body.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'grayscale');

            // Aplicar nueva
            if (filtro !== 'none') {
                body.classList.add(filtro);
            }

            // Guardar
            localStorage.setItem('filtro-accesibilidad', filtro);
        });
    }
});