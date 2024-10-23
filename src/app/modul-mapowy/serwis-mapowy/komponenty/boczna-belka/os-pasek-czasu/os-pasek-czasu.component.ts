import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ControllerKategorieMapService } from 'src/app/core/api/controller-kategorie-map.service';
import { KategoriaGrupaMapOpenDto } from 'src/app/core/modele/kategoria-grupa-map-open-dto';
import { TypMapyObiektDto } from 'src/app/core/modele/typ-mapy-obiekt-dto';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { WyborMapyEvent } from 'src/app/funkcjonalnosci/strona-startowa/strony/komponenty/karta-mapy/karta-mapy.component';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';
import { WIDOK_PASKI_CZASU, WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { Widok } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { Mapa } from '../../../modele/mapa';
import { GrupaWarstwPaskaCzasu } from '../../../modele/grupa-warstw-paska-czasu';
import { PasekCzasuModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/pasek-czasu-adapter';
import { ControllerPasekCzasuOpenService } from '../../../serwisy/controller-pasek-czasu-open.service';
import { WidokMapyGrupaDanychPaskaCzasuDto } from 'src/app/core/modele/widok-mapy-grupa-danych-paska-czasu-dto';
import { MapaWidokActions } from 'src/app/modul-mapowy/stan/mapa-widok/mapa-widok.actions';
import { WIDOKI_MAPY_ID } from 'src/app/modul-mapowy/stan/mapa-widok/mapa-widok.const';
import { KolekcjeUtils } from '../../../utils/kolekcje-utils';
import { InterfejsUzytkownikaActions } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.actions';
import { LegendaUtils } from '../../../utils/legenda-utils';

@Component({
  selector: 'mm-os-pasek-czasu',
  templateUrl: './os-pasek-czasu.component.html',
  styleUrls: ['./os-pasek-czasu.component.scss']
})
export class OsPasekCzasuComponent implements OnInit, OnDestroy {
  widokIdentyfikator = WIDOKI_ID.PASKI_CZASU;
  widokMapyIdentyfikator = WIDOKI_MAPY_ID.WIDOK_PASKA_CZASU;
  @Input() widok!: Widok;
  @Input() mapa?: Mapa;
  @Input() obszarWidoczny?: boolean | undefined;
  @Output() mapaWybrana = new EventEmitter<WyborMapyEvent>();

  grupaDanychPaskaCzasu?: GrupaWarstwPaskaCzasu[];

  aktualnyJezyk = 'pl';
  zbiorPaskowCzasu: Array<KategoriaGrupaMapOpenDto> = [];
  subscription$ = new Subscription();
  /**
   * Konstruktor
   */
  constructor(private tlumaczenia: TlumaczeniaService,
    private serviceKategoriiMap: ControllerKategorieMapService,
    private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private serwisPaskaCzasu: ControllerPasekCzasuOpenService,
    private store: Store<{ modulMapowy: any }>, private router: Router) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    // // this.pobierzListeTematow();
    // this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject()
    //   .subscribe(() => this.pobierzListeTematow()));
    // this.pasekCzasu.pobierzGrupyWarstwPaskaCzasu().subscribe(dane => {
    //   this.grupaDanychPaskaCzasu = dane;
    //   console.log('Pasek czasu, dane: ',dane);
    // })
    this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
      this.aktualnyJezyk = jezyk;
      this.pobierzListePaskowCzasu();
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
  // wybierzGrupe(grupa: GrupaWarstwPaskaCzasu) {
  //   this.dialogRef.close(grupa);
  // }

  // /**
  //  * Funkcja zamyka okno
  //  */
  // zamknijOkno() {
  //   this.dialogRef.close();
  // }

  /**
  * Funkcja do pobierania listy kategorii map
  */
  private pobierzListePaskowCzasu(): void {
    this.serwisPaskaCzasu.pobierzListeGrupDanychPaskaCzasu().subscribe((data) => { this.grupaDanychPaskaCzasu = (data!.content! as GrupaWarstwPaskaCzasu[]); });
    // this.serviceKategoriiMap.getKategorieMap()
    //   .subscribe((result: any) => {
    //     // console.log('pobierzListeKategoriiMap: ', result.content.kategorieTematyczne[1].grupyMap);
    //     // if (result.content.typ.ObiektEnum==='KATEGORIA_TEMATYCZNA') {
    //     // this.zbiorPaskowCzasu = Array.from(result.content.kategorieTematyczne[1].grupyMap);
    //     // console.log('!!!!pobierzListeKategoriiMap: ', this.zbiorMapPlanow);
    //     // }
    //   });
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
    if (event.typ === TypMapyObiektDto.ObiektEnumEnum.SerwisZewnetrzny) {
      // this.komunikaty.pokazKomunikatBledu('codes.narzedzie-porownywania-map.blad-wyboru-mapy-komunikat', {});
      return;
    }
    // this.mapaWybrana.emit(event);
  }
  /**
    * Fukcja ładuje wybraną grupę
    * @param grupa
    */
  wybierzGrupe(grupa: GrupaWarstwPaskaCzasu) {
    // this.store.dispatch(MapaWidokActions.zamknijMapaWidok({ widokMapyId: this.widokMapyIdentyfikator }))
    // this.store.dispatch(MapaWidokActions.reset());
    console.log('grupa.warstwy ',grupa.warstwy);
    grupa.warstwy.forEach((w, k) => {
      console.log('wybierzGrupe: ', w, k);
      LegendaUtils.dodajParametrySterujace(w.warstwa);
      if (k === 0) {
        w.warstwa.parametrySterujace!.widoczna = true;
      } else {
        w.warstwa.parametrySterujace!.widoczna = false;
      }
    });
    // setTimeout(() => {
      this.store.dispatch(MapaWidokActions.aktualizujDane({ widokMapyId: this.widokMapyIdentyfikator, dane: KolekcjeUtils.klonowanieObiektu(grupa) }));
      // this.store.dispatch(MapaWidokActions.zapiszGrupePaskaCzasu({ widokMapyId: this.widokMapyIdentyfikator, daneInicjujacePasekCzasu:  grupa }));
      // this.store.dispatch(MapaWidokActions.uruchomMapaWidok({ widokMapyId: WIDOKI_MAPY_ID.WIDOK_PASKA_CZASU }));
      // this.store.dispatch(LewyPanelWidokActions.pokazObszar({ widokId: WIDOKI_ID.PASKI_CZASU }));
      this.store.dispatch(InterfejsUzytkownikaActions.zwinLewaBelke());
      // this.dialogRef.close(grupa);
    // }, 100);
  }

  /**
   * Funkcja zamyka okno
   */
  // zamknijOkno() {
  //   // this.dialogRef.close();
  // }
}
