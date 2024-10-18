import {Observable} from "rxjs";
import {GrupaWarstwPaskaCzasu} from "../../serwis-mapowy/modele/grupa-warstw-paska-czasu";

export interface PasekCzasuAdapter {

  /**
   * Funkcja służy do pobierania grup warstw paska czasu
   */
  pobierzGrupyWarstwPaskaCzasu(): Observable<GrupaWarstwPaskaCzasu[]>;

}

export abstract class PasekCzasuModulMapowyAdapter implements PasekCzasuAdapter {

  /**
   * Funkcja służy do pobierania grup warstw paska czasu
   */
  abstract pobierzGrupyWarstwPaskaCzasu(): Observable<GrupaWarstwPaskaCzasu[]>;
}


export class DomyslnyPasekCzasuModulMapowyAdapter extends PasekCzasuModulMapowyAdapter {

  /**
   * Funkcja służy do pobierania grup warstw paska czasu
   */
  pobierzGrupyWarstwPaskaCzasu(): Observable<GrupaWarstwPaskaCzasu[]> {
    return new Observable();
  }
}
