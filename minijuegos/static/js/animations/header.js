const navLinks = document.querySelectorAll('li a');

navLinks.forEach(link => {
  // Función para la animación de "Entrada" (Caja cerrándose)
  const playEnterAnim = () => {
    gsap.killTweensOf(link);
    gsap.to(link, {
      scale: 1.1,
      "--arrowOpacity": 1,
      "--arrowScale": 1,
      "--arrowYTop": "0px",
      "--arrowYBottom": "0px",
      duration: 0.4,
      ease: "expo.out",
      color: "var(--color-primario)"
    });
  };

  // Función para la animación de "Salida" (Caja expandiéndose)
  const playLeaveAnim = () => {
    if (!link.classList.contains("active")) {
      gsap.killTweensOf(link);
      gsap.to(link, {
        scale: 1,
        "--arrowOpacity": 0,
        "--arrowScale": 1.5,
        "--arrowYTop": "-25px",
        "--arrowYBottom": "25px",
        duration: 0.3,
        ease: "power2.in",
        color: "white"
      });
    }
  };

  // ESCRITORIO: Hover normal
  link.addEventListener('mouseenter', playEnterAnim);
  link.addEventListener('mouseleave', playLeaveAnim);

  // MÓVIL/TOUCH: Al tocar
  link.addEventListener('pointerdown', () => {
    playEnterAnim();
    
    // Si es un link que NO despliega nada (como "Inicio"), 
    // queremos que se limpie si el usuario arrastra el dedo fuera.
    link.addEventListener('pointerup', playLeaveAnim, { once: true });
    link.addEventListener('pointercancel', playLeaveAnim, { once: true });
  });
});