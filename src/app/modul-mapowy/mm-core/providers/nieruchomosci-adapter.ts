import {Observable} from 'rxjs';
import {OpcjeWyboru} from '../../wspolne/komponenty/select-input/select-input.component';

/**
 * Interfejs do transferowania danych listy nieruchomosci
 */
export interface JsonListContainerNieruchomoscSprzedazListaDto {
  content?: Array<NieruchomoscSprzedazListaDto>;
}

export interface JsonListContainerNieruchomoscWynajemListaDto {
  content?: Array<NieruchomoscWynajemListaDto>;
}

/*export interface JsonObjectContainerNieruchomoscLokalizacjaDto {
  content?: NieruchomoscWynajemListaDto;
}*/
export interface JsonObjectContainerNieruchomoscLokalizacjaDto{
  content?: NieruchomoscLokalizacjaDto;
}
/**
 * Interfejs do transferowania danych listy nieruchomosci
 */
export interface NieruchomoscSprzedazListaDto {
  id?: number;
  miejscowosc?: string;
  dzielnica?: string;
  ulica?: string;
  powierzchnia?: number;
  stanZagospodarowania?: string;
  status?: string;
  cenaWywolawcza?: number;
  lokalizacja?: string;
  typGeometrii?: string;
  wspolrzedne?: Array<number>;
  zaznaczony?: boolean;
}

/**
 * Interfejs do transferowania danych listy nieruchomosci
 */
export interface NieruchomoscWynajemListaDto {
  id?: number;
  dzielnica?: string;
  ulica?: string;
  numerDomu?: string;
  numerLokalu?: string;
  przeznaczenie?: string;
  powierzchnia?: number;
  cenaWywolawcza?: number;
  okresNajmu?: number;
  trybNajmu?: string;
  lokalizacja?: string;
  typGeometrii?: string;
  zaznaczony?: boolean;
}

/**
 * Interfejs do transferowania danych filtrów zakresu
 */
export interface NieruchomoscFiltrZakresuDto {
  id?: string;
  nazwa?: string;
  minWartosc?: string;
  maxWartosc?: string;
}

export interface NieruchomoscLokalizacjaDto {
  id?: number;
  lokalizacja?: string;
  wspolrzedne?: Array<number>;
}

/**
 * Interfejs definiujący pobieranie cmentarzy
 */
export interface NieruchomosciAdapter {

  /**
   * Funkcja pobierania listy nieruchomosci na sprzedaż
   */
  pobierzListeNieruchomosciSprzedaz(parametry: { [key: string]: string; }): Observable<JsonListContainerNieruchomoscSprzedazListaDto>;


  /**
   * Funkcja pobierania listy nieruchomosci na wynajem
   */
  pobierzListeNieruchomosciWynajem(parametry: { [key: string]: string; }): Observable<JsonListContainerNieruchomoscWynajemListaDto>;

  /**
   * Funkcja pobierania listy statusów
   */
  pobierzWartosciFiltra(typOgloszenia: string, nazwaFiltra: string): Observable<OpcjeWyboru[]>;

  /**
   * Funkcja pobierania listy stanów zagospodarowania
   */
  pobierzWartosciFiltraZakresu(typOgloszenia: string, nazwaFiltra: string): Observable<NieruchomoscFiltrZakresuDto[]>;

  /**
   * Funkcja pobierania lokalizacji i wspolrzednych nieruchomosci sprzedaz
   * @param id
   */
  pobierzWspolrzedneILokalizacjeNieruchomosciSprzedaz(id: number): Observable<JsonObjectContainerNieruchomoscLokalizacjaDto>;

  /**
   * Funkcja pobierania lokalizacji  nieruchomosci wynajem
   * @param id
   */
  pobierzLokalizacjeNieruchomosciWynajem(id: number): Observable<JsonObjectContainerNieruchomoscLokalizacjaDto>;

}

/**
 * Klasa abstrakcyjna wymagana dla definicji prowajdera
 */
export abstract class NieruchomosciModulMapowyAdapter implements NieruchomosciAdapter {
  /**
   * Funkcja pobierania listy nieruchomosci na sprzedaż
   */
  abstract pobierzListeNieruchomosciSprzedaz(parametry: { [key: string]: string; }): Observable<JsonListContainerNieruchomoscSprzedazListaDto>;

  /**
   * Funkcja pobierania listy nieruchomosci na wynajem
   */
  abstract pobierzListeNieruchomosciWynajem(parametry: { [key: string]: string; }): Observable<JsonListContainerNieruchomoscWynajemListaDto>;

  /**
   * Funkcja pobierania listy statusów
   */
  abstract pobierzWartosciFiltra(typOgloszenia: string, nazwaFiltra: string): Observable<OpcjeWyboru[]>;

  /**
   * Funkcja pobierania listy stanów zagospodarowania
   */
  abstract pobierzWartosciFiltraZakresu(typOgloszenia: string, nazwaFiltra: string): Observable<NieruchomoscFiltrZakresuDto[]>;

  /**
   * Funkcja pobierania lokalizacji i wspolrzednych nieruchomosci sprzedaz
   * @param id
   */
  abstract pobierzWspolrzedneILokalizacjeNieruchomosciSprzedaz(id: number): Observable<JsonObjectContainerNieruchomoscLokalizacjaDto>;

  /**
   * Funkcja pobierania lokalizacji i wspolrzednych nieruchomosci wynajem
   * @param id
   */
  abstract pobierzLokalizacjeNieruchomosciWynajem(id: number): Observable<JsonObjectContainerNieruchomoscLokalizacjaDto>;
}

/**
 * Domyślna implementacja prowajdera
 */
export class DomyslneNieruchomosciAdapter extends NieruchomosciModulMapowyAdapter {

  /**
   * Funkcja pobierania listy nieruchomosci na sprzedaż
   */
  pobierzListeNieruchomosciSprzedaz(parametry: { [key: string]: string; }): Observable<JsonListContainerNieruchomoscSprzedazListaDto> {
    return new Observable(subscriber => {
      subscriber.next({
        content: [{miejscowosc: 'miejscowosc', dzielnica: 'dzielnica'}]
      });
    });
  }


  /**
   * Funkcja pobierania listy nieruchomosci na wynajem
   */
  pobierzListeNieruchomosciWynajem(parametry: { [key: string]: string; }): Observable<JsonListContainerNieruchomoscWynajemListaDto> {
    return new Observable(subscriber => {
      subscriber.next({
        content: [{ulica: 'ulica', dzielnica: 'dzielnica'}]
      });
    });
  }

  /**
   * Funkcja pobierania listy statusów
   */
  pobierzWartosciFiltra(typOgloszenia: string, nazwaFiltra: string): Observable<OpcjeWyboru[]> {
    return new Observable(subscriber => {
      subscriber.next([{etykieta: 'Bemowo', wartosc: '18'}]);
    });
  }

  /**
   * Funkcja pobierania listy stanów zagospodarowania
   */
  pobierzWartosciFiltraZakresu(typOgloszenia: string, nazwaFiltra: string): Observable<NieruchomoscFiltrZakresuDto[]> {
    return new Observable(subscriber => {
      subscriber.next([{nazwa: 'gruntowa niezabudowana', id: '1'}]);
    });
  }

  /**
   * Funkcja pobierania lokalizacji i wspolrzednych nieruchomosci sprzedaz
   * @param id
   */
  pobierzWspolrzedneILokalizacjeNieruchomosciSprzedaz(id: number): Observable<JsonObjectContainerNieruchomoscLokalizacjaDto> {
    return new Observable(subscriber => {
      subscriber.next({} as JsonObjectContainerNieruchomoscLokalizacjaDto);
    });
  }

  /**
   * Funkcja pobierania lokalizacji i wspolrzednych nieruchomosci wynajem
   * @param id
   */
  pobierzLokalizacjeNieruchomosciWynajem(id: number): Observable<JsonObjectContainerNieruchomoscLokalizacjaDto> {
    return new Observable(subscriber => {
      subscriber.next({} as JsonObjectContainerNieruchomoscLokalizacjaDto);
    });
  }
}
