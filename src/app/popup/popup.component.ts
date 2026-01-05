import { Component } from '@angular/core';
import { Message, MessageService } from '../core/Services/messgae.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

 message$: Observable<Message | null>;

  constructor(private messageService: MessageService) {
    this.message$ = this.messageService.message$;
  }
}