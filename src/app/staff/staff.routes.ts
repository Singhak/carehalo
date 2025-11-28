import { Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list';
import { StaffRegistration } from './staff-registration/staff-registration';
import { StaffEditComponent } from './staff-edit/staff-edit';

export const STAFF_ROUTES: Routes = [
  { path: '', component: StaffListComponent },
  { path: 'new', component: StaffRegistration }
  , { path: ':id/edit', component: StaffEditComponent }
];
