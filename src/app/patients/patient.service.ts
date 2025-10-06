import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';

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
    const tenantId = this.auth.getTenantId();
    const opts = await this.headers();
    return this.http.get(`/api/${tenantId}/patients`, opts).toPromise();
  }

  async create(payload: any) {
    const tenantId = this.auth.getTenantId();
    const opts = await this.headers();
    return this.http.post(`/api/${tenantId}/patients`, payload, opts).toPromise();
  }

  async get(id: string) {
    const tenantId = this.auth.getTenantId();
    const opts = await this.headers();
    return this.http.get(`/api/${tenantId}/patients/${id}`, opts).toPromise();
  }

  async update(id: string, payload: any) {
    const tenantId = this.auth.getTenantId();
    const opts = await this.headers();
    return this.http.put(`/api/${tenantId}/patients/${id}`, payload, opts).toPromise();
  }
}
