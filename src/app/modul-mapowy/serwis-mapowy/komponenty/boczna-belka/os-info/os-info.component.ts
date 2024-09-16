import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/mm-tlumaczenia.service';
import { WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { Widok } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { Mapa } from '../../../modele/mapa';
import { Subscription } from 'rxjs';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';

@Component({
  selector: 'mm-os-info',
  templateUrl: './os-info.component.html',
  styleUrls: ['./os-info.component.scss']
})
export class OsInfoComponent implements OnInit {
  widokIdentyfikator = WIDOKI_ID.INFO;

  @Input() widok?: Widok;

  @Input()
  mapa?: Mapa;

  @Input() obszarWidoczny?:boolean | undefined;

  aktualnyJezyk = 'pl';

  subscription$ = new Subscription();
  constructor(private tlumaczenia: TlumaczeniaService,
    private store: Store<{ modulMapowy: any }>) {
  }

  ngOnInit(){
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
    this.store.dispatch(LewyPanelWidokActions.pokazObszar({widokId: this.widokIdentyfikator}));
    // this.pobierzObszarySerwis().dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
  }

}
