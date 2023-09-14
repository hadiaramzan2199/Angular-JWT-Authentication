import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // If the token is present and valid, allow access to the route
      return true;
    }

    // If no token is found or it's invalid, redirect to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
