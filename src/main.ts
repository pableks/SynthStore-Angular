/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';

/**
 * Registra los datos de localización para el idioma español de Chile (es-CL).
 */
registerLocaleData(localeEsCL, 'es-CL');

/**
 * Inicializa la aplicación Angular utilizando la configuración especificada y el componente raíz.
 * Muestra un error en la consola si la inicialización falla.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
