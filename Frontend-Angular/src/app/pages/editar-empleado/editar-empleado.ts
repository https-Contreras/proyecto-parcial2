import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-empleado.html',
  styleUrl: './editar-empleado.css'
})
export class EditarEmpleado implements OnInit {
  private fb = inject(FormBuilder);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);
  private empleadosService = inject(EmpleadosService);

  empleadoId!: number;

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

  ngOnInit(): void {
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.empleadoId) {
      this.cargarEmpleado();
    }
  }

  cargarEmpleado() {
    this.empleadosService.getEmpleadoById(this.empleadoId).subscribe({
      next: (res: any) => {
        const data = res.data;
        if (data) {
          this.form.patchValue({
            nombre_completo: data.nombre_completo,
            departamento: data.departamento,
            correo: data.correo
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar empleado:', err);
        Swal.fire('Error', 'No se pudo cargar la información del empleado', 'error');
        this.router.navigate(['/empleados']);
      }
    });
  }

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

    this.empleadosService.updateEmpleado(this.empleadoId, this.form.value).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Empleado actualizado!',
          text: 'El empleado fue modificado correctamente.',
          confirmButtonColor: '#022b3a',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          this.router.navigate(['/empleados']);
        });
      },
      error: (err) => {
        console.error('Error al actualizar empleado:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar el empleado. Recuerda que el correo debe ser único.',
          confirmButtonColor: '#fc2bb6'
        });
      }
    });
  }
}
