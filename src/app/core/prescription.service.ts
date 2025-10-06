
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '@cflock/shared-models';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = '/api/prescriptions';

  constructor(private http: HttpClient) { }

  getPrescriptions(patientId?: string): Observable<Prescription[]> {
    const options = patientId ? { params: { patientId } } : {};
    return this.http.get<Prescription[]>(this.apiUrl, options);
  }

  getPrescription(id: string): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/${id}`);
  }

  createPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.apiUrl, prescription);
  }

  updatePrescription(id: string, prescription: Partial<Prescription>): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.apiUrl}/${id}`, prescription);
  }

  deletePrescription(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
