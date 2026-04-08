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

module.exports = { obtenerEmpleados, obtenerEmpleadoPorId };