import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async signup() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      try {
        await createUserWithEmailAndPassword(this.auth, email, password);
        this.router.navigate(['/']);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
