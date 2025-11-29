import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Prescription } from '@cflock/shared-models';
import { PrescriptionService } from '../core/prescription.service';
import { EmptyStateComponent } from '../core/empty-state/empty-state.component';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCardModule,
    EmptyStateComponent
  ],
})
export class PrescriptionsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['patientId', 'medication', 'dosage', 'frequency', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<Prescription>();
  loading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroy$ = new Subject<void>();

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.prescriptionService
      .getPrescriptions()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (prescriptions) => {
          this.dataSource.data = prescriptions;
        },
        error: (err) => {
          this.error = 'Failed to load prescriptions.';
          console.error(err);
        },
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
