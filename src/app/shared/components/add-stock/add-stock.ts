import { Component, inject, Input } from '@angular/core';
import { IProduct } from '@models/product.model';
import { Cart } from '@services/cart';
import { NotificationService } from '@services/notification';

@Component({
  selector: 'app-add-stock',
  imports: [],
  templateUrl: './add-stock.html',
  styleUrl: './add-stock.scss'
})
export class AddStock {
   @Input() item!: IProduct;
   private cartService = inject(Cart);
   private notificationService = inject(NotificationService);
   selectedQuantity!: number;
   
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
