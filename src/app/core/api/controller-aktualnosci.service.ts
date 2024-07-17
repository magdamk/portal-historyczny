import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent, HttpParameterCodec
} from '@angular/common/http';
import { CustomHttpParameterCodec } from './encoder';
import { Observable } from 'rxjs';

import { AktualnosciListaDto } from '../modele/aktualnosci-lista-dto';
import { JsonObjectContainerAktualnosciSzczegolyDto } from '../modele/json-object-container-aktualnosci-szczegoly-dto';
// import { RequestErrorResponse } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS } from './variables';
import { Configuration } from './configuration';

import { AKTUALNOSCI, ARCHIWUM } from '../../../assets/data/info'

@Injectable({
  providedIn: 'root'
})
export class ControllerAktualnosciService {

  getArchiwum(): AktualnosciListaDto[] {
    return ARCHIWUM;
  }

  getAktualnosci(): AktualnosciListaDto[] {
    return AKTUALNOSCI;
  }


}
