import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { WyborMapyEvent } from 'src/app/funkcjonalnosci/strona-startowa/strony/komponenty/karta-mapy/karta-mapy.component';
import { WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { Widok } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { Mapa } from '../../../modele/mapa';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ControllerKategorieMapService } from 'src/app/core/api/controller-kategorie-map.service';
import { KategoriaGrupaMapOpenDto } from 'src/app/core/modele/kategoria-grupa-map-open-dto';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';

@Component({
  selector: 'mm-os-mapy-plany',
  templateUrl: './os-mapy-plany.component.html',
  styleUrls: ['./os-mapy-plany.component.scss']
})
export class OsMapyPlanyComponent implements OnInit, OnDestroy {
  widokIdentyfikator = WIDOKI_ID.MAPY_PLANY;
  @Input() widok?: Widok;
  @Input() mapa?: Mapa;
  @Input() obszarWidoczny?: boolean | undefined;
  @Output() mapaWybrana = new EventEmitter<WyborMapyEvent>();

  // zbiorMapPlanow: Array<KategoriaGrupaMapOpenDto>=[];
  aktualnyJezyk = 'pl';
  subscription$ = new Subscription();
  /**
   * Konstruktor
   */
  constructor(private tlumaczenia: TlumaczeniaService,
    // private serviceKategoriiMap: ControllerKategorieMapService,
    // private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private store: Store<{ modulMapowy: any }>) {
  }

  ngOnInit() {
    this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
      this.aktualnyJezyk = jezyk;
    }));
  }


  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  /**
    * Funkcja przenosi narzędzie na wierzch
    */
  przeniesNaWierzch(): void {
    this.store.dispatch(LewyPanelWidokActions.pokazObszar({ widokId: this.widokIdentyfikator }));
    // this.pobierzObszarySerwis().dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
  }

}
