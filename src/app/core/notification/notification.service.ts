import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snack: MatSnackBar) {}

  success(message: string, duration = 3000) {
    this.snack.open(message, 'OK', { duration, panelClass: ['mat-snack-bar-success'] });
  }

  error(message: string, duration = 5000) {
    this.snack.open(message, 'DISMISS', { duration, panelClass: ['mat-snack-bar-error'] });
  }

  info(message: string, duration = 3000) {
    this.snack.open(message, 'OK', { duration, panelClass: ['mat-snack-bar-info'] });
  }
}
