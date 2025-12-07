
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StaffService } from '../staff.service';
import { Staff } from '@cflock/shared-models';
import { EmptyStateComponent } from '../../core/empty-state/empty-state.component';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AgGridModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    EmptyStateComponent
  ],
  templateUrl: './staff-list.html',
  styleUrls: ['./staff-list.scss'],
})
export class StaffListComponent implements OnInit {
  private gridApi!: GridApi<Staff>;
  public columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      valueGetter: (params) => {
        return `${params.data.firstName} ${params.data.middleName || ''} ${params.data.lastName || ''}`.trim();
      },
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    { headerName: 'Role', field: 'role', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Email', field: 'email', sortable: true, filter: 'agTextColumnFilter' },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        return `<a href="/staff/${params.data.id}/edit" mat-button color="primary">Edit</a>`;
      },
      flex: 1,
    },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };

  public rowData: Staff[] = [];

  constructor(private staffService: StaffService) {}

  async ngOnInit() {
    try {
      this.rowData = (await this.staffService.list()) as Staff[];
    } catch (error) {
      console.error('Error fetching staff', error);
    }
  }

  onGridReady(params: GridReadyEvent<Staff>) {
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
