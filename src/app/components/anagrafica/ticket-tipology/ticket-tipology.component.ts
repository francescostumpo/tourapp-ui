import { Component, OnInit } from '@angular/core';
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {TicketTipologyService} from '../../../services/ticket-tipology.service';
import {TicketTipology} from '../../../models/ticket-tipology';

@Component({
  selector: 'app-ticket-tipology',
  templateUrl: './ticket-tipology.component.html',
  styleUrls: ['./ticket-tipology.component.css']
})
// tslint:disable:typedef
export class TicketTipologyComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  ticketTipologyList: Array<TicketTipology>;
  constructor(private ticketTipologyService: TicketTipologyService) { }

  ngOnInit(): void {
    this.getAllTicketTipologies();
  }
  getAllTicketTipologies(){
    this.ticketTipologyService.getAllTicketTipologies().subscribe( res => {
      // @ts-ignore
      this.ticketTipologyList = res.body;
      console.log('Available TourOperators: ', this.ticketTipologyList);
    });
  }
}
