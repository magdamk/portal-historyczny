import {Observable} from 'rxjs';

/**
 * Obiekt do przesyłania danych działek
 */
export interface WynikWyszukiwaniaDtoDzialkaDto {
  liczbaWynikow: number;
  content: Array<DzialkaDto>;
}

/**
 * Obiekt do przesyłania danych obiektów
 */
export interface WynikWyszukiwaniaDtoObiektDto {
  liczbaWynikow: number;
  content: Array<ObiektDto>;
}

/**
 * Obiekt do przesyłania danych grobów
 */
export interface WynikWyszukiwaniaDtoGrobWynikDto {
  liczbaWynikow: number;
  content: Array<GrobWynikDto>;
  liczbaWszystkichWynikow?: number;
}

/**
 * Obiekt do przesyłania danych działki
 */
export interface DzialkaDto {
  id?: number;
  etykieta?: string;
  numerDzialki?: string;
  numerObrebu?: string;
  lokalizacja?: string;
  uuidWarstwy?: string;
  nazwaWarstwy?: string;
  nazwaWarstwyEn?: string;
  typGeometrii?: string;
  wspolrzedne?: number[];
}

/**
 * Obiekt do przesyłania danych obiektów
 */
export interface ObiektDto {
  id?: number;
  etykieta?: string;
  uuidWarstwy?: string;
  lokalizacja?: string;
  nazwaWarstwy?: string;
  nazwaWarstwyEn?: string;
  czyNalezyDoMapy?: boolean;
  typGeometrii?: string;
  wspolrzedne?: number[];
  index?: string;
  widocznoscWarstwy?: boolean;
}

/**
 * Obiekt do przesyłania danych grobów
 */
export interface GrobWynikDto {
  id?: number;
  srid?: number;
  pomnikId?: number;
  imie?: string;
  nazwisko?: string;
  cmentarz?: string;
  miejsce?: string;
  kwatera?: string;
  rzad?: string;
  dzienZgonu?: string;
  miesiacZgonu?: string;
  rokZgonu?: string;
  foto1?: string;
  foto2?: string;
  foto3?: string;
  lokalizacja?: string;
  typGeometrii?: string;
  wspolrzedne?: Array<number>;
}

/**
 * Interfejs definiujący usługi wyszukiwania
 */
export interface WyszukiwarkaAdapter {

  /**
   * Funkcja wysyła wyszukuje dzialki
   *
   * @param obreb - numer obrębu
   * @param parametryWyszukiwania - obiekt z dodatkowymi parametrami wyszukiwania
   */
  wyszukajDzialki(obreb: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoDzialkaDto>;

  /**
   * Funkcja wysyła wyszukuje obiekty
   *
   * @param fraza - wyszukiwana fraza
   * @param parametryWyszukiwania - obiekt z dodatkowymi parametrami wyszukiwania
   */
  wyszukajObiekty(fraza: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto>;

  /**
   * Funkcja wyszukuje obiekty po odleglosci
   *
   * @param fraza - wyszukiwany obiekt
   * @param lokalizacjaPoczatkowa  - lokalizacja początkowa
   * @param zasieg - odległość od lokalizacji początkowej
   * @param parametryWyszukiwania - obiekt z dodatkowymi parametrami wyszukiwania
   */
  wyszukajObiektyZLokalizacja(fraza: string, lokalizacjaPoczatkowa: string, zasieg: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto>;

  /**
   * Funkcja wyszukująca obiekty, adresy oraz skrzyzowania
   *
   * @param fraza - wyszukiwana fraza
   * @param parametryWyszukiwania - obiekt z dodatkowymi parametrami wyszukiwania
   */
  wyszukajAdresyObiektySkrzyzowania(fraza: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto>;

  /**
   * Funkcja wyszukująca groby
   *
   * @param parametryWyszukiwania - obiekt z parametrami wyszukiwania
   */
  wyszukajGroby(parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoGrobWynikDto>;

}

/**
 * Klasa abstrakcyjna definiująca usługi wyszukiwania
 */
export abstract class WyszukiwarkaModulMapowyAdapter implements WyszukiwarkaAdapter {

  /**
   * Funkcja wysyła wyszukuje dzialki
   *
   * @param obreb - numer obrębu
   * @param parametryWyszukiwania - obiekt z dodatkowymi parametrami wyszukiwania
   */
  abstract wyszukajDzialki(obreb: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoDzialkaDto>;

  /**
   * Funkcja wysyła wyszukuje obiekty
   *
   * @param fraza - wyszukiwana fraza
   * @param parametryWyszukiwania - obiekt z dodatkowymi parametrami wyszukiwania
   */
  abstract wyszukajObiekty(fraza: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto>;

  /**
   * Funkcja wysyła wyszukuje obiekty po odleglosci
   *
   * @param fraza - wyszukiwany obiekt
   * @param lokalizacjaPoczatkowa  - lokalizacja początkowa
   * @param zasieg - odległość od lokalizacji początkowej
   * @param parametryWyszukiwania - obiekt z dodatkowymi parametrami wyszukiwania
   */
  abstract wyszukajObiektyZLokalizacja(fraza: string, lokalizacjaPoczatkowa: string, zasieg: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto>;

  /**
   * Funkcja wyszukująca obiekty, adresy oraz skrzyzowania
   *
   * @param fraza - wyszukiwana fraza
   * @param parametryWyszukiwania - obiekt z dodatkowymi parametrami wyszukiwania
   */
  abstract wyszukajAdresyObiektySkrzyzowania(fraza: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto>;

  /**
   * Funkcja wyszukująca groby
   *
   * @param parametryWyszukiwania - obiekt z parametrami wyszukiwania
   */
  abstract wyszukajGroby(parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoGrobWynikDto>;

}

/**
 * Domyślna implementacja wysyłania kounikatu do administratora
 */
export class DomyslnyWszukiwarkaAdapter extends WyszukiwarkaModulMapowyAdapter {


  /**
   * Funkcja wysyła wyszukuje dzialki
   *
   * @param obreb - numer obrębu
   */
  wyszukajDzialki(obreb: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoDzialkaDto> {
    return new Observable(subscriber => {
      console.log('DomyslnyWszukiwarkaAdapter::wyszukajDzialki', obreb, parametryWyszukiwania);
      subscriber.next({
        liczbaWynikow: 0,
        content: [
          {id: 1, numerDzialki: '1', numerObrebu: '1', lokalizacja: '21.0,52.0'},
          {id: 2, numerDzialki: '2', numerObrebu: '2', lokalizacja: '21.0,52.0'}
        ]
      });
    });
  }

  /**
   * Funkcja wysyła wyszukuje obiekty adresy
   *
   * @param fraza - wyszukiwana fraza
   */
  wyszukajObiekty(fraza: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto> {
    return new Observable(subscriber => {
      console.log('DomyslnyWszukiwarkaAdapter::wyszukajObiekty');
      subscriber.next({
        liczbaWynikow: 0,
        content: [
          {id: 1, etykieta: '1', lokalizacja: '21.0,52.0'},
          {id: 2, etykieta: '2', lokalizacja: '21.0,52.0'}
        ]
      });
    });
  }

  /**
   * Funkcja wysyła wyszukuje obiekty po odleglosci
   *
   * @param fraza - wyszukiwany obiekt
   * @param lokalizacjaPoczatkowa  - lokalizacja początkowa
   * @param zasieg - odległość od lokalizacji początkowej
   */
  wyszukajObiektyZLokalizacja(fraza: string, lokalizacjaPoczatkowa: string, zasieg: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto> {
    return new Observable(subscriber => {
      console.log('DomyslnyWszukiwarkaAdapter::wyszukajObiektyZLokalizacja', fraza, lokalizacjaPoczatkowa, zasieg);
      subscriber.next({
        liczbaWynikow: 0,
        content: [
          {id: 1, etykieta: '1', lokalizacja: '21.0,52.0'},
          {id: 2, etykieta: '2', lokalizacja: '21.0,52.0'}
        ]
      });
    });
  }

  /**
   * Funkcja wyszukująca obiekty, adresy oraz skrzyzowania
   *
   * @param fraza - wyszukiwana fraza
   */
  wyszukajAdresyObiektySkrzyzowania(fraza: string, parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoObiektDto> {
    return new Observable(subscriber => {
      console.log('DomyslnyWszukiwarkaAdapter::wyszukajAdresyObiektySkrzyzowania', fraza);
      subscriber.next({
        liczbaWynikow: 0,
        content: [
          {id: 1, etykieta: '1', lokalizacja: '21.0,52.0'},
          {id: 2, etykieta: '2', lokalizacja: '21.0,52.0'}
        ]
      });
    });
  }

  /**
   * Funkcja wyszukująca groby
   *
   * @param parametryWyszukiwania - obiekt z parametrami wyszukiwania
   */
  wyszukajGroby(parametryWyszukiwania: object): Observable<WynikWyszukiwaniaDtoGrobWynikDto> {
    return new Observable(subscriber => {
      subscriber.next({
        liczbaWynikow: 0,
        liczbaWszystkichWynikow: 2,
        content: [
          {id: 1},
          {id: 2}
        ]
      });
    });
  }
}
