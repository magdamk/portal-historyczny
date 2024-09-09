import {Injectable} from '@angular/core';
import {TlumaczeniaService} from '../../../core/tlumaczenia/serwisy/tlumaczenia.service';
// import {TlumaczeiaModulMapowyAdapter} from '@modul-mapowy';
import {Observable} from 'rxjs';
import { TlumaczeiaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/tlumaczenia-modul-mapowy-adapter';

/**
 * Klasa zawiera implementację adaptera obsługi zmiany języka dla modułu mapowego
 */
@Injectable({
  providedIn: 'root'
})
export class TlumaczeniaProviderService extends TlumaczeiaModulMapowyAdapter {

  constructor(private tlumaczeniaSerwis: TlumaczeniaService) {
    super();
  }

  /**
   * Funkcja służy do synchronizacji języka w module mapowym
   */
  aktualnyJezyk(): Observable<string> {
    return new Observable(subscriber => {
      this.tlumaczeniaSerwis.getZmianaJezykaSubject().subscribe(jezyk => {
        subscriber.next(jezyk);
      });
    });
  }

  /**
   * Funkcja służy do synchronizachi jezyka w aplikacji
   * @param jezyk - jezyk
   */
  ustawJezyk(jezyk: string): void {
    this.tlumaczeniaSerwis.zmienJezyk(jezyk);
  }


}
