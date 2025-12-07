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
    { name: 'firstName', label: 'First Name', type: 'text', required: true, gridColumn: 'span 4' },
    { name: 'middleName', label: 'Middle Name', type: 'text', gridColumn: 'span 4' },
    { name: 'lastName', label: 'Last Name', type: 'text', gridColumn: 'span 4' },
    { name: 'dob', label: 'Date of Birth', type: 'date', gridColumn: 'span 6' },
    { name: 'phone', label: 'Phone', type: 'text', gridColumn: 'span 6' },
    { name: 'email', label: 'Email', type: 'email', required: true, gridColumn: 'span 6' },
    { name: 'address.street', label: 'Street', type: 'text', gridColumn: 'span 12' },
    { name: 'address.city', label: 'City', type: 'text', gridColumn: 'span 4' },
    { name: 'address.state', label: 'State', type: 'text', gridColumn: 'span 4' },
    { name: 'address.zip', label: 'Pincode', type: 'text', gridColumn: 'span 4' },
    { name: 'address.country', label: 'Country', type: 'text', gridColumn: 'span 12' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientsService: PatientsService
  ) { }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.patientsService.get(patientId).then(patient => {
        this.patient = patient as Patient;
      });
    }
  }

  async onSubmit(patient: Patient) {
    if (this.patient) {
      await this.patientsService.update(this.patient.id, patient);
      this.router.navigate(['/patients']);
    }
  }
}
