import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Inventario } from './pages/inventario/inventario';
import { Empleados } from './pages/empleados/empleados';
import { DetalleEmpleado } from './pages/detalle-empleado/detalle-empleado';
import { AltaEquipo } from './pages/alta-equipo/alta-equipo';
import { Contacto } from './pages/contacto/contacto';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'equipos', component: Inventario },
    { path: 'equipos/crear', component: AltaEquipo },
    { path: 'empleados', component: Empleados },
    { path: 'empleado/:id', component: DetalleEmpleado },
    { path: 'contacto', component: Contacto },
    { path: '**', component: NotFound }
];