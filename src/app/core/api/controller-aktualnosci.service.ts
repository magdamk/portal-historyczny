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


@Injectable({
  providedIn: 'root'
})
export class ControllerAktualnosciService {
  constructor(private http: HttpClient) { }

  getArchiwum(): Observable<AktualnosciListaDto[]> {
    return this.http.get<AktualnosciListaDto[]>('./assets/data/archiwum.json');
  }

  getAktualnosci(): Observable<AktualnosciListaDto[]> {
    return this.http.get<AktualnosciListaDto[]>('./assets/data/aktualnosci.json');
  }


}
