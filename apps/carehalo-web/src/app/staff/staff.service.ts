import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  private async headers() {
    const token = await this.auth.getIdToken();
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  async list() {
    const tenantId = this.auth.getTenantId();
    const opts = await this.headers();
    return this.http.get(`/api/${tenantId}/staff`, opts).toPromise();
  }

  async create(payload: any) {
    const tenantId = this.auth.getTenantId();
    const opts = await this.headers();
    return this.http.post(`/api/${tenantId}/staff`, payload, opts).toPromise();
  }

  async get(id: string) {
    const tenantId = this.auth.getTenantId();
    const opts = await this.headers();
    return this.http.get(`/api/${tenantId}/staff/${id}`, opts).toPromise();
  }

  async update(id: string, payload: any) {
    const tenantId = this.auth.getTenantId();
    const opts = await this.headers();
    return this.http.put(`/api/${tenantId}/staff/${id}`, payload, opts).toPromise();
  }
}
