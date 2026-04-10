import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  asunto = '';
  equipoId = '';
  descripcion = '';
  enviado = false;

  enviar(form: any) {
    if (form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor llena todos los campos.',
        confirmButtonColor: '#fc2bb6'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Reporte enviado!',
      text: `Tu reporte sobre el equipo ${this.equipoId} fue registrado.`,
      confirmButtonColor: '#022b3a',
      timer: 2500,
      timerProgressBar: true
    }).then(() => {
      this.asunto = '';
      this.equipoId = '';
      this.descripcion = '';
      form.resetForm();
    });
  }
}