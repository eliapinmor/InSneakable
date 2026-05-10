import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'catalogue',
    loadComponent: () => import('./pages/catalogue/catalogue').then(m => m.Catalogue)
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./pages/product/product').then(m => m.Product)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  {
    path: 'admin/products',
    loadComponent: () => import('./pages/admin/products/products').then(m => m.Products)
  },
  {
    path: 'admin/orders',
    loadComponent: () => import('./pages/admin/orders/orders').then(m => m.Orders)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
