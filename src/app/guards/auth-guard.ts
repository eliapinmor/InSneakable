import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

// ============================================================
// authGuard
// Protege rutas privadas — el usuario debe estar autenticado
// Si no hay token válido → redirige a /login
// ============================================================
export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

// ============================================================
// publicGuard
// Protege rutas públicas (login, register)
// Si ya hay sesión activa → redirige a /home
// ============================================================
export const publicGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    router.navigate(['']);
    return false;
  }

  return true;
};

// ============================================================
// adminGuard
// Protege rutas de administración — rol debe ser 'admin'
// Sin token       → redirige a /login
// Sin rol admin   → redirige a /home
//
// Usa waitForUser() porque el constructor del AuthService
// carga el perfil de forma asíncrona: si se navega directamente
// a /admin/* al refrescar la página, el rol puede no estar
// disponible aún en el userSubject.
// ============================================================
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