
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PatientsService } from '../patient.service';
import { Patient } from '@cflock/shared-models';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './patient-registration.html',
  styleUrls: ['./patient-registration.scss'],
})
export class PatientRegistration {
  form: FormGroup;

  constructor(private fb: FormBuilder, private patientsService: PatientsService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      const patient: Patient = {
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
        await this.patientsService.create(patient);
        console.log('Patient registered successfully');
        this.form.reset();
      } catch (error) {
        console.error('Error registering patient', error);
      }
    }
  }
}
