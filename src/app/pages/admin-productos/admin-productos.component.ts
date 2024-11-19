import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

/**
 * Componente para la administración de productos.
 */
@Component({
  selector: 'app-admin-productos',
  standalone: true, // Indica que este componente no tiene dependencias específicas
  imports: [CommonModule, FormsModule], // Módulos importados necesarios para el componente
  templateUrl: './admin-productos.component.html', // Ruta al archivo HTML que define la estructura del componente
  styleUrls: ['./admin-productos.component.scss'] // Rutas a los archivos de estilos SCSS aplicados al componente
})
export class AdminProductosComponent implements OnInit {
  /** Array que contiene todos los productos. */
  productos: Product[] = [];
  /** Array de productos filtrados. */
  filteredProductos: Product[] = [];
  /** Producto seleccionado para edición o visualización. */
  selectedProduct: Product | null = null;
  /** Indica si se está editando un producto. */
  isEditing: boolean = false;
  /** Indica si se está añadiendo un nuevo producto. */
  isAdding: boolean = false;
  /** Consulta de búsqueda para filtrar productos. */
  searchQuery: string = '';

  /** Servicio para manejar operaciones de productos. */
  private productService = inject(ProductService);

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga los productos utilizando datos desde un archivo JSON en lugar de Firestore.
   */
  ngOnInit(): void {
    this.loadProductos();
  }

  /**
   * Carga los productos desde el servicio ProductService utilizando Firestore.
   */
  loadProductos(): void {
    this.productService.getProducts().subscribe(data => {
      this.productos = data;
      this.filteredProductos = data;
    });
  }

  /**
   * Carga los productos desde el servicio ProductService utilizando datos desde un archivo JSON.
   */
  loadProductosFromJson(): void {
    this.productService.getProductsFromJson().subscribe(data => {
      this.productos = data;
      this.filteredProductos = data;
      console.log('Productos obtenidos:', this.productos); // Verificación en consola de los productos obtenidos
    });
  }

  /**
   * Filtra los productos basado en la consulta de búsqueda.
   */
  filterProductos(): void {
    if (this.searchQuery) {
      this.filteredProductos = this.productos.filter(product =>
        product.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.descripcionCorta.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProductos = this.productos;
    }
  }

  /**
   * Selecciona un producto para editar o visualizar.
   * @param product Producto seleccionado.
   */
  selectProduct(product: Product): void {
    this.selectedProduct = { ...product }; // Clona el producto seleccionado para evitar modificar el original accidentalmente
    this.isEditing = true; // Establece el modo de edición activo
    this.isAdding = false; // Asegura que no se esté añadiendo un nuevo producto al mismo tiempo
  }

  /**
   * Guarda un producto editado o añadido.
   */
  saveProduct(): void {
    if (this.isAdding) {
      this.productService.addProduct(this.selectedProduct!).subscribe(() => {
        this.loadProductos(); // Recarga la lista de productos después de añadir uno nuevo
      });
    } else {
      const productId = this.selectedProduct?.id!;
      this.productService.updateProduct(productId, this.selectedProduct!).subscribe(() => {
        this.loadProductos(); // Recarga la lista de productos después de actualizar uno existente
      });
    }
    this.cancelEdit(); // Finaliza el modo de edición
  }

  /**
   * Elimina un producto.
   * @param product Producto a eliminar.
   */
  deleteProduct(product: Product): void {
    const productId = product.id!;
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProductos(); // Recarga la lista de productos después de eliminar uno
    });
  }

  /**
   * Cancela el modo de edición o añadido.
   */
  cancelEdit(): void {
    this.selectedProduct = null; // Reinicia el producto seleccionado
    this.isEditing = false; // Desactiva el modo de edición
    this.isAdding = false; // Asegura que no se esté añadiendo un nuevo producto al mismo tiempo
  }

  /**
   * Prepara el formulario para añadir un nuevo producto.
   */
  addProduct(): void {
    this.selectedProduct = new Product(); // Crea una nueva instancia de Producto
    this.isAdding = true; // Activa el modo de añadir producto
    this.isEditing = true; // Establece el modo de edición activo
  }
}
