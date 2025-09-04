import { Routes } from '@angular/router';
import { ShoppingCart } from './pages/product/shopping-cart/shopping-cart';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/product/product.routes').then((m) => m.productRoutes),
  },
    {
        path: 'cart',
        component: ShoppingCart,
      },
];
