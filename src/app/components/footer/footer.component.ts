import { Component } from '@angular/core';

/**
 * FooterComponent maneja la visualización y lógica de la sección de pie de página.
 * Es un componente independiente, lo que significa que no requiere un módulo de Angular.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  /**
   * Constructor para FooterComponent.
   * Actualmente está vacío, pero puede utilizarse para inyecciones de dependencias si es necesario.
   */
  constructor() { }
}
