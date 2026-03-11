const navLinks = document.querySelectorAll('li a');
let persistentLink = null; // Guardará el enlace del dropdown activo (Wiki)

const playEnterAnim = (el) => {
  if (!el) return;
  gsap.killTweensOf(el);
  gsap.to(el, {
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

const playLeaveAnim = (el) => {
  if (!el) return;
  if (!el.classList.contains("active") && el !== persistentLink) {
    gsap.killTweensOf(el);
    gsap.to(el, {
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

navLinks.forEach(link => {
  
  link.addEventListener('mouseenter', () => {
    if (persistentLink && persistentLink !== link) {
      // 1. Comprobar si el link actual es hijo del menú persistente
      const parentLi = persistentLink.closest('li');
      const isSubmenuItem = parentLi.querySelector('.submenu')?.contains(link);

      if (!isSubmenuItem) {
        // --- LÓGICA DE CIERRE AUTOMÁTICO ---
        const submenu = parentLi.querySelector('.submenu');
        if (submenu) submenu.classList.remove('open'); // Oculta el submenú
        
        persistentLink.classList.remove('expanded'); // Rota la flecha de vuelta
        
        const oldLink = persistentLink;
        persistentLink = null; // Liberamos la persistencia
        playLeaveAnim(oldLink); // Animación GSAP de salida para el Wiki
      }
    }
    
    playEnterAnim(link);
  });

  link.addEventListener('mouseleave', () => {
    playLeaveAnim(link);
  });

  link.addEventListener('click', (e) => {
    const parentLi = link.closest('li');
    const submenu = parentLi.querySelector('.submenu');
    
    if (submenu) {
      // Si clicamos en Wiki, lo hacemos persistente
      persistentLink = link;
      link.classList.add('expanded');
      submenu.classList.add('open');
      playEnterAnim(link);
    }
  });
});

// Cerrar si se hace click fuera (seguridad extra)
document.addEventListener('click', (e) => {
  if (persistentLink && !persistentLink.closest('li').contains(e.target)) {
    const parentLi = persistentLink.closest('li');
    parentLi.querySelector('.submenu')?.classList.remove('open');
    persistentLink.classList.remove('expanded');
    
    const oldLink = persistentLink;
    persistentLink = null;
    playLeaveAnim(oldLink);
  }
});