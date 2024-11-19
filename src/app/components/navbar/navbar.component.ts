import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

interface CarritoItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  @ViewChild('miniCart') miniCart!: ElementRef;
  @ViewChild('cartIcon') cartIcon!: ElementRef;

  searchQuery: string = '';
  cartItemCount: number = 0;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  currentUser: any = null;
  showMiniCart: boolean = false;
  miniCartItems: CarritoItem[] = [];
  total: number = 0;
  miniCartPosition: { top: string, left: string } = { top: '0px', left: '0px' };

  private authSubscription: Subscription = new Subscription();
  private loginSubscription: Subscription = new Subscription();
  private logoutSubscription: Subscription  = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      this.updateUserStatus();
    });

    this.loginSubscription = this.authService.loginEvent$.subscribe(() => {
      this.updateUserStatus();
    });

    this.logoutSubscription = this.authService.logoutEvent$.subscribe(() => {
      this.updateUserStatus();
    });

    this.updateCartInfo();
    this.carritoService.carritoActualizado.subscribe(() => {
      this.updateCartInfo();
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }

  private updateUserStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.authService.isAdmin();
  }


  
  updateCartInfo(): void {
    this.cartItemCount = this.carritoService.getItemCount();
    this.miniCartItems = this.carritoService.getCarritoItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.miniCartItems.reduce((sum, item) => sum + (item.product?.precio ?? 0) * (item.quantity ?? 0), 0);
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMiniCart(event: MouseEvent): void {
    event.stopPropagation();
    this.showMiniCart = !this.showMiniCart;
    if (this.showMiniCart) {
      this.updateCartInfo();
      this.positionMiniCart(event);
    }
  }

  positionMiniCart(event: MouseEvent): void {
    const cartIconRect = this.cartIcon.nativeElement.getBoundingClientRect();
    const miniCartWidth = 300; // width of the mini-cart
    const miniCartHeight = 400; // approximate height of the mini-cart

    let left = cartIconRect.right - miniCartWidth;
    let top = cartIconRect.bottom ;

    // Ensure the mini-cart doesn't go off-screen
    if (left < 0) left = 0;
    if (top + miniCartHeight > window.innerHeight) {
      top = cartIconRect.top + window.scrollY - miniCartHeight;
    }

    this.miniCartPosition = { top: `${top}px`, left: `${left}px` };
  }

  removeItem(product: Product): void {
    this.carritoService.removeFromCarrito(product);
    this.updateCartInfo();
  }

  updateQuantity(product: Product, quantity: number): void {
    if (quantity > 0) {
      this.carritoService.updateQuantity(product, quantity);
    } else {
      this.carritoService.removeFromCarrito(product);
    }
    this.updateCartInfo();
  }

  goToCart(): void {
    this.showMiniCart = false;
    this.router.navigate(['/carrito']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showMiniCart && 
        !this.miniCart.nativeElement.contains(event.target) && 
        !this.cartIcon.nativeElement.contains(event.target)) {
      this.showMiniCart = false;
    }
  }
}