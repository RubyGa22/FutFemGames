export function cambiarImagenConFlip() {
    // Seleccionar todos los contenedores de flip
    const flipContainers = document.querySelectorAll('.flip-container');

    flipContainers.forEach(container => {
        const flippers = container.querySelectorAll('.flipper');

        // Iterar sobre cada flipper dentro del contenedor
        flippers.forEach(flipper => {
            // Quitar clase si ya estaba aplicada
            flipper.classList.remove('flipping');

            // Forzar reflow para reiniciar la animación
            void flipper.offsetHeight;

            // Añadir la clase para empezar el volteo
            flipper.classList.add('flipping');

            // Opcional: cambiar la imagen frontal a la trasera después del flip
            const imagenTrasera = container.querySelector('.back img');
            const imagenFrontal = container.querySelector('.front img');
            setTimeout(() => {
                imagenFrontal.src = imagenTrasera.src;
            }, 600); // Ajusta según la duración de tu animación
        });
    });
}