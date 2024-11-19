import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Función de arranque de la aplicación.
 * Inicializa la aplicación Angular utilizando la configuración especificada y el componente raíz.
 * @returns {Promise<void>} Promesa que se resuelve cuando la aplicación se ha iniciado correctamente.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
