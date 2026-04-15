const db = require('../config/db');

const getUsuarioPorNombre = async (usuario) => {
    const [rows] = await db.query(
        'SELECT id, usuario, password, nombre FROM usuarios WHERE usuario = ?',
        [usuario]
    );
    return rows[0];
};

module.exports = {
    getUsuarioPorNombre
};