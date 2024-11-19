import { Product } from './product.model';

describe('Product', () => {
  it('should create an instance of Product with correct properties', () => {
    const product = new Product(
      'Nombre del producto',
      'Descripción corta del producto',
      'Descripción del producto',
      100,
      'imagen.png',
      'slug-del-producto',
      'SKU12345'
    );

    expect(product).toBeTruthy();
    expect(product.nombre).toBe('Nombre del producto');
    expect(product.descripcionCorta).toBe('Descripción corta del producto');
    expect(product.descripcion).toBe('Descripción del producto');
    expect(product.precio).toBe(100);
    expect(product.imagen).toBe('imagen.png');
    expect(product.slug).toBe('slug-del-producto');
    expect(product.sku).toBe('SKU12345');
  });
});
