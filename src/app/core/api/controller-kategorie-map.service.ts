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
import { ZbiorKategoriiMapOpenDto } from '../modele/zbior-kategorii-map-open-dto';
import { TlumaczeniaService } from '../tlumaczenia/serwisy/tlumaczenia.service';


@Injectable({
  providedIn: 'root'
})
export class ControllerKategorieMapService {
  constructor(private http: HttpClient,private tlumaczeniaService:TlumaczeniaService) { }

  getKategorieMap(): Observable<ZbiorKategoriiMapOpenDto[]> {
    if (this.tlumaczeniaService.pobierzAktualnyJezyk()!=='pl'){
    return this.http.get<ZbiorKategoriiMapOpenDto[]>('./assets/data/tematyczne_en.json')}
    else {
      return this.http.get<ZbiorKategoriiMapOpenDto[]>('./assets/data/tematyczne_pl.json')
    }
  }

}
