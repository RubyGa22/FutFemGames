const bg = document.getElementById('bg-dynamic');
let currentBg = null;
const buttons = document.querySelectorAll('.game-button'); 
const rows = document.querySelectorAll('.row'); 
let scrollPos = 0; const rowHeight = rows[0].offsetHeight; 
const maxScroll = (rows.length - 1) * rowHeight;

buttons.forEach(card => {
  const bgImg = card.dataset.bg;

  // ENTRAR
  card.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();

    if (bgImg !== currentBg) {
      currentBg = bgImg;

      gsap.to(bg, { 
        opacity: 0, 
        scale: 1.1, 
        filter: "blur(8px)", 
        duration: 0.25, 
        ease: "power2.out", 
        onComplete: () => { 
          bg.style.backgroundImage = `url(${bgImg})`; 
          gsap.to(bg, { 
            opacity: 1, 
            scale: 1, 
            filter: "blur(0px)", 
            duration: 0.6, 
            ease: "power2.out" 
          }); 
        } 
      });
    }
    // 🔥 desvanecer los demás botones 
    buttons.forEach(other => { if (other !== card) { gsap.to(other, { opacity: 0.3, duration: 0.3, ease: "power2.out" }); } });

    gsap.to(card, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  // CLICK
  card.addEventListener('mousedown', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });

  // SALIR
  card.addEventListener('mouseleave', () => {
    gsap.to(bg, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        bg.style.backgroundImage = ``;

        gsap.to(bg, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });

    gsap.to(card, {
      scale: 1,
      duration: 0.3
    });

    // 🔥 restaurar opacidad de todos los botones 
    buttons.forEach(other => { gsap.to(other, { opacity: 1, duration: 0.3, ease: "power2.out" }); });

    currentBg = null;
  });
});






buttons.forEach((card) => {
  card.addEventListener("mousemove", handleMouseMove);
});

function handleMouseMove(e) {
  const rect = this.getBoundingClientRect();
  const mouseX = e.clientX - rect.left - rect.width / 2;
  const mouseY = e.clientY - rect.top - rect.height / 2;

  let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

  angle = (angle + 360) % 360;

  this.style.setProperty("--start", angle + 60);
}


