import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../core/dynamic-form/dynamic-form.component';
import { FormField } from '../../core/dynamic-form/form-field.model';
import { StaffService } from '../staff.service';
import { Router } from '@angular/router';
import { ToastService } from '../../core/toast/toast.service';

@Component({
  selector: 'app-staff-registration',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  template: `<app-dynamic-form
    [formFields]="staffFormFields"
    formTitle="Staff Registration"
    (formSubmit)="onSubmit($event)"
    submitButtonText="Create Staff"
    [resetOnSubmit]="true"
  ></app-dynamic-form>`,
})
export class StaffRegistration {
  staffFormFields: FormField[] = [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true, gridColumn: 'span 6' },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'doctor', label: 'Doctor' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'admin', label: 'Admin' },
      ],
      required: true,
      gridColumn: 'span 6',
    },
    { name: 'email', label: 'Email', type: 'email', required: true, gridColumn: 'span 6' },
    { name: 'phone', label: 'Phone', type: 'phone', gridColumn: 'span 6' },
    {
      name: 'degree',
      label: 'Degree',
      type: 'text',
      conditionalDisplay: (formValue) => formValue.role === 'doctor',
      gridColumn: 'span 4',
    },
    {
      name: 'licenceNumber',
      label: 'Licence Number',
      type: 'text',
      conditionalDisplay: (formValue) => formValue.role === 'doctor',
      gridColumn: 'span 4',
    },
    {
      name: 'speciality',
      label: 'Speciality',
      type: 'select',
      options: [
        { value: 'cardiology', label: 'Cardiology' },
        { value: 'dermatology', label: 'Dermatology' },
        { value: 'neurology', label: 'Neurology' },
        { value: 'pediatrics', label: 'Pediatrics' },
      ],
      conditionalDisplay: (formValue) => formValue.role === 'doctor',
      gridColumn: 'span 4',
    },
    { name: 'address.street', label: 'Street', type: 'text', gridColumn: 'span 12' },
    { name: 'address.city', label: 'City', type: 'text', gridColumn: 'span 4' },
    { name: 'address.state', label: 'State', type: 'text', gridColumn: 'span 4' },
    { name: 'address.zip', label: 'Pincode', type: 'text', gridColumn: 'span 4' },
    { name: 'address.country', label: 'Country', type: 'text', gridColumn: 'span 12' },
  ];

  constructor(private staffService: StaffService, private router: Router, private toast: ToastService) {}

  async onSubmit(staff: any) {
    try {
      await this.staffService.create(staff);
      console.log('Staff created successfully');
      this.toast.success('Staff created successfully');
      this.router.navigate(['/staff']);
    } catch (error) {
      console.error('Error creating staff', error);
    }
  }
}
