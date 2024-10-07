import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZbiorKategoriiMapOpenDto } from 'src/app/core/modele/zbior-kategorii-map-open-dto';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { TagiDto } from '../modele/tagi';

/**
 * Serwis służący do okreslania wysokości nad poziomem moża dla współżędnych
 */
@Injectable({
  providedIn: 'root'
})
export class TagiService {
  constructor(private http: HttpClient, private tlumaczeniaService: TlumaczeniaService) { }

  getTagi(): Observable<TagiDto[]> {
    // console.log('!!!!!!!!!!!!!!!!!! teraz: ', this.tlumaczeniaService.pobierzAktualnyJezyk());
    if (this.tlumaczeniaService.pobierzAktualnyJezyk() !== 'pl') {
      return this.http.get<TagiDto[]>('./assets/data/tagi_en.json')
    }
    else {
      return this.http.get<TagiDto[]>('./assets/data/tagi_pl.json')
    }
  }

}

