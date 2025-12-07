import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from '@cflock/shared-models';
import { PatientsService } from '../patient.service';
import { DynamicFormComponent } from '../../core/dynamic-form/dynamic-form.component';
import { FormField } from '../../core/dynamic-form/form-field.model';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  template: `<app-dynamic-form 
    [formFields]="patientFormFields" 
    formTitle="Patient Registration" 
    (formSubmit)="onSubmit($event)"
    submitButtonText="Register"
    [resetOnSubmit]="true"
  ></app-dynamic-form>`,
})
export class PatientRegistration {
  patientFormFields: FormField[] = [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'address.street', label: 'Street', type: 'text' },
    { name: 'address.city', label: 'City', type: 'text' },
    { name: 'address.state', label: 'State', type: 'text' },
    { name: 'address.zip', label: 'Pincode', type: 'text' },
    { name: 'address.country', label: 'Country', type: 'text' },
  ];

  constructor(private patientsService: PatientsService) {}

  async onSubmit(patient: Patient) {
    try {
      await this.patientsService.create(patient);
      console.log('Patient registered successfully');
      // Optionally, you can reset the form here if the dynamic form component doesn't do it.
    } catch (error) {
      console.error('Error registering patient', error);
    }
  }
}
