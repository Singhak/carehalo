import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from './toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div *ngFor="let t of messages; trackBy: trackById" class="toast show align-items-center text-bg-success border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">{{ t.text }}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" (click)="dismiss(t.id)"></button>
      </div>
    </div>
  </div>
  `,
  styles: [
    `.toast-container { z-index: 1080; max-width: 320px; }`,
  ]
})
export class ToastContainerComponent implements OnDestroy {
  messages: ToastMessage[] = [];
  private sub?: Subscription;

  trackById(index: number, item: ToastMessage) {
    return item.id;
  }

  constructor(private toast: ToastService) {
    // debug: log container instantiation and subscription events
    console.debug('[ToastContainer] constructor - new instance');
    this.sub = this.toast.messages$.subscribe((ms: ToastMessage[]) => {
      console.debug('[ToastContainer] messages$.next', ms);
      this.messages = ms;
    });
  }

  dismiss(id: string) {
    this.toast.dismiss(id);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
