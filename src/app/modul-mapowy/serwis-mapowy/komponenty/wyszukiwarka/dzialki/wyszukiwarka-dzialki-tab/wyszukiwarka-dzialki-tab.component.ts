import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, BehaviorSubject, Observable, combineLatest, debounceTime } from 'rxjs';
import { WynikWyszukiwaniaDtoDzialkaDto } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
import { ResponsywnoscUtils } from 'src/app/modul-mapowy/mm-core/responsywnosc/utils/responsywnosc-utils';
import { Warstwa } from 'src/app/modul-mapowy/serwis-mapowy/modele/warstwa';
import { MapaService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/mapa.service';
import { ObiektyMapyService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/obiekty-mapy.service';
import { WarstwaUtils } from 'src/app/modul-mapowy/serwis-mapowy/utils/warstwa-utils';
import { WyszukiwarkaActions } from 'src/app/modul-mapowy/stan/wyszukiwarka/wyszukiwarka.actions';
import { WyszukiwarkaStan } from 'src/app/modul-mapowy/stan/wyszukiwarka/wyszukiwarka.reducer';

@Component({
  selector: 'mm-wyszukiwarka-dzialki-tab',
  templateUrl: './wyszukiwarka-dzialki-tab.component.html',
  styleUrls: ['./wyszukiwarka-dzialki-tab.component.scss']
})
export class WyszukiwarkaDzialkiTabComponent implements OnInit, OnDestroy {

  @Input() wynikiWyszukiwania: WynikWyszukiwaniaDtoDzialkaDto | null = null;

  @Output() szukajDzialkiClick = new EventEmitter();
  @Output() wyczyscWyszukiwanieClick = new EventEmitter();

  obreb = '';
  dzialka = '';
  mapaWarstw = new Map<string, Warstwa>();

  subskrybcje = new Subscription();
  zmianaObrebu$ = new BehaviorSubject('');
  zmianaDzialki$ = new BehaviorSubject('');

  brakWynikowMobile$ = new BehaviorSubject(false);

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
  ngOnInit() {
    this.inicjalizujSubskrybcje();
    this.pobierzDaneInicjalne();
  }

  /**
   * Cykl życia obiektu
   */
  ngOnDestroy() {
    this.subskrybcje.unsubscribe();
  }

  /**
   * Funkcja inicjalizująca subskrybcję kliknięcia na mapie
   */
  inicjalizujSubskrybcje() {
    this.subskrybcje.add(
      this.mapaSerwis.pobierzSubjectAktualizacjiWarstwy().subscribe(mapa => {
        this.mapaWarstw = WarstwaUtils.splaszczWarstwyPoUuid(mapa?.warstwy);
      })
    );
    this.subskrybcje.add(
      combineLatest([this.zmianaObrebu$, this.zmianaDzialki$])
        .pipe(debounceTime(300))
        .subscribe(() => {
          this.aktualizujStanWyszukiwarki();
          if (!this.obreb || this.obreb.length < 2) {
            this.wyczyscWyniki();
            return;
          }
          if (ResponsywnoscUtils.czyTrybDesktop()) {
            this.szukajDzialek();
          }
        })
    );
  }

  /**
   * Funkcja pobierająca inicjalne dane
   */
  pobierzDaneInicjalne() {
    this.subskrybcje.add(
      this.stanWyszukiwarki$.subscribe(stan => {
        const dane = stan?.daneWyszukiwarkiDzialek;
        if (!dane) {
          return;
        }
        this.dzialka = dane.dzialka ?? '';
        this.obreb = dane.obreb ?? '';
        if (ResponsywnoscUtils.czyTrybDesktop()) {
          this.szukajDzialek();
        }
      })
    );
  }

  /**
   * Funkcja emitująca zdarzenie wyszukania działek
   *
   */
  szukajDzialek() {
    this.szukajDzialkiClick.emit({obreb: this.obreb, dzialka: this.dzialka});
  }

  /**
   * Funkcja czyscząca wyniki wyszukiwania
   *
   */
  wyczyscWyszukiwanie() {
    this.obreb = '';
    this.dzialka = '';
    this.wyczyscWyszukiwanieClick.emit();
    this.aktualizujStanWyszukiwarki();
    this.mapaSerwis.rozglosCzyszczenieWyszukiwania();
  }

  /**
   * Funkcja czyscząca wyniki wyszukiwania
   *
   */
  wyczyscWyniki() {
    this.wyczyscWyszukiwanieClick.emit();
    this.brakWynikowMobile$.next(false);
  }

  /**
   * Propagacja wydarzenia zmiany obrębu
   * @param obreb - numer obrębu
   */
  zmianaObrebu(obreb: string) {
    this.obreb = obreb;
    this.zmianaObrebu$.next(obreb);
  }

  /**
   * Propagacja wydarzenia zmiany działki
   * @param dzialka - numer dzialki
   */
  zmianaDzialki(dzialka: string) {
    this.dzialka = dzialka;
    this.zmianaDzialki$.next(dzialka);
  }

  /**
   * Funkcja aktualizująca stan wyszukiwarki
   */
  aktualizujStanWyszukiwarki() {
    this.store.dispatch(WyszukiwarkaActions.aktualizujDaneWyszukiwarkiDzialek({
      daneWyszukiwarki: {
        obreb: this.obreb,
        dzialka: this.dzialka
      }
    }));
  }

  /**
   * Funkcja otwierająca okno wyszukiwarki zaawansowanej
   */
  wyswietlWszystkie() {
    // this.store.dispatch(WyszukiwarkaZaawansowanaActions.otworzWyszukiwarkeZaawansowana(
    //   {aktywna: WYSZUKWIARKI_ZAAWANSOWANE.DZIALKI, czyMobilna: false}));
  }


  /**
   * Funkcja otwierająca okno wyszukiwarki zaawansowanej - wersja mobile
   */
  wyswietlWszystkieMobile() {
    this.wyczyscWyniki();
    // this.store.dispatch(WyszukiwarkaZaawansowanaActions.otworzWyszukiwarkeZaawansowana(
    //   {aktywna: WYSZUKWIARKI_ZAAWANSOWANE.DZIALKI, czyMobilna: true}));
  }

  /**
   * Ustawia flagę brak wyników
   */
  ustawBrakWynikow(czyBrakWynikow: boolean) {
    this.brakWynikowMobile$.next(czyBrakWynikow);
  }
}
