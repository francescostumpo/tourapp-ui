import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TicketTipology} from '../models/ticket-tipology';

@Injectable({
  providedIn: 'root'
})
// tslint:disable:ban-types
export class TicketTipologyService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTicketTipologies(): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.tourappBackendUrl + '/api/tt/getAllTicketTipologies', {headers, observe: 'response'});
  }

  createOrUpdateTicketTipology(ticketTipology: TicketTipology): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.tourappBackendUrl + '/api/tt/createOrUpdateTicketTipology', ticketTipology, {
        headers,
        observe: 'response'
      });
  }

  deleteTicketTipology(ticketTipology: TicketTipology): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.tourappBackendUrl + '/api/tt/deleteTicketTipology', ticketTipology, {
        headers,
        observe: 'response'
      });
  }
}
