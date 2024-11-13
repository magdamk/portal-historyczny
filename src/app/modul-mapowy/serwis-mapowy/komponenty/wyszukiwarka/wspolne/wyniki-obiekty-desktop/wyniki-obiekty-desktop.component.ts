import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { DostepneWarstwyModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/dostepne-warstwy-adapter';
import { WynikWyszukiwaniaDtoObiektDto, ObiektDto } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
import { Warstwa } from 'src/app/modul-mapowy/serwis-mapowy/modele/warstwa';
import { MapaService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/mapa.service';
import { ObiektyMapyService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/obiekty-mapy.service';

@Component({
  selector: 'mm-wyniki-obiekty-desktop',
  templateUrl: './wyniki-obiekty-desktop.component.html',
  styleUrls: ['./wyniki-obiekty-desktop.component.scss']
})
export class WynikiObiektyDesktopComponent implements OnInit, OnDestroy {
  aktualnyJezyk = 'pl';
  subskrybcja$ = new Subscription();

  @Input()
  dostepnePokazWiecej = false;

  @Input()
  pokazWiecej = false;

  @Input() set wyniki(wynikiWyszukiwania: WynikWyszukiwaniaDtoObiektDto | null) {
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

  @Output() wyswietlWszystkieClick = new EventEmitter();
  @Output() zmianaWyszukiwarkaObiektowPokazWiecej = new EventEmitter<boolean>();

  private _mapaWarstw = new Map<string, Warstwa>();
  wynikiWyszukiwania: WynikWyszukiwaniaDtoObiektDto = {liczbaWynikow: 0, content: []};

  /**
   * Konstruktor
   */
  constructor(private mapaSerwis: MapaService,
              private obiektyMapySerwis: ObiektyMapyService,
              private tlumaczeniaService: TlumaczeniaService,
              private widoczneWarstwy: DostepneWarstwyModulMapowyAdapter) {
  }

  /**
   * Funkcja rozdzielająca wyniki
   *
   * @param wynikiWyszukiwania - wyniki wyszukiwania
   */

  /**
   * Funkcja sprawdzająca czy obiekt należy do mapy
   *
   * @param uuidWarstwy - id warstwy
   */

  /**
   * Funkcja generująca zdarzenie wyswietlenia obiektu do mapy
   * @param wynik - obiekt dodawany
   */
  wyswietlObiektNaMapie(wynik: ObiektDto) {
    if (!wynik.uuidWarstwy) {
      this.obiektyMapySerwis.przekazLokalizacjeDoWyswietlenia(wynik);
      return;
    }
    this.obiektyMapySerwis.przekazObiektDoWyswietlenia(wynik, this._mapaWarstw?.get(wynik.uuidWarstwy));
  }

  /**
   * Funkcja generuje zdarzenie dodania obiektu do mapy
   * @param wynik - dane obiektu
   */
  dodajObiektDoMapy(wynik: ObiektDto) {
    if (!wynik.uuidWarstwy) {
      this.obiektyMapySerwis.przekazLokalizacjeDoWyswietlenia(wynik);
      return;
    }
    this.obiektyMapySerwis.przekazObiektDoDodania(wynik);
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
   * Funkcja zmienia rozmiar okna wyszukiwnia
   */
  zaminPokazWiecej(){
    this.zmianaWyszukiwarkaObiektowPokazWiecej.emit(!this.pokazWiecej);
  }

  /**
   * Funkcja ustawia widoczność opcji dodawania warstwy do legendy
   * @param obiekt - wyszukana warstwa
   */

}
