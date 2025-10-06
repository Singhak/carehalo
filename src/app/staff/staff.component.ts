import { Component, OnInit } from '@angular/core';
import { StaffService } from '../core/staff.service';
import { Staff } from '@cflock/shared-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class StaffComponent implements OnInit {
  staff: Staff[] = [];

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.staffService.getStaff().subscribe(staff => {
      this.staff = staff;
    });
  }
}
