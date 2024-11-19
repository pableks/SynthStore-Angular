/**
 * Clase que representa un producto.
 */
export class Product {
    /** Identificador único del producto. Puede ser opcional si no está definido. */
    id?: string;

    /** Nombre del producto. */
    nombre: string;

    /** Descripción corta del producto. */
    descripcionCorta: string;

    /** Descripción detallada del producto. */
    descripcion: string;

    /** Precio del producto. */
    precio: number;

    /** URL de la imagen del producto. */
    imagen: string;

    /** Slug del producto para URLs amigables. */
    slug: string;

    /** Código SKU (Stock Keeping Unit) del producto. */
    sku: string;

    /**
     * Constructor de la clase Product.
     * @param id Identificador único del producto (opcional, por defecto vacío).
     * @param nombre Nombre del producto (opcional, por defecto vacío).
     * @param descripcionCorta Descripción corta del producto (opcional, por defecto vacío).
     * @param descripcion Descripción detallada del producto (opcional, por defecto vacío).
     * @param precio Precio del producto (opcional, por defecto 0).
     * @param imagen URL de la imagen del producto (opcional, por defecto vacío).
     * @param slug Slug del producto para URLs amigables (opcional, por defecto vacío).
     * @param sku Código SKU del producto (opcional, por defecto vacío).
     */
    constructor(
        id: string = '',
        nombre: string = '',
        descripcionCorta: string = '',
        descripcion: string = '',
        precio: number = 0,
        imagen: string = '',
        slug: string = '',
        sku: string = ''
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcionCorta = descripcionCorta;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.slug = slug;
        this.sku = sku;
    }
}
