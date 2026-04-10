import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Equipo {
  id: number;
  numero_serie: string;
  tipo_equipo: string;
  marca: string;
  modelo: string;
  estado: string;
  asignado_a: string | null;
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

  verDetalle() {
    this.clickDetalle.emit(this.equipo.id);
  }
}
