import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('userRole');

  // If logged in, allow access
  if (role) return true;

  // If not, redirect to login
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};


export const authLRGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('userRole');
  const router = inject(Router);

  // If not logged in, allow access to /login or /register
  if (!role) return true;

  // If logged in, redirect based on role
  if (role === 'student') {
    router.navigate(['/']);
  } else {
    router.navigate(['/']);
  }

  return false;
};