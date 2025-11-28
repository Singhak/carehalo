import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    // Use injector to avoid cyclic DI issues
    const notifier = this.injector.get(NotificationService);
    try {
      const message = (error && error.message) ? error.message : String(error);
      // Log to console (could be extended to remote logging)
      // eslint-disable-next-line no-console
      console.error('Uncaught error:', error);
      notifier.error('An unexpected error occurred');
    } catch (e) {
      // Fallback
      // eslint-disable-next-line no-console
      console.error('Error in GlobalErrorHandler', e);
    }
    // Rethrow if you want default behavior
  }
}
