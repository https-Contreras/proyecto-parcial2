const EmpleadosModel = require('../models/empleados.model');

const obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await EmpleadosModel.obtenerTodos();
        res.json({ status: 'success', data: empleados });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al obtener empleados' });
    }
};


const obtenerEmpleadoPorId = async (req, res) => {
    try {
        const { id } = req.params; // Extraemos el ID de la URL
        const empleado = await EmpleadosModel.obtenerPorId(id);

        if (!empleado) {
            return res.status(404).json({ status: 'error', message: 'Empleado no encontrado' });
        }

        res.json({ status: 'success', data: empleado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al obtener empleado' });
    }
};

const crearEmpleado = async (req, res) => {
    try {
        const resultado = await EmpleadosModel.crearEmpleado(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Empleado registrado correctamente',
            insertId: resultado.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al registrar el empleado' });
    }
};

const actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await EmpleadosModel.actualizarEmpleado(id, req.body);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Empleado no encontrado' });
        }
        
        res.json({
            status: 'success',
            message: 'Empleado actualizado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al actualizar el empleado' });
    }
};

module.exports = { 
    obtenerEmpleados, 
    obtenerEmpleadoPorId,
    crearEmpleado,
    actualizarEmpleado 
};