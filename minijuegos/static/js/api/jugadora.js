// static/js/api/jugadoras.js

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
async function fetchJugadoraById(id) {
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