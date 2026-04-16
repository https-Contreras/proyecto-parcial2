import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TarjetaEquipo, Equipo } from '../../components/tarjeta-equipo/tarjeta-equipo';
import { EquiposService } from '../../services/equipos.service';
import Swal from 'sweetalert2';

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
  private equiposService = inject(EquiposService);

  // SIGNALS — Aportación Extra #2
  equipos = signal<Equipo[]>([]);
  filtroActivo = signal<string>('todos');

  // computed deriva automáticamente cuando cambia equipos o filtroActivo
  equiposFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    const lista = this.equipos();

    if (filtro === 'todos') return lista;
    if (filtro === 'Disponible' || filtro === 'Asignado') {
      return lista.filter(e => e.estado === filtro);
    }
    return lista.filter(e => e.tipo_equipo === filtro);
  });

  ngOnInit() {
    this.cargarEquipos();

    this.route.queryParamMap.subscribe(params => {
      const estado = params.get('estado');
      const tipo = params.get('tipo');

      if (estado) {
        this.filtroActivo.set(estado);
      } else if (tipo) {
        this.filtroActivo.set(tipo);
      } else {
        this.filtroActivo.set('todos');
      }
    });
  }

  cargarEquipos() {
    this.equiposService.getEquipos().subscribe({
      next: (response: any) => {
        this.equipos.set(response.data || []);
      },
      error: (err) => {
        console.error('Error al obtener equipos de la API', err);
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

  irDetalle(idEquipo: number) {
    this.equiposService.getEquipoById(idEquipo).subscribe({
      next: (response: any) => {
        const equipo = response.data;
        if (equipo && equipo.empleado_id) {
          this.router.navigate(['/empleado', equipo.empleado_id]);
        } else {
          Swal.fire({
            title: 'No asignado',
            text: 'Este equipo no está asignado a ningún empleado o no se pudo encontrar el ID del empleado.',
            icon: 'info',
            confirmButtonColor: '#022b3a'
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener detalles del equipo', err);
        Swal.fire('Error', 'No se pudo obtener la información del equipo', 'error');
      }
    });
  }

  editarEquipo(equipo: Equipo) {
    // Como no hay ruta explícita para editar, podríamos mostrar una alerta de redirección o navegar a una posible ruta.
    Swal.fire({
      title: 'Editar equipo',
      text: `¿Deseas editar el equipo ${equipo.marca} ${equipo.modelo}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#47bfd7',
      cancelButtonColor: '#022b3a'
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir a la vista de edición /equipos/editar/:id
        this.router.navigate(['/equipos/editar', equipo.id]);
      }
    });
  }

  eliminarEquipo(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción eliminará el equipo permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#022b3a'
    }).then((result) => {
      if (result.isConfirmed) {
        this.equiposService.deleteEquipo(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El equipo fue eliminado correctamente.', 'success');
            this.cargarEquipos(); // Refrescamos la lista
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire('Error', 'Hubo un problema al intentar eliminar el equipo.', 'error');
          }
        });
      }
    });
  }
}