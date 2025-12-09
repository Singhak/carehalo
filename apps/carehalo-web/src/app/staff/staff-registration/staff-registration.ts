
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StaffService } from '../staff.service';
import { Staff } from '@cflock/shared-models';
import { Router } from '@angular/router';
import { ToastService } from '../../core/toast/toast.service';

@Component({
  selector: 'app-staff-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './staff-registration.html',
  styleUrls: ['./staff-registration.scss'],
})
export class StaffRegistration {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private router: Router,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      degree: [''],
      licenceNumber: [''],
      speciality: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const staff: Staff = {
        ...formValue,
        address: {
          street: formValue.street,
          city: formValue.city,
          state: formValue.state,
          zip: formValue.zip,
          country: formValue.country,
        },
      };

      try {
        await this.staffService.create(staff);
        this.toast.success('Staff created successfully');
        this.router.navigate(['/staff']);
      } catch (error) {
        console.error('Error creating staff', error);
      }
    }
  }
}
