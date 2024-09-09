import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { ControllerWyszukiwarkaOpenService } from 'src/app/core/api/controller-wyszukiwarka-open.service';
import { WyszukiwarkaAdapter, WynikWyszukiwaniaDtoDzialkaDto, WynikWyszukiwaniaDtoObiektDto, WynikWyszukiwaniaDtoGrobWynikDto } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
// import {WyszukiwarkaAdapter} from '@modul-mapowy';
// import {
//   ControllerWyszukiwarkaOpenService,
//   WynikWyszukiwaniaDtoDzialkaDto,
//   WynikWyszukiwaniaDtoGrobWynikDto,
//   WynikWyszukiwaniaDtoObiektDto
// } from '../../../../build/openapi_modul_mapowy_public';

@Injectable({
  providedIn: 'root'
})
export class WyszukiwarkaProviderService implements WyszukiwarkaAdapter {

  /**
   * konstruktor
   *
   * @param wyszukiwarkaSerwis - serwis do komunikacji z backendem
   */
  constructor(private wyszukiwarkaSerwis: ControllerWyszukiwarkaOpenService) {
  }

  /**
   * Funkcja wyszukiwania działek
   *
   * @param obreb - numer obrębu
   * @param dzialka - numer działki
   */
  wyszukajDzialki(obreb: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoDzialkaDto> {
    return this.wyszukiwarkaSerwis.wyszukajDzialki(obreb, {...parametryWyszukiwania});
  }

  /**
   * Funkcja wysyła wyszukuje obiekty
   *
   * @param fraza - wyszukiwana fraza
   */
  wyszukajObiekty(fraza: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto> {
    return this.wyszukiwarkaSerwis.wyszukajObiekty(fraza, {...parametryWyszukiwania});
  }

  /**
   * Funkcja wysyła wyszukuje obiekty po odleglosci
   *
   * @param fraza - wyszukiwana fraza
   * @param lokalizacjaPoczatkowa  - lokalizacja początkowa
   * @param zasieg - odległość od lokalizacji początkowej
   */
  wyszukajObiektyZLokalizacja(fraza: string, lokalizacjaPoczatkowa: string, zasieg: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto> {
    return this.wyszukiwarkaSerwis.wyszukajObiektyZLokalizacja(fraza, lokalizacjaPoczatkowa, zasieg, {...parametryWyszukiwania});
  }

  /**
   * Funkcja wysyła wyszukuje obiekty oraz adresy
   *
   * @param fraza - wyszukiwana fraza
   */
  wyszukajAdresyObiektySkrzyzowania(fraza: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto> {
    return this.wyszukiwarkaSerwis.wyszukajAdresyObiektySkrzyzowania(fraza, {...parametryWyszukiwania});
  }

  /**
   * Funkcja wysyła wyszukuje obiekty oraz adresy
   *
   * @param fraza - wyszukiwana fraza
   */
  wyszukajGroby(parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoGrobWynikDto> {
    return this.wyszukiwarkaSerwis.wyszukajGroby({...parametryWyszukiwania});
  }

}
