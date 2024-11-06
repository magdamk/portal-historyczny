import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZbiorKategoriiMapOpenDto } from 'src/app/core/modele/zbior-kategorii-map-open-dto';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { TagiDto } from '../modele/tagi';
import { environment } from 'src/environments/environment';


const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TagiService {
  basePHAPIUrl = environment.basePHAPIUrl;
  constructor(private http: HttpClient, private tlumaczeniaService: TlumaczeniaService) { }

  getTagi(): Observable<TagiDto[]> {
    // return this.http.get<TagiDto[]>('assets/data/tagi.json')
    return this.http.get<TagiDto[]>(this.basePHAPIUrl+'/tagi/findAll');
  }

}

