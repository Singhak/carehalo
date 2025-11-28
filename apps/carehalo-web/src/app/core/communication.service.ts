import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private apiUrl = '/api/communication';

  constructor(private http: HttpClient) { }

  sendMessage(phoneNumbers: string[], message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, { phoneNumbers, message });
  }
}
