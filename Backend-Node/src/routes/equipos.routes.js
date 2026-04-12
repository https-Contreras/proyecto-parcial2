const express = require('express');
const router = express.Router();
const equiposController = require('../controllers/equipos.controller');

// Ruta GET: http://localhost:3000/api/equipos/listar
router.get('/listar', equiposController.obtenerEquipos);

// Ruta GET x ID: http://localhost:3000/api/equipos/:id
router.get('/:id', equiposController.obtenerEquipoById);

// Ruta POST: http://localhost:3000/api/equipos/crear
router.post('/crear', equiposController.crearEquipo);

//RUTA PUT: http://localhost:3000/api/equipos/actualizar/:id
router.put('/actualizar/:id', equiposController.actualizarEquipo);

//RUTA DELETE: http://localhost:3000/api/equipos/eliminar/:id
router.delete('/eliminar/:id', equiposController.eliminarEquipo);

module.exports = router;