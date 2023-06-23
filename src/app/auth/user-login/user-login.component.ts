import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  showPassword: boolean = false;
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      appType: new FormControl('', Validators.required)
    });
  }

  userLogin(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        business: this.loginForm.value.username,
        password: this.loginForm.value.password,
        appType: this.loginForm.value.appType

      };
      this.authService.userLogin(credentials).subscribe(
        (response) => {
          // Successful login
          console.log("user is logged in");
          const authUserToken = response.token;
          this.authService.setAuthUserToken(authUserToken)
          this.router.navigate(['/tickets-form']);
        },
        (error) => {
          // Failed login
          this.errorMessage = 'Invalid username or password.';
          console.log(error);
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
