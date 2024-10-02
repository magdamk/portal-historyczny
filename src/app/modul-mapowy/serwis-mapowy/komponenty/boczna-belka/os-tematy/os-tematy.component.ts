import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mapa } from '../../../modele/mapa';
import { Store } from '@ngrx/store';
// import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { Widok } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';
import { ZbiorKategoriiMapOpenDto } from 'src/app/core/modele/zbior-kategorii-map-open-dto';
import { WyborMapyEvent } from 'src/app/funkcjonalnosci/strona-startowa/strony/komponenty/karta-mapy/karta-mapy.component';
import { ControllerKategorieMapService } from 'src/app/core/api/controller-kategorie-map.service';
import { KategoriaMapOpenDto } from 'src/app/core/modele/kategoria-map-open-dto';
import { MapaSzczegolyDto } from 'src/app/core/modele/mapa-szczegoly-dto';
import { KategoriaGrupaMapOpenDto } from 'src/app/core/modele/kategoria-grupa-map-open-dto';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/mm-tlumaczenia.service';

@Component({
  selector: 'mm-os-tematy',
  templateUrl: './os-tematy.component.html',
  styleUrls: ['./os-tematy.component.scss']
})
export class OsTematyComponent implements OnInit, OnDestroy {

  widokIdentyfikator = WIDOKI_ID.TEMATY;
  @Input() widok!: Widok;
  @Input()  mapa?: Mapa;
  @Input() obszarWidoczny?:boolean | undefined;
  @Output() mapaWybrana = new EventEmitter<WyborMapyEvent>();

  zbiorTematow: Array<KategoriaGrupaMapOpenDto>=[];
  aktualnyJezyk = 'pl';
  subscription$ = new Subscription();
  /**
   * Konstruktor
   */
  constructor(private tlumaczenia: TlumaczeniaService,
    private serviceKategoriiMap: ControllerKategorieMapService,
    private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private store: Store<{ modulMapowy: any }>) {
  }



  /**
  * Cykl życia komponentu inicjalizacja
  */
  ngOnInit(): void {
    this.pobierzListeTematow();
    // this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject()
    //   .subscribe(() => this.pobierzListeTematow()));

    this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
      this.aktualnyJezyk = jezyk;
      this.pobierzListeTematow();
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


    /**
   * Funkcja do pobierania listy kategorii map
   */
    private pobierzListeTematow(): void {

      this.serviceKategoriiMap.getKategorieMap()
        .subscribe((result: any) => {
          console.log('pobierzListeKategoriiMap: ', result.content.kategorieTematyczne[0].grupyMap);
          // if (result.content.typ.ObiektEnum==='KATEGORIA_TEMATYCZNA') {
            this.zbiorTematow = Array.from(result.content.kategorieTematyczne[0].grupyMap);
            console.log('!!!!pobierzListeKategoriiMap: ',  this.zbiorTematow);
          // }
        });
      // this.serviceKategoriiMap.pobierzListeKategorieMapDlaPortalu(wersja)
      //   .subscribe((result: any) => {
      //     if (result.content) {
      //       this.zbiorKategoriiMap = result.content;
      //     }
      //   });
      // this.zbiorTematow=[];
    }
}
