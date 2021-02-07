import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBolt} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../services/location.service';
import {AuthService} from '../../services/auth.service';

// @ts-ignore
// @ts-ignore
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
  userName: string;

  constructor(private router: Router, private route: ActivatedRoute, private locationService: LocationService, private authService: AuthService) {
    locationService.locationAnnounced$.subscribe((locationName) => {
      this.luogoEmissione = locationName;
    });
  }

  ngOnInit(): void {
    if (this.locationService.getLocation() !== undefined && this.locationService.getLocation() !== null) {
      this.isPanelLuogoEmissione = !this.isPanelLuogoEmissione;
      this.isPanelRecapActivities = !this.isPanelRecapActivities;
      this.luogoEmissione = this.locationService.getLocation();
      this.locationService.changeLocation(this.luogoEmissione);
    } else {
      this.isPanelLuogoEmissione = true;
      this.isPanelRecapActivities = false;
    }

    this.userName = this.authService.getUsername();
  }

  setLuogoEmissione(luogoEmissione: string, luogoEmissioneNome: string): void {
    this.luogoEmissione = luogoEmissione;
    this.locationService.changeLocation(this.luogoEmissione);
    this.isPanelLuogoEmissione = !this.isPanelLuogoEmissione;
    this.isPanelRecapActivities = !this.isPanelRecapActivities;
  }

  setPanelLuogoEmissione(): void {
    this.isPanelLuogoEmissione = true;
    this.isPanelRecapActivities = false;
  }

  goToView(location: string): void {
    this.router.navigate(['tourApp/' + location]);
  }


}
