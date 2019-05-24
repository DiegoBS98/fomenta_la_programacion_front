import { Component, OnInit } from '@angular/core';
import { ChatbotService, Message } from '../chatbot.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  
  messages: Observable<Message[]>;
  formValue: string;


  constructor(public chatbotService : ChatbotService) { }

  ngOnInit() {
    this.messages = this.chatbotService.conversation.asObservable().pipe( 
        scan((acc, val) => acc.concat(val) ));
  }

  sendMessage() {
    this.chatbotService.converse(this.formValue);
    this.formValue = '';
  }

}
