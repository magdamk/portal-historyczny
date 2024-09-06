import {POZ_ZNACZNIK_BELKA_BOCZNA} from '../komponenty/boczna-belka/belka-boczna-narzedzia-sekcja/belka-boczna-narzedzia-sekcja.component';
import {Store} from '@ngrx/store';
import {NarzedziaActions} from '../../stan/narzedzia/narzedzia.actions';
import {NarzedzieSterujace} from '../../stan/narzedzia/narzedzia.reducer';
import {InterfejsUzytkownikaActions} from '../../stan/interfejs-uzytkownika/interfejs-uzytkownika.actions';

/**
 * Interfejs nzrzedzi mapowych
 */
export interface NarzedziaBelkaBocznaInterface {

  narzedzieWidoczne: boolean;
  kolejnoscKlasa: string;

  /**
   * Funkcja inicjalizuje narzedzie
   */
  inicjalizacjaNarzedzia(): void;

  /**
   * Funkcja zamyka narzedziecd we
   */
  zamknij(): void;

  /**
   * Funkcja przenosi narzędzie na wierzch
   */
  przeniesNarzedzieNaWierzch(): void;
}

/**
 * Bazowa implementacja narzędzia
 */
export abstract class NarzedziaBelkaBocznaImpl implements NarzedziaBelkaBocznaInterface {
  kolejnoscKlasa = 'poz-1';
  narzedzieWidoczne = true;
  narzedzieIdentyfikator = '';
  narzedzie?: NarzedzieSterujace;

  /**
   * Funkcja zwraca serwis narzędzi
   */
  abstract pobierzNarzedziaSerwis(): Store;

  /**
   * Funkcja inicjalizuje narzedzie
   */
  inicjalizacjaNarzedzia(): void {
    if (this.narzedzie) {
      this.kolejnoscKlasa = POZ_ZNACZNIK_BELKA_BOCZNA[this.narzedzie.kolejnosc];
    }
  }

  /**
   * Funkcja przenosi narzędzie na wierzch
   */
  przeniesNarzedzieNaWierzch(): void {
    this.pobierzNarzedziaSerwis().dispatch(NarzedziaActions.uruchomNarzedzie({identyfikator: this.narzedzieIdentyfikator}));
    this.pobierzNarzedziaSerwis().dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
  }

  /**
   * Funkcja zamyka narzedzie
   */
  zamknij(): void {
    this.pobierzNarzedziaSerwis().dispatch(NarzedziaActions.zamknijNarzedzie({identyfikator: this.narzedzieIdentyfikator}));
  }

}
