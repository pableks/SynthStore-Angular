import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'catalogo', component: CatalogoComponent},
    { path: 'producto/:sku', component: ProductDetailComponent},
    { path: 'carrito', component: CarritoComponent},
    { path: 'search', component: SearchResultsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'admin/usuarios', component: AdminUsuariosComponent},
    { path: 'admin/productos', component: AdminProductosComponent},
    { path: 'mi-perfil', component: PerfilComponent},
    { path: 'checkout', component: CheckoutComponent}

];
