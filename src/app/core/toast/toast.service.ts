import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastLevel = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  text: string;
  level: ToastLevel;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private messages: ToastMessage[] = [];
  private subject = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this.subject.asObservable();
  // track timeouts so we can clear them when a toast is dismissed manually
  private timers: Record<string, any> = {};

  private makeId() {
    return Math.random().toString(36).substring(2, 9);
  }

  show(text: string, level: ToastLevel = 'success', timeout = 3000) {
    const msg: ToastMessage = { id: this.makeId(), text, level };
    // debug: trace when a message is created
    console.debug('[ToastService] show()', msg);

    // dedupe: if an identical (text+level) message is already present, skip adding a duplicate
    const exists = this.messages.find(m => m.text === text && m.level === level);
    if (exists) {
      console.debug('[ToastService] duplicate suppressed', { text, level, existingId: exists.id });
      return exists.id;
    }

    this.messages = [msg, ...this.messages];
    this.subject.next(this.messages);
    if (timeout > 0) {
      const t = setTimeout(() => this.dismiss(msg.id), timeout);
      this.timers[msg.id] = t;
    }
    return msg.id;
  }

  success(text: string, timeout = 3000) {
    return this.show(text, 'success', timeout);
  }

  dismiss(id: string) {
    // clear any scheduled timeout for this message
    try {
      const tm = this.timers[id];
      if (tm) {
        clearTimeout(tm);
        delete this.timers[id];
      }
    } catch (e) {
      // ignore
    }

    const before = this.messages.length;
    this.messages = this.messages.filter(m => m.id !== id);
    if (this.messages.length !== before) {
      // emit a new array copy to ensure subscribers get update
      this.subject.next([...this.messages]);
    }
  }
}
