import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

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

  empleados: Empleado[] = [];

  empleadosMock: Empleado[] = [
    { id: 1, nombre_completo: 'Jael Contreras', departamento: 'Sistemas', correo: 'jael.contreras@empresa.com' },
    { id: 2, nombre_completo: 'Atenea López', departamento: 'Desarrollo', correo: 'atenea.lopez@empresa.com' },
    { id: 3, nombre_completo: 'Romeo García', departamento: 'Soporte TI', correo: 'romeo.garcia@empresa.com' },
    { id: 4, nombre_completo: 'Salvador Díaz', departamento: 'Infraestructura', correo: 'salvador.diaz@empresa.com' },
  ];

  ngOnInit() {
    this.empleados = this.empleadosMock;
  }

  verDetalle(id: number) {
    this.router.navigate(['/empleado', id]);
  }
}