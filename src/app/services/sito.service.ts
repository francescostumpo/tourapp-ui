import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitoService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getAllSites(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.tourappBackendUrl + '/api/si/getAllSites', {headers, observe: 'response'});
  }
}
