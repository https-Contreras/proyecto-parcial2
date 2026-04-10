import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../empleados/empleados';
import { Equipo } from '../../components/tarjeta-equipo/tarjeta-equipo';

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

  empleado: Empleado | null = null;
  equiposAsignados: Equipo[] = [];

  // Mock data
  empleadosMock: Empleado[] = [
    { id: 1, nombre_completo: 'Jael Contreras', departamento: 'Sistemas', correo: 'jael.contreras@empresa.com' },
    { id: 2, nombre_completo: 'Atenea López', departamento: 'Desarrollo', correo: 'atenea.lopez@empresa.com' },
    { id: 3, nombre_completo: 'Romeo García', departamento: 'Soporte TI', correo: 'romeo.garcia@empresa.com' },
    { id: 4, nombre_completo: 'Salvador Díaz', departamento: 'Infraestructura', correo: 'salvador.diaz@empresa.com' },
  ];

  equiposMock: Equipo[] = [
    { id: 1, numero_serie: 'LT-DELL-001', tipo_equipo: 'Laptop', marca: 'Dell', modelo: 'Latitude 5420', estado: 'Asignado', asignado_a: 'Jael Contreras' },
    { id: 4, numero_serie: 'SRV-DEL-010', tipo_equipo: 'Servidor', marca: 'Dell', modelo: 'PowerEdge R740', estado: 'Asignado', asignado_a: 'Atenea López' },
  ];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.empleado = this.empleadosMock.find(e => e.id === id) || null;
      this.equiposAsignados = this.equiposMock.filter(e => e.asignado_a === this.empleado?.nombre_completo);
    });
  }

  volver() {
    this.router.navigate(['/empleados']);
  }
}