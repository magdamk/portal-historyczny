import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { WynikWyszukiwaniaDtoObiektDto, ObiektDto } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
import { Warstwa } from 'src/app/modul-mapowy/serwis-mapowy/modele/warstwa';
import { ObiektyMapyService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/obiekty-mapy.service';
import { InterfejsUzytkownikaActions } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.actions';

@Component({
  selector: 'mm-wyniki-obiekty-mobile',
  templateUrl: './wyniki-obiekty-mobile.component.html',
  styleUrls: ['./wyniki-obiekty-mobile.component.scss']
})
export class WynikiObiektyMobileComponent implements OnInit, OnDestroy {
  aktualnyJezyk = 'pl';
  subskrybcja$ = new Subscription();

  @Input() set wynikWyszukiwania(wynikiWyszukiwania: WynikWyszukiwaniaDtoObiektDto | null) {
    if (!wynikiWyszukiwania || wynikiWyszukiwania.liczbaWynikow === 0) {
      this.wynikiWyszukiwania = {liczbaWynikow: 0, content: []};
      return;
    }
    this.wynikiWyszukiwania = wynikiWyszukiwania;
  }

  @Input() set mapaWarstw(mapaWarstw: Map<string, Warstwa>) {
    if (!mapaWarstw) {
      return;
    }
    this._mapaWarstw = mapaWarstw;
  }

  @Output() zamknijClick = new EventEmitter();
  wynikiWyszukiwania: WynikWyszukiwaniaDtoObiektDto = {liczbaWynikow: 0, content: []};
  private _mapaWarstw = new Map<string, Warstwa>();

  /**
   * Konstruktor
   */
  constructor(private obiektyMapySerwis: ObiektyMapyService, private store: Store<{ modulMapowy: any }>, private tlumaczeniaService: TlumaczeniaService) {
  }


  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.subskrybcja$.add(this.tlumaczeniaService.getZmianaJezykaSubject()
      .pipe(
        tap(jezyk => this.aktualnyJezyk = jezyk))
      .subscribe());
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
      this.subskrybcja$.unsubscribe();
  }

   /**
   * Funkcja generująca zdarzenie wyswietlenia obiektu do mapy
   * @param wynik - obiekt dodawany
   */
  wyswietlObiektNaMapie(wynik: ObiektDto) {
    if (!wynik.uuidWarstwy) {
      this.obiektyMapySerwis.przekazLokalizacjeDoWyswietlenia(wynik);
    } else {
      this.obiektyMapySerwis.przekazObiektDoWyswietlenia(wynik, this.mapaWarstw?.get(wynik.uuidWarstwy));
    }
    this.store.dispatch(InterfejsUzytkownikaActions.zwinWyszukiwarke());
    this.zamknijClick.emit();
  }


}
