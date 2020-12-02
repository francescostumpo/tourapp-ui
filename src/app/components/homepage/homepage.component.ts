import { Component, OnInit } from '@angular/core';
import {faBolt} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  faBolt = faBolt;
  isPanelLuogoEmissione = true;
  isPanelRecapActivities = false;
  luogoEmissione: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const luogoEmissioneCache = sessionStorage.getItem('luogoEmissione');
    if (luogoEmissioneCache !== undefined && luogoEmissioneCache !== null){
      this.isPanelLuogoEmissione = !this.isPanelLuogoEmissione;
      this.isPanelRecapActivities = !this.isPanelRecapActivities;
      this.luogoEmissione = sessionStorage.getItem('luogoEmissioneNome');
    }else{
      this.isPanelLuogoEmissione = true;
      this.isPanelRecapActivities = false;
    }
  }
  setLuogoEmissione(luogoEmissione: string, luogoEmissioneNome: string): void {
    sessionStorage.setItem('luogoEmissione', luogoEmissione);
    sessionStorage.setItem('luogoEmissioneNome', luogoEmissioneNome);
    this.luogoEmissione = luogoEmissioneNome;
    this.isPanelLuogoEmissione = !this.isPanelLuogoEmissione;
    this.isPanelRecapActivities = !this.isPanelRecapActivities;
  }
  setPanelLuogoEmissione(): void {
    this.isPanelLuogoEmissione = true;
    this.isPanelRecapActivities = false;
  }

  goToView(location: string): void {
    this.router.navigate([location], {relativeTo: this.route} );
  }
}
