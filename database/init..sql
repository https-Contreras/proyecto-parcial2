-- database/init.sql

-- 1. Estructura de Tablas
CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    departamento VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_serie VARCHAR(50) NOT NULL UNIQUE,
    tipo_equipo VARCHAR(50) NOT NULL, 
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    estado VARCHAR(20) DEFAULT 'Disponible',
    empleado_id INT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id) ON DELETE SET NULL
);

-- 2. Datos de Prueba
INSERT INTO empleados (nombre_completo, departamento, correo) VALUES
('Jael Contreras', 'Sistemas', 'jael.contreras@empresa.com'),
('Atenea López', 'Desarrollo', 'atenea.lopez@empresa.com'),
('Romeo García', 'Soporte TI', 'romeo.garcia@empresa.com'),
('Salvador Martínez', 'Infraestructura', 'salvador.martinez@empresa.com'),
('Nicole Silva', 'Recursos Humanos', 'nicole.silva@empresa.com');

INSERT INTO equipos (numero_serie, tipo_equipo, marca, modelo, estado, empleado_id) VALUES
('LT-DELL-001', 'Laptop', 'Dell', 'Latitude 5420', 'Asignado', 1),
('SRV-HP-002', 'Servidor', 'HP', 'ProLiant DL380', 'Asignado', 1),
('LT-MAC-003', 'Laptop', 'Apple', 'MacBook Pro M2', 'Asignado', 2),
('PC-LEN-004', 'Desktop', 'Lenovo', 'ThinkCentre M70', 'Asignado', 3),
('MON-LG-005', 'Monitor', 'LG', 'UltraWide 29', 'Asignado', 4),
('PRN-EPS-006', 'Impresora', 'Epson', 'EcoTank L14150', 'Asignado', 5),
('SW-CIS-007', 'Switch', 'Cisco', 'Catalyst 2960', 'Disponible', NULL),
('LT-HP-008', 'Laptop', 'HP', 'EliteBook 840', 'Mantenimiento', NULL),
('RTR-MK-009', 'Router', 'MikroTik', 'Cloud Core CCR1009', 'Disponible', NULL);