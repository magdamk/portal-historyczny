import {Observable} from 'rxjs';

/**
 * Obiekt do transferu danych cmentarzy
 */
export interface JsonListContainerCmentarzDto {
  content?: Array<CmentarzDto>;
}

/**
 * Obiekt do transferu danych cmentarzy
 */
export interface CmentarzDto {
  id?: number;
  opis?: string;
}

export interface JsonListContainerPochowanyDto {
  content?: Array<PochowanyDto>;
}

export interface PochowanyDto {
  pomnikId?: string;
  cmentarz?: string;
  kwatera?: string;
  rzad?: string;
  miejsce?: string;
  imie?: string;
  nazwisko?: string;
  rokZgonu?: string;
  miesiacZgonu?: string;
  dzienZgonu?: string;
  foto1?: string;
  foto2?: string;
  foto3?: string;
  szczegolyDostepne?: string;
}

/**
 * Interfejs definiujący pobieranie cmentarzy
 */
export interface CmentarzeAdapter {

  /**
   * Funkcja służy do pobierania cmentarzy
   */
  pobierzListeCmentarzy(): Observable<JsonListContainerCmentarzDto>;

  /**
   * Funkcja służy do pobierania listy pochowanych
   */
  pobierzListePochowanychOsob(idGrobu: number): Observable<JsonListContainerPochowanyDto>;

}

/**
 * Klasa abstrakcyjna wymagana dla definicji prowajdera
 */
export abstract class CmentarzeModulMapowyAdapter implements CmentarzeAdapter {
  /**
   * Funkcja służy do pobierania cmentarzy
   */
  abstract pobierzListeCmentarzy(): Observable<JsonListContainerCmentarzDto>;

  /**
   * Funkcja służy do pobierania listy pochowanych
   */
  abstract pobierzListePochowanychOsob(idGrobu: number): Observable<JsonListContainerPochowanyDto>;

}

/**
 * Domyślna implementacja prowajdera
 */
export class DomyslneCmentarzeAdapter extends CmentarzeModulMapowyAdapter {
  /**
   * Funkcja służy do pobierania cmentarzy
   */
  pobierzListeCmentarzy(): Observable<JsonListContainerCmentarzDto> {
    console.log('DomyslneCmentarzeAdapter::pobierzListeCmentarzy');
    return new Observable(subscriber => {
      subscriber.next({
        content: [{id: 1, opis: 'Cmentarz'}]
      });
    });
  }

  /**
   * Funkcja służy do pobierania listy pochowanych
   */
  pobierzListePochowanychOsob(idGrobu: number): Observable<JsonListContainerPochowanyDto> {
    console.log('DomyslneCmentarzeAdapter::pobierzListePochowanychOsob - id grobu: ' + idGrobu);
    return new Observable(subscriber => {
      subscriber.next({
        content: [{cmentarz: 'Cmentarz'}]
      });
    });
  }
}
