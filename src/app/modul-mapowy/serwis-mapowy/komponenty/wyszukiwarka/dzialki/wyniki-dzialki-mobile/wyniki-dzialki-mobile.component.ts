import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { WynikWyszukiwaniaDtoDzialkaDto, ObiektDto } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
import { Warstwa } from 'src/app/modul-mapowy/serwis-mapowy/modele/warstwa';
import { ObiektyMapyService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/obiekty-mapy.service';
import { InterfejsUzytkownikaActions } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.actions';

@Component({
  selector: 'mm-wyniki-dzialki-mobile',
  templateUrl: './wyniki-dzialki-mobile.component.html',
  styleUrls: ['./wyniki-dzialki-mobile.component.scss']
})
export class WynikiDzialkiMobileComponent {
  aktualnyJezyk = 'pl';
  subskrypcje$ = new Subscription();

  @Input() wynikiWyszukiwania: WynikWyszukiwaniaDtoDzialkaDto = {liczbaWynikow: 0, content: []};
  @Input() mapaWarstw = new Map<string, Warstwa>();

  @Output() zamknijClick = new EventEmitter();
  @Output() wyswietlWszystkieClick = new EventEmitter();
  @Output() brakWynikowKomunikat = new EventEmitter<boolean>();


  dzialkiNalezaDoMapy = false;

  /**
   * Konstruktor
   */
  constructor(private obiektyMapySerwis: ObiektyMapyService, private store: Store<{ modulMapowy: any }>, private tlumaczeniaService: TlumaczeniaService) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.subskrypcje$.add(this.tlumaczeniaService.getZmianaJezykaSubject()
      .pipe(tap(jezyk => this.aktualnyJezyk = jezyk))
      .subscribe())
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subskrypcje$.unsubscribe();
  }

  /**
   * Funkcja sprawdzająca czy obiekt należy do mapy
   *
   * @param uuidWarstwy - id warstwy
   */
  sprawdzCzyWarstwaNalezyDoMapy() {
    if (!this.wynikiWyszukiwania || !this.wynikiWyszukiwania.content[0] || !this.mapaWarstw) {
      this.dzialkiNalezaDoMapy = false;
      return;
    }
    const uuidWarstwy = this.wynikiWyszukiwania.content[0].uuidWarstwy;
    this.dzialkiNalezaDoMapy = !!uuidWarstwy && !!this.mapaWarstw?.get(uuidWarstwy);
  }

  /**
   * Funkcja generująca zdarzenie wyswietlenia obiektu do mapy
   * @param wynik - obiekt dodawany
   */
  wyswietlObiektNaMapie(wynik: ObiektDto) {
    if (!wynik.uuidWarstwy) {
      this.obiektyMapySerwis.przekazLokalizacjeDoWyswietlenia(wynik);
      return;
    }
    this.obiektyMapySerwis.przekazObiektDoWyswietlenia(wynik, this.mapaWarstw?.get(wynik.uuidWarstwy));
    this.store.dispatch(InterfejsUzytkownikaActions.zwinWyszukiwarke());
    this.zamknijClick.emit();
  }

}
