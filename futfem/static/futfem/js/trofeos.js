export async function fetchTrofeosById(ids){
    // Generar la URL para obtener las banderas con IDs como parámetros de consulta
    const response = await fetch(`../api/trofeosxid?id[]=${ids.join('&id[]=')}`)
    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json();
    if (data !== null) {
        return data.success;
    } else {
        return null;
    }
}