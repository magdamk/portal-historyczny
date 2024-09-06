import {Observable} from 'rxjs';

/**
 * Interfejs służący do synchronizacji języka
 */
export interface TlumaczeniaAdapter {
  /**
   * Deklaracja metody służacej do pobierania informacji o języku
   */
  aktualnyJezyk(): Observable<string>;

  /**
   * Deklaracja metody pozwalającej ustawić jezyk w aplikacji głównej
   * @param jezyk - język
   */
  ustawJezyk(jezyk: string): void;


}

/**
 * Klasa abstrakcyjna wymagana do przygotowania prowajdera
 */
export abstract class TlumaczeiaModulMapowyAdapter implements TlumaczeniaAdapter {

  /**
   * Deklaracja metody służacej do pobierania informacji o języku
   */
  abstract aktualnyJezyk(): Observable<string>;

  /**
   * Deklaracja metody pozwalającej ustawić jezyk w aplikacji głównej
   * @param jezyk - język
   */
  abstract ustawJezyk(jezyk: string): void;
}

/**
 * Domyślna implementacja adaptera
 */
export class DomyslnyTlumaczeniaModulMapowyAdapter extends TlumaczeiaModulMapowyAdapter {

  /**
   * Funkcja służy do synchronizacji języka w module mapowym
   */
  aktualnyJezyk(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('pl');
    });
  }

  /**
   * Funkcja służy do synchronizachi jezyka w aplikacji
   * @param jezyk - jezyk
   */
  ustawJezyk(jezyk: string): void {
    return;
  }
}
