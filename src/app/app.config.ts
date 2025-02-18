import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Importar provideHttpClient y withFetch

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración para detección de cambios con Zone.js
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configuración del router
    provideRouter(routes),

    // Configuración de HttpClient, usando con 'withFetch' para habilitar el uso de fetch API
    provideHttpClient(withFetch())  // Aquí puedes agregar configuraciones adicionales como interceptores si es necesario
  ]
};
