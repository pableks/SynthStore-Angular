import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc, updateDoc, getDoc, writeBatch } from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { map, switchMap, catchError, tap, take } from 'rxjs/operators';

/**
 * Servicio para la gestión de productos, incluyendo operaciones CRUD, carga desde JSON e inicialización de Firestore.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /** URL del archivo JSON con los datos de los productos. */
  private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/test-sales-c4671.appspot.com/o/productos.json?alt=media&token=76ed5bdb-0bfa-4b87-b8ca-e113854b9f49';
  isInitializing = false;

  /** Flag para controlar la inicialización */
  private isInitialized = false;

  /**
   * Constructor del servicio ProductService.
   * @param firestore Servicio Firestore para realizar operaciones en la base de datos.
   * @param http Servicio HttpClient para realizar solicitudes HTTP.
   */
  constructor(private firestore: Firestore, private http: HttpClient) { }

  /**
   * Inicializa Firestore, creando la colección de productos si no existe.
   * @returns Un Observable que completa cuando se inicializa Firestore.
   */
  initializeFirestore(): Observable<void> {
    if (this.isInitialized) {
      return of(undefined);
    }
  
    if (this.isInitializing) {
      return throwError('Firestore is already being initialized');
    }
  
    this.isInitializing = true;
    const metadataDocRef = doc(this.firestore, 'metadata/initialization');

    return from(getDoc(metadataDocRef)).pipe(
      switchMap(docSnapshot => {
        if (!docSnapshot.exists() || !docSnapshot.data()?.['initialized']) {
          // La colección no está inicializada, cargamos los productos desde el JSON
          return this.loadProductsToFirestore().pipe(
            switchMap(() => from(setDoc(metadataDocRef, { initialized: true }))),
            tap(() => this.isInitialized = true)
          );
        } else {
          // La colección ya está inicializada, no hacemos nada
          this.isInitialized = true;
          return of(undefined);
        }
      }),
      catchError(error => {
        console.error('Error initializing Firestore:', error);
        return of(undefined);
      }),
      take(1) // Only take the first emission

    );
  }
  loadProductsToFirestore(): Observable<void> {
    return this.getProductsFromJson().pipe(
      switchMap(products => {
        const batch = writeBatch(this.firestore);
        const productsRef = collection(this.firestore, 'productos');
  
        products.forEach(product => {
          // Use product.id as the document ID
          const newDocRef = doc(productsRef, product.sku);
          batch.set(newDocRef, { ...product });
        });
  
        return from(batch.commit());
      }),
      take(1) // Only take the first emission
    );
  }
  // Resto del código...

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'productos');
    return collectionData(productsRef, { idField: 'id' }) as Observable<Product[]>;
  }

  addProduct(product: Product): Observable<void> {
    const productsRef = collection(this.firestore, 'productos');
    const newDocRef = doc(productsRef);
    return from(setDoc(newDocRef, { ...product }));
  }

  updateProduct(id: string, product: Product): Observable<void> {
    const productDoc = doc(this.firestore, `productos/${id}`);
    return from(updateDoc(productDoc, { ...product }));
  }

  deleteProduct(id: string): Observable<void> {
    const productDoc = doc(this.firestore, `productos/${id}`);
    return from(deleteDoc(productDoc));
  }

  getProductsFromJson(): Observable<Product[]> {
    return this.http.get<{ productos: Product[] }>(this.jsonUrl).pipe(
      tap(response => console.log('JSON response:', response)),
      map(response => response.productos),
      tap(products => console.log('Mapped products:', products))
    );
  }



  searchProducts(queryStr: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product =>
        product.nombre.toLowerCase().includes(queryStr.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(queryStr.toLowerCase()) ||
        product.descripcionCorta.toLowerCase().includes(queryStr.toLowerCase())
      ))
    );
  }
}
