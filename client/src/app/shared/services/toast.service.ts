import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageSource = new Subject<string | string[]>();
  private clearSource = new Subject<string>();

  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();

  add(message: string) {
    if (message) {
      this.messageSource.next(message);
    }
  }

  addAll(messages: string[]) {
    if (messages && messages.length) {
      this.messageSource.next(messages);
    }
  }

  clear(key?: string) {
    this.clearSource.next(key || null);
  }
}
