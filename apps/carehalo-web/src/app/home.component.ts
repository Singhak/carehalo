
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="home-container">
      <mat-card class="welcome-card">
        <mat-card-header>
          <mat-card-title>Welcome to CareHalo</mat-card-title>
          <mat-card-subtitle>Your Hospital Management Solution</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>
            Streamline your hospital operations, manage patient records, and improve healthcare delivery with our comprehensive management system.
          </p>
          <p>
            Get started by navigating to one of the sections using the menu.
          </p>
        </mat-card-content>
        <mat-card-actions>
          <a mat-raised-button color="primary" routerLink="/dashboard">Go to Dashboard</a>
          <a mat-button routerLink="/patients">Manage Patients</a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 20px;
    }
    .welcome-card {
      max-width: 600px;
    }
  `]
})
export class HomeComponent { }
