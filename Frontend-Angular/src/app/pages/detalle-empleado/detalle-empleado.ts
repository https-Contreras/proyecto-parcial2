import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../empleados/empleados';
import { Equipo } from '../../components/tarjeta-equipo/tarjeta-equipo';
import { EmpleadosService } from '../../services/empleados.service';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-detalle-empleado',
  standalone: true,
  imports: [],
  templateUrl: './detalle-empleado.html',
  styleUrl: './detalle-empleado.css'
})
export class DetalleEmpleado implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empleadosService = inject(EmpleadosService);
  private equiposService = inject(EquiposService);

  empleado = signal<Empleado | null>(null);
  equiposAsignados = signal<Equipo[]>([]);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      
      this.empleadosService.getEmpleadoById(id).subscribe({
        next: (response: any) => {
          this.empleado.set(response.data || null);

          // Obtener equipos
          if (this.empleado()) {
             this.equiposService.getEquipos().subscribe({
               next: (res: any) => {
                 const allEquipos: Equipo[] = res.data || [];
                 // Filtramos asumiendo que asignado_a coindice con el nombre. Dependerá de tu BD si tiene una FK empleado_id.
                 // Ajustado para checar si la respuesta trae empleado_id o asignado_a
                 this.equiposAsignados.set(allEquipos.filter(e => 
                    e.asignado_a === this.empleado()?.nombre_completo || 
                    (e as any).empleado_id === this.empleado()?.id
                 ));
               }
             });
          }
        },
        error: (err) => console.error('Error al obtener empleado', err)
      });
    });
  }

  volver() {
    this.router.navigate(['/empleados']);
  }
}