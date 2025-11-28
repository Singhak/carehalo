import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '@cflock/shared-models';
import { PatientsService } from '../patient.service';
import { DynamicFormComponent } from '../../core/dynamic-form/dynamic-form.component';
import { FormField } from '../../core/dynamic-form/form-field.model';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  template: `<app-dynamic-form [formFields]="patientFormFields" formTitle="Edit Patient" [initialData]="patient" (formSubmit)="onSubmit($event)"></app-dynamic-form>`,
})
export class PatientEditComponent implements OnInit {
  patient?: Patient;
  patientFormFields: FormField[] = [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'address', label: 'Address', type: 'text' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientsService: PatientsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientsService.get(id).then(patient => {
        this.patient = patient as Patient;
      });
    }
  }

  async onSubmit(patientData: Patient) {
    if (this.patient && this.patient.id) {
      try {
        await this.patientsService.update(this.patient.id, patientData);
        this.router.navigate(['/patients']);
      } catch (error) {
        console.error('Error updating patient', error);
      }
    }
  }
}
