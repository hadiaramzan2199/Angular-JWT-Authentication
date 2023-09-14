import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Store the token in local storage
        this.authService.setToken(response.token);

        // Redirect to the home page
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle login error
        this.error = 'Invalid username or password';
      }
    );
  }
}
