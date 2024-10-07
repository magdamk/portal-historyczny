import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';
import { WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { Widok } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { Mapa } from '../../../modele/mapa';
import { TagiService } from '../../../serwisy/tagi.service';
import { TagiDto } from '../../../modele/tagi';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mm-os-tagi',
  templateUrl: './os-tagi.component.html',
  styleUrls: ['./os-tagi.component.scss']
})
export class OsTagiComponent implements OnInit, OnDestroy {

  widokIdentyfikator = WIDOKI_ID.TAGI;
  @Input() widok!: Widok;

  @Input()
  mapa?: Mapa;

  @Input() obszarWidoczny?: boolean | undefined;

  aktualnyJezyk = 'pl';
  tagi: TagiDto[] = [];
  selectedTag?: TagiDto;
  subscription$ = new Subscription();
  /**
   * Konstruktor
   */
  constructor(private tlumaczenia: TlumaczeniaService,
    private serviceTagi: TagiService,
    private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private store: Store<{ modulMapowy: any }>) {
  }


  /**
  * Cykl życia komponentu inicjalizacja
  */
  ngOnInit(): void {
    this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
      this.aktualnyJezyk = jezyk;
      this.pobierzTagi();
    }));
    // this.subscription$.add(this.obszary$.subscribe(stan => {
    //   this.obszarySterujace = stan.obszarySterujace.filter(n => n.wirtualne === false);
    //   // this.przygotujListeNarzedziWarstw(stan.narzedziaSterujace)
    // }));
  }
  pobierzTagi() {
    // this.serviceKategoriiMap.getKategorieMap()
    // .subscribe((result: any) => {
    //   console.log('pobierzListeKategoriiMap: ', result.content.kategorieTematyczne[1].grupyMap);
    //   // if (result.content.typ.ObiektEnum==='KATEGORIA_TEMATYCZNA') {
    //   this.zbiorMapPlanow = Array.from(result.content.kategorieTematyczne[1].grupyMap);
    //   console.log('!!!!pobierzListeKategoriiMap: ', this.zbiorMapPlanow);
    //   // }
    // });
    this.serviceTagi.getTagi().subscribe((result: any) => { this.tagi = Array.from(result) });
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

  changeChip(val: TagiDto) {
    this.selectedTag = val;
  }

}
