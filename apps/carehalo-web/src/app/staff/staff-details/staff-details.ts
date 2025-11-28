import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-staff-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
  <div class="p-3" style="min-width:320px; max-width:680px;">
    <h3 class="mb-3">Staff Details</h3>
    <div class="mb-2"><strong>Full Name:</strong> {{ data.fullName || '-' }}</div>
    <div class="mb-2"><strong>Role:</strong> {{ data.role || '-' }}</div>
    <div class="mb-2"><strong>Email:</strong> {{ data.email || '-' }}</div>
    <div class="mb-2"><strong>Phone:</strong> {{ data.phone || '-' }}</div>
    <div class="mb-2"><strong>Address:</strong> {{ data.address || '-' }}</div>
    <div *ngIf="data.degree" class="mb-2"><strong>Degree:</strong> {{ data.degree }}</div>
    <div *ngIf="data.timing" class="mb-2"><strong>Timing:</strong> {{ data.timing }}</div>

    <div class="text-end mt-3">
      <button mat-button (click)="close()">Close</button>
    </div>
  </div>
  `
})
export class StaffDetailsComponent {
  constructor(private dialogRef: MatDialogRef<StaffDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  close() {
    this.dialogRef.close();
  }
}
