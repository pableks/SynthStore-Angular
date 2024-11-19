import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
 * AdminUsuariosComponent gestiona la administración de usuarios, permitiendo agregar, editar y eliminar usuarios.
 * Incluye funcionalidades de filtrado y selección de usuarios.
 */
@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {
  /** Lista de todos los usuarios */
  usuarios: User[] = [];

  /** Lista de usuarios filtrados */
  filteredUsuarios: User[] = [];

  /** Usuario seleccionado para editar */
  selectedUser: User | null = null;

  /** Indica si se está en modo edición */
  isEditing: boolean = false;

  /** Indica si se está añadiendo un nuevo usuario */
  isAdding: boolean = false;

  /** Consulta de búsqueda para filtrar usuarios */
  searchQuery: string = '';

  /** Tipo de campo para la contraseña, para mostrar u ocultar */
  passwordFieldType: string = 'password';

  /**
   * Constructor que inyecta las dependencias necesarias para realizar solicitudes HTTP y servicios de autenticación.
   * @param http Cliente HTTP para solicitudes a servicios externos.
   * @param authService Servicio de autenticación para gestionar usuarios.
   */
  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Se inicializa el componente cargando la lista de usuarios.
   */
  ngOnInit(): void {
    this.loadUsuarios();
  }

  /**
   * Carga los usuarios desde un archivo JSON externo y actualiza las listas de usuarios y usuarios filtrados.
   * También obtiene todos los usuarios del servicio de autenticación.
   */
  loadUsuarios(): void {
    this.http.get<{ usuarios: User[] }>('app/data/usuarios.json').subscribe(data => {
      this.authService.setUsuarios(data.usuarios);
      this.usuarios = this.authService.getAllUsers();
      this.filteredUsuarios = [...this.usuarios];
    });
  }

  /**
   * Filtra los usuarios basándose en el nombre, nombre de usuario o correo electrónico según la consulta de búsqueda.
   */
  filterUsuarios(): void {
    if (this.searchQuery) {
      this.filteredUsuarios = this.usuarios.filter(user =>
        user.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredUsuarios = [...this.usuarios];
    }
  }

  /**
   * Selecciona un usuario para editar y ajusta los modos de edición y agregación.
   * @param user Usuario a editar.
   */
  selectUser(user: User): void {
    this.selectedUser = { ...user };
    this.isEditing = true;
    this.isAdding = false;
  }

  /**
   * Guarda los cambios realizados a un usuario existente o añade un nuevo usuario a la lista.
   */
  saveUser(): void {
    if (this.isAdding) {
      this.authService.addUser(this.selectedUser!);
    } else {
      this.authService.updateUserProfile(this.selectedUser!);
    }
    this.usuarios = this.authService.getAllUsers();
    this.filteredUsuarios = [...this.usuarios];
    this.cancelEdit();
  }

  /**
   * Elimina un usuario de la lista.
   * @param user Usuario a eliminar.
   */
  deleteUser(user: User): void {
    this.authService.deleteUser(user);
    this.usuarios = this.authService.getAllUsers();
    this.filteredUsuarios = [...this.usuarios];
  }

  /**
   * Cancela el modo de edición o agregación y limpia el usuario seleccionado.
   */
  cancelEdit(): void {
    this.selectedUser = null;
    this.isEditing = false;
    this.isAdding = false;
  }

  /**
   * Prepara un nuevo usuario para ser añadido a la lista y activa los modos de edición y agregación.
   */
  addUser(): void {
    this.selectedUser = {
      id: this.usuarios.length + 1,
      nombre: '',
      username: '',
      email: '',
      password: '',
      birthdate: '',
      address: '',
      rol: 'cliente',
      imagen: ''
    };
    this.isAdding = true;
    this.isEditing = true;
  }

  /**
   * Alterna la visibilidad del campo de contraseña entre texto y contraseña.
   */
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
