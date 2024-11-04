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
import { KategoriaGrupaMapOpenDto } from '../modele/kategoria-grupa-map-open-dto';
import { JsonObjectContainerMapyDto } from '../modele/json-object-container-mapy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControllerMapyService {
  basePHAPIUrl = environment.basePHAPIUrl;

  constructor(private http: HttpClient) { }


// getRodzajISciezkaDoPlikuZGrafika(uuid:string):Observable<JsonObjectContainerMapyDto>{
// return this.http.get<JsonObjectContainerMapyDto>('./assets/data/mapy.json');
// // ;result.content?.find((mapa)=> mapa.uuidMapy===uuid)).pipe(result=>  {console.log('serwis mapy ',result.content?.find((mapa)=> mapa.uuidMapy===uuid));result.content?.find((mapa)=> mapa.uuidMapy===uuid)});
// //  return this.http.get<JsonObjectContainerMapyDto>('./assets/data/mapy.json');
// }


getRodzajISciezkaDoPlikuZGrafika(uuid:string):Observable<KategoriaGrupaMapOpenDto>{
  return this.http.get<KategoriaGrupaMapOpenDto>(this.basePHAPIUrl+'/kategoriagrupamap/find/'+uuid);
  // ;result.content?.find((mapa)=> mapa.uuidMapy===uuid)).pipe(result=>  {console.log('serwis mapy ',result.content?.find((mapa)=> mapa.uuidMapy===uuid));result.content?.find((mapa)=> mapa.uuidMapy===uuid)});
  //  return this.http.get<JsonObjectContainerMapyDto>('./assets/data/mapy.json');
}
}
