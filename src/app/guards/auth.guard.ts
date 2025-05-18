import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(UserService);
  const router = inject(Router);

  if(auth.getUser()) {
    console.log("puede pasar");
    return true
  }

  console.log("no puede pasar");
  router.navigate(['/login']);
  return  false;
};