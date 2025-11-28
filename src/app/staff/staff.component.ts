import { Component, OnInit } from '@angular/core';
import { StaffService } from '../core/staff.service';
import { Staff } from '@cflock/shared-models';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, RouterModule]
})
export class StaffComponent implements OnInit {
  staff: Staff[] = [];
  loading = true;
  error: string | null = null;

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.staffService.getStaff().pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: staff => {
        this.staff = staff;
      },
      error: err => {
        this.error = 'Failed to load staff.';
        console.error(err);
      }
    });
  }
}
