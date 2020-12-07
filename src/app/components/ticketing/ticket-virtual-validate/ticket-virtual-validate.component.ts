import { Component, OnInit } from '@angular/core';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {TicketVirtual} from '../../../models/ticket-virtual';
import {TicketVirtualService} from '../../../services/ticket-virtual.service';

@Component({
  selector: 'app-ticket-virtual-validate',
  templateUrl: './ticket-virtual-validate.component.html',
  styleUrls: ['./ticket-virtual-validate.component.css']
})
export class TicketVirtualValidateComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  ticketId: string;
  ticketVirtual: TicketVirtual;
  isPanelNotFoundVisible = false;
  isPanelTicketSummaryVisible = false;
  isTicketNotUsableForCovalidation = true;
  disabled = '[Disabilitato]';

  constructor(private ticketVirtualService: TicketVirtualService) { }

  ngOnInit(): void {
  }

  verifyTicket(): void {
    if (this.ticketId === null || this.ticketId === '' || this.ticketId === undefined){
      alert('Inserire un Codice Identificativo Ticket');
    }
    this.ticketVirtualService.verifyTicketVirtual(this.ticketId).subscribe( res => {
      // @ts-ignore
      this.ticketVirtual = res.body;
      console.log(this.ticketVirtual);
      if (this.ticketVirtual.ticketId === null || this.ticketVirtual.ticketId === undefined){
        this.isPanelTicketSummaryVisible = false;
        this.isPanelNotFoundVisible = true;
        return;
      }
      if (this.ticketVirtual.attivato === false && this.ticketVirtual.accessoEffettuato === false){
        this.isTicketNotUsableForCovalidation = false;
        this.disabled = '';
      }else{
        this.isTicketNotUsableForCovalidation = true;
        this.disabled = 'Disabilitato';
      }
      this.isPanelNotFoundVisible = false;
      this.isPanelTicketSummaryVisible = true;
    }, error => {
      console.log(error.message);
    });
  }

  // tslint:disable-next-line:ban-types
  getIcon(valid: boolean): Object {
    if (valid === true){
      return faCheckCircle;
    }else{
      return faTimesCircle;
    }
  }

  // tslint:disable-next-line:ban-types
  getColor(valid: boolean): Object{
    if (valid === true){
      return {color: 'limegreen'};
    }else{
      return {color: 'orangered'};
    }
  }

  validateTicket(): void {
    this.ticketVirtualService.validateTicketVirtual(this.ticketId).subscribe( res => {
      // @ts-ignore
      alert(res.body.message);
      this.verifyTicket();
    });
  }

}
