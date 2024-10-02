import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Mapa } from '../../../modele/mapa';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { Widok } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';
// import { NarzedziaBelkaBocznaImpl } from '../../../interfejsy/narzedzia-belka-boczna-interface';

@Component({
  selector: 'mm-os-przegladanie',
  templateUrl: './os-przegladanie.component.html',
  styleUrls: ['./os-przegladanie.component.scss']
})
export class OsPrzegladanieComponent implements OnInit, OnDestroy {

  widokIdentyfikator = WIDOKI_ID.PRZEGLADANIE;
  @Input() widok!: Widok;

  @Input()
  mapa?: Mapa;

  @Input() obszarWidoczny?:boolean | undefined;

  aktualnyJezyk = 'pl';

  subscription$ = new Subscription();
  /**
   * Konstruktor
   */
  constructor(private tlumaczenia: TlumaczeniaService,
    private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private store: Store<{ modulMapowy: any }>) {
  }



  /**
  * Cykl życia komponentu inicjalizacja
  */
  ngOnInit(): void {
    this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
      this.aktualnyJezyk = jezyk;
    }));
    // this.subscription$.add(this.obszary$.subscribe(stan => {
    //   this.obszarySterujace = stan.obszarySterujace.filter(n => n.wirtualne === false);
    //   // this.przygotujListeNarzedziWarstw(stan.narzedziaSterujace)
    // }));
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
    this.store.dispatch(LewyPanelWidokActions.pokazObszar({widokId: this.widokIdentyfikator}));
    // this.pobierzObszarySerwis().dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
  }

}
