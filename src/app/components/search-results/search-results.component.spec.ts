import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';


describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  const mockProducts = [
    { nombre: 'Producto 1', descripcionCorta: 'Desc 1', descripcion: 'Descripcion 1', precio: 1000, imagen: '', slug: '', sku: '' },
    { nombre: 'Producto 2', descripcionCorta: 'Desc 2', descripcion: 'Descripcion 2', precio: 2000, imagen: '', slug: '', sku: '' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProductService, useValue: { searchProducts: jasmine.createSpy('searchProducts').and.returnValue(of(mockProducts)) } },
        { provide: ActivatedRoute, useValue: { queryParams: of({ query: 'test' }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get query param and search products on init', () => {
    expect(component.query).toBe('test');
    expect(productService.searchProducts).toHaveBeenCalledWith('test');
    expect(component.results.length).toBe(2);
  });

  it('should search products when query changes', () => {
    component.query = 'new query';
    component.searchProducts();
    expect(productService.searchProducts).toHaveBeenCalledWith('new query');
    expect(component.results.length).toBe(2);
  });
});
