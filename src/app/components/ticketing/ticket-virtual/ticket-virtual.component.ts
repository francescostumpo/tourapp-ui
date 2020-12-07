import { Component, OnInit } from '@angular/core';
import {TicketVirtual} from '../../../models/ticket-virtual';
import {TourOperator} from '../../../models/tour-operator';
import {TourOperatorService} from '../../../services/tour-operator.service';
import {TicketTipology} from '../../../models/ticket-tipology';
import {TicketTipologyService} from '../../../services/ticket-tipology.service';
import {DownloadService} from '../../../services/download.service';
import {TicketVirtualService} from '../../../services/ticket-virtual.service';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-ticket-virtual',
  templateUrl: './ticket-virtual.component.html',
  styleUrls: ['./ticket-virtual.component.css']
})
export class TicketVirtualComponent implements OnInit {
  ticketVirtual: TicketVirtual;
  tourOperatorList: Array<TourOperator>;
  ticketTipologyList: Array<TicketTipology>;
  ticketTipology: TicketTipology;
  totaleEuro: number;
  isTotaleEuroNotPresent = true;
  isTicketNotCreatedYet = true;

  // tslint:disable-next-line:max-line-length
  constructor(private locationService: LocationService, private tourOperatorService: TourOperatorService, private ticketTipologyService: TicketTipologyService, private downloadService: DownloadService, private ticketVirtualService: TicketVirtualService) {
    this.ticketVirtual = new TicketVirtual();
  }

  ngOnInit(): void {
    this.tourOperatorList = JSON.parse(sessionStorage.getItem('tourOperators'));
    this.ticketTipologyList = JSON.parse(sessionStorage.getItem('ticketTipologiesVirtual'));
    // Gestione della cache per evitare troppe connessioni al database quando si refresha la pagina
    if (this.tourOperatorList === undefined || this.tourOperatorList === null){
      this.getAllTourOperators();
    }
    if (this.ticketTipologyList === undefined || this.ticketTipologyList === null){
      this.getAllTicketTipologies();
    }
  }

  getAllTourOperators(): void{
    this.tourOperatorService.getAllTourOperators().subscribe( res => {
      // @ts-ignore
      this.tourOperatorList = res.body;
      sessionStorage.setItem('tourOperators', JSON.stringify(this.tourOperatorList));
    });
  }
  // tslint:disable-next-line:typedef
  getAllTicketTipologies(){
    this.ticketTipologyService.getAllTicketTipologies().subscribe( res => {
      // @ts-ignore
      this.ticketTipologyList = res.body.filter((ticketTipology) => {
        if (ticketTipology.categoria === 'TicketVirtual'){
          return ticketTipology;
        }
      });
      sessionStorage.setItem('ticketTipologiesVirtual', JSON.stringify(this.ticketTipologyList));
    });
  }

  calculateTotalEuro(): void {
    this.totaleEuro = this.ticketVirtual.ticketTipology.prezzo;
    if (this.totaleEuro !== undefined){
      this.isTotaleEuroNotPresent = false;
    }
  }

  createOrUpdateTicketVirtual(validate: boolean): void {
    console.log(this.ticketVirtual);
    // @ts-ignore
    if (this.ticketVirtual.tourOperator === ''){
      delete this.ticketVirtual.tourOperator;
    }
    this.ticketVirtual.luogoEmissione = this.ticketVirtual.luogoEmissione.toUpperCase();
    this.ticketVirtualService.createOrUpdateTicketVirtual(this.ticketVirtual, validate).subscribe( res => {
      console.log(res);
      this.isTicketNotCreatedYet = false;
      this.downloadService.downloadFile(res, 'image/png', 'tickets.png');
    }, error => {
      alert(error.message);
    });
  }

  generateFattura(): void {
// @ts-ignore
    if (this.ticketVirtual.tourOperator === ''){
      delete this.ticketVirtual.tourOperator;
    }
    this.ticketVirtualService.generateFattura(this.ticketVirtual).subscribe( res => {
      console.log(res);
      this.downloadService.downloadFile(res, 'application/pdf', 'ricevuta.pdf');
    }, error => {
      alert(error.message);
    });
  }

  reset(): void {
// @ts-ignore
    this.ticketVirtual = {};
    // @ts-ignore
    this.totaleEuro = '';
    console.log(this.ticketVirtual);
  }

  retrieveLuogoEmissione(): string {
    const luogoEmissione = this.locationService.getLocation();
    if (luogoEmissione !== undefined && luogoEmissione !== null){
      this.ticketVirtual.luogoEmissione = luogoEmissione;
      return luogoEmissione;
    }else{
      this.ticketVirtual.luogoEmissione = 'streusa';
      return 'streusa';
    }
  }
}
