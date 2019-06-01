import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatbotService, Message } from '../chatbot.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { LoginService } from 'src/app/usuarios/login.service';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  messages: Observable<Message[]>;
  formValue: string;
  mostrar : boolean = true;

  constructor(public chatbotService : ChatbotService,
    public loginService : LoginService) { }

  ngOnInit() {
    this.messages = this.chatbotService.conversation.asObservable().pipe( 
        scan((acc, val) => acc.concat(val) ));
  }

  sendMessage() {
    this.chatbotService.converse(this.formValue);
    this.formValue = '';
    this.bajarBarra();
    
  }

  bajarBarra(){
    var objDiv = document.getElementById("prueba");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

ocultar(){
  if(this.mostrar){
  this.mostrar= false;
}
else{
  this.mostrar=true;
}
}
ngAfterViewChecked() {
  this.scrollToBottom();
}

scrollToBottom(): void {
  try {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch (err) { }
}

}
