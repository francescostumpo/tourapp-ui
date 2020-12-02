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
  ticketTipology: TicketTipology;
  ticketTipologyForUpdate: TicketTipology;
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;

  constructor(private ticketTipologyService: TicketTipologyService) {
    this.ticketTipology = new TicketTipology();
    this.ticketTipologyForUpdate = new TicketTipology();
  }

  ngOnInit(): void {
    this.getAllTicketTipologies();
  }
  getAllTicketTipologies(){
    this.ticketTipologyService.getAllTicketTipologies().subscribe( res => {
      // @ts-ignore
      this.ticketTipologyList = res.body;
      console.log('Available TicketTipologies: ', this.ticketTipologyList);
    });
  }

  createOrUpdateTicketTipology(action: string) {
    let ticketToPost: TicketTipology;
    if (action === 'update'){
      ticketToPost = this.ticketTipologyForUpdate;
    }else{
      ticketToPost = this.ticketTipology;
    }
    this.ticketTipologyService.createOrUpdateTicketTipology(ticketToPost).subscribe( res => {
      // @ts-ignore
      console.log('Response: ', res.body);
      // @ts-ignore
      this.ticketTipology = {};
      this.toggleCreateOrUpdatePanel(action);
      this.getAllTicketTipologies();
    }, error => {
      alert(error.message.message);
    });
  }

  moveForUpdate(ticketTipology: TicketTipology) {
    this.ticketTipologyForUpdate = ticketTipology;
    this.toggleCreateOrUpdatePanel('update');
  }
  toggleCreateOrUpdatePanel(action: string) {
    if (action === 'update'){
      this.isPanelCreateVisible = false;
      this.isPanelUpdateVisible = !this.isPanelUpdateVisible;
    }else{
      this.isPanelUpdateVisible = false;
      this.isPanelCreateVisible = !this.isPanelCreateVisible;
    }
  }

  deleteTicketTipology(ticketTipology: TicketTipology) {
    this.ticketTipologyService.deleteTicketTipology(ticketTipology).subscribe( res => {
      // @ts-ignore
      alert(res.body.message);
      this.getAllTicketTipologies();
    });
  }
}
