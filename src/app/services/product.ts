import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CheckoutResponse, ProductResponse } from '@models/product.model';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);
  private appConfig = inject(AppConfigService).appConfig;

  getproductList() {
    return this.http.get<ProductResponse>(

      this.appConfig.BASE_URL + this.appConfig.GET_PRODUCTS
    );
  }

  checkoutitem(payload: any) {
    return this.http.post<CheckoutResponse>(
      this.appConfig.BASE_URL + this.appConfig.CHECKOUT_ITEM,
      payload
    );
  }
}


