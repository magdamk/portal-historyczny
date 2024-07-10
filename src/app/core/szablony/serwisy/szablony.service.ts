import {Injectable, Type} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {BelkaBocznaKomponent} from '../../../wspolne/interfejsy/belka-boczna-komponent';

/**
 * Serwis szablonów
 */
@Injectable({
  providedIn: 'root'
})
export class SzablonyService {

  private zmianaTytuluSubject$ = new BehaviorSubject<string>('');
  private zmianaZawartosciBelkiBocznejSubject$ = new BehaviorSubject<Type<BelkaBocznaKomponent> | undefined>(undefined);
  private zmianaRozwinieciaBelkiBocznejSubject$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  // ---------------------------------Szablon tytuł strony------------------------------------------
  /**
   * Funkcja ustawia tytuł w szablonie strony startowej
   * @param tytul - tytuł na stronie startowej
   */
  ustawTytulStrony(tytul: string): void {
    this.zmianaTytuluSubject$.next(tytul);
  }

  /**
   * Funkcja pozwala pobrać obekt śledzenia dla tytułu strony
   */
  getTytulStronySubject(): BehaviorSubject<string> {
    return this.zmianaTytuluSubject$;
  }

  // --------------------------------Szablon zawartosc belki bocznej--------------------------------

  /**
   * Funkcja ustawia domyślny komponent belki bocznej
   */
  ustawDomyslnyKomponentBelkiBocznej(): void {
    this.zmianaZawartosciBelkiBocznejSubject$.next(undefined);
  }

  /**
   * Funkcja ustawia dowolny komponent implementujący interfejs BelkaBocznaKomponent
   * @param komponent - komponent musi być implementacją interfejsu BelkaBocznaKomponent
   */
  ustawKomponentBelkiBocznej(komponent: Type<BelkaBocznaKomponent>): void {
    this.zmianaZawartosciBelkiBocznejSubject$.next(komponent);
  }

  /**
   * Funkcja pozwala pobrać obiekt śledzenia dla komponentu belki bocznej
   */
  getZmianaZawartosciBelkiBocznejSubject(): BehaviorSubject<Type<BelkaBocznaKomponent> | undefined> {
    return this.zmianaZawartosciBelkiBocznejSubject$;
  }

  // --------------------------------Szablon rozwiniecie belki bocznej -------------------------------
  /**
   * Funckaj zwija belke boczną
   */
  zwinBelkeBoczna(): void {
    this.zmianaRozwinieciaBelkiBocznejSubject$.next(false);
  }

  /**
   * Funckaj rozwija belkę boczną
   */
  rozwinBelkeBoczna(): void {
    this.zmianaRozwinieciaBelkiBocznejSubject$.next(true);
  }

  /**
   * Funkcja pozwala pobrać obiekt śledzenia dla stanu belki bocznej
   */
  getZmianaRozwinieciaBelkiBocznejSubject(): BehaviorSubject<boolean> {
    return this.zmianaRozwinieciaBelkiBocznejSubject$;
  }
}
