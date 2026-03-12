const navLinks = document.querySelectorAll('li a');
let persistentLink = null; // Guardará el enlace del dropdown activo

// 1. Modificamos las funciones para que acepten un "el" (elemento)
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
  // Solo animamos la salida si NO es el link activo por URL y NO es el link persistente
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
    // LÓGICA DE EXCLUSIÓN:
    if (persistentLink && persistentLink !== link) {
      // Comprobamos si el 'link' actual está DENTRO del submenú del persistentLink
      const isSubmenuItem = persistentLink.closest('li').querySelector('.submenu')?.contains(link);

      if (!isSubmenuItem) {
        // Si NO es parte de su submenú, liberamos el persistentLink y lo animamos hacia afuera
        const oldLink = persistentLink;
        persistentLink = null; 
        playLeaveAnim(oldLink);
      }
    }
    
    playEnterAnim(link);
  });

  link.addEventListener('mouseleave', () => {
    playLeaveAnim(link);
  });

  link.addEventListener('click', (e) => {
    // Si el link tiene un submenú (es el del Wiki), lo volvemos persistente
    const hasSubmenu = link.closest('li').querySelector('.submenu');
    if (hasSubmenu) {
      persistentLink = link;
      playEnterAnim(link);
    }
  });

  // MÓVIL
  link.addEventListener('pointerdown', () => {
    playEnterAnim(link);
    link.addEventListener('pointerup', () => playLeaveAnim(link), { once: true });
    link.addEventListener('pointercancel', () => playLeaveAnim(link), { once: true });
  });
});

// Opcional: Cerrar persistencia si se hace click fuera del menú
document.addEventListener('click', (e) => {
  if (persistentLink && !persistentLink.closest('li').contains(e.target)) {
    const oldLink = persistentLink;
    persistentLink = null;
    playLeaveAnim(oldLink);
  }
});