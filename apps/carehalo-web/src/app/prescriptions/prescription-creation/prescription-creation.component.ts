import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '../../core/dynamic-form/dynamic-form.component';
import { FormField } from '../../core/dynamic-form/form-field.model';
import { PrescriptionService } from '../../core/prescription.service';
import { PatientsService } from '../../patients/patient.service';
import { StaffService } from '../../core/staff.service';
import { Prescription, Patient, Staff } from '@cflock/shared-models';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-prescription-creation',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  template: `
    <app-dynamic-form
      [formFields]="prescriptionFormFields"
      formTitle="New Prescription"
      (formSubmit)="onSubmit($event)"
      [initialData]="initialData"
      submitButtonText="Create Prescription"
    ></app-dynamic-form>
    <div *ngIf="createdPrescription" class="prescription-summary">
      <h3>Prescription Created Successfully!</h3>
      <p><strong>Patient:</strong> {{ getPatientName(createdPrescription.patientId) }}</p>
      <p><strong>Doctor:</strong> {{ getDoctorName(createdPrescription.staffId) }}</p>
      <h4>Medications:</h4>
      <ul>
        <li *ngFor="let med of createdPrescription.medications">
          {{ med.medicationName }} ({{ med.dosage }}) - {{ med.instructions }}
        </li>
      </ul>
      <button (click)="sharePrescription()">Share via SMS</button>
    </div>
  `,
  styles: [`
    .prescription-summary {
      margin-top: 2rem;
      padding: 1.5rem;
      background-color: #f0f8ff;
      border-radius: 8px;
      border: 1px solid #b0e0e6;
    }
    button {
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class PrescriptionCreationComponent implements OnInit {
  prescriptionFormFields: FormField[] = [];
  createdPrescription: Prescription | null = null;
  patients: Patient[] = [];
  staff: Staff[] = [];
  initialData: any = {};

  constructor(
    private prescriptionService: PrescriptionService,
    private patientService: PatientsService,
    private staffService: StaffService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    forkJoin({
      patients: this.patientService.list() as Promise<Patient[]>,
      staff: this.staffService.getStaff(),
    }).subscribe(({ patients, staff }) => {
      this.patients = patients;
      this.staff = staff.filter(s => s.role === 'doctor');
      this.initializeFormFields();

      this.route.paramMap.subscribe(params => {
        const patientId = params.get('patientId');
        if (patientId) {
          this.initialData = { patientId };
          const patientField = this.prescriptionFormFields.find(field => field.name === 'patientId');
          if (patientField) {
            patientField.disabled = true;
          }
        }
      });
    });
  }

  initializeFormFields() {
    this.prescriptionFormFields = [
      {
        name: 'patientId',
        label: 'Patient',
        type: 'select',
        options: this.patients.map(p => ({ value: p.id, label: [p.firstName, p.middleName, p.lastName].filter(Boolean).join(' ') })),
        required: true,
      },
      {
        name: 'staffId',
        label: 'Doctor',
        type: 'select',
        options: this.staff.map(s => ({ value: s.id, label: [s.firstName, s.lastName].filter(Boolean).join(' ') })),
        required: true,
      },
      {
        name: 'medications',
        label: 'Medications',
        type: 'form-array',
        arrayFields: [
          { name: 'medicationName', label: 'Medication', type: 'text', required: true },
          { name: 'dosage', label: 'Dosage', type: 'text', required: true },
          { name: 'instructions', label: 'Instructions', type: 'text', required: true },
        ]
      }
    ];
  }

  onSubmit(prescriptionData: any) {
    const hospitalId = this.authService.getTenantId();
    const prescription = { ...prescriptionData, hospitalId } as Prescription;

    this.prescriptionService.createPrescription(prescription).subscribe(created => {
      this.createdPrescription = created;
    });
  }

  sharePrescription() {
    if (this.createdPrescription) {
      this.prescriptionService.sharePrescription(this.createdPrescription.id).subscribe(() => {
        alert('SMS sent successfully (mocked)!');
      }, (error) => {
        console.error('Error sharing prescription', error);
        alert('Error sharing prescription.');
      });
    }
  }

  getPatientName(patientId: string): string {
    const patient = this.patients.find(p => p.id === patientId);
    return patient ? [patient.firstName, patient.middleName, patient.lastName].filter(Boolean).join(' ') : '';
  }

  getDoctorName(staffId: string): string {
    const doctor = this.staff.find(s => s.id === staffId);
    return doctor ? [doctor.firstName, doctor.lastName].filter(Boolean).join(' ') : '';
  }
}
