import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notifier: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let userMessage = 'An error occurred while communicating with the server.';
        if (error.error && error.error.message) {
          userMessage = error.error.message;
        } else if (error.message) {
          userMessage = error.message;
        }
        // Show user-friendly notification
        this.notifier.error(userMessage);
        // Optionally include more details in console
        // eslint-disable-next-line no-console
        console.error('HTTP Error:', error);
        return throwError(() => error);
      })
    );
  }
}
