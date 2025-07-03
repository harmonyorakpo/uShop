import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cart } from '@services/cart';
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cartService = inject(Cart);

  cartItemCount = this.cartService.itemCount;

  cartPage() {
    this.router.navigate(['./cart'], { relativeTo: this.route });
  }

  homePage() {
    this.router.navigate(['product'])
  }
}
