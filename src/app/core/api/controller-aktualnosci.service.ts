import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent, HttpParameterCodec
} from '@angular/common/http';
import { CustomHttpParameterCodec } from './encoder';
import { Observable, of } from 'rxjs';

import { AktualnosciListaDto } from '../modele/aktualnosci-lista-dto';
import { JsonObjectContainerAktualnosciSzczegolyDto } from '../modele/json-object-container-aktualnosci-szczegoly-dto';
// import { RequestErrorResponse } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS } from './variables';
import { Configuration } from './configuration';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Connection': 'keep-alive',
    // 'Response-Type': 'application/json',
    // 'Sec-Fetch-Mode': 'no-cors',
    // 'Sec-Fetch-Dest':'application/json',
    // 'Sec-Fetch-Site':'https://mapa.um.warszawa.pl',
    // 'Access-Control-Allow-Origin': '*'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ControllerAktualnosciService {
  basePHAPIUrl: string = environment.basePHAPIUrl;
  constructor(private http: HttpClient) { }

  // getArchiwum(): Observable<AktualnosciListaDto[]> {
  //   return this.http.get<AktualnosciListaDto[]>('./assets/data/archiwum.json');
  // }

  // getAktualnosci(): Observable<AktualnosciListaDto[]> {
  //   return this.http.get<AktualnosciListaDto[]>('./assets/data/aktualnosci.json');
  // }
  getArchiwum(): Observable<AktualnosciListaDto[]> {
    return this.http.get<AktualnosciListaDto[]>(this.basePHAPIUrl + '/aktualnosci/findAllArchive');
  }
  getAktualnosci(): Observable<AktualnosciListaDto[]> {
    return this.http.get<AktualnosciListaDto[]>(this.basePHAPIUrl + '/aktualnosci/findAll');
  }
}
