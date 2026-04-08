const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');

router.get('/listar', empleadosController.obtenerEmpleados);
router.get('/detalle/:id', empleadosController.obtenerEmpleadoPorId);
module.exports = router;