import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SzablonyService } from '../../../../../core/szablony/serwisy/szablony.service';
import { MapaSzczegolyDto } from '../../../../../core/modele/mapa-szczegoly-dto';
import { TypMapyObiektDto } from '../../../../../core/modele/typ-mapy-obiekt-dto';
import { ZbiorKategoriiMapOpenDto } from '../../../../../core/modele/zbior-kategorii-map-open-dto';
import { TlumaczeniaService } from "../../../../../core/tlumaczenia/serwisy/tlumaczenia.service";
import { Subscription } from "rxjs";
import { WyborMapyEvent } from '../../komponenty/karta-mapy/karta-mapy.component';
import WersjaEnum = MapaSzczegolyDto.WersjaEnum;
import { KomunikatyProviderService } from '../../../../../wspolne/serwisy/komunikaty-provider.service';
import { ControllerKategorieMapService } from 'src/app/core/api/controller-kategorie-map.service';
import { ResponsywnoscUtils } from 'src/app/modul-mapowy/mm-core/responsywnosc/utils/responsywnosc-utils';
/**
 * Komponent strona startowa
 */
@Component({
  selector: 'app-strona-startowa',
  templateUrl: './strona-startowa.component.html',
  styleUrls: ['./strona-startowa.component.scss']
})
export class StronaStartowaComponent implements OnInit, AfterViewInit, OnDestroy {
  zbiorKategoriiMap = {} as ZbiorKategoriiMapOpenDto;
  subskrybcje = new Subscription();

  @Input()
  zmianaMapy = false;

  @Input()
  wyborMapyDoPorownania = false;

  @Output()
  mapaWybrana = new EventEmitter<WyborMapyEvent>();

  /**
   * Konstruktor
   * @param szablonyService - serwis szablon
   * @param tlumaczeniaService serwis tłumaczeń
   * @param serviceKategoriiMap serwis do pobierania danych kategorii map
   */
  constructor(private szablonyService: SzablonyService,
    private tlumaczeniaService: TlumaczeniaService,
    private komunikaty: KomunikatyProviderService,
    private serviceKategoriiMap: ControllerKategorieMapService
  ) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit() {
    this.pobierzListeKategoriiMap();
    this.subskrybcje.add(this.tlumaczeniaService.getZmianaJezykaSubject()
      .subscribe(() => this.pobierzListeKategoriiMap()));
  }

  /**
   * Cykl życia komponentu o wyrenderowaniu widoku
   */
  ngAfterViewInit(): void {
    this.szablonyService.ustawTytulStrony('codes.strona-startowa.tytul');
  }

  /**
   * Cykl życia komponentu destrukcja komponentu
   */
  ngOnDestroy(): void {
    this.subskrybcje.unsubscribe();
  }

  /**
   * Funkcja do pobierania listy kategorii map
   */
  private pobierzListeKategoriiMap(): void {
    let wersja = ResponsywnoscUtils.czyTrybDesktop() ? WersjaEnum.Desktopowa : WersjaEnum.Mobilna;
    this.serviceKategoriiMap.getKategorieMap()
      .subscribe((result: any) => {
        if (result.content) {
          this.zbiorKategoriiMap = result.content;
        }
      });
    // this.serviceKategoriiMap.pobierzListeKategorieMapDlaPortalu(wersja)
    //   .subscribe((result: any) => {
    //     if (result.content) {
    //       this.zbiorKategoriiMap = result.content;
    //     }
    //   });
    this.zbiorKategoriiMap={};
  }

  /**
   * Funkcja sygnalizuje wybraniwMapy
   */
  wybranoMape(event: WyborMapyEvent): void {
    if (this.wyborMapyDoPorownania && event.typ === TypMapyObiektDto.ObiektEnumEnum.SerwisZewnetrzny) {
      this.komunikaty.pokazKomunikatBledu('codes.narzedzie-porownywania-map.blad-wyboru-mapy-komunikat', {});
      return;
    }
    this.mapaWybrana.emit(event);
  }

}
