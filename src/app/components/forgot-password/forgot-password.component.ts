import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * ForgotPasswordComponent permite a los usuarios solicitar una nueva contraseña si olvidaron la actual.
 * Utiliza formularios reactivos para validar la entrada del usuario y enrutamiento para navegar entre vistas.
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent implements OnInit {
  /** FormGroup para manejar el formulario de restablecimiento de contraseña */
  resetForm: FormGroup;

  /** Mensaje para mostrar al usuario */
  message: string = '';

  /**
   * Constructor del componente que inicializa el formulario con validaciones.
   * @param formBuilder Constructor de formularios reactivos para definir el formulario.
   * @param router Servicio de enrutamiento para la navegación.
   */
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /** Inicialización del componente. */
  ngOnInit(): void { }

  /**
   * Getter para facilitar el acceso a los controles del formulario.
   * @returns Las propiedades de los controles del formulario.
   */
  get f() { return this.resetForm.controls; }

  /**
   * Maneja el envío del formulario de restablecimiento de contraseña.
   * Si el formulario es válido, envía una contraseña temporal y redirige al usuario.
   */
  onSubmit(): void {
    if (this.resetForm.invalid) {
      return;
    }

    this.message = 'Su nueva contraseña temporal ha sido enviada a su correo';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }
}
