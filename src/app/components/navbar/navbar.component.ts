import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  luogoEmissione: string;
  subscription: Subscription;

  constructor(private locationService: LocationService, public authService: AuthService) {
    this.subscription = locationService.locationAnnounced$.subscribe(
      locationName => {
        this.luogoEmissione = locationName;
      });
  }

  ngOnInit(): void {
  }


  getLocation(): string {
    if (this.luogoEmissione === undefined || this.luogoEmissione === null) {
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
    document.getElementById('selezioneLocationDropdown').classList.remove('show');
  }

  // tslint:disable-next-line:typedef
  isNotPortal() {
    const location = window.location.pathname;
    if (location === '/tourApp') {
      return false;
    }
    return true;
  }
}
