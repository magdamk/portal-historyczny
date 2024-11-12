import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription, Observable, filter, debounceTime } from 'rxjs';
import { WynikWyszukiwaniaDtoObiektDto } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
import { ResponsywnoscUtils } from 'src/app/modul-mapowy/mm-core/responsywnosc/utils/responsywnosc-utils';
import { Warstwa } from 'src/app/modul-mapowy/serwis-mapowy/modele/warstwa';
import { MapaService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/mapa.service';
import { ObiektyMapyService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/obiekty-mapy.service';
import { WarstwaUtils } from 'src/app/modul-mapowy/serwis-mapowy/utils/warstwa-utils';
import { WyszukiwarkaActions } from 'src/app/modul-mapowy/stan/wyszukiwarka/wyszukiwarka.actions';
import { WyszukiwarkaStan } from 'src/app/modul-mapowy/stan/wyszukiwarka/wyszukiwarka.reducer';

@Component({
  selector: 'mm-wyszukiwarka-obiekty-tab',
  templateUrl: './wyszukiwarka-obiekty-tab.component.html',
  styleUrls: ['./wyszukiwarka-obiekty-tab.component.scss']
})
export class WyszukiwarkaObiektyTabComponent implements OnInit, OnDestroy {

  @Input() wynikiWyszukiwania: WynikWyszukiwaniaDtoObiektDto | null = null;

  @Output() wyszukajObiektyClick = new EventEmitter();
  @Output() wyczyscWyszukiwanieClick = new EventEmitter();

  fraza = '';
  frazaChange$ = new BehaviorSubject('');
  subskrybcje$ = new Subscription();
  mapaWarstw = new Map<string, Warstwa>();

  stanWyszukiwarki$: Observable<WyszukiwarkaStan>;

  /**
   * Konstruktor
   */
  constructor(private mapaSerwis: MapaService, private obiektyMapySerwis: ObiektyMapyService,
              private store: Store<{ modulMapowy: any }>) {
    this.stanWyszukiwarki$ = store.select('modulMapowy', 'wyszukiwarka');
  }

  /**
   * Cykl życia obiektu
   */
  ngOnInit(): void {
    this.inicjalizujSubskrybcje();
    this.pobierzDaneInicjalne();
  }

  /**
   * Cykl życia obiektu
   */
  ngOnDestroy() {
    this.subskrybcje$.unsubscribe();
  }

  /**
   * Inicjalizacja nasłuchowania zmiany frazy
   */
  inicjalizujSubskrybcje() {
    this.subskrybcje$.add(
      this.frazaChange$.pipe(filter(() => ResponsywnoscUtils.czyTrybDesktop()))
        .pipe(debounceTime(300))
        .subscribe(fraza => {
          if (!fraza || fraza.length < 2) {
            return;
          }
          this.szukajObiektow(fraza);
        })
    );
    this.subskrybcje$.add(
      this.mapaSerwis.pobierzSubjectAktualizacjiWarstwy().subscribe(mapa => {
        this.mapaWarstw = WarstwaUtils.splaszczWarstwyPoUuid(mapa?.warstwy);
      })
    );
  }

  /**
   * Funkcja pobierająca inicjalne dane
   */
  pobierzDaneInicjalne() {
    this.subskrybcje$.add(
      this.stanWyszukiwarki$
        .subscribe(stan => {
          const dane = stan?.daneWyszukiwarkiObiektow;
          if (!dane) {
            return;
          }
          this.fraza = dane.fraza ?? '';
          if (ResponsywnoscUtils.czyTrybDesktop()) {
            this.szukajObiektow(this.fraza);
          }
        })
    );
  }

  /**
   * Funkcja emitująca zdarzenie wyszukiwania
   * @param fraza - wyszukiwana fraza
   */
  szukajObiektow(fraza: string) {
    this.wyszukajObiektyClick.emit(fraza);
  }

  /**
   * Funkcja obsługująca zdarzenie zmiany frazy
   * @param nowaFraza - wpisana fraza
   */
  zmianaFrazy(nowaFraza: string) {
    this.fraza = nowaFraza;
    this.frazaChange$.next(nowaFraza);
    this.store.dispatch(WyszukiwarkaActions.aktualizujDaneWyszukiwarkiObiektow({daneWyszukiwarki: {fraza: nowaFraza}}));
  }

  /**
   * Funkcja czyscząca wyniki wyszukiwania
   *
   */
  wyczyscWyniki() {
    this.wyczyscWyszukiwanieClick.emit();
    this.mapaSerwis.rozglosCzyszczenieWyszukiwania();
  }

  /**
   * Funkcja otwierająca okno wyszukiwarki zaawansowanej
   */
  wyswietlWszystkie() {
    // this.store.dispatch(WyszukiwarkaZaawansowanaActions.otworzWyszukiwarkeZaawansowana(
    //   {aktywna: WYSZUKWIARKI_ZAAWANSOWANE.DOMYSLNA, czyMobilna: false}));
  }

  /**
   * Funkcja otwierająca okno wyszukiwarki zaawansowanej mobilnej
   */
  wyswietlWszystkieMobile() {
    this.wyczyscWyniki();
    // this.store.dispatch(WyszukiwarkaZaawansowanaActions.otworzWyszukiwarkeZaawansowana(
    //   {aktywna: WYSZUKWIARKI_ZAAWANSOWANE.DOMYSLNA, czyMobilna: true}));
  }

  /**
   * Funkcja resetuje wyszukiwarke
   */
  resetujWyszukiwarke() {
    this.zmianaFrazy('');
    this.wyczyscWyniki();
  }

  /**
   * Obsluga zmiany pokaz wiecej w wyszukiwarce obiektow
   * @param wartosc
   */
  zmianaWyszukiwarkiObiektowPokazWiecej(wartosc: boolean) {
    if (wartosc) {
      this.store.dispatch(WyszukiwarkaActions.wyszukiwarkaObiektowPokazWiecej());
      return
    }
    this.store.dispatch(WyszukiwarkaActions.wyszukiwarkaOniektowPokazMniej());
  }
}
