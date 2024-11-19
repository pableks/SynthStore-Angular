import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * RegisterComponent maneja la lógica y la interfaz para el registro de nuevos usuarios.
 * Permite a los usuarios crear una nueva cuenta proporcionando su información personal.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  /** Nombre del usuario. */
  nombre: string = '';

  /** Nombre de usuario. */
  username: string = '';

  /** Correo electrónico del usuario. */
  email: string = '';

  /** Contraseña del usuario. */
  password: string = '';

  /** Fecha de nacimiento del usuario. */
  birthdate: string = '';

  /** Dirección del usuario. */
  address: string = '';

  /** Mensaje de error para mostrar en caso de fallo en el registro. */
  errorMessage: string = '';

  /** Indica si la contraseña debe ser visible. */
  showPassword: boolean = false;

  /**
   * Constructor que inyecta los servicios de autenticación y enrutamiento.
   * @param authService Servicio de autenticación para gestionar el registro de usuarios.
   * @param router Servicio de enrutamiento para navegar entre vistas.
   */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Maneja el proceso de registro utilizando el servicio de autenticación.
   * Crea un nuevo usuario y redirige a la página de inicio de sesión.
   */
  onRegister(): void {
    const newUser = {
      id: 0,
      nombre: this.nombre,
      username: this.username,
      email: this.email,
      password: this.password,
      birthdate: this.birthdate,
      address: this.address,
      rol: 'cliente',
      imagen: '/assets/default-profile.png'
    };

    this.authService.addUser(newUser);
    this.router.navigate(['/login']);
  }

  /**
   * Alterna la visibilidad del campo de contraseña entre texto y contraseña.
   * @param inputId ID del campo de entrada de contraseña.
   */
  togglePasswordVisibility(inputId: string): void {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
      this.showPassword = !this.showPassword;
    }
  }
}
