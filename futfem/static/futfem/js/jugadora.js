// static/js/api/jugadoras.js
let min = 1;
let max = 476;
let debounceTimer;

/**
 * Obtener jugadoras al escribir en un input
 * @param {event}
 * @returns {}
 */
export async function handleAutocompletePlayer(event){
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById("sugerencias");

    // Limpiamos el temporizador previo cada vez que se pulsa una tecla
    clearTimeout(debounceTimer);

    // Si el texto es corto, vaciamos la lista y salimos
    if (texto.length <= 2) {
        suggestionsList.innerHTML = '';
        return;
    }

    debounceTimer = setTimeout(async () => {
        const url = `/api/jugadoraxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();

            // Evitar duplicados
            const idsMostrados = new Set();

            results.forEach(jugadora => {
                const { id_jugadora, Nombre_Completo, imagen, Nacimiento, Apodo } = jugadora;

                if (!idsMostrados.has(id_jugadora)) { // Verificar que no se haya mostrado este ID
                    idsMostrados.add(id_jugadora);

                    const listItem = document.createElement('li');
                    listItem.classList.add('suggestion-item');

                    listItem.innerHTML = `
                        <img src="/${imagen}" alt="${Nombre_Completo}" class="jugadora-img">
                        <div class="jugadora-info">
                            <strong>${Nombre_Completo}</strong>
                            <!--<p>Nacimiento: ${Nacimiento}</p>-->
                        </div>
                    `;

                    listItem.addEventListener('click', () => {
                        // Insertar el nombre en el input al hacer clic
                        input.value = Nombre_Completo;
                        input.setAttribute('data-id', id_jugadora);
                        suggestionsList.innerHTML = '';  // Limpiar las sugerencias
                        /*document.getElementById("jugadora_id").value = id_jugadora;
                        loadPlayerById(id_jugadora);  // Cargar los detalles de la jugadora*/
                    });

                    suggestionsList.appendChild(listItem);
                }
            });
        } catch (error) {
            console.error('Error al buscar la jugadora:', error);
        }
    });
}
/**
 * Obtener nacionalidad de una jugadora por ID
 * @param {number|string} id
 * @returns {number|string} id
 */
export async function fetchJugadoraNacionalidadById(id) {
    try {
        const response = await fetch(`/api/jugadora_pais?id=${id}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetchJugadoraNacionalidad:", error);
        return null;
    }
}
/**
 * Obtener trayectoria de una jugadora por ID
 * @param {number|string} id
 * @returns {Promise<Array>}
 */
export async function fetchJugadoraTrayectoriaById(id) {
try {
        const response = await fetch(`/api/jugadora_trayectoria?id=${id}`);
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        // Normalizar: siempre devolver array
        if (!Array.isArray(data)) {
            return [];
        }

        return data;
    } catch (error) {
        console.error("Error fetchJugadoraTrayectoria:", error);
        return [];
    }
}

/**
 * Obtener compañeras de una jugadora por ID
 * @param {number|string} id
 * @returns {Promise<Array>}
 */
export async function fetchJugadoraCompanyerasById(id, limite) {
    try {
        const response = await fetch(`/api/jugadora_companyeras?id_jugadora=${id}&limite=${limite}`);
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        // Normalizar: siempre devolver array
        if (!Array.isArray(data)) {
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error al cargar la jugadora:', error);
        return [];
    }
}

/**
 * Obtener datos de una jugadora por ID
 * @param {number|string} id
 * @returns {Promise<Array>}
 */
export async function fetchJugadoraById(id) {
    try {
        const urlj = `../api/jugadoraxid?id=${encodeURIComponent(id)}`;

        const response = await fetch(urlj);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

            if (data !== null) {
                // Solo un resultado, no es necesario mostrar el modal
                return data;
            } else {
                // Múltiples resultados, mostrar el modal
                return null;
            }

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}


export async function cargarJugadoraDatos(id, ganaste){
    try {
        const url = `/api/jugadora_datos?id=${encodeURIComponent(id)}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        //console.log('Datos recibidos:', data);

            if (data !== null) {
                // Solo un resultado, no es necesario mostrar el modal
                //console.log(data.success)
                return data.success
            } else {
                // Múltiples resultados, mostrar el modal
                return null;
            }

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

export async function fetchRandomPlayer() {
    const response = await fetch("/api/random-player/")
    return await response.json()
}

/** 
 * Obtener TODAS las jugadoras
 * @param
 * @returns {Promise<array>}
 */
export async function fetchAllJugadoras() {
    try{
        const url = `/api/jugadoras`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        if (data !== null) {
            return data.success;
        } else {
            return null;
        }

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

/** 
 * Obtener edad jugadora
 * @param {string} fechaNacimiento
 * @returns {Promise<array>}
 */
export function calcularEdad(fechaNacimiento) {
    const hoy = new Date(); // Fecha actual
    const nacimiento = new Date(fechaNacimiento); // Convertir la fecha de nacimiento a un objeto Date
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Calcular la diferencia de años
    const mes = hoy.getMonth() - nacimiento.getMonth(); // Calcular la diferencia de meses

    // Ajustar la edad si el cumpleaños de este año aún no ha ocurrido
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}

export function formatearValorMercado(valor) {
    if (!valor || isNaN(valor)) return 'N/A';
    
    const num = parseFloat(valor);
    
    if (num >= 1000000) {
        // Millones: 1.5M (con 1 decimal si no es exacto)
        return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M €';
    } else if (num >= 1000) {
        // Miles: 250k
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'k €';
    }
    
    return num + ' €';
};

/** * Obtener trofeos individuales de una jugadora por ID
 * @param {*} id 
 * @return {Promise<Array>}
 */
function fetchJugadoraTrofeosIndividualesById(id) {
    return fetch(`/api/jugadora_trofeos_individuales?jugadora=${id}`)
        .then(response => response.json())
        .then(data => data.success)
        .catch(error => {
            console.error('Error fetching jugadora trofeos individuales:', error);
            throw error;
        });
}

/**
 * Obtener palmarés de una jugadora por ID
 * @param {*} id 
 * @return {Promise<{equipo: Array, individual: Array}>}
 */
// Ahora recibe 'trayectoria' como segundo argumento
export async function fetchJugadoraPalmaresById(id, trayectoria) {
    console.log('Fetching palmares for jugadora ID:', id);
    
    // ELIMINADO: const trayectoria = await fetchJugadoraTrayectoriaById(id); <-- Esto sobraba
    
    const palmaresIndividualPromise = fetchJugadoraTrofeosIndividualesById(id);
    const { fetchEquipoPalmaresByTemporadas } = await import("./equipos.js"); // Importar la función necesaria para el palmarés de equipo

    const promesasPalmaresEquipo = trayectoria.map(etapa => {
        const anioInicio = etapa.fecha_inicio.substring(0, 4);
        const anioFin = etapa.fecha_fin ? etapa.fecha_fin.substring(0, 4) : 'act';
        return fetchEquipoPalmaresByTemporadas(etapa.equipo, `${anioInicio}-${anioFin}`);
    });

    const [palmaresIndividual, palmaresEquipo] = await Promise.all([
        palmaresIndividualPromise,
        Promise.all(promesasPalmaresEquipo)
    ]);

    return { 
        equipo: palmaresEquipo,
        individual: palmaresIndividual
    };
}



export async function obtenerValorMercado(urlJugador) {
    console.log(urlJugador)
    try {
        const response = await fetch("/api/jugadora-valor-mercado/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: urlJugador
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Error:", data.error);
        } else {
            console.log("Nombre:", data);
            console.log("Valor de mercado:", data.market_value);

            // Ejemplo: mostrarlo en el HTML
            /*document.getElementById("nombre").innerText = data.name;
            document.getElementById("valor").innerText = data.market_value;*/
        }

        return data;

    } catch (error) {
        console.error("Error en fetch:", error);
    }
}


export async function fetchClubPlayers(clubUrl) {
    try {
        const response = await fetch(`/api/club_players/?club_url=${encodeURIComponent(clubUrl)}`);
        const data = await response.json();

        if (data.error) {
            console.error("Error:", data.error);
            return [];
        }

        return data.player_urls;
    } catch (err) {
        console.error("Fetch fallido:", err);
        return [];
    }
}

// Ejemplo de uso:
/*const clubUrl = "https://www.soccerdonna.de/de/fc-bayern-muenchen/profil/verein_1241.html";
const urls = await fetchClubPlayers(clubUrl);
console.log("URLs de jugadoras:", urls);*/

