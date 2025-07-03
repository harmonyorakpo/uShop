import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cart } from '@services/cart';
import { Product } from '@services/product';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Loader } from '../../../shared/components/loader/loader';
import { NotificationService } from '@services/notification';


@Component({
  selector: 'app-shopping-cart',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    Loader,
  ],

  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCart implements OnDestroy {
  private cartService = inject(Cart);
  private productService = inject(Product);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  public currency!: ['USD', 'EUR', 'GBP'];
  private destroy$ = new Subject<void>();
  loading: boolean = false;

  cartItems = this.cartService.items;
  totalItems = this.cartService.itemCount;
  totalPrice = this.cartService.totalPrice;

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const quantity = parseInt(target.value, 10);

    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  increaseQuantity(item: any): void {
    this.cartService.updateQuantity(item.id, item.cartQuantity + 1);
  }

  decreaseQuantity(item: any): void {
    if (item.cartQuantity > 1) {
      this.cartService.updateQuantity(item.id, item.cartQuantity - 1);
    }
  }

  getQuantity(item: any) {
    return this.cartService.getProductQuantityInCart(item.id) || 0;
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  productList() {
    this.router.navigate(['product/product-list']);
  }

  checkout() {
 
    this.loading = true;
    const payload = this.cartItems().map((item) => ({
      quantity: item.cartQuantity,
      product_id: item.id,
    }));

    
    this.productService
      .checkoutitem(payload)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.cartService.clearCart();
            this.router.navigate(['product']);
            this.notificationService.showNotification(
              'success',
              'Purchase completed succesfully'
            );
          }
       
        },
      });
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
