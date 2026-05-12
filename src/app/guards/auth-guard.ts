import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

// ============================================================
// authGuard
// Protege rutas privadas (usuario debe estar autenticado)
// Uso: canActivate: [authGuard]
// ============================================================
export const authGuard: CanActivateFn = async () => {
  const authService = inject(Auth);
  const router = inject(Router);

  const session = await authService.getProfile();

  if (!session) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

// ============================================================
// publicGuard
// Protege rutas públicas (login, register)
// Si el usuario ya está autenticado lo redirige a /home
// Uso: canActivate: [publicGuard]
// ============================================================
export const publicGuard: CanActivateFn = async () => {
  const authService = inject(Auth);
  const router = inject(Router);

  const session = await authService.getProfile();

  if (session) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};

// ============================================================
// adminGuard
// Protege rutas de administración (rol debe ser 'admin')
// Si no está autenticado → /login
// Si está autenticado pero no es admin → /home
// Uso: canActivate: [adminGuard]
// ============================================================
export const adminGuard: CanActivateFn = async () => {
  const authService = inject(Auth);
  const router = inject(Router);

  const session = await authService.getProfile();

  if (!session) {
    router.navigate(['/login']);
    return false;
  }

  const role = session.user.user_metadata?.['role'];

  if (role !== 'admin') {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
