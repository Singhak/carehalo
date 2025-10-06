import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "medihunt-3a421", appId: "1:1020036677128:web:656e6c46025fb9a22bdbbd", databaseURL: "https://medihunt-3a421-default-rtdb.asia-southeast1.firebasedatabase.app", storageBucket: "medihunt-3a421.firebasestorage.app", apiKey: "AIzaSyCLDTt0Aw6x8QBpvAIOR9FE-5C5EwC668Q", authDomain: "medihunt-3a421.firebaseapp.com", messagingSenderId: "1020036677128", measurementId: "G-06C4HM9TYW" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging())
  ]
};
