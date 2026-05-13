import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

export const publicGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    router.navigate(['']);
    return false;
  }

  return true;
};

export const adminGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Esperamos a que el perfil esté completamente cargado
  const user = await auth.waitForUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const role = user.role ?? user.user_metadata?.role ?? null;

  if (role !== 'admin') {
    router.navigate(['']);
    return false;
  }

  return true;
};


export const userGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const user = await auth.waitForUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const role = user.role ?? user.user_metadata?.role ?? null;

  if (role !== 'user') {
    router.navigate(['']); 
    return false;
  }

  return true;
};