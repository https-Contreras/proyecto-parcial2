const express = require('express');
const router = express.Router();
const equiposController = require('../controllers/equipos.controller');

// Ruta GET: http://localhost:3000/api/equipos
router.get('/listar', equiposController.obtenerEquipos);

// Ruta POST: http://localhost:3000/api/equipos
router.post('/crear', equiposController.crearEquipo);

module.exports = router;