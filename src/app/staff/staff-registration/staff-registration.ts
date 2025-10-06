import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Staff } from '@cflock/shared-models';
import { StaffService } from '../../core/staff.service';
import { DynamicFormComponent } from '../../core/dynamic-form/dynamic-form.component';
import { FormField } from '../../core/dynamic-form/form-field.model';

@Component({
  selector: 'app-staff-registration',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  template: `<app-dynamic-form [formFields]="staffFormFields" formTitle="Staff Registration" (formSubmit)="onSubmit($event)"></app-dynamic-form>`,
})
export class StaffRegistrationComponent {
  staffFormFields: FormField[] = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'doctor', label: 'Doctor' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'admin', label: 'Admin' },
      ],
      required: true
    },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
    {
      name: 'degree',
      label: 'Degree',
      type: 'text',
      conditionalDisplay: (formValue) => formValue.role === 'doctor'
    },
    {
      name: 'timing',
      label: 'Timing',
      type: 'text',
      conditionalDisplay: (formValue) => formValue.role === 'doctor'
    },
  ];

  constructor(private staffService: StaffService) { }

  onSubmit(staff: Staff) {
    this.staffService.createStaff(staff).subscribe(() => {
      console.log('Staff registered successfully');
      // Optionally, you can reset the form here if the dynamic form component doesn't do it.
    });
  }
}
