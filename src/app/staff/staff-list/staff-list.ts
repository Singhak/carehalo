import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffService } from '../staff.service';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StaffDetailsComponent } from '../staff-details/staff-details';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './staff-list.html',
  styleUrls: ['./staff-list.scss'],
})
export class StaffListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['fullName', 'role', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>();
  private routerSub?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private staffService: StaffService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // initial load
    this.load();

    // reload whenever navigation ends on /staff so newly created/edited entries appear
    this.routerSub = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        // Use urlAfterRedirects to handle router redirects
        const url = ev.urlAfterRedirects || ev.url;
        if (url && (url === '/staff' || url.startsWith('/staff'))) {
          this.load();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async load() {
    try {
      const res: any = await this.staffService.list();
      this.dataSource.data = res || [];
    } catch (e) {
      console.error('Failed to load staff', e);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails(staff: any) {
    // open dialog with staff data; if only id is passed we could fetch details here
    this.dialog.open(StaffDetailsComponent, {
      data: staff,
      width: '520px',
    });
  }
}
