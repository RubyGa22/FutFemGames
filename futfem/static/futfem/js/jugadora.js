// static/js/api/jugadoras.js
import { fetchEquipoPalmaresByTemporadas } from "./equipos.js";
let min = 1;
let max = 476;
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
export async function fetchJugadoraCompanyerasById(id) {
    try {
        const response = await fetch(`../api/jugadora_companyeras?id_jugadora=${id}`);
        
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
        const url = `../api/jugadoras`;

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
export async function fetchJugadoraPalmaresById(id) {
    console.log('Fetching palmares for jugadora ID:', id);
    const trayectoria = await fetchJugadoraTrayectoriaById(id);
    const palmaresIndividual = await fetchJugadoraTrofeosIndividualesById(id);
    let palmaresEquipo = [];
    for(const etapa of trayectoria){
        const palmares = await fetchEquipoPalmaresByTemporadas(etapa.equipo, etapa.años);
        palmaresEquipo.push(palmares);
    }
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
const clubUrl = "https://www.soccerdonna.de/de/fc-bayern-muenchen/profil/verein_1241.html";
const urls = await fetchClubPlayers(clubUrl);
console.log("URLs de jugadoras:", urls);

