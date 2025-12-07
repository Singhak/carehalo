
import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PatientsService } from '../patient.service';
import { Patient } from '@cflock/shared-models';
import { EmptyStateComponent } from 'src/app/core/empty-state/empty-state.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AgGridModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    EmptyStateComponent,
  ],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.scss'],
})
export class PatientListComponent implements OnInit {
  private gridApi!: GridApi<Patient>;
  public columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      valueGetter: (params) => {
        return `${params.data.firstName} ${params.data.middleName || ''} ${params.data.lastName || ''}`.trim();
      },
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    { headerName: 'Date of Birth', field: 'dob', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Email', field: 'email', sortable: true, filter: 'agTextColumnFilter' },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        return `<a href="/patients/${params.data.id}/edit" mat-button color="primary">Edit</a>`;
      },
      flex: 1,
    },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };

  public rowData: Patient[] = [];

  constructor(
    @Inject(forwardRef(() => PatientsService)) private patientsService: PatientsService
  ) {}

  async ngOnInit() {
    try {
      this.rowData = (await this.patientsService.list()) as Patient[];
    } catch (error) {
      console.error('Error fetching patients', error);
    }
  }

  onGridReady(params: GridReadyEvent<Patient>) {
    this.gridApi = params.api;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.gridApi.setFilterModel({
      firstName: {
        filterType: 'text',
        type: 'contains',
        filter: filterValue,
      },
      middleName: {
        filterType: 'text',
        type: 'contains',
        filter: filterValue,
      },
      lastName: {
        filterType: 'text',
        type: 'contains',
        filter: filterValue,
      },
    });
  }
}
