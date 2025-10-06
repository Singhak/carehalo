import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientsService } from '../patients/patient.service';
import { StaffService } from '../core/staff.service';
import { Patient, Staff } from '@cflock/shared-models';
import { forkJoin } from 'rxjs';
import { CommunicationService } from '../core/communication.service';

interface UserView {
  id: string;
  name: string;
  type: 'patient' | 'doctor' | 'staff';
  phone: string;
  selected: boolean;
}

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss'],
})
export class CommunicationComponent implements OnInit {
  allUsers: UserView[] = [];
  filteredUsers: UserView[] = [];
  userType: 'all' | 'patient' | 'doctor' | 'staff' = 'all';
  message: string = '';

  constructor(
    private patientService: PatientsService,
    private staffService: StaffService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    forkJoin({
      patients: this.patientService.list() as Promise<Patient[]>,
      staff: this.staffService.getStaff(),
    }).subscribe(({ patients, staff }) => {
      const patientUsers: UserView[] = patients.map(p => ({
        id: p.id,
        name: p.fullName,
        type: 'patient',
        phone: p.phone || '',
        selected: false,
      }));

      const staffUsers: UserView[] = staff.map(s => ({
        id: s.id,
        name: s.name,
        type: s.role === 'doctor' ? 'doctor' : 'staff',
        phone: s.phone || '',
        selected: false,
      }));

      this.allUsers = [...patientUsers, ...staffUsers];
      this.filterUsers();
    });
  }

  filterUsers() {
    if (this.userType === 'all') {
      this.filteredUsers = this.allUsers;
    } else {
      this.filteredUsers = this.allUsers.filter(u => u.type === this.userType);
    }
  }

  selectAll(event: any) {
    const checked = event.target.checked;
    this.filteredUsers.forEach(u => u.selected = checked);
  }

  isAnyUserSelected(): boolean {
    return this.filteredUsers.some(u => u.selected);
  }

  sendMessage() {
    const selectedUsers = this.filteredUsers.filter(u => u.selected);
    if (selectedUsers.length === 0) {
      alert('Please select at least one user.');
      return;
    }

    const phoneNumbers = selectedUsers.map(u => u.phone).filter(p => p);
    if (phoneNumbers.length === 0) {
      alert('None of the selected users have a phone number.');
      return;
    }

    this.communicationService.sendMessage(phoneNumbers, this.message).subscribe(() => {
      alert('Messages sent successfully (mocked)!');
    }, (error) => {
      console.error('Error sending messages', error);
      alert('Error sending messages.');
    });
  }
}
