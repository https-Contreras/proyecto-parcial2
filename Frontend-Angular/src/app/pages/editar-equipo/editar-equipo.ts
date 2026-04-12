import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-editar-equipo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-equipo.html',
  styleUrl: './editar-equipo.css'
})
export class EditarEquipo implements OnInit {
  private fb = inject(FormBuilder);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);
  private equiposService = inject(EquiposService);

  equipoId!: number;

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
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]],
    empleado_id: [null as number | null, [
      Validators.min(1),
      Validators.max(99999),
      Validators.pattern(/^[0-9]+$/)
    ]]
  });

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.equipoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.equipoId) {
      this.cargarEquipo();
    }
  }

  cargarEquipo() {
    this.equiposService.getEquipoById(this.equipoId).subscribe({
      next: (res: any) => {
        // Asumiendo que el backend retorna el equipo en res.data
        const data = res.data[0] || res.data;
        if (data) {
          this.form.patchValue({
            numero_serie: data.numero_serie,
            tipo_equipo: data.tipo_equipo,
            marca: data.marca,
            modelo: data.modelo,
            estado: data.estado,
            empleado_id: data.empleado_id || null
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar equipo:', err);
        Swal.fire('Error', 'No se pudo cargar la información del equipo', 'error');
        this.router.navigate(['/equipos']);
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

    this.equiposService.updateEquipo(this.equipoId, this.form.value).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Equipo actualizado!',
          text: 'El equipo fue modificado correctamente.',
          confirmButtonColor: '#022b3a',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          this.router.navigate(['/equipos']);
        });
      },
      error: (err) => {
        console.error('Error al actualizar equipo:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar el equipo.',
          confirmButtonColor: '#fc2bb6'
        });
      }
    });
  }
}
