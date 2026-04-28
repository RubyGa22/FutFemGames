gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#nosotros-wrapper",
    start: "top top",
    end: "+=100%",
    scrub: true,
    pin: true
  }
});

// estado inicial
gsap.set("#nosotros-1", { rotateX: 0 });
gsap.set("#nosotros-2", { rotateX: -90 });

// giro tipo carta
tl.to("#nosotros-1", {
  rotateX: 90,
  transformOrigin: "top center",
  ease: "none"
}, 0);

tl.to("#nosotros-2", {
  rotateX: 0,
  transformOrigin: "bottom center",
  ease: "none"
}, 0);
