import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-equipo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alta-equipo.html',
  styleUrl: './alta-equipo.css'
})
export class AltaEquipo {
  private fb = inject(FormBuilder);
  protected router = inject(Router);

  form = this.fb.group({
    numero_serie: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[A-Z0-9\-]+$/)
    ]],
    tipo_equipo: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]],
    marca: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40)
    ]],
    modelo: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(60)
    ]],
    estado: ['Disponible', [
      Validators.required
    ]],
    empleado_id: [null]
  });

  get f() { return this.form.controls; }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor corrige los errores antes de continuar.',
        confirmButtonColor: '#fc2bb6'
      });
      return;
    }

    console.log('Datos del equipo:', this.form.value);

    Swal.fire({
      icon: 'success',
      title: '¡Equipo registrado!',
      text: 'El equipo fue dado de alta correctamente.',
      confirmButtonColor: '#022b3a',
      timer: 2000,
      timerProgressBar: true
    }).then(() => {
      this.router.navigate(['/equipos']);
    });
  }
}