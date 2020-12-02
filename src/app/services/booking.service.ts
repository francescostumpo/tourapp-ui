import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Site} from '../models/site';
import {Booking} from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getAllBookings(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.tourappBackendUrl + '/api/bo/getAllBookings', {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  createOrUpdateBooking(booking: Booking): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.tourappBackendUrl + '/api/bo/createOrUpdateBooking', booking, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  deleteBooking(booking: Booking): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      // used POST because in ANGULAR there's no body
      .post<any>(environment.tourappBackendUrl + '/api/bo/deleteBooking', booking, {headers, observe: 'response'});
  }
}
