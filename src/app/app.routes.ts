import { Routes } from '@angular/router';
import { authGuard, userGuard } from './guards/auth-guard';
import { publicGuard } from './guards/auth-guard';
import { adminGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
    canActivate: [publicGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register),
    canActivate: [publicGuard],
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'catalogue',
    loadComponent: () => import('./pages/catalogue/catalogue').then(m => m.Catalogue),
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./pages/product/product').then(m => m.Product),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart),
    canActivate: [userGuard],
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders').then(m => m.Orders),
    canActivate: [userGuard],
  },
  {
    path: 'admin/products',
    loadComponent: () => import('./pages/admin/products/products').then(m => m.Products),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/orders',
    loadComponent: () => import('./pages/admin/orders/orders').then(m => m.Orders),
    canActivate: [adminGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];