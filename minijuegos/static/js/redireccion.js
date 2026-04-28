// redirect.js

function redireccionarA(url) {
    // Redirige a la página de carga primero
    window.location.href = 'loading?url=' + encodeURIComponent(url);
}

// Al cargar la página, redirige a la página final especificada en la URL
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const finalUrl = urlParams.get('url');

    if (finalUrl) {
        // Reemplaza el historial actual para que loading no quede en back
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch'; // O 'prerender' para navegadores que lo soporten
        prefetchLink.href = finalUrl;
        document.head.appendChild(prefetchLink);

        history.replaceState(null, '', finalUrl);

        // Redirige después de 2 segundos
        setTimeout(() => {
            window.location.href = finalUrl;
        }, 2000);
    }
});
