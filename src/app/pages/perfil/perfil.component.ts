import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Representa un usuario en el sistema.
 */
interface User {
  /** Identificador único del usuario. */
  id: number;

  /** Nombre completo del usuario. */
  nombre: string;

  /** Nombre de usuario (username) del usuario. */
  username: string;

  /** Correo electrónico del usuario. */
  email: string;

  /** Contraseña del usuario. */
  password: string;

  /** Fecha de nacimiento del usuario. */
  birthdate: string;

  /** Dirección del usuario. */
  address: string;

  /** Rol del usuario en el sistema (e.g., administrador, cliente). */
  rol: string;

  /** URL de la imagen de perfil del usuario. */
  imagen: string;
}

/**
 * PerfilComponent maneja la visualización y edición del perfil de usuario.
 * Permite a los usuarios ver y actualizar su información de perfil.
 */
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  /** Usuario actual */
  user: User | null = null;

  /** Indica si el modo de edición está activado */
  editMode: boolean = false;

  /**
   * Constructor que inyecta el servicio de autenticación para obtener y actualizar el perfil de usuario.
   * @param authService Servicio de autenticación para gestionar el perfil de usuario.
   */
  constructor(private authService: AuthService) { }

  /**
   * Inicializa el componente obteniendo el usuario actual desde el servicio de autenticación.
   */
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  /**
   * Alterna el modo de edición del perfil.
   */
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  /**
   * Guarda los cambios realizados en el perfil de usuario utilizando el servicio de autenticación.
   * Desactiva el modo de edición después de guardar.
   */
  saveProfile(): void {
    if (this.user) {
      this.authService.updateUserProfile(this.user);
      this.editMode = false;
    }
  }
}
