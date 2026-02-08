async function iniciarHoverFondos() {

    const bg = document.getElementById('bg-dynamic');
    let currentBg = null;

    document.querySelectorAll('td').forEach(celda => {

        celda.addEventListener('mouseenter', () => {
            const cellBg = getComputedStyle(celda).backgroundImage;

            if (!cellBg || cellBg === 'none' || cellBg === currentBg) return;

            currentBg = cellBg;

            gsap.to(bg, {
                opacity: 0,
                duration: 0.25,
                onComplete: () => {
                    bg.style.backgroundImage = cellBg;

                    gsap.to(bg, {
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            });

            gsap.to(celda, {
                scale: 1.05,
                duration: 0.25,
                ease: "power2.out"
            });
        });

        celda.addEventListener('mouseleave', () => {
            gsap.to(bg, {
                opacity: 0,
                duration: 0.25
            });

            gsap.to(celda, {
                scale: 1,
                duration: 0.25
            });

            currentBg = null;
        });
    });
}
