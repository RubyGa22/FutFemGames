let usuario = await getSesion();
usuario = usuario.id;
console.log(usuario)
export async function getSesion() {
    try {
        const respuesta = await fetch('/accounts/sesion/');
        if (!respuesta.ok) throw new Error('No se pudo obtener la sesión');

        const data = await respuesta.json();
        return data ?? null;
    } catch (error) {
        //console.error("Error al obtener la sesión:", error);
        return null;
    }
}

export async function obtenerRacha(juego){
    let rachaJuego = null;

    if (!usuario) {
        rachaJuego = obtenerRachaCookies(juego);
        displayRacha(rachaJuego, juego);
        return rachaJuego;
    }else{
        rachaJuego = await obtenerRachaUser(usuario, juego);
       // displayRacha(rachaJuego.juego.racha_actual, juego);
        return rachaJuego;
    }

    
}

export async function updateRacha(juego, condicion) {

    if (!usuario) {
        updateRachaCookies(juego, condicion);
    }else{
        await updateRachaUser(juego, condicion);
    }
}

function obtenerRachaCookies(juego){
    const rachaArray = localStorage.getItem('rachas');

    if (!rachaArray) {
        localStorage.setItem('rachas', JSON.stringify({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}));
    }

    return rachaArray ? JSON.parse(rachaArray)[juego] : 0;
}

async function obtenerRachaUser(user, juego) {
    try {

        let url = `/accounts/racha?usuario=${user}`;
        if (juego) url += `&juego=${juego}`;

        console.log("URL generada:", url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        let data = await response.json();
        console.log('Datos recibidos:', data);

        if (!Array.isArray(data)) {
            data = [data];  // forzamos que siempre sea array
        }

        data.forEach(r => {
            const rachaNum = Number(r.racha_actual) || 0;
            const juegoId = Number(r.juego_id);
            //data = rachaNum;
        });


        return data ?? null;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return null;
    }
}

function updateRachaCookies(juego, condicion) {
    const rachaArray = localStorage.getItem('rachas');

    if (condicion === 0) {
        const nuevasRachas = { ...JSON.parse(rachaArray), [juego]: 0 };
        localStorage.setItem('rachas', JSON.stringify(nuevasRachas));
    } else {
        const rachaActual = rachaArray ? JSON.parse(rachaArray)[juego] : 0;
        const nuevasRachas = { ...JSON.parse(rachaArray), [juego]: rachaActual + 1 };
        localStorage.setItem('rachas', JSON.stringify(nuevasRachas));
    }
}

async function updateRachaUser(juego, condicion) {
    let rachaActual;
    try {
        // Verificar la condición, si es 0, establecer la racha como 0
        if (condicion === 0) {
            rachaActual = 0;
        }else if(condicion === 2){
            rachaActual = await obtenerRacha(juego);
            rachaActual = rachaActual[0].racha_actual; // Asumimos que 'obtenerRacha' devuelve un array
        } else {
            // Si la condición no es 0, obtenemos la racha actual
            rachaActual = await obtenerRacha(juego);
            rachaActual = rachaActual[0].racha_actual; // Asumimos que 'obtenerRacha' devuelve un array
            rachaActual = rachaActual + 1;
        }

        // Crear una nueva instancia de FormData
        const formData = new FormData();

        // Agregar los datos al FormData
        formData.append('racha', rachaActual);
        formData.append('juego', juego);
        formData.append('user', parseInt(usuario, 10));  // Convertir usuario a entero

        console.log(formData); // Verificar el contenido del FormData (para debugging)

        // Realizamos el POST con fetch
        const response = await fetch('/accounts/juego_racha', {
            method: 'POST',
            body: formData // Usar FormData directamente
        });

        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error al actualizar la racha: ${response.statusText}`);
        }

        // Si la respuesta es exitosa, puedes hacer algo con los datos
        const responseData = await response.json();
        console.log('Racha actualizada:', responseData);
        return responseData;

    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return null;
    }
}


export function displayRacha(racha, juego){
    const displayJuego = document.getElementById('racha-'+juego)
    if(racha === 0 || !racha){
        displayJuego.style.display = 'none';
    }else{
        displayJuego.style.display = '100%';
        displayJuego.textContent = racha;
    }
}