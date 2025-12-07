import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../core/dynamic-form/dynamic-form.component';
import { FormField } from '../../core/dynamic-form/form-field.model';
import { StaffService } from '../staff.service';
import { ToastService } from '../../core/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from '@cflock/shared-models';

@Component({
  selector: 'app-staff-edit',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  template: `<div *ngIf="loaded; else loading">
    <app-dynamic-form
      [formFields]="staffFormFields"
      [initialData]="staff"
      formTitle="Edit Staff"
      (formSubmit)="onSubmit($event)"
      submitButtonText="Save Changes"
    ></app-dynamic-form>
  </div>
  <ng-template #loading>
    <div class="p-3">Loading staff...</div>
  </ng-template>`
})
export class StaffEditComponent implements OnInit {
  staffFormFields: FormField[] = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true, gridColumn: 'span 4' },
    { name: 'middleName', label: 'Middle Name', type: 'text', gridColumn: 'span 4' },
    { name: 'lastName', label: 'Last Name', type: 'text', gridColumn: 'span 4' },
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
    { name: 'address.street', label: 'Street', type: 'text' },
    { name: 'address.city', label: 'City', type: 'text' },
    { name: 'address.state', label: 'State', type: 'text' },
    { name: 'address.zip', label: 'Pincode', type: 'text' },
    { name: 'address.country', label: 'Country', type: 'text' },
    { name: 'degree', label: 'Degree', type: 'text', conditionalDisplay: (formValue) => formValue.role === 'doctor' },
    { name: 'timing', label: 'Timing', type: 'text', conditionalDisplay: (formValue) => formValue.role === 'doctor' },
  ];

  staff?: Staff;
  loaded = false;

  constructor(private staffService: StaffService, private route: ActivatedRoute, private router: Router, private toast: ToastService) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      // no id, navigate back to list
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }
    try {
      const res: any = await this.staffService.get(id);
      this.staff = res as Staff;
    } catch (err) {
      console.error('Error loading staff', err);
    } finally {
      this.loaded = true;
    }
  }

  async onSubmit(payload: any) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    try {
      await this.staffService.update(id, payload);
      // navigate back to list after save
      this.toast.success('Staff updated');
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (err) {
      console.error('Error updating staff', err);
    }
  }
}
