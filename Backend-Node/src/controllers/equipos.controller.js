const EquiposModel = require('../models/equipos.model');

// Obtener todos los equipos (Para el GET)
const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await EquiposModel.obtenerTodos();
        res.json({
            status: 'success',
            data: equipos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al obtener los equipos' });
    }
};

// Obtener un equipo por ID (Para el GET)
const obtenerEquipoById = async (req, res) => {
    try {
        const { id } = req.params;
        const equipo = await EquiposModel.obtenerPorId(id);
        
        if (equipo.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Equipo no encontrado' });
        }
        
        res.json({
            status: 'success',
            data: equipo[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al obtener el equipo' });
    }
};

// Crear un nuevo equipo (Para el POST)
const crearEquipo = async (req, res) => {
    try {
        // req.body contiene los datos que manda el formulario de Angular
        const resultado = await EquiposModel.crearEquipo(req.body);
        
        res.status(201).json({
            status: 'success',
            message: 'Equipo registrado correctamente',
            insertId: resultado.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al registrar el equipo' });
    }
};

// Actualizar un equipo (Para el PUT)
const actualizarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await EquiposModel.actualizarEquipo(id, req.body);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Equipo no encontrado para actualizar' });
        }
        
        res.json({
            status: 'success',
            message: 'Equipo actualizado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al actualizar el equipo' });
    }
};

// Eliminar un equipo (Para el DELETE)
const eliminarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await EquiposModel.eliminarEquipo(id);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Equipo no encontrado para eliminar' });
        }
        
        res.json({
            status: 'success',
            message: 'Equipo eliminado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al eliminar el equipo' });
    }
};

module.exports = {
    obtenerEquipos,
    obtenerEquipoById,
    crearEquipo,
    actualizarEquipo,
    eliminarEquipo
};