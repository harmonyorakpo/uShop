import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { IProduct } from '@models/product.model';
import { Cart } from '@services/cart';
import { NotificationService } from '@services/notification';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, MatButton],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem implements OnInit {
  private notificationService = inject(NotificationService);
  private cartService = inject(Cart);
  product: IProduct | null = null;
  selectedQuantity!: number;

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData() {
    const state = history.state;
    this.product = state?.product;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, this.selectedQuantity);
    this.notificationService.showNotification(
      'success',
      `${product.name}  added to cart`
    );
  }

  getQuantity(product: IProduct) {
    return this.cartService.getProductQuantityInCart(product.id) || 0;
  }
}
