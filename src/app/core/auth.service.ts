import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tenantId: string | null = null;

    constructor(private afAuth: AngularFireAuth) { }

    async login(email: string, password: string) {
        const cred = await this.afAuth.signInWithEmailAndPassword(email, password);
        if (!cred.user) throw new Error('Login failed');
        const token = await cred.user.getIdTokenResult();
        // Assume tenantId is in custom claim
        this.tenantId = (token.claims as any).tenantId || null;
        return cred.user;
    }

    getTenantId() { return this.tenantId; }

    async getIdToken(): Promise<string | null> {
        const user = await this.afAuth.currentUser;
        return user ? user.getIdToken() : null;
    }
}