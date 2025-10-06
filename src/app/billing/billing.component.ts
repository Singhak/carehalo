import { Component, OnInit } from '@angular/core';
import { BillingService } from '../core/billing.service';
import { Billing } from '@cflock/shared-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BillingComponent implements OnInit {
  billingRecords: Billing[] = [];

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.billingService.getBillingRecords().subscribe(records => {
      this.billingRecords = records;
    });
  }
}
