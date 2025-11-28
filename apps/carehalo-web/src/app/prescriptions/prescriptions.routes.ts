import { Routes } from '@angular/router';
import { PrescriptionsComponent } from './prescriptions.component';
import { PrescriptionCreationComponent } from './prescription-creation/prescription-creation.component';

export const PRESCRIPTIONS_ROUTES: Routes = [
  {
    path: '',
    component: PrescriptionsComponent
  },
  {
    path: 'new',
    component: PrescriptionCreationComponent
  }
];
