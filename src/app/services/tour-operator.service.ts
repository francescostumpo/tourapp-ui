import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TourOperator} from '../models/tour-operator';

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
  // tslint:disable-next-line:ban-types
  createOrUpdateTourOperator(tourOperator: TourOperator): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.tourappBackendUrl + '/api/to/createOrUpdateTourOperator', tourOperator, {headers, observe: 'response'});
  }
  // tslint:disable-next-line:ban-types
  deleteTourOperator(tourOperator: TourOperator): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({Authorization: 'Bearer ey'});
    return this.httpClient
      .post<any>(environment.tourappBackendUrl + '/api/to/deleteTourOperator', tourOperator, {headers, observe: 'response'});
  }
}
