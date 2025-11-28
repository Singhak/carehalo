import { Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list';
import { PatientEditComponent } from './patient-edit/patient-edit';
import { PatientRegistration } from './patient-registration/patient-registration';

export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    component: PatientListComponent
  },
  {
    path: 'new',
    component: PatientRegistration
  },
  {
    path: ':id/edit',
    component: PatientEditComponent
  }
];
