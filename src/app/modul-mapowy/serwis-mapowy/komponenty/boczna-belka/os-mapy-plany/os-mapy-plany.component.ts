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
import { Router } from '@angular/router';
import { TypMapyObiektDto } from 'src/app/core/modele/typ-mapy-obiekt-dto';

@Component({
  selector: 'mm-os-mapy-plany',
  templateUrl: './os-mapy-plany.component.html',
  styleUrls: ['./os-mapy-plany.component.scss']
})
export class OsMapyPlanyComponent implements OnInit, OnDestroy {
  widokIdentyfikator = WIDOKI_ID.MAPY_PLANY;
  @Input() widok!: Widok;
  @Input() mapa?: Mapa;
  @Input() obszarWidoczny?: boolean | undefined;
  @Output() mapaWybrana = new EventEmitter<WyborMapyEvent>();

  zbiorMapPlanow: Array<KategoriaGrupaMapOpenDto> = [];
  aktualnyJezyk='';
  subscription$ = new Subscription();
  /**
   * Konstruktor
   */
  constructor(private tlumaczenia: TlumaczeniaService,
    private serviceKategoriiMap: ControllerKategorieMapService,
    private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private store: Store<{ modulMapowy: any }>, private router: Router) {
  }

 /**
  * Cykl życia komponentu inicjalizacja
  */
 ngOnInit(): void {
  // // this.pobierzListeTematow();
  // this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject()
  //   .subscribe(() => this.pobierzListeTematow()));

  this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
    this.aktualnyJezyk = jezyk;
    this.pobierzListeMapPLanow();
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
  this.store.dispatch(LewyPanelWidokActions.pokazObszar({ widokId: this.widokIdentyfikator }));
  // this.pobierzObszarySerwis().dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
}


/**
* Funkcja do pobierania listy kategorii map
*/
private pobierzListeMapPLanow(): void {

  this.serviceKategoriiMap.getKategorieMap()
    .subscribe((result: any) => {
      // console.log('pobierzListeKategoriiMap: ', result.content.kategorieTematyczne[1].grupyMap);
      // if (result.content.typ.ObiektEnum==='KATEGORIA_TEMATYCZNA') {
      this.zbiorMapPlanow = Array.from(result[2].grupyMap);
      // console.log('!!!!pobierzListeKategoriiMap: ', this.zbiorMapPlanow);
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


/**
* Funkcja sygnalizuje wybraniwMapy
*/
wybranoMape(event: WyborMapyEvent): void {
  // if (event.typ === TypMapyObiektDto.ObiektEnumEnum.SerwisZewnetrzny) {
  //   // this.komunikaty.pokazKomunikatBledu('codes.narzedzie-porownywania-map.blad-wyboru-mapy-komunikat', {});
  //   return;
  // }
  // this.mapaWybrana.emit(event);
}

}
