import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TruncatePipe } from '@pipes/truncate-pipe';
import { Product } from '@services/product';
import { Subject } from 'rxjs';
import { Loader } from '../../../shared/components/loader/loader';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProduct } from '@models/product.model';
import { Cart } from '@services/cart';
import { NotificationService } from '@services/notification';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    TruncatePipe,
    MatInputModule,
    MatButtonModule,
    Loader,
    RouterModule,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private productService = inject(Product);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cartService = inject(Cart);

  loading: boolean = false;
  public currency!: ['USD', 'EUR', 'GBP'];
  selectedQuantity!: number;
  destroy$ = new Subject<void>();

  products$ = this.productService.getproductList();

  viewProduct(product: IProduct) {
    this.router.navigate(['../product-list', product.id], {
      relativeTo: this.route,
      state: { product },
    });
  }

  addToCart(event: Event, product: IProduct) {
    event.stopPropagation();

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
