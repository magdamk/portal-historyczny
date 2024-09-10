import {Injectable, Type} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { MobilnyKontrolerNarzedziInterface } from '../../commons/interfejsy/mobilny-kontroler-narzedzi-interface';

/**
 * Serwis do obsługi dynamicznych komponentów w widoku mobilnym
 */
@Injectable({
  providedIn: 'root'
})
export class MobilnyKontrolerNarzedziService {

  private narzedzia$ = new BehaviorSubject<Type<MobilnyKontrolerNarzedziInterface> | undefined>(undefined);

  /**
   * Konstruktor
   */
  constructor() {
  }

  /**
   * Funkcja ładuje komponent
   * @param komponent
   */
  zaladujKomponent(komponent: Type<MobilnyKontrolerNarzedziInterface>): void {
    this.narzedzia$.next(komponent);
  }

  /**
   * Funkcja zamyka komponent
   */
  zamknijKomponent(): void {
    this.narzedzia$.next(undefined);
  }

  /**
   * Funkcja zwraca subject zmian komponentu
   */
  pobierzSubjecNarzedzia(): BehaviorSubject<Type<MobilnyKontrolerNarzedziInterface> | undefined> {
    return this.narzedzia$;
  }


}
