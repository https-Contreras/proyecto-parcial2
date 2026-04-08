const pool = require('../config/db');

// 1. Obtener todos los empleados)
const obtenerTodos = async () => {
    const [rows] = await pool.execute(`
        SELECT id, nombre_completo, departamento, correo 
        FROM empleados 
        ORDER BY nombre_completo ASC
    `);
    return rows;
};

// 2. Obtener un empleado por su ID (Útil para la ruta de detalle de empleado)
const obtenerPorId = async (id) => {
    const [rows] = await pool.execute(`
        SELECT id, nombre_completo, departamento, correo, fecha_registro
        FROM empleados 
        WHERE id = ?
    `, [id]);
    
    // Retornamos el primer elemento (el objeto del empleado) o undefined si no existe
    return rows[0];
};

module.exports = {
    obtenerTodos,
    obtenerPorId
};