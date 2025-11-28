
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, MatCardModule],
  template: `
    <div class="auth-container">
      <mat-card>
        <mat-card-content>
          <router-outlet></router-outlet>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f2f5;
    }
    mat-card {
      max-width: 400px;
      width: 100%;
    }
  `]
})
export class AuthLayoutComponent {}
