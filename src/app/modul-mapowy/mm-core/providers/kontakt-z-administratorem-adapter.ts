import {Observable} from 'rxjs';

export interface WidomoscDoAdministratora {
  wyslaneOd: string;
  zawartosc: string;
  adresBiezacejMapy?: string;
  zalaczniki?: ZalacznikWiadomosci[];
}

export interface ZalacznikWiadomosci {
  nazwaPliku: string;
  typPliku: string;
  danePliku: string;
}

/**
 * Interfejs definiujący wysyłanie komunikatów do administratora
 */
export interface KontaktZAdministratoremAdapter {

  /**
   * Funkcja wysyła komunikat do administratora
   * @param wiadomosc
   */
  dodajWiadomoscDlaAdministratora(wiadomosc: WidomoscDoAdministratora): Observable<any>;

}

/**
 * Klasa abstrakcyjna definiująca wysyłanie komunikatu do administratora
 */
export abstract class KontaktZAdministratoremModulMapowyAdapter implements KontaktZAdministratoremAdapter {

  /**
   * Funkcja wysyła komunikat do administratora
   * @param wiadomosc
   */
  abstract dodajWiadomoscDlaAdministratora(wiadomosc: WidomoscDoAdministratora): Observable<any>;

}

/**
 * Domyślna implementacja wysyłania kounikatu do administratora
 */
export class DomyslnyKontaktZAdministratoremAdapter extends KontaktZAdministratoremModulMapowyAdapter {

  /**
   * Funkcja wysyła komunikat do administratora
   * @param wiadomosc
   */
  dodajWiadomoscDlaAdministratora(wiadomosc: WidomoscDoAdministratora): Observable<any> {
    return new Observable<any>(subscriber => {
      // console.log('DomyslnyKontaktZAdministratoremAdapter::dodajwiadomoscDlaAdministratora', wiadomosc);
      subscriber.next('');
    });
  }

}
