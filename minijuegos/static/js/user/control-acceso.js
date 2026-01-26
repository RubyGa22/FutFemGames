import { getSesion } from '/static/js/user/rachas.js';

(async () => {
    try {
        const sesion = await getSesion();

        // Obtener el dataset directamente del script que lo llama
        const currentScript = document.getElementById('control-acceso');
        console.log(currentScript)
        const allowedRolesAttr = currentScript.dataset.allowedRoles || '';
        const allowedRoles = allowedRolesAttr.split(',')
                                              .map(r => r.trim())
                                              .filter(Boolean)
                                              .map(Number);

        // Si no hay sesión → login
        if (!sesion) {
            window.location.href = '/accounts/login';
            return;
        }

        const userRole = sesion.rol; // rol que viene del JSON de sesión
        // Si el rol del usuario no está permitido → redirige
        if (!allowedRoles.includes(userRole)) {
            console.warn(`Acceso denegado para rol ${userRole}`);
            window.location.href = ''; // o página "no autorizado"
            return;
        }

        // Acceso permitido
        console.log(`Acceso permitido para rol ${userRole}`);

    } catch (error) {
        console.error('Error al comprobar sesión:', error);
        window.location.href = '/accounts/login';
    }
})();
