import { Component, OnInit } from '@angular/core';
import {TourOperator} from '../../../models/tour-operator';
import {Site} from '../../../models/site';
import {TicketTipology} from '../../../models/ticket-tipology';
import {TourOperatorService} from '../../../services/tour-operator.service';
import {SitoService} from '../../../services/sito.service';
import {TicketTipologyService} from '../../../services/ticket-tipology.service';
import {TicketStandard} from '../../../models/ticket-standard';
import {TicketStandardService} from '../../../services/ticket-standard.service';
import {DownloadService} from '../../../services/download.service';
import {tick} from '@angular/core/testing';

@Component({
  selector: 'app-ticket-standard',
  templateUrl: './ticket-standard.component.html',
  styleUrls: ['./ticket-standard.component.css']
})
// tslint:disable:typedef
export class TicketStandardComponent implements OnInit {
  tourOperatorList: Array<TourOperator>;
  siteList: Array<Site>;
  siteListSupport: Array<Site>;
  ticketTipologyList: Array<TicketTipology>;
  ticketStandard: TicketStandard;
  totaleEuro: number;
  stampa: string;
  luogoEmissione: string;
  isTotaleEuroNotPresent = true;
  isTicketNotCreatedYet = true;

  constructor(
    private tourOperatorService: TourOperatorService,
    private sitoService: SitoService,
    private ticketTipologyService: TicketTipologyService,
    private ticketStandardService: TicketStandardService,
    private downloadService: DownloadService) {
    this.ticketStandard = new TicketStandard();
    this.siteListSupport = new Array<Site>();
    this.luogoEmissione = sessionStorage.getItem('luogoEmissione');
  }

  ngOnInit(): void {
    this.tourOperatorList = JSON.parse(sessionStorage.getItem('tourOperators'));
    this.siteList = JSON.parse(sessionStorage.getItem('sites'));
    this.ticketTipologyList = JSON.parse(sessionStorage.getItem('ticketTipologies'));
    // Gestione della cache per evitare troppe connessioni al database quando si refresha la pagina
    if (this.tourOperatorList === undefined || this.tourOperatorList === null){
      this.getAllTourOperators();
    }
    if (this.siteList === undefined || this.siteList === null){
      this.getAllSites();
    }
    if (this.ticketTipologyList === undefined || this.ticketTipologyList === null){
      this.getAllTicketTipologies();
    }
  }

  getAllTourOperators(){
    this.tourOperatorService.getAllTourOperators().subscribe( res => {
      // @ts-ignore
      this.tourOperatorList = res.body;
      sessionStorage.setItem('tourOperators', JSON.stringify(this.tourOperatorList));
    });
  }

  getAllSites(){
    this.sitoService.getAllSites().subscribe( res => {
      // @ts-ignore
      this.siteList = res.body;
      sessionStorage.setItem('sites', JSON.stringify(this.siteList));
    });
  }

  getAllTicketTipologies(){
    this.ticketTipologyService.getAllTicketTipologies().subscribe( res => {
      // @ts-ignore
      this.ticketTipologyList = res.body;
      sessionStorage.setItem('ticketTipologies', JSON.stringify(this.ticketTipologyList));
    });
  }

  calculateTotalEuro(){
    this.totaleEuro = this.ticketStandard.tipologiaTicket.prezzo * this.ticketStandard.nIngressi;
    this.isTotaleEuroNotPresent = false;
  }

  createOrUpdateTicketStandard() {
    console.log(this.ticketStandard);
    // @ts-ignore
    if (this.ticketStandard.tourOperator === ''){
      delete this.ticketStandard.tourOperator;
    }
    this.ticketStandardService.createOrUpdateTicketStandard(this.ticketStandard, this.stampa).subscribe( res => {
      console.log(res);
      this.isTicketNotCreatedYet = false;
      this.downloadService.downloadFile(res, 'image/png', 'tickets.png');
    }, error => {
      alert(error.message);
    });
  }

  generateFattura() {
    // @ts-ignore
    if (this.ticketStandard.tourOperator === ''){
      delete this.ticketStandard.tourOperator;
    }
    this.ticketStandardService.generateFattura(this.ticketStandard).subscribe( res => {
      console.log(res);
      this.downloadService.downloadFile(res, 'application/pdf', 'ricevuta.pdf');
    }, error => {
      alert(error.message);
    });
  }
  reset() {
    // @ts-ignore
    this.ticketStandard = {};
    // @ts-ignore
    this.totaleEuro = '';
    this.stampa = '';
    console.log(this.ticketStandard);
    const elements = document.getElementsByClassName('sitoCheckbox');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < elements.length; i++){
      // @ts-ignore
      elements[i].checked = false;
    }
  }

  selectSite(site: Site) {
    if (site.nome.toUpperCase() === this.luogoEmissione.toUpperCase()){
      site.valid = false;
    }else{
      site.valid = true;
    }
    let filteredArray;
    let found = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.siteListSupport.length; i++){
      if (site._id === this.siteListSupport[i]._id){
        filteredArray = this.siteListSupport.filter((value, index, arr) => {
          return value._id !== site._id;
        });
        found = true;
      }
    }
    if (!found){
      this.siteListSupport.push(site);
    }else{
      this.siteListSupport = filteredArray;
    }
    this.ticketStandard.siti = this.siteListSupport;
  }
}
