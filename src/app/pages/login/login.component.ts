import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * LoginComponent maneja la lógica y la interfaz para el inicio de sesión de usuarios.
 * Permite a los usuarios ingresar su nombre de usuario y contraseña para autenticarse.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  /** Nombre de usuario ingresado */
  username: string = '';

  /** Contraseña ingresada */
  password: string = '';

  /** Mensaje de error para mostrar en caso de fallo en el inicio de sesión */
  errorMessage: string = '';

  /**
   * Constructor que inyecta los servicios de autenticación y enrutamiento.
   * @param authService Servicio de autenticación para gestionar el inicio de sesión.
   * @param router Servicio de enrutamiento para navegar entre vistas.
   */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Maneja el proceso de inicio de sesión utilizando el servicio de autenticación.
   * Si el inicio de sesión es exitoso, navega a la página principal. De lo contrario, muestra un mensaje de error.
   */
  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
      }
    });
  }
}
