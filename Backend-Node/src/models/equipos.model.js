const pool = require('../config/db');

const crearEquipo = async (datosEquipo) => {
    // Extraemos los datos que nos mandará el formulario de Angular
    const { numero_serie, tipo_equipo, marca, modelo, direccion_ip, direccion_mac, estado } = datosEquipo;
    
    // Usamos ? para evitar inyección SQL (buenas prácticas de seguridad)
    const [result] = await pool.execute(
        `INSERT INTO equipos (numero_serie, tipo_equipo, marca, modelo, direccion_ip, direccion_mac, estado) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [numero_serie, tipo_equipo, marca, modelo, direccion_ip, direccion_mac, estado || 'Activo']
    );
    
    return result;
};

// Aquí agregaremos más funciones después (obtener todos, actualizar, etc.)
module.exports = {
    crearEquipo
};