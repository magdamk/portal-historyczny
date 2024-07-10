import {Injectable} from '@angular/core';
import {WcagUstawieniaModel} from '../modele/wcag-ustawienia-model';
import {BehaviorSubject} from 'rxjs';


export const TYP_CZCIONKI = {
  DOMYSLNA: 'DOMYSLNA',
  PROSTA: 'PROSTA'
}

export const TYP_FILTRA = {
  BRAK: 'BRAK',
  CZARNO_BIALA: 'CZARNO_BIALA',
  NEGATYW: 'NEGATYW'
}

export const ROZMIAR_CZCIONKI = {
  DOMYSLNY: 'DOMYSLNY',
  MALY: 'MALY',
  DUZY: 'DUZT'
}

/**
 * Serwis obsługujący ustawienia wcag
 */
@Injectable({
  providedIn: 'root'
})

export class WcagUstawieniaService {

  wcagUstawienia: WcagUstawieniaModel = this.pobierzDomyslneUstawienia();

  private rozmiarCzcionkiSubject$ = new BehaviorSubject<WcagUstawieniaModel>(this.wcagUstawienia);
  private typCzcionkiSubject$ = new BehaviorSubject<WcagUstawieniaModel>(this.wcagUstawienia);
  private typFiltraSubject$ = new BehaviorSubject<WcagUstawieniaModel>(this.wcagUstawienia);
  private podkreslenieLinkowSubject$ = new BehaviorSubject<WcagUstawieniaModel>(this.wcagUstawienia);
  private zmianaUstawienSubject$ = new BehaviorSubject<WcagUstawieniaModel>(this.wcagUstawienia);


  /**
   * Konstruktor
   */
  constructor() {
  }

  /**
   * Funkcja ustawia domyślne opcje wcag
   */
  ustawDomyslnaKonfiguracja(): void {
    this.wcagUstawienia = this.pobierzDomyslneUstawienia();
    this.rozmiarCzcionkiSubject$.next(this.wcagUstawienia);
    this.typCzcionkiSubject$.next(this.wcagUstawienia);
    this.typFiltraSubject$.next(this.wcagUstawienia);
    this.zmianaUstawienSubject$.next(this.wcagUstawienia);
    this.podkreslenieLinkowSubject$.next(this.wcagUstawienia);
  }

  /**
   * Funkcja pozwala ustawić typ czcionki
   * @param typCzcionki - typ czcionki DOMYSLNA, PROSTA
   */
  ustawTypCzcionki(typCzcionki: string): void {
    this.wcagUstawienia.typCzcionki = typCzcionki;
    this.typCzcionkiSubject$.next(this.wcagUstawienia);
    this.zmianaUstawienSubject$.next(this.wcagUstawienia);
  }

  /**
   * Funkcja pozwala powiększyć czcionkę
   */
  powiekrzCzcionke(): void {
    if (this.wcagUstawienia.rozmiarCzcionki === ROZMIAR_CZCIONKI.MALY) {
      this.wcagUstawienia.rozmiarCzcionki = ROZMIAR_CZCIONKI.DOMYSLNY;
    } else if (this.wcagUstawienia.rozmiarCzcionki === ROZMIAR_CZCIONKI.DOMYSLNY) {
      this.wcagUstawienia.rozmiarCzcionki = ROZMIAR_CZCIONKI.DUZY;
    }
    this.rozmiarCzcionkiSubject$.next(this.wcagUstawienia);
    this.zmianaUstawienSubject$.next(this.wcagUstawienia);
  }

  /**
   * Funkcja pozwala zmniejszyć czcionkę
   */
  zmniejszCzcionke(): void {
    if (this.wcagUstawienia.rozmiarCzcionki === ROZMIAR_CZCIONKI.DUZY) {
      this.wcagUstawienia.rozmiarCzcionki = ROZMIAR_CZCIONKI.DOMYSLNY;
    } else if (this.wcagUstawienia.rozmiarCzcionki === ROZMIAR_CZCIONKI.DOMYSLNY) {
      this.wcagUstawienia.rozmiarCzcionki = ROZMIAR_CZCIONKI.MALY;
    }
    this.rozmiarCzcionkiSubject$.next(this.wcagUstawienia);
    this.zmianaUstawienSubject$.next(this.wcagUstawienia);
  }

  /**
   * Funckajpozwala ustawić typ filtra
   * @param filterType - BRAK, CZARNO_BIALY, NEGATYW
   */
  ustawFiltr(filterType: string): void {
    this.wcagUstawienia.filtr = filterType;
    this.typFiltraSubject$.next(this.wcagUstawienia);
    this.zmianaUstawienSubject$.next(this.wcagUstawienia);
  }

  /**
   * Funkcja pozwala ustawić podkreślanie linków
   * @param podkreslenieLinkow - czy podkreślić
   */
  ustawPodkreslenieLinkow(podkreslenieLinkow: boolean): void {
    this.wcagUstawienia.podkreslenieLinkow = podkreslenieLinkow;
    this.podkreslenieLinkowSubject$.next(this.wcagUstawienia);
    this.zmianaUstawienSubject$.next(this.wcagUstawienia);
  }

  /**
   * Funkcja zwraca domyślne ustawienia
   * @returns - zwraca obiekt ustwień
   */
  pobierzDomyslneUstawienia(): WcagUstawieniaModel {
    return {
      rozmiarCzcionki: ROZMIAR_CZCIONKI.DOMYSLNY,
      typCzcionki: TYP_CZCIONKI.DOMYSLNA,
      filtr: TYP_FILTRA.BRAK,
      podkreslenieLinkow: false
    };
  }

  /**
   * Funkcja zwraca obiekt obserwujący zmianę rozmiaru czcionki
   */
  getRozmiarCzcionkiSubject(): BehaviorSubject<WcagUstawieniaModel> {
    return this.rozmiarCzcionkiSubject$;
  }

  /**
   * Funkcja zwraca obiekt obserwujący zmianę typu czcionki
   */
  getTypCzcionkiSubject(): BehaviorSubject<WcagUstawieniaModel> {
    return this.typCzcionkiSubject$;
  }

  /**
   * Funkcja zwraca obiekt obserwujący zmianę filtrów
   */
  getTypFiltraSubject(): BehaviorSubject<WcagUstawieniaModel> {
    return this.typFiltraSubject$;
  }

  /**
   * Funkcja zwraca obiekt obserwujący zmianę podkreślenia linków
   */
  getPodkreslenieLinkowSubject(): BehaviorSubject<WcagUstawieniaModel> {
    return this.podkreslenieLinkowSubject$;
  }

  /**
   * Funkcja zwraca obiekt obserwujący dowolną zmianę
   */
  getZmianaUstawienSubject(): BehaviorSubject<WcagUstawieniaModel> {
    return this.zmianaUstawienSubject$;
  }
}
