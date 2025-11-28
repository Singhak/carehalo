
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <mat-card class="not-found-card">
        <mat-card-header>
          <mat-card-title>404 - Page Not Found</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>The page you are looking for does not exist.</p>
        </mat-card-content>
        <mat-card-actions>
          <a mat-raised-button color="primary" routerLink="/">Go to Home</a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 20px;
    }
    .not-found-card {
      max-width: 400px;
      text-align: center;
    }
  `]
})
export class NotFoundComponent { }
