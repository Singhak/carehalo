
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PatientsService } from '../patients/patient.service';
import { AppointmentService } from '../core/appointment.service';
import { StaffService } from '../core/staff.service';
import { forkJoin, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Patient, Appointment, Staff } from '@cflock/shared-models';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  patientVisitsData: any[] = [];
  patientAgeData: any[] = [];
  doctorPerformanceData: any[] = [];
  appointmentsOverTimeData: any[] = [];
  appointmentStatusData: any[] = [];
  isLoading = true; // Add a loading flag for better UX

  constructor(
    @Inject(forwardRef(() => PatientsService)) private patientService: PatientsService,
    private appointmentService: AppointmentService,
    private staffService: StaffService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    forkJoin({
      patients: from(this.patientService.list()).pipe(
        map(result => (result || []) as Patient[]),
        catchError(() => of([] as Patient[]))
      ),
      appointments: this.appointmentService.getAppointments().pipe(catchError(() => of([] as Appointment[]))),
      staff: this.staffService.getStaff().pipe(catchError(() => of([] as Staff[]))),
    }).subscribe({
      next: ({ patients, appointments, staff }) => {
        this.processPatientVisits(appointments, patients);
        this.processPatientAge(patients);
        this.processDoctorPerformance(appointments, staff);
        this.processAppointmentsOverTime(appointments);
        this.processAppointmentStatus(appointments);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Dashboard data loading failed:', err);
        this.isLoading = false;
      }
    });
  }

  processPatientVisits(appointments: Appointment[], patients: Patient[]) {
    const patientAppointments = new Map<string, number>();
    appointments.forEach(appointment => {
        patientAppointments.set(appointment.patientId, (patientAppointments.get(appointment.patientId) || 0) + 1);
    });

    let newPatients = 0;
    let revisitPatients = 0;

    patientAppointments.forEach((appointmentCount) => {
        if (appointmentCount === 1) {
            newPatients++;
        } else {
            revisitPatients++;
        }
    });

    this.patientVisitsData = [
      { name: 'New Patients', value: newPatients },
      { name: 'Revisit Patients', value: revisitPatients },
    ];
  }

  processPatientAge(patients: Patient[]) {
    const ageGroups: { [key: string]: number } = {
      '0-18': 0,
      '19-40': 0,
      '41-60': 0,
      '60+': 0,
    };

    patients.forEach(patient => {
      if (patient.dob) {
        const age = this.calculateAge(new Date(patient.dob));
        if (age <= 18) {
          ageGroups['0-18']++;
        } else if (age <= 40) {
          ageGroups['19-40']++;
        } else if (age <= 60) {
          ageGroups['41-60']++;
        } else {
          ageGroups['60+']++;
        }
      }
    });

    this.patientAgeData = Object.keys(ageGroups).map(key => ({
      name: key,
      value: ageGroups[key],
    }));
  }

  processDoctorPerformance(appointments: Appointment[], staff: Staff[]) {
    const doctors = staff.filter(s => s.role === 'doctor');
    const doctorMap = new Map(doctors.map(d => [d.id, d.name]));
    const doctorPerformance = new Map<string, number>();

    appointments.forEach(appointment => {
      if (doctorMap.has(appointment.staffId)) {
        const doctorName = doctorMap.get(appointment.staffId);
        if (doctorName) {
            doctorPerformance.set(doctorName, (doctorPerformance.get(doctorName) || 0) + 1);
        }
      }
    });

    this.doctorPerformanceData = Array.from(doctorPerformance.entries()).map(([name, value]) => ({
        name,
        value,
    }));
  }

  processAppointmentsOverTime(appointments: Appointment[]) {
    const appointmentsByDate = new Map<string, number>();
    appointments.forEach(appointment => {
      const date = new Date(appointment.startTime).toLocaleDateString();
      appointmentsByDate.set(date, (appointmentsByDate.get(date) || 0) + 1);
    });

    const series = Array.from(appointmentsByDate.entries()).map(([date, count]) => ({
      name: date,
      value: count,
    }));

    this.appointmentsOverTimeData = [{
      name: 'Appointments',
      series: series,
    }];
  }

  processAppointmentStatus(appointments: Appointment[]) {
    const statusCounts: { [key: string]: number } = {
      'scheduled': 0,
      'completed': 0,
      'cancelled': 0,
    };

    appointments.forEach(appointment => {
        if (appointment.status in statusCounts) {
            statusCounts[appointment.status]++;
        }
    });

    this.appointmentStatusData = Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: statusCounts[key],
    }));
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onSelect(event: any) {
    console.log(event);
  }
}
