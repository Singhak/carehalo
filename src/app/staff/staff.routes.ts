import { Routes } from '@angular/router';
import { StaffRegistrationComponent } from './staff-registration/staff-registration';
import { StaffComponent } from './staff.component';

export const STAFF_ROUTES: Routes = [
  {
    path: '',
    component: StaffComponent
  },
  {
    path: 'new',
    component: StaffRegistrationComponent
  }
];
