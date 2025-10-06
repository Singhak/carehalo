import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../core/prescription.service';
import { Prescription } from '@cflock/shared-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PrescriptionsComponent implements OnInit {
  prescriptions: Prescription[] = [];

  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.prescriptionService.getPrescriptions().subscribe(prescriptions => {
      this.prescriptions = prescriptions;
    });
  }
}
