export function revealValor(playerDiv){
    const p = playerDiv.querySelector("p");

    gsap.fromTo(p, 
        { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
}

export function animarSalida(playerDiv, direction = "left"){
    return gsap.to(playerDiv, {
        x: direction === "left" ? -200 : 200,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in"
    });
}

export function animarEntrada(playerDiv, direction = "right"){
    gsap.set(playerDiv, {
        x: direction === "right" ? 200 : -200,
        autoAlpha: 0
    });

    return gsap.to(playerDiv, {
        x: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out"
    });
}

export function animarContador(elemento, valorFinal, duracion = 1) {
    const obj = { valor: 0 };

    return new Promise(resolve => {
        gsap.to(obj, {
            valor: valorFinal,
            duration: duracion,
            ease: "power2.out",
            onUpdate: function () {
                elemento.textContent = 
                    Math.floor(obj.valor).toLocaleString() + " €";
            },
            onComplete: resolve
        });
    });
}



