import { AfterViewInit, Component, forwardRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PatientsService } from '../patient.service';
import { Patient } from '@cflock/shared-models';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.scss'],
})
export class PatientListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fullName', 'dob', 'email', 'actions'];
  dataSource = new MatTableDataSource<Patient>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(forwardRef(() => PatientsService))
    private patientsService: PatientsService
  ) {}

  async ngOnInit() {
    try {
      const patients = (await this.patientsService.list()) as Patient[];
      this.dataSource.data = patients;
    } catch (error) {
      console.error('Error fetching patients', error);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
