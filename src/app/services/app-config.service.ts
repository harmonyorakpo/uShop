import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from './config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  get appConfig(): AppConfig {
    return this.config;
  }
}

