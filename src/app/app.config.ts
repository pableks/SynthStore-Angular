/**
 * Configuración de la aplicación Angular.
 */
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Registrar el locale para español de Chile
registerLocaleData(localeEsCL);

/**
 * Configuración de la aplicación Angular, incluyendo proveedores de servicios.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedor para configurar las rutas de la aplicación
    provideRouter(
      routes),

    // Proveedor para configurar el cliente HTTP con Fetch y interceptores
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    // Importar proveedores desde FormsModule para su uso en la aplicación
    importProvidersFrom(FormsModule),

    // Proveedor para configurar el LOCALE_ID con 'es-CL' (español de Chile)
    { provide: LOCALE_ID, useValue: 'es-CL' },

    // Proveedor para inicializar la aplicación Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // Proveedor para obtener y proporcionar Firestore de Firebase
    provideFirestore(() => getFirestore()),
  ]
};
