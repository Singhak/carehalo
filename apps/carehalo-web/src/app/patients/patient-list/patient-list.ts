
import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
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
    },
    {
      headerName: 'Contact Info',
      valueGetter: (params) => {
        const dob = params.data.dob ? `DOB: ${new Date(params.data.dob).toLocaleDateString()}` : '';
        const phone = params.data.phone ? `Phone: ${params.data.phone}` : '';
        const email = params.data.email ? `Email: ${params.data.email}` : '';
        return [dob, phone, email].filter(Boolean).join('\n');
      },
      cellStyle: { 'white-space': 'pre-line' },
      sortable: false,
    },
    {
      headerName: 'Actions',
      cellRenderer: (params: ICellRendererParams) => {
        return `<a href="/patients/${params.data.id}/edit" mat-button color="primary">Edit</a>`;
      },
      flex: 1,
    },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
    filter: true,
  };

  public rowData: Patient[] = [];
  private externalFilterValue: string = '';

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
    this.externalFilterValue = (event.target as HTMLInputElement).value;
    this.gridApi.onFilterChanged();
  }

  isExternalFilterPresent(): boolean {
    return this.externalFilterValue.length > 0;
  }

  doesExternalFilterPass(node: any): boolean {
    const { firstName, middleName, lastName, email, phone, dob } = node.data;
    const filterValue = this.externalFilterValue.toLowerCase();

    const name = `${firstName} ${middleName || ''} ${lastName || ''}`.toLowerCase();
    const dobString = dob ? new Date(dob).toLocaleDateString().toLowerCase() : '';

    return (
      name.includes(filterValue) ||
      (email && email.toLowerCase().includes(filterValue)) ||
      (phone && phone.toLowerCase().includes(filterValue)) ||
      dobString.includes(filterValue)
    );
  }
}
