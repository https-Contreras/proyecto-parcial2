import { Routes } from '@angular/router';
import { AltaEquipo } from './pages/alta-equipo/alta-equipo';


export const routes: Routes = [

  { path: 'alta-equipo', component: AltaEquipo },
  { path: '**', redirectTo: '' } // Opcional: comodín para rutas no encontradas
];
