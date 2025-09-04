import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from '@services/interceptors/error-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { globalHeaderInterceptor } from '@services/interceptors/global-header-interceptor';
import { provideRouter } from '@angular/router';
import { AppConfig, APP_CONFIG } from '@services/config';
import { APP_ROUTES } from './app/app.routes';

// Load external config before bootstrapping Angular
fetch('/assets/config/config.json')
  .then((response) => response.json())
  .then((config: AppConfig) => {
    return bootstrapApplication(App, {
      ...appConfig,
      providers: [
        ...(appConfig.providers || []),

        provideHttpClient(withInterceptors([httpErrorInterceptor, globalHeaderInterceptor])),
        provideAnimationsAsync(),
        provideRouter(APP_ROUTES),

        // Inject dynamic config
        { provide: APP_CONFIG, useValue: config },
      ],
    });
  })
  .catch((err) => console.error(err));
