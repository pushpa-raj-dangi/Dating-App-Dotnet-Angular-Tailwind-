import { Message } from './../interfaces/message.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageSource = new Subject<Message | Message[]>();
  private clearSource = new Subject<string>();

  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();

  add(message: Message) {
    if (message) {
      this.messageSource.next(message);
    }
  }

  addAll(messages: Message[]) {
    if (messages && messages.length) {
      this.messageSource.next(messages);
    }
  }

  clear(key?: string) {
    this.clearSource.next(key || null);
  }
}