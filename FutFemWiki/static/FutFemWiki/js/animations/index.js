//gsap.registerPlugin(ScrollTrigger);

gsap.from("#items-container", {
  scrollTrigger: {
    trigger: "#items-container",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  },
  opacity: 0,
  y: 100
});