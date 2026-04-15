const usuariosModel = require('../models/usuarios.model');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;
        if (!usuario || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
        }

        const user = await usuariosModel.getUsuarioPorNombre(usuario);

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Comparar la contraseña en texto plano con el hash guardado en DB
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Simulación: aquí asignaríamos JWT
        res.json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                usuario: user.usuario,
                nombre: user.nombre
            },
            token: 'simulated_jwt_token_12345'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor al iniciar sesión' });
    }
};

module.exports = {
    login
};