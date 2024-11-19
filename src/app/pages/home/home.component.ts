import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

/**
 * Representa un testimonio de un cliente.
 */
interface Testimonio {
  /** Nombre del cliente que da el testimonio. */
  nombre: string;

  /** Comentario del cliente sobre el producto o servicio. */
  comentario: string;

  
  /** Número de estrellas que el cliente da al producto o servicio, típicamente entre 1 y 5. */
  estrellas: number;

  /** URL de la imagen del cliente. */
  imagen: string;
  profesion: string;  // Add this line

}

/**
 * HomeComponent maneja la visualización de la página principal, incluyendo una lista de productos destacados y testimonios.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /** Lista de productos */
  productos: Product[] = [];

  /** Indicador de carga */
  loading = true;

    /** Array de productos filtrados. */
    filteredProductos: Product[] = [];
  /** Lista de testimonios */
  testimonios: Testimonio[] = [];

  /** URL del archivo JSON de testimonios en Firebase Storage */
  private testimoniosUrl = 'app/data/testimonios.json';

  /**
   * Constructor que inyecta el servicio de productos y el cliente HTTP.
   * @param productService Servicio que proporciona operaciones relacionadas con los productos.
   * @param http Cliente HTTP para solicitudes a servicios externos.
   */
  constructor(private productService: ProductService, private http: HttpClient) { }

  /**
   * Inicializa el componente cargando la lista de productos y testimonios.
   */
  ngOnInit() {
    this.productService.initializeFirestore().subscribe({
      next: () => console.log('Firestore initialized'),
      error: error => console.error('Error initializing Firestore', error),
      complete: () => console.log('Initialization complete')
    });
    this.loadTestimonios();
    this.loadProductos(); // Cambiado para cargar productos desde JSON
  }

  /**
   * Carga la lista de testimonios desde el JSON.
   */
  private loadTestimonios(): void {
    this.http.get<{ testimonios: Testimonio[] }>(this.testimoniosUrl).subscribe({
      next: (data) => {
        console.log('Testimonios obtenidos:', data.testimonios); // Agregar este log
        this.testimonios = data.testimonios;
      },
      error: (err) => {
        console.error('Error obteniendo testimonios:', err);
      }
    });
  }

  /**
   * Carga la lista de productos desde el JSON.
   */
  private loadProductosFromJson(): void {
    this.productService.getProductsFromJson().subscribe({
      next: (data) => {
        console.log('Productos obtenidos:', data); // Agregar este log
        this.productos = data.slice(0, 3);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error obteniendo productos:', err);
        this.loading = false;
      },
      complete: () => console.log('Carga de productos completa')
    });
  }

  loadProductos(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Productos obtenidos:', data); // Agregar este log
        this.productos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error obteniendo productos:', err);
        this.loading = false;
      },
      complete: () => console.log('Carga de productos completa')
    
    });
  }

  /**
   * Genera un arreglo de números basado en la cantidad de estrellas, para mostrar las estrellas llenas.
   * @param estrellas Número de estrellas.
   * @returns Un arreglo de números con la longitud de las estrellas.
   */
  getEstrellas(estrellas: number): number[] {
    return new Array(estrellas);
  }

  /**
   * Genera un arreglo de números basado en la cantidad de estrellas vacías, para mostrar las estrellas vacías.
   * @param estrellas Número de estrellas llenas.
   * @returns Un arreglo de números con la longitud de las estrellas vacías.
   */
  getEmptyEstrellas(estrellas: number): number[] {
    return new Array(5 - estrellas);
  }
}
