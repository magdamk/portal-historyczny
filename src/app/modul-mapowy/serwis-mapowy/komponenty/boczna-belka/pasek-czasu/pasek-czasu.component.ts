import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { KolekcjeUtils } from 'src/app/core/utils/kolekcje-utils';
import { InterfejsUzytkownikaActions } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.actions';
import { InterfejsUzytkownikaStan } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.reducer';
import { GrupaWarstwPaskaCzasu } from '../../../modele/grupa-warstw-paska-czasu';
import { WIDOKI_MAPY_ID } from 'src/app/modul-mapowy/stan/mapa-widok/mapa-widok.const';
import { MapaWidokActions } from 'src/app/modul-mapowy/stan/mapa-widok/mapa-widok.actions';
import { WidokiMapyState } from 'src/app/modul-mapowy/stan/mapa-widok/mapa-widok.reducer';
import { LegendaUtils } from '../../../utils/legenda-utils';
import { WIDOK_PASKI_CZASU, WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';
import { Options } from 'ngx-slider-v2';
// import {Options} from "@angular-slider/ngx-slider";
export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'mm-pasek-czasu',
  templateUrl: './pasek-czasu.component.html',
  styleUrls: ['./pasek-czasu.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasekCzasuComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild("ngxSlider") ngxSlider: any;
  WIDOKI_MAPY_ID = WIDOKI_MAPY_ID;
  @Input() widokMapyId?: string;
  interfejsUzytkownika$: Observable<InterfejsUzytkownikaStan>;
  mapaWidok$: Observable<WidokiMapyState>;
  subscrybcje$ = new Subscription();
  wybranaGrupaPaskaCzasu?: GrupaWarstwPaskaCzasu;

  aktualnaWartosc: number = 0;
  options!: Options;

  aktualnyJezyk = 'pl';
  @Output() skonfigurowanoPasek = new EventEmitter<boolean>();
  counter: number = 0;
  /**
   * Konstruktor
   * @param store
   * @param tlumaczenia
   * @param dialog
   */
  constructor(private store: Store<{ modulMapowy: any }>,
    private tlumaczenia: TlumaczeniaService,
    public dialog: MatDialog) {
    this.interfejsUzytkownika$ = store.select('modulMapowy', 'interfejsUzytkownika');
    this.mapaWidok$ = store.select('modulMapowy', 'widokMapy')
  }


  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.store.dispatch(InterfejsUzytkownikaActions.zwinLewaBelke());
    this.store.dispatch(InterfejsUzytkownikaActions.zwinWyszukiwarke());
    this.obslugaZmianInterfejsuUzytownika();
    this.obslugaZmianJezyka();
    // this.mapaWidok$.subscribe(stan => { this.wybranaGrupaPaskaCzasu = KolekcjeUtils.klonowanieObiektu(stan.daneInicjujacePasekCzasu); this.akywujPasekCzasu(this.wybranaGrupaPaskaCzasu!) });
    this.mapaWidok$.subscribe(stan => { this.wybranaGrupaPaskaCzasu = KolekcjeUtils.klonowanieObiektu(stan.dane); this.akywujPasekCzasu(this.wybranaGrupaPaskaCzasu!);});

    // setTimeout(() => this.zmianaPaskaCzasu(), 250);
    // this.store.dispatch(MapaWidokActions.aktualizujDane)
    // this.pokazWyborPaskaCzasu();
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subscrybcje$.unsubscribe();
    this.store.dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
    this.store.dispatch(LewyPanelWidokActions.pokazObszar({ widokId: WIDOKI_ID.INFO }))
  }

  /**
   * Funkcja nasłuchuje zdarenia klawiatury
   * @param event
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == KEY_CODE.LEFT_ARROW) {
      this.poprzedni();
    }
    if (event.keyCode == KEY_CODE.RIGHT_ARROW) {
      this.nastepny();
    }
  }

  /**
   * Funkja wyswietla okno wyboru paska czasu
   * @param dane
   * @param adres
   * @param typ
   */
  private pokazWyborPaskaCzasu() {
    // const dialogRef = this.dialog.open(PasekCzasuDialogComponent, {
    //   width: '1170px',
    //   panelClass: 'modul-mapowy-dialog'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) {
    //     this.store.dispatch(NarzedziaActions.zamknijNarzedzie({identyfikator: NARZEDZIA_STERUJACE_ID.PASEK_CZASU}));
    //   }
    //   this.akywujPasekCzasu(result);
    // });
  }

  /**
   * Funkcja obsluguje zmiany interfejsu uzytkownika
   */
  private obslugaZmianInterfejsuUzytownika() {
    this.subscrybcje$.add(this.interfejsUzytkownika$.subscribe(stan => {
      if (stan.belkaBocznaLewa.zwinieta === false) {
        this.store.dispatch(MapaWidokActions.reset());
      }
      if (stan.wyszukiwarka.zwinieta === false) {
        this.store.dispatch(MapaWidokActions.reset());
      }
    }));
  }

  /**
   * Funkcja obsluguje zmiany jezyka
   */
  private obslugaZmianJezyka() {
    this.subscrybcje$.add(this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
      this.aktualnyJezyk = jezyk;
      this.konfigurujPasekCzasu();
    }))
  }

  /**
   * Funkcja aktywuje pasek czasu
   * @param grupaPaskaCzasu
   */
  akywujPasekCzasu(grupaPaskaCzasu: GrupaWarstwPaskaCzasu) {
    this.wybranaGrupaPaskaCzasu = grupaPaskaCzasu;
    // this.skonfigurowanoPasek.emit(false);
    this.konfigurujPasekCzasu();

    this.inicjujWarstwy();

    // this.przeładujPasek();
    // this.store.dispatch(MapaWidokActions.)
    // console.log('akywujPasekCzasu: ', this.aktualnaWartosc);

    // this.store.dispatch(MapaWidokActions.aktualizujDane({
    //   widokMapyId: WIDOKI_MAPY_ID.WIDOK_PASKA_CZASU,
    //   dane: this.wybranaGrupaPaskaCzasu
    // }))
  }

  /**
   * Funkcja reaguje na zmiane paska czasu
   */
  zmianaPaskaCzasu() {
    this.wybranaGrupaPaskaCzasu?.warstwy.forEach((w, k) => {
      w.warstwa.parametrySterujace!.widoczna = this.aktualnaWartosc >= k ? true : false;
    });
    this.store.dispatch(MapaWidokActions.aktualizujDane({
      widokMapyId: WIDOKI_MAPY_ID.WIDOK_PASKA_CZASU,
      dane: KolekcjeUtils.klonowanieObiektu(this.wybranaGrupaPaskaCzasu)
    }));
  }

  /**
   * Funkcja zamyka okno paska czasu
   */
  zamknijOkno() {
    this.store.dispatch(MapaWidokActions.reset());
  }

  /**
   * Funkcja przesuwa pasek do poprzedniej pozycji
   */
  poprzedni() {
    if (this.aktualnaWartosc > 0) {
      this.aktualnaWartosc--;
    }
  }

  /**
   * Funkcja przesuwa pasek do nastepnej pozycji
   */
  nastepny() {
    if (!this.wybranaGrupaPaskaCzasu) {
      return;
    }
    if (this.aktualnaWartosc < this.wybranaGrupaPaskaCzasu?.warstwy.length - 1) {
      this.aktualnaWartosc++;
    }
  }

  /**
   * Funkcja generuje konfiguracje paska czasu
   */
  konfigurujPasekCzasu() {
    if (!this.wybranaGrupaPaskaCzasu) {
      return;
    }
    this.options = {
      showTicksValues: true,
      stepsArray: []
    };

    this.options.stepsArray = this.wybranaGrupaPaskaCzasu.warstwy.map((w, k) => {
      return { value: k, legend: w.nazwa[this.aktualnyJezyk] }
    });
  }

  /**
   * funkcja inicjuje wasrtwy
   */
  inicjujWarstwy() {
    if (!this.wybranaGrupaPaskaCzasu) {
      return;
    }
    this.wybranaGrupaPaskaCzasu.warstwy.forEach((w, k) => {
      // console.log('inicjuj warstwy: ', w, k);
      LegendaUtils.dodajParametrySterujace(w.warstwa);
      if (k === 0) {
        w.warstwa.parametrySterujace!.widoczna = true;
      } else {
        w.warstwa.parametrySterujace!.widoczna = false;
      }
    });
    // this.store.dispatch(MapaWidokActions.aktualizujDane({
    //   widokMapyId: WIDOKI_MAPY_ID.WIDOK_PASKA_CZASU,
    //   dane: this.wybranaGrupaPaskaCzasu
    // }));
    // this.skonfigurowanoPasek.emit(false);
    this.skonfigurowanoPasek.emit(true);
  }

  /**
   * Funkcja usuwajaca atrybut dla ngx slidera
   */
  ngAfterViewChecked(): void {
    if (!this.ngxSlider) {
      return;
    }

    for (let c of this.ngxSlider.elementRef.nativeElement.children) {
      if (c.classList.contains('ngx-slider-pointer') && c.hasAttribute('aria-label')) {
        c.removeAttribute('aria-label');
        c.removeAttribute('aria-labelledby');
      }
    }
  }
  przeładujPasek() {
    if (this.counter === 0) {
      console.log('counter: '+this.counter);
      this.counter++;
      this.store.dispatch(MapaWidokActions.aktualizujDane({
      widokMapyId: WIDOKI_MAPY_ID.WIDOK_PASKA_CZASU,
      dane: this.wybranaGrupaPaskaCzasu
    }))

      // this.zmianaPaskaCzasu();
    }


  }
}
