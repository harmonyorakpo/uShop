import { Routes } from '@angular/router';
import { Product } from './product';
import { ProductList } from './product-list/product-list';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { ProductItem } from './product-item/product-item';

export const productRoutes: Routes = [
  {
    path: '',
    component: Product,
    children: [
      {
        path: '',
        redirectTo: 'product-list',
        pathMatch: 'full',
      },
      {
        path: 'product-list',
        component: ProductList,
      },
      {
        path: 'product-list/:id',
        component: ProductItem,
      },
      {
        path: 'cart',
        component: ShoppingCart,
      },
    ],
  },
];

 