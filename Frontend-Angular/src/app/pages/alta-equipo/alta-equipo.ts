import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-alta-equipo',
  imports: [ReactiveFormsModule],
  templateUrl: './alta-equipo.html',
  styleUrl: './alta-equipo.css',
})
export class AltaEquipo {
  // 1. Inyección de dependencias estricta
  private fb = inject(FormBuilder);

  // 2. Creación del Formulario Reactivo
  formularioEquipo: FormGroup = this.fb.group({
    numero_serie: ['', [
      Validators.required, 
      Validators.minLength(5), 
      Validators.pattern(/^[A-Z0-9-]+$/) // Solo mayúsculas, números y guiones
    ]],
    tipo_equipo: ['', [
      Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(50)
    ]],
    marca: ['', [
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Z0-9\s]+$/) // Letras y números (sin caracteres raros)
    ]],
    modelo: ['', [
      Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(100)
    ]]
  });

  // 3. Método para enviar los datos
  guardarEquipo() {
    if (this.formularioEquipo.invalid) {
      // Marcamos todos los campos como "tocados" para que salten los errores en el HTML
      this.formularioEquipo.markAllAsTouched();
      return;
    }

    // Aquí después conectaremos el Servicio para mandarlo a Node.js
    console.log('Datos listos para el backend:', this.formularioEquipo.value);
  }
}
