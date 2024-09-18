import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { KategoriaGrupaMapOpenDto } from "../../../../../core/modele/kategoria-grupa-map-open-dto";
import { TypMapyObiektDto } from "../../../../../core/modele/typ-mapy-obiekt-dto";
import { ZmianaMapyUtils } from "../../../../../core/modele/zmiana-mapy-utils";
import { ResponsywnoscUtils } from 'src/app/modul-mapowy/mm-core/responsywnosc/utils/responsywnosc-utils';
import { Store } from '@ngrx/store';

export interface WyborMapyEvent {
  url?: string;
  uuidMapy?: string;
  rodzaj?: string;
  typ?: TypMapyObiektDto.ObiektEnumEnum;
}

/**
 * Komponent kafelek mapy
 */
@Component({
  selector: 'app-karta-mapy',
  templateUrl: './karta-mapy.component.html',
  styleUrls: ['./karta-mapy.component.scss']
})
export class KartaMapyComponent implements OnInit {

  @Input() mapa: KategoriaGrupaMapOpenDto | undefined;
  @Input() zmianaMapy = false;

  @Output() mapaWybrana = new EventEmitter<WyborMapyEvent>();

  szczegoly = false;
  adresUrl?: string;
  miniaturkaUkryta = false;

  /**
   * Konstruktor
   * @param router - natywny serwis routingu
   */
  constructor(private router: Router, private store: Store) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.wyczyscZbedneParametrySerwisuZewnetrznego();
  }


  /**
   * Funkcja reaguje na przycisk enter i wywołuje przekierowanie
   */
  klikEnter(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    // console.log(`/mapa/${this.mapa?.uuidMapy}`+encodeURI(`?rodzaj=${this.mapa?.rodzaj}`));
    if (this.zmianaMapy) {
      this.wybranoMape();
      return;
    }
    if (this.adresUrl) {
      window.open(
        this.adresUrl,
        '_blank'
      );
      return;
    }
    // this.wybranoMape();
    // console.log(`/mapa/${this.mapa?.uuidMapy}`+encodeURI(`?rodzaj=${this.mapa?.rodzaj}`));
    this.router.navigate([`/mapa/${this.mapa?.uuidMapy}`]);
  }

  /**
   * Funkcja sygnalizuje wybraniwMapy
   */
  wybranoMape(): void {
    if (this.mapa!.adresUrl || this.zmianaMapy) {
      this.mapaWybrana.emit({ url: this.mapa!.adresUrl, uuidMapy: this.mapa!.uuidMapy, typ: this.mapa!.typ?.obiektEnum, rodzaj: this.mapa!.rodzaj });
    }
  }

  /**
   * Funkcja obsługuje tapnięcie na kafelku mapy
   */
  tap(event: any) {
    if (ResponsywnoscUtils.czyTrybDesktop()) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    }
    event.preventDefault();

    if (this.zmianaMapy) {
      this.wybranoMape();
      return;
    }
    if (this.mapa!.typ?.obiektEnum === TypMapyObiektDto.ObiektEnumEnum.SerwisZewnetrzny && this.adresUrl) {
      window.open(this.adresUrl, '_blank');
      return;
    }
    this.router.navigate(['/mapa/' + this.mapa?.uuidMapy]);
  }

  /**
   * funkcja obsługuje przytrzymanie kafelka mapy
   */
  press() {
    this.miniaturkaUkryta = !this.miniaturkaUkryta;
  }


  /**
   * Funkcja czysci dodatkowe arametry url jezli przekierowanie ze strony startowej
   */
  private wyczyscZbedneParametrySerwisuZewnetrznego(): void {
    if (this.mapa!.adresUrl && !this.zmianaMapy) {
      this.adresUrl = ZmianaMapyUtils.wyczyscZbedneParametrySerwisuZewnetrznego(this.mapa!.adresUrl);
    }
  }


  zapiszParametryWLocalStorage() {
    localStorage.setItem('rodzaj', this.mapa?.rodzaj ? this.mapa.rodzaj : '');
    localStorage.setItem('imgPath', this.mapa?.sciezkaDoPlikuZGrafika ? this.mapa.sciezkaDoPlikuZGrafika : '');
  }
}
