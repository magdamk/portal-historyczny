import {Observable} from "rxjs";
import {InformacjeOObiekcie} from "../../serwis-mapowy/utils/obiekty-mapy-utils";

/**
 * Intefrejs definiuje provider analiz przestrzennych
 */
export interface AnalizyPrzestrzenneAdapter {

  /**
   * Funkcja pobiera obiekty dla wartsw
   * @param uuidWarstwy
   */
  pobierzObiektyWarstwy(uuidWarstwy: string): Observable<InformacjeOObiekcie[]>;

}

/**
 * Klasa abstrakcyjna definiuje provider analiz przestrzennych
 */
export abstract class AnalizyPrzestrzenneModulMapowyAdapter implements AnalizyPrzestrzenneAdapter {

  /**
   * Funkcja pobiera obiekty dla wartsw
   * @param uuidWarstwy
   */
  abstract pobierzObiektyWarstwy(uuidWarstwy: string): Observable<InformacjeOObiekcie[]>;

}

/**
 * Klasa definiuje podstawową implementację providera analiz przestrzennych
 */
export class DomyslneAnalizyPrzstrzenneAdapter extends AnalizyPrzestrzenneModulMapowyAdapter{

  /**
   * Funkcja pobiera obiekty dla wartsw
   * @param uuidWarstwy
   */
  pobierzObiektyWarstwy(uuidWarstwy: string): Observable<InformacjeOObiekcie[]>{
    return new Observable(subscriber => {
      subscriber.next([])
    });
  }

}
