const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
// Inicializar la aplicación
const app = express();
const ALLOWED_ORIGINS = ["http://localhost:4200", "http://127.0.0.1:4200"]; // Agrega aquí la URL de tu frontend Angular


// Middlewares requeridos
app.use(cors({
  origin: function (origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    optionsSuccessStatus: 200,
  })); // Permite peticiones del frontend
app.use(express.json()); // Permite al servidor entender datos en formato JSON
app.use(express.urlencoded({ extended: true }));

// Puerto dinámico (Render asignará uno, si no, usa el 3000 localmente)
const PORT = process.env.PORT || 3000;

// Ruta de prueba inicial
app.get('/api/test', (req, res) => {
    res.json({
        status: 'success',
        message: '¡El servidor de Gestión de Activos TI está vivo'
    });
});


//rutas de equipos
const equiposRoutes = require('./routes/equipos.routes');
app.use('/api/equipos', equiposRoutes);

const empleadosRoutes = require('./routes/empleados.routes');
app.use('/api/empleados', empleadosRoutes);

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
