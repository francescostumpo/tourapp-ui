import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Site} from '../models/site';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TicketStandard} from '../models/ticket-standard';

@Injectable({
  providedIn: 'root'
})
export class TicketStandardService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  createOrUpdateTicketStandard(ticketStandard: TicketStandard, stampa: string): Observable<ArrayBuffer>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      .post<any>(environment.tourappBackendUrl + '/api/ts/createOrUpdateTicketStandard?mode=' + stampa, ticketStandard, {headers, observe: 'body', responseType: 'arraybuffer'});
  }

  generateFattura(ticketStandard: TicketStandard): Observable<ArrayBuffer>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      .post<any>(environment.tourappBackendUrl + '/api/ts/generateFattura', ticketStandard, {headers, observe: 'body', responseType: 'arraybuffer'});
  }

  // tslint:disable-next-line:ban-types
  verifyTicketStandard(ticketId: string): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.tourappBackendUrl + '/api/ts/verifyTicket/' + ticketId, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  validateTicketStandard(ticketId: string): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.tourappBackendUrl + '/api/ts/validateTicket/' + ticketId, {headers, observe: 'response'});
  }
}
