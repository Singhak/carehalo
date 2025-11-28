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
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
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
    },
    { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'phone' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'degree', label: 'Degree', type: 'text', conditionalDisplay: (formValue) => formValue.role === 'doctor' },
    { name: 'timing', label: 'Timing', type: 'text', conditionalDisplay: (formValue) => formValue.role === 'doctor' },
  ];

  constructor(private staffService: StaffService, private router: Router, private toast: ToastService) {}

  async onSubmit(staff: any) {
    try {
      await this.staffService.create(staff);
      console.log('Staff created successfully');
      // navigate back to staff list after creation
      this.toast.success('Staff created successfully');
      this.router.navigate(['/staff']);
    } catch (error) {
      console.error('Error creating staff', error);
    }
  }
}
