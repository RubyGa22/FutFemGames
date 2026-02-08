const navLinks = document.querySelectorAll('#main-nav a');

navLinks.forEach(link => {

  link.addEventListener('mouseenter', () => {

    // cancelar animaciones previas 
    gsap.killTweensOf(link);

    // flechas aparecen
    gsap.to(link, {
      "--arrowOpacity": 1,
      "--arrowScale": 1,
      "--arrowYTop": 0,
      "--arrowYBottom": 0,
      duration: 0.35,
      ease: "power2.out"
    });

    // color del texto
    gsap.to(link, {
      color: "var(--color-primario)",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  link.addEventListener('mouseleave', () => {

    // cancelar animaciones previas 
    gsap.killTweensOf(link);

    // flechas desaparecen
    if (!link.classList.contains("active")) {
      gsap.to(link, {
        "--arrowOpacity": 0,
        "--arrowScale": 0.5,
        "--arrowYTop": -6,
        "--arrowYBottom": 6,
        duration: 0.3,
        ease: "power2.inOut"
      });

      gsap.to(link, {
        color: "white",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });
});



const logo = document.querySelector(".navbar-brand1 img");

logo.addEventListener("mouseenter", () => {
  gsap.to(logo, {
    rotateY: 360,
    duration: 1,
    ease: "power2.inOut"
  });
});

logo.addEventListener("mouseleave", () => {
  gsap.to(logo, {
    rotateY: 0,
    duration: 1,
    ease: "power2.inOut"
  });
});
