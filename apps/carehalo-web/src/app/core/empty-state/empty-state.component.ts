import { Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-empty-state, tr[app-empty-state-row]',
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="isTableRow; else block">
      <td [attr.colspan]="colspan" class="text-center py-4 empty-state-row">
        <div class="empty-state-content">
          <div class="empty-state-icon" *ngIf="icon">{{ icon }}</div>
          <div class="empty-state-message">{{ message }}</div>
        </div>
      </td>
    </ng-container>
    <ng-template #block>
      <div class="empty-state-block text-center py-4">
        <div class="empty-state-icon" *ngIf="icon">{{ icon }}</div>
        <div class="empty-state-message">{{ message }}</div>
      </div>
    </ng-template>
  `,
  styles: [
    `
    .empty-state-block, .empty-state-row {
      color: rgba(0,0,0,0.6);
    }
    .empty-state-message { font-weight: 500; }
    .empty-state-icon { font-size: 28px; margin-bottom: 8px; }
    `
  ]
})
export class EmptyStateComponent {
  @Input() message = 'No data found.';
  @Input() colspan = 1;
  @Input() icon?: string;

  isTableRow = false;

  constructor(private el: ElementRef<HTMLElement>) {
    const tag = this.el.nativeElement.tagName?.toLowerCase();
    this.isTableRow = tag === 'tr';
  }
}
