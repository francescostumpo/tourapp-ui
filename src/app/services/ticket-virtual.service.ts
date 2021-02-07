import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {TicketStandard} from '../models/ticket-standard';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TicketVirtual} from '../models/ticket-virtual';

@Injectable({
  providedIn: 'root'
})
export class TicketVirtualService {

  constructor(private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:ban-types
  createOrUpdateTicketVirtual(ticketVirtual: TicketVirtual, validate: boolean): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      .post<any>(environment.tourappBackendUrl + '/api/tv/createOrUpdateTicketVirtual?validate=' + validate, ticketVirtual, { headers, observe: 'body', responseType: 'arraybuffer'
      });
  }

  generateFattura(ticketVirtual: TicketVirtual): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      .post<any>(environment.tourappBackendUrl + '/api/tv/generateFattura', ticketVirtual, { headers, observe: 'body', responseType: 'arraybuffer'
      });
  }

  // tslint:disable-next-line:ban-types
  verifyTicketVirtual(ticketId: string): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.tourappBackendUrl + '/api/tv/verifyTicket/' + ticketId, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  validateTicketVirtual(ticketId: string): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.tourappBackendUrl + '/api/tv/validateTicket/' + ticketId, {headers, observe: 'response'});
  }

  // tslint:disable-next-line:ban-types
  loginToVirtualTour(ticketVirtual: TicketVirtual): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey', 'Access-Control-Allow-Origin': '*'});
    return this.httpClient
      .post<any>(environment.tourappBackendUrl + '/api/tv/loginToVirtualTour', ticketVirtual, {
        headers,
        withCredentials: true,
        observe: 'response'
      });
  }
}
