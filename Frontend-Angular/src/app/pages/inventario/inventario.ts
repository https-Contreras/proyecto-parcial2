import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TarjetaEquipo, Equipo } from '../../components/tarjeta-equipo/tarjeta-equipo';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [TarjetaEquipo],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class Inventario implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  equipos: Equipo[] = [];
  equiposFiltrados: Equipo[] = [];
  filtroActivo = 'todos';

  // Data hardcodeada hasta que Atenea conecte los servicios
  equiposMock: Equipo[] = [
    { id: 1, numero_serie: 'LT-DELL-001', tipo_equipo: 'Laptop', marca: 'Dell', modelo: 'Latitude 5420', estado: 'Asignado', asignado_a: 'Jael Contreras' },
    { id: 2, numero_serie: 'LT-HP-002', tipo_equipo: 'Laptop', marca: 'HP', modelo: 'EliteBook 840', estado: 'Disponible', asignado_a: null },
    { id: 3, numero_serie: 'SW-CIS-007', tipo_equipo: 'Switch', marca: 'Cisco', modelo: 'Catalyst 2960', estado: 'Disponible', asignado_a: null },
    { id: 4, numero_serie: 'SRV-DEL-010', tipo_equipo: 'Servidor', marca: 'Dell', modelo: 'PowerEdge R740', estado: 'Asignado', asignado_a: 'Atenea López' },
  ];

  ngOnInit() {
    this.equipos = this.equiposMock;

    this.route.queryParamMap.subscribe(params => {
      const estado = params.get('estado');
      const tipo = params.get('tipo');

      if (estado) {
        this.filtroActivo = estado;
        this.equiposFiltrados = this.equipos.filter(e => e.estado === estado);
      } else if (tipo) {
        this.filtroActivo = tipo;
        this.equiposFiltrados = this.equipos.filter(e => e.tipo_equipo === tipo);
      } else {
        this.filtroActivo = 'todos';
        this.equiposFiltrados = this.equipos;
      }
    });
  }

  filtrarTodos() {
    this.router.navigate(['/equipos']);
  }

  filtrarPorTipo(tipo: string) {
    this.router.navigate(['/equipos'], { queryParams: { tipo } });
  }

  filtrarPorEstado(estado: string) {
    this.router.navigate(['/equipos'], { queryParams: { estado } });
  }

  irDetalle(id: number) {
    this.router.navigate(['/empleado', id]);
  }
}