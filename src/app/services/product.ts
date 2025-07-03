import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CheckoutResponse, ProductResponse } from '@models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);

  getproductList() {
    return this.http.get<ProductResponse>(
      'https://g93902zutc.execute-api.eu-central-1.amazonaws.com/prod/products'
    );
  }

  checkoutitem(payload: any) {
    return this.http.post<CheckoutResponse>(
      'https://g93902zutc.execute-api.eu-central-1.amazonaws.com/prod/checkout',
      payload
    );
  }
}
