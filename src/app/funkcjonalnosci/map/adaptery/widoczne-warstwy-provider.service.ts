import {Injectable} from '@angular/core';
// import {DostepneWarstwyAdapter, Warstwa, WarstwyOdpowiedz} from '@modul-mapowy';
import {Observable} from 'rxjs';
import { ControllerWidoczneWarstwyOpenService } from 'src/app/core/api/controller-widoczne-warstwy-open.service';
import { DostepneWarstwyAdapter, WarstwyOdpowiedz } from 'src/app/modul-mapowy/mm-core/providers/dostepne-warstwy-adapter';
import { Warstwa } from 'src/app/modul-mapowy/serwis-mapowy/modele/warstwa';
// import {ControllerWidoczneWarstwyOpenService} from "../../../../../build/openapi_modul_mapowy_public";


/**
 * Srwis implementuje adapter widocznych warstw
 */
@Injectable({
  providedIn: 'root'
})
export class WidoczneWarstwyProviderService implements DostepneWarstwyAdapter {

  /**
   * Konstruktor
   * @param warstwy
   */
  constructor(private warstwy: ControllerWidoczneWarstwyOpenService) {
  }

  /**
   * Funkcja pobiwra widoczne warstwy
   * @param szukaj
   * @param strona
   * @param rozmiar
   */
  pobierzWidoczneWarstwyIKatalogi(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined> {
    return new Observable<WarstwyOdpowiedz | undefined>(subscriber => {
      this.warstwy.pobierzListeWidocznosciWarstw(strona, rozmiar, {wyszukaj: szukaj, sort: 'nazwaOficjalna,asc'})
        .subscribe(response => {
          subscriber.next({
            liczbaWszystkichElementow: response.totalElements ? response.totalElements : 0,
            liczbaStron: response.totalPages ? response.totalPages : 0,
            strona: response.number ? response.number : 0,
            warstwy: response.content as Warstwa[],
          });
        });
    });
  }

  /**
   * Funkcja zwraca widoczna warstwę lub katalog po uuid
   * @param uuid
   */
  pobierzWidocznaWarstweLubKatalog(uuid: string): Observable<Warstwa | undefined> {
    return new Observable<Warstwa | undefined>(subscriber => {
      this.warstwy.pobierzWarstwe(uuid).subscribe(response => {
        subscriber.next(response.content);
      }, error => {
        subscriber.next(undefined);
      })
    });
  }


  /**
   * Funkcja pobiera katalogi
   * @param szukaj
   * @param strona
   * @param rozmiar
   */
  pobierzWszystkieKatalogi(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined> {
    return new Observable(subscriber => {
      subscriber.next(undefined);
    });
  }

  /**
   * Funkcja pobiera warstwy
   * @param szukaj
   * @param strona
   * @param rozmiar
   */
  pobierzWszystkieWrstwy(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined> {
    return new Observable(subscriber => {
      subscriber.next(undefined);
    });
  }


}
