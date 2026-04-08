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

module.exports = {
    obtenerEquipos,
    crearEquipo
};