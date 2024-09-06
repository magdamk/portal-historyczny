import {Observable} from 'rxjs';

export interface PomocLista {
  uuid?: string;
  nazwa?: string;
  link?: string;
  tagi?: string;
  trescProsta?: string;
  sciezkaUrl?: string;
  czyWlasciciel?: boolean;
  numerWtabeli?:number;
}

export interface PomocSzczegoly {
  uuid?: string;
  link?: string;
  nazwa?: string;
  tresc?: string;
}

/**
 * Interfejs definiuje adapter pomocy
 */
export interface PomocAdapter {

  /**
   * Funkcja pozwala wyszukiwać liste pomocy
   * @param fraza
   */
  pobierzListeStronPomocy(fraza: string): Observable<PomocLista[]>;

  /**
   * Funkcja pobiera szczegóły pomocy
   * @param sciezka
   */
  pobierSzczegolyStrony(sciezka: string): Observable<PomocSzczegoly>;
}


/**
 * Klasa abstrakcyjna definiuje adapter pomocy
 */
export abstract class PomocModulMapowyAdapter implements PomocAdapter{

  /**
   * Funkcja pozwala wyszukiwać liste pomocy
   * @param fraza
   */
  abstract pobierzListeStronPomocy(fraza: string): Observable<PomocLista[]>;

  /**
   * Funkcja pobiera szczegóły pomocy
   * @param sciezka
   */
  abstract pobierSzczegolyStrony(sciezka: string): Observable<PomocSzczegoly>;
}

/**
 * Bazowa implementacja adaptera pomocy
 */
export class DomyslnaPomocModulMapowyAdapter extends PomocModulMapowyAdapter{

  /**
   * Funkcja pozwala wyszukiwać liste pomocy
   * @param fraza
   */
  pobierzListeStronPomocy(fraza: string): Observable<PomocLista[]> {
    return new Observable();
  }

  /**
   * Funkcja pobiera szczegóły pomocy
   * @param sciezka
   */
  pobierSzczegolyStrony(sciezka: string): Observable<PomocSzczegoly> {
    return new Observable();
  }

}
