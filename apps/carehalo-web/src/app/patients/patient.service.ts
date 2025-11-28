import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  private async headers() {
    const token = await this.auth.getIdToken();
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  async list() {
    const opts = await this.headers();
    return firstValueFrom(this.http.get(`/api/patients`, opts));
  }

  async create(payload: any) {
    const opts = await this.headers();
    return firstValueFrom(this.http.post(`/api/patients`, payload, opts));
  }

  async get(id: string) {
    const opts = await this.headers();
    return firstValueFrom(this.http.get(`/api/patients/${id}`, opts));
  }

  async update(id: string, payload: any) {
    const opts = await this.headers();
    return firstValueFrom(this.http.put(`/api/patients/${id}`, payload, opts));
  }
}
