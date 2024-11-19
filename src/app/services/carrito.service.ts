import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

/**
 * Interfaz que define la estructura de un item en el carrito.
 */
interface CarritoItem {
  /** Producto en el carrito. */
  product: Product;
  /** Cantidad del producto en el carrito. */
  quantity: number;
}

/**
 * Servicio para gestionar el carrito de compras.
 */
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  /** Array que contiene los items del carrito */
  private carritoItems: CarritoItem[] = [];

  /** Sujeto BehaviorSubject para notificar cambios en el carrito */
  private carritoSubject = new BehaviorSubject<CarritoItem[]>(this.carritoItems);

  /** Observable para suscribirse a cambios en el carrito */
  carritoActualizado = this.carritoSubject.asObservable();

  /** Array que contiene los items comprados */
  private purchasedItems: CarritoItem[] = [];

  /**
   * Constructor que inicializa el servicio y carga el carrito desde el almacenamiento local.
   */
  constructor() {
    this.loadCarrito();
  }

  /**
   * Guarda el estado actual del carrito en el almacenamiento local.
   * Actualiza el BehaviorSubject para reflejar los cambios.
   */
  private saveCarrito(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('carrito', JSON.stringify(this.carritoItems));
      this.carritoSubject.next(this.carritoItems);
    }
  }

  /**
   * Carga el carrito almacenado desde el almacenamiento local al iniciar el servicio.
   * Actualiza el BehaviorSubject para reflejar los items cargados.
   */
  private loadCarrito(): void {
    if (this.isLocalStorageAvailable()) {
      const carritoSaved = localStorage.getItem('carrito');
      if (carritoSaved) {
        this.carritoItems = JSON.parse(carritoSaved);
        this.carritoSubject.next(this.carritoItems);
      }
    }
  }

  /**
   * Verifica si el almacenamiento local está disponible.
   * @returns `true` si el almacenamiento local está disponible, `false` de lo contrario.
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Obtiene todos los items del carrito actualmente.
   * @returns Un array de objetos `CarritoItem` que representan los items en el carrito.
   */
  getCarritoItems(): CarritoItem[] {
    return this.carritoItems;
  }

  /**
   * Obtiene el número total de items en el carrito.
   * @returns El número total de items en el carrito.
   */
  getItemCount(): number {
    return this.carritoItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Agrega un producto al carrito.
   * Si el producto ya existe en el carrito, aumenta la cantidad; de lo contrario, lo agrega como nuevo.
   * @param product El producto a agregar al carrito.
   * @param quantity La cantidad del producto a agregar.
   */
  addToCarrito(product: Product, quantity: number): void {
    const existingProduct = this.carritoItems.find(item => item.product.sku === product.sku);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.carritoItems.push({ product, quantity });
    }
    this.saveCarrito();
  }

  /**
   * Elimina un producto del carrito.
   * @param product El producto a eliminar del carrito.
   */
  removeFromCarrito(product: Product): void {
    this.carritoItems = this.carritoItems.filter(item => item.product.sku !== product.sku);
    this.saveCarrito();
  }

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * @param product El producto cuya cantidad se actualizará.
   * @param quantity La nueva cantidad del producto.
   */
  updateQuantity(product: Product, quantity: number): void {
    const existingItem = this.carritoItems.find(item => item.product.sku === product.sku);
    if (existingItem) {
      existingItem.quantity = quantity;
    }
    this.saveCarrito();
  }

  /**
   * Vacía completamente el carrito, eliminando todos los items.
   */
  clearCarrito(): void {
    this.carritoItems = [];
    this.saveCarrito();
  }

  /**
   * Guarda los items del carrito como items comprados.
   * Esto puede ser útil para realizar un seguimiento de las compras completadas.
   */
  savePurchasedItems(): void {
    this.purchasedItems = [...this.carritoItems];
  }

  /**
   * Obtiene los items que han sido marcados como comprados.
   * @returns Un array de objetos `CarritoItem` que representan los items comprados.
   */
  getPurchasedItems(): CarritoItem[] {
    return this.purchasedItems;
  }
}
