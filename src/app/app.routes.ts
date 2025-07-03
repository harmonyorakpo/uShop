import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/product/product.routes').then((m) => m.productRoutes),
  },
];
