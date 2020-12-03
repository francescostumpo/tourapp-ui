import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export interface LuogoEmissione{
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationName: string;
// Observable string sources
  private locationChangeSource = new Subject<string>();
// Observable string streams
  locationAnnounced$ = this.locationChangeSource.asObservable();
// Service message commands
  // tslint:disable-next-line:typedef
  changeLocation(locationName: string) {
    this.locationName = locationName;
    this.locationChangeSource.next(locationName);
  }

  getLocation(): string{
    return this.locationName;
  }

  constructor() { }


}
