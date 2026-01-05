// message.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSubject = new BehaviorSubject<Message | null>(null);
  message$ = this.messageSubject.asObservable();

  showMessage(msg: Message) {
    this.messageSubject.next(msg);

    setTimeout(() => this.clearMessage(), 3000);
  }

  clearMessage() {
    this.messageSubject.next(null);
  }
}
