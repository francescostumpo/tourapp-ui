import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  luogoEmissione: string;
  subscription: Subscription;

  constructor(private locationService: LocationService) {
    this.subscription = locationService.locationAnnounced$.subscribe(
      locationName => {
        this.luogoEmissione = locationName;
      });
  }

  ngOnInit(): void {
  }


  getLocation(): string {
    if (this.luogoEmissione === undefined || this.luogoEmissione === null){
      return 'Non disponibile';
    }
    return this.luogoEmissione.toUpperCase();
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  setLocation(castello: string): void {
    this.locationService.changeLocation(castello);
  }
}
