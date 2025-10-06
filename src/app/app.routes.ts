import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  {
    path: 'patients',
    loadChildren: () => import('./patients/patients.routes').then(m => m.PATIENTS_ROUTES)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.routes').then(m => m.APPOINTMENTS_ROUTES)
  },
  {
    path: 'prescriptions',
    loadChildren: () => import('./prescriptions/prescriptions.routes').then(m => m.PRESCRIPTIONS_ROUTES)
  },
  {
    path: 'staff',
    loadChildren: () => import('./staff/staff.routes').then(m => m.STAFF_ROUTES)
  },
  {
    path: 'billing',
    loadChildren: () => import('./billing/billing.routes').then(m => m.BILLING_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'communication',
    loadChildren: () => import('./communication/communication.routes').then(m => m.communicationRoutes)
  },
  { path: '**', component: NotFoundComponent }
];
