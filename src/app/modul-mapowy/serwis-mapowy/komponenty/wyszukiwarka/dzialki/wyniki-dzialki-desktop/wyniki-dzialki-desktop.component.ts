import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { WynikWyszukiwaniaDtoDzialkaDto, ObiektDto } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
import { Warstwa } from 'src/app/modul-mapowy/serwis-mapowy/modele/warstwa';
import { MapaService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/mapa.service';
import { ObiektyMapyService } from 'src/app/modul-mapowy/serwis-mapowy/serwisy/obiekty-mapy.service';

@Component({
  selector: 'mm-wyniki-dzialki-desktop',
  templateUrl: './wyniki-dzialki-desktop.component.html',
  styleUrls: ['./wyniki-dzialki-desktop.component.scss']
})
export class WynikiDzialkiDesktopComponent implements OnInit, OnDestroy  {

  aktualnyJezyk = 'pl';
  subskrypcje$ = new Subscription();

  @Input() wynikiWyszukiwania: WynikWyszukiwaniaDtoDzialkaDto = {liczbaWynikow: 0, content: []};
  @Input() mapaWarstw = new Map<string, Warstwa>();

  @Output() zamknijClick = new EventEmitter();
  @Output() wyswietlWszystkieClick = new EventEmitter();

  dzialkiNalezaDoMapy = false;

  /**
   * Konstruktor
   */
  constructor(private mapaSerwis: MapaService, private obiektyMapySerwis: ObiektyMapyService, private tlumaczeniaService: TlumaczeniaService) {
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


  // /**
  //  * Cykl życia obiektu
  //  * @param changes - obiekt przechowujący informacje o zmianach
  //  */
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.wynikiWyszukiwania || changes.mapaWarstw) {
  //     this.sprawdzCzyWarstwaNalezyDoMapy();
  //   }
  // }

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
  }

  /**
   * Funkcja generuje zdarzenie dodania obiektu do mapy
   * @param wynik - obiekt do dodania
   */
  dodajObiektDoMapy(wynik: ObiektDto) {
    if (!wynik.uuidWarstwy) {
      this.obiektyMapySerwis.przekazLokalizacjeDoWyswietlenia(wynik);
      return;
    }
    this.obiektyMapySerwis.przekazObiektDoDodania(wynik);
  }

}
