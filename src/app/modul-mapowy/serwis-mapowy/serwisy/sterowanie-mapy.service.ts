import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Punkt } from '../modele/punkt';


@Injectable({
  providedIn: 'root'
})
export class SterowanieMapyService {

  private loaklizacjaUzytkownika$ = new Subject<Punkt>();
  private widocznoscSpinner$ = new BehaviorSubject<boolean>(false);

  /**
   * Funkcja pozwala ustawic i oznaczy pozycje uzytkownika
   * @param punkt
   */
  ustawLokalizacjeUzytkonika(punkt: Punkt) {
    this.loaklizacjaUzytkownika$.next(punkt);
  }

  /**
   * Funkcja pozwala pobrac subject lokalizacji uzytkownika
   */
  pobierszSubjectZmianyLokalizacjiUzytkownika() {
    return this.loaklizacjaUzytkownika$;
  }

  /**
   * Funkcja ustawia widocznosć spinnera
   * @param widoczny
   */
  ustawWidocznoscSpinnera(widoczny: boolean) {
    this.widocznoscSpinner$.next(widoczny);
  }

  /**
   * Funcja pobiera subject zmiany widocznosci spinnera
   */
  pobierzSubjectWidocznosciSpinner(): BehaviorSubject<boolean> {
    return this.widocznoscSpinner$;
  }

}
