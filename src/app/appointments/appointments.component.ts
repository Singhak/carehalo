import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../core/appointment.service';
import { Appointment } from '@cflock/shared-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
    });
  }
}
