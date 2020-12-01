import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourOperatorService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getAllTourOperators(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .get<any>(environment.tourappBackendUrl + '/api/to/getAllTourOperators', {headers, observe: 'response'});
  }
}
