import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientsService } from '../patient.service';
import { Patient } from '@cflock/shared-models';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.scss']
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientsService: PatientsService) { }

  async ngOnInit() {
    try {
      this.patients = await this.patientsService.list() as Patient[];
    } catch (error) {
      console.error('Error fetching patients', error);
    }
  }
}
