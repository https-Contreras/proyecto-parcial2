import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  public router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get f() { return this.loginForm.controls; }

  iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Modal de carga
    Swal.fire({
      title: 'Validando credenciales...',
      text: 'Por favor, espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: '¡Acceso Concedido!',
          text: `Bienvenid@, ${res.user.nombre}`,
          confirmButtonColor: '#022b3a'
        }).then(() => {
          // Si tuvieras guardianes, guardarías el token en localStorage aquí:
          // localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado',
          text: err.error?.error || 'Usuario o contraseña incorrectos',
          confirmButtonColor: '#fc2bb6'
        });
      }
    });
  }
}
