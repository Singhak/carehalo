import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, getIdTokenResult, User, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private bypassLogin = true; // Set to true to bypass login
    private tenantId: string | null = null;
    private userRole$ = new BehaviorSubject<string>('unauthenticated');
    public authState$: Observable<User | null>;

    constructor(private auth: Auth) {
        if (this.bypassLogin) {
        this.tenantId = 'test-tenant';
            this.userRole$.next('admin'); // Bypass as admin
            this.authState$ = of({} as User); // Initialize with a mock user
        } else {
            this.authState$ = authState(this.auth);
            this.authState$.pipe(
                switchMap(user => {
                    if (user) {
                        return from(user.getIdTokenResult());
                    } else {
                        return from(Promise.resolve(null));
                    }
                })
            ).subscribe(token => {
                if (token) {
                    this.tenantId = (token.claims as any).tenantId || null;
                    this.userRole$.next((token.claims as any).role || 'patient');
                } else {
                    this.tenantId = null;
                    this.userRole$.next('unauthenticated');
                }
            });
        }
    }

    async login(email: string, password: string): Promise<User> {
        if (this.bypassLogin) {
            this.userRole$.next('admin');
            return Promise.resolve({} as User);
        }
        const cred = await signInWithEmailAndPassword(this.auth, email, password);
        return cred.user;
    }

    async signup(email: string, password: string): Promise<User> {
        if (this.bypassLogin) {
            return Promise.resolve({} as User);
        }
        const cred = await createUserWithEmailAndPassword(this.auth, email, password);
        return cred.user;
    }

    async logout() {
        if (this.bypassLogin) {
            this.userRole$.next('unauthenticated');
            return;
        }
        await signOut(this.auth);
    }

    getTenantId() { return this.tenantId; }

    getUserRole() {
        return this.userRole$.asObservable();
    }

    async getIdToken(): Promise<string | null> {
        if (this.bypassLogin) {
            return Promise.resolve('test-token');
        }
        const user = this.auth.currentUser;
        return user ? user.getIdToken() : null;
    }
}