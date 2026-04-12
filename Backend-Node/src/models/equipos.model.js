const pool = require('../config/db');

// 1. Obtener todos los equipos (Con JOIN a empleados)
const obtenerTodos = async () => {
    // Usamos un LEFT JOIN por si hay equipos en almacén (empleado_id = NULL)
    const [rows] = await pool.execute(`
        SELECT 
            eq.id, 
            eq.numero_serie, 
            eq.tipo_equipo, 
            eq.marca, 
            eq.modelo, 
            eq.estado,
            em.nombre_completo AS asignado_a
        FROM equipos eq
        LEFT JOIN empleados em ON eq.empleado_id = em.id
        ORDER BY eq.id DESC
    `);
    return rows;
};

// 1.5 Obtener un equipo por ID
const obtenerPorId = async (id) => {
    const [rows] = await pool.execute(`
        SELECT 
            eq.id, 
            eq.numero_serie, 
            eq.tipo_equipo, 
            eq.marca, 
            eq.modelo, 
            eq.estado,
            eq.empleado_id,
            em.nombre_completo AS asignado_a
        FROM equipos eq
        LEFT JOIN empleados em ON eq.empleado_id = em.id
        WHERE eq.id = ?
    `, [id]);
    return rows;
};

// 2. Crear un nuevo equipo (El POST que pide el PDF)
const crearEquipo = async (datos) => {
    const { numero_serie, tipo_equipo, marca, modelo, estado, empleado_id } = datos;
    
    // El ? previene la inyección SQL
    const [result] = await pool.execute(`
        INSERT INTO equipos 
        (numero_serie, tipo_equipo, marca, modelo, estado, empleado_id) 
        VALUES (?, ?, ?, ?, ?, ?)
    `, [numero_serie, tipo_equipo, marca, modelo, estado || 'Disponible', empleado_id || null]);
    
    return result;
};

// 3. Actualizar un equipo
const actualizarEquipo = async (id, datos) => {
    const { numero_serie, tipo_equipo, marca, modelo, estado, empleado_id } = datos;
    
    const [result] = await pool.execute(`
        UPDATE equipos 
        SET numero_serie = ?, tipo_equipo = ?, marca = ?, modelo = ?, estado = ?, empleado_id = ?
        WHERE id = ?
    `, [numero_serie, tipo_equipo, marca, modelo, estado, empleado_id || null, id]);
    
    return result;
};

// 4. Eliminar un equipo
const eliminarEquipo = async (id) => {
    const [result] = await pool.execute(`
        DELETE FROM equipos 
        WHERE id = ?
    `, [id]);
    
    return result;
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crearEquipo,
    actualizarEquipo,
    eliminarEquipo
};