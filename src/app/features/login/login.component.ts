import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  protected isSubmitting = signal<boolean>(false);
  protected errorMessage = signal<string | null>(null);

  protected loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {

    if(this.loginForm.invalid || this.isSubmitting())
      return;

    const  email = this.loginForm.value.email;
    const  password = this.loginForm.value.password;

    if (!email || !password) {
      return;
    }
    this.isSubmitting.set(true);
    this.authService.login(email, password).subscribe({
      next: value => {
        this.isSubmitting.set(false);
        this.router.navigate(['/dishes']);
      },
      error: err => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.message ?? 'Login failed');
      }
    });
  }
}
