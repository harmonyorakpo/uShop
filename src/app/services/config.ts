import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export interface AppConfig {
  BASE_URL: string;
  GET_PRODUCTS: string;
  CHECKOUT_ITEM: string;
}
