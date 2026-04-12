const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');

router.get('/listar', empleadosController.obtenerEmpleados);
router.get('/detalle/:id', empleadosController.obtenerEmpleadoPorId);
router.post('/crear', empleadosController.crearEmpleado);
router.put('/actualizar/:id', empleadosController.actualizarEmpleado);

module.exports = router;