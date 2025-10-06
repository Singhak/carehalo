import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await signInWithEmailAndPassword(this.auth, email, password);
        this.router.navigate(['/']);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
