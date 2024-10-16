
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Mapa } from '../../../modele/mapa';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Widok } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { RODZAJ_MAPY } from '../../../modele/rodzaj-mapy';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { Map } from 'src/app/modul-mapowy/oracle-maps/types/map';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';

export const POZ_ZNACZNIK_BELKA_BOCZNA = ['poz-1', 'poz-2', 'poz-3', 'poz-4', 'poz-5', 'poz-6', 'poz-7', 'poz-8', 'poz-9', 'poz-10'];

/**
 * Komponent belki bocznej
 */
@Component({
  selector: 'mm-boczna-belka-kontener',
  templateUrl: './boczna-belka-kontener.component.html',
  styleUrls: ['./boczna-belka-kontener.component.scss'],
})
export class BocznaBelkaKontenerComponent implements OnInit, OnChanges, OnDestroy {

  WIDOKI_ID = WIDOKI_ID;
  RODZAJ_MAPY = RODZAJ_MAPY;

  @Input() mapy?: Mapa[];
  @Input() mapa?: Mapa;
  @Input() mapView?: Map;

  subscriptions$ = new Subscription();

  // widokNaWierzchu$: Observable<Widok>;
  widok$: Observable<{ top: string, widok: Widok, widoki: Widok[] }>;
  listaWidokow: Widok[] = [];
  topId: string = '';
  topWidok: Widok | undefined;

  /**
   * Konstruktor
   */
  constructor(private tlumaczenia: TlumaczeniaService, private store: Store<{ modulMapowy: any }>) {
    this.widok$ = store.select('modulMapowy', 'widoki');
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.subscriptions$.add(this.widok$.subscribe((stan) => {
      this.topId = stan.top;
      this.listaWidokow = stan.widoki,
        this.topWidok = stan.widok;
      // console.log(stan);
    }));
    if (sessionStorage.getItem('tagi')){
      this.store.dispatch(LewyPanelWidokActions.pokazNastepnyObszar());
      sessionStorage.removeItem('tagi');
    }
    // console.log('belka-boczna-kontener oninit', this.topId);
    // console.log('belka-boczna-kontener oninit', this.listaWidokow);
    // console.log('belka-boczna-kontener oninit', this.topWidok);
  }
  /**
   * Cykl życia komponentu zmiana danych
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('belka-boczna-kontener on changes', this.listaWidokow);
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }


  trackByFn(index: number, item: Widok) {
    return item.id;
  }


}
