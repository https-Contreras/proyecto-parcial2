import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';

export interface Empleado {
  id: number;
  nombre_completo: string;
  departamento: string;
  correo: string;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
export class Empleados implements OnInit {
  private router = inject(Router);
  private empleadosService = inject(EmpleadosService);

  empleados = signal<Empleado[]>([]);

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadosService.getEmpleados().subscribe({
      next: (response: any) => {
        this.empleados.set(response.data || []);
        console.log('Empleados obtenidos:', this.empleados());
      },
      error: (err) => {
        console.error('Error al obtener empleados:', err);
      }
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/empleado', id]);
  }

  crearEmpleado() {
    this.router.navigate(['/empleados/crear']);
  }

  editarEmpleado(id: number) {
    this.router.navigate(['/empleados/editar', id]);
  }
}