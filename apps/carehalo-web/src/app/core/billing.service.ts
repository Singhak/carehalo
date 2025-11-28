
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Billing } from '@cflock/shared-models';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = '/api/billing';

  constructor(private http: HttpClient) { }

  getBillingRecords(patientId?: string): Observable<Billing[]> {
    const options = patientId ? { params: { patientId } } : {};
    return this.http.get<Billing[]>(this.apiUrl, options);
  }

  getBillingRecord(id: string): Observable<Billing> {
    return this.http.get<Billing>(`${this.apiUrl}/${id}`);
  }

  createBillingRecord(billing: Billing): Observable<Billing> {
    return this.http.post<Billing>(this.apiUrl, billing);
  }

  updateBillingRecord(id: string, billing: Partial<Billing>): Observable<Billing> {
    return this.http.put<Billing>(`${this.apiUrl}/${id}`, billing);
  }

  deleteBillingRecord(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
