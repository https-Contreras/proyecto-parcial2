import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Inventario } from './pages/inventario/inventario';
import { Empleados } from './pages/empleados/empleados';
import { AltaEmpleado } from './pages/alta-empleado/alta-empleado';
import { EditarEmpleado } from './pages/editar-empleado/editar-empleado';
import { DetalleEmpleado } from './pages/detalle-empleado/detalle-empleado';
import { AltaEquipo } from './pages/alta-equipo/alta-equipo';
import { EditarEquipo } from './pages/editar-equipo/editar-equipo';
import { Contacto } from './pages/contacto/contacto';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: Dashboard },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'equipos', component: Inventario },
    { path: 'equipos/crear', component: AltaEquipo },
    { path: 'equipos/editar/:id', component: EditarEquipo },
    { path: 'empleados', component: Empleados },
    { path: 'empleados/crear', component: AltaEmpleado },
    { path: 'empleados/editar/:id', component: EditarEmpleado },
    { path: 'empleado/:id', component: DetalleEmpleado },
    { path: 'contacto', component: Contacto },
    { path: '**', component: NotFound }
];