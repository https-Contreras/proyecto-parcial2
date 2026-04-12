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

// 3. Crear un nuevo empleado
const crearEmpleado = async (datos) => {
    const { nombre_completo, departamento, correo } = datos;
    const [result] = await pool.execute(`
        INSERT INTO empleados (nombre_completo, departamento, correo) 
        VALUES (?, ?, ?)
    `, [nombre_completo, departamento, correo]);
    return result;
};

// 4. Actualizar un empleado
const actualizarEmpleado = async (id, datos) => {
    const { nombre_completo, departamento, correo } = datos;
    const [result] = await pool.execute(`
        UPDATE empleados 
        SET nombre_completo = ?, departamento = ?, correo = ?
        WHERE id = ?
    `, [nombre_completo, departamento, correo, id]);
    return result;
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crearEmpleado,
    actualizarEmpleado
};