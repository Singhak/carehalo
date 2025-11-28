import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';

interface MenuItem {
  label: string;
  link: string;
  roles: string[];
  icon?: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatTooltipModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuItems$: Observable<MenuItem[]>;

  private allMenuItems: MenuItem[] = [
    { label: 'Dashboard', link: '/dashboard', roles: ['admin'], icon: 'dashboard' },
    { label: 'Patients', link: '/patients', roles: ['admin', 'doctor'], icon: 'people' },
    { label: 'Appointments', link: '/appointments', roles: ['admin', 'doctor', 'patient'], icon: 'calendar_today' },
    { label: 'Prescriptions', link: '/prescriptions', roles: ['admin', 'doctor', 'patient'], icon: 'medical_services' },
    { label: 'Staff', link: '/staff', roles: ['admin'], icon: 'badge' },
    { label: 'Billing', link: '/billing', roles: ['admin'], icon: 'receipt_long' },
    { label: 'Communication', link: '/communication', roles: ['admin'], icon: 'chat' },
  ];

  constructor(public authService: AuthService) {
    this.menuItems$ = this.authService.getUserRole().pipe(
      map(role => this.filterMenuByRole(role))
    );
  }

  private filterMenuByRole(role: string): MenuItem[] {
    if (role === 'unauthenticated') {
      return [
        { label: 'Login', link: '/auth/login', roles: [] },
        { label: 'Signup', link: '/auth/signup', roles: [] },
      ];
    }
    return this.allMenuItems.filter(item => item.roles.includes(role));
  }

  logout() {
    this.authService.logout();
  }
}
