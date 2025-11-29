async function obtenerIdPais(nombre) {
    try {
        // Realizar la solicitud fetch
        const response = await fetch(`../api/jugadora_pais?nombre=${encodeURIComponent(nombre)}`);

        // Verificar que la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        // Verificar si hubo un error en el JSON recibido
        if (data.error) {
            throw new Error(data.error);
        }

        // Comprobar si data es un array y contiene al menos un objeto
        if (Array.isArray(data) && data.length > 0 && data[0].Pais) {
            return parseInt(data[0].Pais, 10); // Convertir a entero
        } else if(data){
            return data;
        } else {
            console.warn('ID del país no proporcionado en la respuesta:', data);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el ID del país:', error);
        return null;
    }
}

// Función que compara el ID del país con los ID de las imágenes en la tabla
const columnaContadores = {
    "Equipo4": 0,
    "Equipo5": 0,
    "Equipo6": 0
};
let ultimaJugadoraId = null; // Aquí guardamos la ID de la última jugadora verificada
function verificarNacionalidad(equipos, idJugadoraActual) {
    const columnas = ["Equipo4", "Equipo5", "Equipo6"];
    let columnasEncontradas = [];

    // Si es una jugadora nueva, reiniciar contadores
    if (ultimaJugadoraId !== idJugadoraActual) {
        columnas.forEach(id => columnaContadores[id] = 0);
        ultimaJugadoraId = idJugadoraActual;
    }

    // Limpiar resaltado previo
    columnas.forEach(id => {
        const th = document.getElementById(id);
        //if (th) th.classList.remove("resaltado");
    });

    // Revisar todas las columnas
    columnas.forEach((id, index) => {
        if (columnaContadores[id] >= 2) return; // max 2 veces

        const th = document.getElementById(id);
        if (!th) return;

        const imgs = th.querySelectorAll('img');
        const encontrada = equipos.some(equipo => {
            const idClub = equipo.equipo;
            return Array.from(imgs).some(img => {
                return img.className === "club" + idClub;
            });
        });

        if (encontrada) {
            columnaContadores[id]++;
            columnasEncontradas.push(index + 1); // guardo el número de columna
            //th.classList.add("resaltado");
        }
    });

    // Mostrar resultado
    //const resultado = document.getElementById("resultado");
    resultado.textContent = columnasEncontradas.length > 0
        ? `Equipos encontrados en columnas: ${columnasEncontradas.join(", ")}.`
        : `Nacionalidad no encontrada en las columnas.`;
    console.log(`Equipos encontrados en columnas: ${columnasEncontradas.join(", ")}.`)

    return columnasEncontradas;
}


async function obtenerEquipos(nombre) {
    try {
        // Realizar la solicitud fetch
        const response = await fetch(`../api/jugadora_trayectoria?id=${encodeURIComponent(nombre)}`);

        // Verificar que la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        // Verificar si hubo un error en el JSON recibido
        if (data.error) {
            throw new Error(data.error);
        }

        // Comprobar si data es una lista de objetos
        if (Array.isArray(data)) {
            return data; // Devuelve la lista de objetos
        } else {
            console.warn('La respuesta no es una lista válida de objetos:', data);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los equipos:', error);
        return null;
    }
}
// Función que compara el ID del país con los ID de las imágenes en la tabla
function verificarEquipo(equipos, columna) {
    console.log("Equipos para verificar:", equipos);
    const trayectoria = equipos.slice().reverse(); // evitar modificar el original
    const columnas = ["Equipo1", "Equipo2", "Equipo3"];
    let resultadosEncontrados = [];

    for (let equipo of trayectoria) {
        for (let index = 0; index < columnas.length; index++) {
            const th = document.getElementById(columnas[index]);
            if (th) {
                const img = th.querySelector('img');
                if (img && img.className === 'club' + equipo.equipo) {

                    // Calcular fila
                    const fila = index + 1;
                    const idCelda = `c${fila}${columna}`;
                    const td = document.getElementById(idCelda);

                    // Guardar coincidencia
                    resultadosEncontrados.push({
                        fila: fila,
                        columna: columna,
                        equipo: equipo.equipo,
                        foto: equipo.ImagenJugadora || equipo.imagen || null
                    });

                    // (Opcional) marcar visualmente
                    // if (td) td.classList.add("resaltado");
                }
            }
        }
    }

    // Mostrar resultados
    const resultado = document.getElementById("resultado");
    if (resultadosEncontrados.length > 0) {
        const lista = resultadosEncontrados
            .map(r => `c${r.fila},${r.columna}`)
            .join(" | ");
        resultado.textContent = `La jugadora tiene coincidencias en: ${lista}.`;
        return resultadosEncontrados;
    } else {
        resultado.textContent = `No se han encontrado coincidencias.`;
        return [];
    }
}