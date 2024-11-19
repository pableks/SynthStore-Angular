import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente que muestra los resultados de búsqueda de productos.
 */
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SearchResultsComponent implements OnInit {
  /** Término de búsqueda proporcionado en los parámetros de la URL. */
  query: string = '';

  /** Arreglo de productos que contiene los resultados de la búsqueda. */
  results: Product[] = [];

  /**
   * Constructor del componente.
   * @param route Servicio para acceder a los parámetros de la URL.
   * @param productService Servicio para realizar la búsqueda de productos.
   */
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Suscribe el componente a los cambios en los parámetros de la URL y realiza la búsqueda inicial.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.searchProducts();
    });
  }

  /**
   * Realiza la búsqueda de productos basados en el término de búsqueda almacenado en `query`.
   * Actualiza `results` con los productos encontrados.
   */
  searchProducts(): void {
    if (this.query) {
      this.productService.searchProducts(this.query).subscribe(products => {
        this.results = products;
      });
    }
  }
}
