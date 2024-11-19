import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Configuración específica para la renderización en el servidor.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    // Proveedor para la renderización en el servidor.
    provideServerRendering()
  ]
};

/**
 * Configuración combinada de la aplicación para cliente y servidor.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
