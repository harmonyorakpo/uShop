import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from '@services/interceptors/error-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { globalHeaderInterceptor } from '@services/interceptors/global-header-interceptor';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),

    provideHttpClient(withInterceptors([httpErrorInterceptor, globalHeaderInterceptor])),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
