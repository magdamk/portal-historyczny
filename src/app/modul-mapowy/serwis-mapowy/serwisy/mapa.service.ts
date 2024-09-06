import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Mapa} from '../modele/mapa';
import {Point} from '../../oracle-maps/types/point';
import {ScaleBar} from '../../oracle-maps/types/scale-bar';
import {Warstwa} from '../modele/warstwa';
import {OM} from '../../oracle-maps/types/om';
import {Map} from '../../oracle-maps/types/map'
import {Punkt} from '../modele/punkt';

declare var OM: OM;

export const TYPY_ZDARZEN_MYSZY = {
  LEWY_KLIK: 'LEWY_KLIK',
  LEWY_DWUKLIK: 'LEWY_DWUKLIK',
  PRAWY_KLIK: 'PRAWY_KLIK',
  PRAWY_DWUKLIK: 'PRAWY_DWUKLIK',
  ZAWISNIECIE_MYSZY: 'ZAWISNIECIE_MYSZY',
  TAPNIECIE: 'TAPNIECIE',
  PODWOJNE_TAPNIECIE: 'PODWOJNE_TAPNIECIE',
  PRZYTRZYMANIE: 'PRZYTRZYMANIE',
  RUCH_MYSZY: 'RUCH_MYSZY',
  WEJSCIE_NA_MAPE: 'WEJSCIE_NA_MAPE',
  WYJSCIE_Z_MAPY: 'WYJSCIE_Z_MAPY',
}

export interface KlikniecieNaMapieEvent {
  eventZrodlowy: any;
  pozycjaGeograficzna: Point;
  pozycjaNaEkranie: Punkt;
  typEventu: 'LEWY_KLIK' | 'LEWY_DWUKLIK' |
    'PRAWY_KLIK' | 'PRAWY_DWUKLIK' |
    'ZAWISNIECIE_MYSZY' | 'TAPNIECIE' |
    'PRZYTRZYMANIE' | 'RUCH_MYSZY' | string;
}

export interface UsuwanieWarstwyEvent {
  uuidMapy?: string;
  warstwa?: Warstwa;
}

export interface AktualizacjaZoomISrodkaEvent {
  identyfikatorMapy?: string;
  zoom?: number;
  srodek?: Point;
  skala?: number;
  pasekSkali?: ScaleBar;
}

export interface AktualizujWidocznoscWarstwEvent {
  identyfikatorMapy: string;
}

export interface AktualizujPozycjeKursoraEvent {
  punktNaMapie?: Point;
}

/**
 * Serwis mapowy
 */
@Injectable({
  providedIn: 'root'
})
export class MapaService {

  licznikZoomISrodek = 0;
  licznikInicjalizacja = 0;

  mapView?: Map;
  mapaGlowna?: Mapa;

  private aktualizacjaWarstwy$ = new BehaviorSubject<Mapa | undefined>(undefined);
  private aktualizacjaZoomISrodekMapy$ = new BehaviorSubject<AktualizacjaZoomISrodkaEvent | undefined>(undefined);
  private aktualizujPozycjeKursora$ = new BehaviorSubject<AktualizujPozycjeKursoraEvent | undefined>(undefined);
  private usuwanieWarstwy$ = new BehaviorSubject<UsuwanieWarstwyEvent | undefined>(undefined);
  private mapaZaladowana$ = new BehaviorSubject<boolean | undefined>(undefined);
  private aktualizacjaWartwyPodkladowej$ = new Subject<Mapa | undefined>();
  private zdarzeniaMyzyNaMapie$ = new Subject<KlikniecieNaMapieEvent>();
  private wyborMapyDoPorownania$ = new Subject<any>();
  private wybranoMapeDoPorownania$ = new Subject<Mapa | undefined>();
  private zapisanoMapePrywatna$ = new Subject<Mapa | undefined>();
  private rerenderujMapeGlowna$ = new Subject();

  private hashMapy$ = new BehaviorSubject<string | undefined>(undefined);

  private wyczyscWyszukiwanie$ = new BehaviorSubject<any>(undefined);

  /**
   * Konstruktor
   */
  constructor() {
  }

  /**
   * Funkcja rozgłaszające czyszczenie wyników wyszukiwania
   */
  rozglosCzyszczenieWyszukiwania() {
    this.wyczyscWyszukiwanie$.next('');
  }

  /**
   * Funkcja zwracająca observabla czyszczenia wyników wyszukiwania
   */
  pobierzSubjectCzyszczeniaWyszukiwania(): Observable<any>{
    return this.wyczyscWyszukiwanie$;
  }

  /**
   * Funkcja resetuje stan zdarzen
   */
  resetujStan() {
    this.licznikZoomISrodek = 0;
    this.licznikInicjalizacja = 0;
    this.mapaZaladowana$.next(false);
    this.aktualizacjaWarstwy$.next(undefined);
    this.aktualizacjaZoomISrodekMapy$.next(undefined);
    this.aktualizujPozycjeKursora$.next(undefined);
    this.usuwanieWarstwy$.next(undefined);
    this.aktualizacjaWartwyPodkladowej$.next(undefined);
    this.mapView = undefined;
  }

  /**
   * Funkcja ustawia główn mapę
   * @param mapa
   */
  ustawMapeGlowna(mapa: Mapa) {
    this.mapaGlowna = mapa;
  }

  /**
   * Funkcja pozwala rerenderować główne okno mapy
   */
  rerenderujMapeGlowna() {
    this.rerenderujMapeGlowna$.next('');
  }

  /**
   * Funkcja zwraca subject rerenderowania mapy
   */
  pobierzSubjectRerenderowaniaMapyGlownej(): Subject<any> {
    return this.rerenderujMapeGlowna$;
  }

  /**
   * Funkcja informuje o usunięciu warstwy
   * @param warstwa
   */
  usunWarstwe(warstwa: UsuwanieWarstwyEvent): void {
    this.usuwanieWarstwy$.next(warstwa);
  }

  /**
   * Funkcja pozwala pobrać subject usunięcia warstwy
   */
  pobierzSubjectUsuwaniaWarstwy(): BehaviorSubject<UsuwanieWarstwyEvent | undefined> {
    return this.usuwanieWarstwy$;
  }

  /**
   * Funkcja informuje o zmianie danych mapy
   * @param mapa - mapa
   */
  aktualizujWarstwe(mapa: Mapa | undefined): void {
    this.aktualizacjaWarstwy$.next(mapa);
  }

  /**
   * Funkcja pozwala pobrać subjekt zmian mapy
   */
  pobierzSubjectAktualizacjiWarstwy(): BehaviorSubject<Mapa | undefined> {
    return this.aktualizacjaWarstwy$;
  }

  /**
   * Funkcja imformuje o zmianie zoom i środka mapy
   * @param event - event
   */
  aktualizujZoomISrodek(event: AktualizacjaZoomISrodkaEvent): void {
    this.licznikZoomISrodek++;
    this.aktualizacjaZoomISrodekMapy$.next(event);
    this.rozglosInicjalizacje();
  }

  /**
   * Funkcja pozwala pobrać subjekt zmian mapy
   */
  pobierzSubjectAktualizacjiZoomISrodek(): BehaviorSubject<AktualizacjaZoomISrodkaEvent | undefined> {
    return this.aktualizacjaZoomISrodekMapy$;
  }

  /**
   * Funkcja imformuje o zmianie pozycji kursora myszy
   * @param event - event
   */
  // TODO do zastpienia przez aktualiujZdarzeniaMyzyNaMapie
  aktualizjujPozycjeKursora(event: AktualizujPozycjeKursoraEvent): void {
    this.aktualizujPozycjeKursora$.next(event);
  }

  /**
   * Funkcja pozwala pobrać subjekt zmiany pozycji kursora myszy
   */
  pobierzSubjectAktualizacjiKursora(): BehaviorSubject<AktualizujPozycjeKursoraEvent | undefined> {
    return this.aktualizujPozycjeKursora$;
  }

  aktualiujZdarzeniaMyszyNaMapie(event: KlikniecieNaMapieEvent) {
    this.zdarzeniaMyzyNaMapie$.next(event);
  }

  pobierzSubjectZdarzenMyszyNaMapie(): Subject<KlikniecieNaMapieEvent> {
    return this.zdarzeniaMyzyNaMapie$;
  }

  /**
   * Funkcja informuje że mapa została całkowicie załadowana
   */
  mapaZaladowane(mapa: Map): void {
    this.rozglosInicjalizacje();
  }


  /**
   * Funkcja opisuje inicjalizacje mapy
   */
  private rozglosInicjalizacje(): void {
    if (this.licznikZoomISrodek >= 2 && this.licznikInicjalizacja === 0) {
      this.mapaZaladowana$.next(true);
      this.licznikInicjalizacja++;
    }
  }

  /**
   * Funkcja pozwala pobrać subject zaladowaniaMapy
   */
  pobierzSubjectMapaZaladowane(): BehaviorSubject<any> {
    return this.mapaZaladowana$;
  }

  /**
   * Funkcja rozglasza zmiane map podladowych
   * @param mapa
   */
  aktualizacjaWarstwyPodkladowej(mapa: Mapa) {
    this.aktualizacjaWartwyPodkladowej$.next(mapa);
  }

  /**
   * Funkcja pozwala pobrac subject zmiany warstwy podkładowej
   */
  pobierzSubjectAktualizacjiWarstwyPodkladowej(): Subject<Mapa | undefined> {
    return this.aktualizacjaWartwyPodkladowej$;
  }

  /**
   * Funkcja wywołuje okno wyboru mapy
   */
  pokazWyborMapyDoPorownania() {
    this.wyborMapyDoPorownania$.next('');
  }

  /**
   * Funkcja nasłuchuje subject wyboru mapy
   */
  pobierzSubjectWyboruMapyDoPorownania(): Subject<any> {
    return this.wyborMapyDoPorownania$;
  }

  /**
   * Funkcja informuje o wybranej mapie
   * @param mapa
   */
  ustawWybranaMape(mapa?: Mapa) {
    this.wybranoMapeDoPorownania$.next(mapa);
  }

  /**
   * Funkcja nasłuchuje subject wyboru mapy
   */
  pobierzSubjectWybraniaMapy(): Subject<Mapa | undefined> {
    return this.wybranoMapeDoPorownania$;
  }

  /**
   * Funkcja rozgłasza informacje o zapisie mapy
   * @param mapa
   */
  zapisanoMapePrywatna(mapa: Mapa) {
    this.zapisanoMapePrywatna$.next(mapa);
    this.ustawHashMapy(JSON.stringify(mapa));
  }

  /**
   * Funkcja nasłuchuje subject zapisu mapy
   */
  pobierzSubjectZapisaniaMapyPrywatnej(): Subject<Mapa | undefined> {
    return this.zapisanoMapePrywatna$;
  }


  /**
   * Funkcja zapisujaca hash mapy
   * @param mapa
   */
  ustawHashMapy(mapa: string | undefined) {
    const hashMapy = mapa ? btoa(unescape(encodeURIComponent(mapa))) : undefined;
    this.hashMapy$.next(hashMapy);
  }

  /**
   * Funkcja sprawdzająca czy mapa została zmieniona
   * @param hash
   */
  czyMapaZmieniona(mapa?: Mapa) {
    if (!mapa?.uuid  || mapa?.uuid==='') {
      return true;
    }
    return this.hashMapy$.value !== btoa(unescape(encodeURIComponent(JSON.stringify(mapa))));
  }
}
