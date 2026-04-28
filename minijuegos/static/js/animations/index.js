const buttons = document.querySelectorAll('.game-button');
const expo = document.getElementById('juego-expo');
const expoTitulo = document.getElementById('juego-titulo');
const expoParrafo = document.getElementById('juego-parrafo');
const expoImagen = document.getElementById('juego-imagen');
const webButtons = document.querySelectorAll('.web-button');
const hoverSound = new Audio('/static/sounds/hover2.mp3');

webButtons.forEach(card => {
  // ENTRAR
  card.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();})
  })

buttons.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // 1. Extraer datos del dataset del botón
    const { bg, titulo, descripcion, img } = card.dataset;

    // 2. Actualizar contenido de la expo
    expoTitulo.textContent = titulo;
    expoParrafo.textContent = descripcion;
    expoImagen.src = img;

    // 3. Cambiar fondo y mostrar contenedor con GSAP
    gsap.to(expo, {
      duration: 0.4,
      autoAlpha: 1, // Esto maneja visibility y opacity a la vez
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bg})`,
      display: 'flex', // Asegura que se vea si estaba en none
      ease: "power2.out"
    });

    // --- Tu lógica previa de hoverSound y opacidad de otros botones ---
    hoverSound.currentTime = 0;
    hoverSound.play();

    buttons.forEach(other => {
      if (other !== card) gsap.to(other, { opacity: 0.3, duration: 0.3 });
    });
    gsap.to(card, { scale: 1.05, duration: 0.3 });
  });

  card.addEventListener('mouseleave', () => {
    // Opcional: Ocultar la expo al salir del botón o dejar la última seleccionada
    // Si quieres que desaparezca:
    /*
    gsap.to(expoContainer, { autoAlpha: 0, duration: 0.3 });
    */

    // Restaurar botones
    gsap.to(card, { scale: 1, duration: 0.3 });
    buttons.forEach(other => {
      gsap.to(other, { opacity: 1, duration: 0.3 });
    });
  });
});