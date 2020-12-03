import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TicketStandard} from '../models/ticket-standard';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private httpClient: HttpClient) { }

  downloadReport(dataDa: Date, dataA: Date, type: string): Observable<ArrayBuffer>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      .get<any>(environment.tourappBackendUrl + '/api/re/downloadReport?type=' + type + '&dateDa=' + dataDa + '&dateA=' + dataA,  {headers, observe: 'body', responseType: 'arraybuffer'});
  }
}
