import { Component, OnInit } from '@angular/core';
import {TicketStandard} from '../../../models/ticket-standard';
import {TicketStandardService} from '../../../services/ticket-standard.service';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {DownloadService} from '../../../services/download.service';

@Component({
  selector: 'app-ticket-standard-validate',
  templateUrl: './ticket-standard-validate.component.html',
  styleUrls: ['./ticket-standard-validate.component.css']
})
export class TicketStandardValidateComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  ticketId: string;
  ticketStandard: TicketStandard;
  isPanelNotFoundVisible = false;
  isPanelTicketSummaryVisible = false;
  isTicketNotUsableForCovalidation = true;
  disabled = '[Disabilitato]';

  constructor(private ticketStandardService: TicketStandardService, private downloadService: DownloadService) { }

  ngOnInit(): void {
  }

  verifyTicket(): void {
    if (this.ticketId === null || this.ticketId === '' || this.ticketId === undefined) {
      alert('Inserire un Codice Identificativo Ticket');
    }
    this.ticketStandardService.verifyTicketStandard(this.ticketId).subscribe( res => {
      // @ts-ignore
      this.ticketStandard = res.body;
      console.log(this.ticketStandard);
      if (this.ticketStandard.ticketId === null || this.ticketStandard.ticketId === undefined) {
        this.isPanelTicketSummaryVisible = false;
        this.isPanelNotFoundVisible = true;
        return;
      }
      for (const site of this.ticketStandard.siti) {
        if (site.valid) {
          this.isTicketNotUsableForCovalidation = false;
          this.disabled = '';
        }
      }
      this.isPanelNotFoundVisible = false;
      this.isPanelTicketSummaryVisible = true;
    }, error => {
      console.log(error.message);
    });
  }

  // tslint:disable-next-line:ban-types
  getIcon(valid: boolean): Object {
    if (valid === true) {
      return faCheckCircle;
    } else {
      return faTimesCircle;
    }
  }

  // tslint:disable-next-line:ban-types
  getColor(valid: boolean): Object {
    if (valid === true) {
      return {color: 'limegreen'};
    } else {
      return {color: 'orangered'};
    }
  }

  validateTicket(): void {
    this.ticketStandardService.validateTicketStandard(this.ticketId).subscribe(res => {
      // @ts-ignore
      alert(res.body.message);
      this.verifyTicket();
    });
  }

  generateTicketMatrix(): void {
    this.ticketStandardService.generateTicketMatrix(this.ticketStandard).subscribe( res => {
      console.log(res);
      this.downloadService.downloadFile(res, 'image/png', 'tickets.png');
    }, error => {
      alert(error.message);
    });
  }
}
