import { Injectable } from '@angular/core';
import { KontaktZAdministratoremAdapter, WidomoscDoAdministratora } from '../../../core/adaptery/kontakt-z-administratorem-adapter';
import { Observable } from 'rxjs';
import { ControllerKontaktZAdminemService } from "../../../core/api/controller-kontakt-z-adminem.service";
import { KontaktZAdminemDto } from '../../../core/modele/kontakt-z-adminem-dto';

/**
 * Serwis implementuje adapter komunikacji z administratorem
 */
@Injectable({
  providedIn: 'root'
})
export class KontaktZAdministratoremProviderService implements KontaktZAdministratoremAdapter {

  /**
   * Konstruktor
   * @param kontaktZAdministratoremController
   */
  constructor(private kontaktZAdministratoremController: ControllerKontaktZAdminemService) {
  }

  /**
   * Funkcja wysła wiadomosc do administratora
   * @param wiadomosc
   */
  dodajWiadomoscDlaAdministratora(wiadomosc: WidomoscDoAdministratora): Observable<any> {
    return this.kontaktZAdministratoremController.dodajWiadomoscDlaAdmina(
      wiadomosc as KontaktZAdminemDto);
  }
}

