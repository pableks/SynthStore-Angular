import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

/**
 * ProductDetailComponent maneja la visualización de los detalles de un producto individual,
 * incluyendo productos relacionados y la opción de agregar al carrito.
 */
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  /** Producto actual */
  product: Product | undefined;

  /** Productos relacionados */
  relatedProducts: Product[] = [];

  /** Indicador de carga */
  loading = true;

  /** Cantidad del producto a agregar al carrito */
  quantity: number = 1;

  /**
   * Constructor que inyecta las dependencias necesarias para obtener los detalles del producto y manejar el carrito.
   * @param route Servicio para obtener información de la ruta activa.
   * @param productService Servicio para gestionar productos.
   * @param carritoService Servicio para gestionar el carrito de compras.
   */
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private carritoService: CarritoService
  ) { }

  /**
   * Inicializa el componente cargando el producto y los productos relacionados basados en el SKU de la ruta.
   */
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const sku = params.get('sku');
        this.loading = true;
        return this.productService.getProducts(); // Cambiado para cargar productos desde JSON
      })
    ).subscribe({
      next: (data) => {
        const sku = this.route.snapshot.paramMap.get('sku');
        this.product = data.find(p => p.sku === sku);
        this.relatedProducts = data.filter(p => p.sku !== sku).slice(0, 3);
        console.log('Producto actual:', this.product);
        console.log('Productos relacionados:', this.relatedProducts);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
      complete: () => console.log('Carga de producto completa')
    });
  }

  /**
   * Agrega el producto actual al carrito de compras.
   * Muestra una alerta al usuario confirmando la acción.
   */
  addToCarrito(): void {
    if (this.product) {
      this.carritoService.addToCarrito(this.product, this.quantity);
      alert('Producto agregado al carrito');
    }
  }
}
