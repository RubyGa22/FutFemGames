const buttons = document.querySelectorAll('.game-button');
import { hoverSound } from "../sounds.js";

// Seteamos las variables iniciales en el body
gsap.set(document.body, {
  "--bg-blur": "0px",
  "--bg-brightness": 0.6,
  "--bg-scale": 1.1
});

buttons.forEach(card => {
  // ENTRAR
  card.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();

    // Animamos las variables del body
    gsap.to(document.body, {
      "--bg-blur": "6px",
      "--bg-brightness": 0.45,
      "--bg-scale": 1.05,
      duration: 0.5,
      ease: "power2.out"
    });

    // Desvanecer los demás botones
    buttons.forEach(other => {
      if (other !== card) {
        gsap.to(other, { opacity: 0.3, duration: 0.3 });
      }
    });

    gsap.to(card, { scale: 1.05, duration: 0.3 });
  });

  // SALIR
  card.addEventListener('mouseleave', () => {
    // Restauramos las variables del body
    gsap.to(document.body, {
      "--bg-blur": "0px",
      "--bg-brightness": 0.6,
      "--bg-scale": 1.1,
      duration: 0.5,
      ease: "power2.out"
    });

    gsap.to(card, { scale: 1, duration: 0.3 });

    buttons.forEach(other => {
      gsap.to(other, { opacity: 1, duration: 0.3 });
    });
  });
});