import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-alta-empleado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alta-empleado.html',
  styleUrl: './alta-empleado.css'
})
export class AltaEmpleado {
  private fb = inject(FormBuilder);
  protected router = inject(Router);
  private empleadosService = inject(EmpleadosService);

  form = this.fb.group({
    nombre_completo: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]],
    departamento: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]],
    correo: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ]]
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

    this.empleadosService.createEmpleado(this.form.value).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Empleado registrado!',
          text: 'El empleado fue dado de alta correctamente.',
          confirmButtonColor: '#022b3a',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          this.router.navigate(['/empleados']);
        });
      },
      error: (err) => {
        console.error('Error al registrar empleado:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error central',
          text: 'Ocurrió un error al guardar el empleado. Asegúrate de que el correo no esté duplicado.',
          confirmButtonColor: '#fc2bb6'
        });
      }
    });
  }
}
