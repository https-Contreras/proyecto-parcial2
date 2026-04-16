import { Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

export interface Equipo {
  id: number;
  numero_serie: string;
  tipo_equipo: string;
  marca: string;
  modelo: string;
  estado: string;
  asignado_a: string | null;
  empleado_id?: number | null;
}

@Component({
  selector: 'app-tarjeta-equipo',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-equipo.html',
  styleUrl: './tarjeta-equipo.css'
})
export class TarjetaEquipo {
  @Input() equipo!: Equipo;
  @Output() clickDetalle = new EventEmitter<number>();
  @Output() clickEditar = new EventEmitter<Equipo>();
  @Output() clickEliminar = new EventEmitter<number>();

  verDetalle() {
    this.clickDetalle.emit(this.equipo.id);
  }

  editar() {
    this.clickEditar.emit(this.equipo);
  }

  eliminar() {
    this.clickEliminar.emit(this.equipo.id);
  }
}
