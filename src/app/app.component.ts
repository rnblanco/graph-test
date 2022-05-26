import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GlobalMessageService } from './shared/services/global-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'graph-technical-test';
  constructor(
    private readonly messageService: MessageService,
    private readonly globalMessageService: GlobalMessageService
  ) { }
  
  ngOnInit() {
    this.globalMessageService.itemsHandler.subscribe((_payload: {type: string, title: string, body: string}) => {
      this.messageService.add({
        severity: _payload.type,
        summary: _payload.title,
        detail: _payload.body,
      });
    });
  }
}
