import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.css']
})
export class AnagraficaComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  goToSitoView() {
    this.router.navigate(['siti'], {relativeTo: this.route} );
  }

  // tslint:disable-next-line:typedef
  goToTicketTipologyView() {
    this.router.navigate(['tipologiaTickets'], {relativeTo: this.route} );
  }

  // tslint:disable-next-line:typedef
  goToTourOperatorsView() {
    this.router.navigate(['tourOperators'], {relativeTo: this.route} );
  }
}
