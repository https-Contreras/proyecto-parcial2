const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// Endpoint de login -> POST /api/usuarios/login
router.post('/login', usuariosController.login);

module.exports = router;