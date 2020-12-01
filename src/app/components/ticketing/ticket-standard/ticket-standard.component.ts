import { Component, OnInit } from '@angular/core';
import {TourOperator} from '../../../models/tour-operator';
import {Site} from '../../../models/site';
import {TicketTipology} from '../../../models/ticket-tipology';
import {TourOperatorService} from '../../../services/tour-operator.service';
import {SitoService} from '../../../services/sito.service';
import {TicketTipologyService} from '../../../services/ticket-tipology.service';
import {TicketStandard} from '../../../models/ticket-standard';

@Component({
  selector: 'app-ticket-standard',
  templateUrl: './ticket-standard.component.html',
  styleUrls: ['./ticket-standard.component.css']
})
// tslint:disable:typedef
export class TicketStandardComponent implements OnInit {
  tourOperatorList: Array<TourOperator>;
  siteList: Array<Site>;
  ticketTipologyList: Array<TicketTipology>;
  ticketStandard: TicketStandard;
  totaleEuro: number;
  stampa: string;

  constructor(
    private tourOperatorService: TourOperatorService,
    private sitoService: SitoService,
    private ticketTipologyService: TicketTipologyService) {
    this.ticketStandard = new TicketStandard();
  }

  ngOnInit(): void {
    this.getAllTourOperators();
    this.getAllSites();
    this.getAllTicketTipologies();
  }

  getAllTourOperators(){
    this.tourOperatorService.getAllTourOperators().subscribe( res => {
      // @ts-ignore
      this.tourOperatorList = res.body;
    });
  }

  getAllSites(){
    this.sitoService.getAllSites().subscribe( res => {
      // @ts-ignore
      this.siteList = res.body;
    });
  }

  getAllTicketTipologies(){
    this.ticketTipologyService.getAllTicketTipologies().subscribe( res => {
      // @ts-ignore
      this.ticketTipologyList = res.body;
    });
  }

  calculateTotalEuro(){
    this.totaleEuro = this.ticketStandard.ticketTipology.prezzo * this.ticketStandard.nIngressi;
  }

  createOrUpdateTicketStandard() {
    const luogoEmissione = 'castello';
    console.log(luogoEmissione, this.stampa, this.ticketStandard);
  }

  reset() {
    // @ts-ignore
    this.ticketStandard = {};
  }
}
