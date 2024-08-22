import {Component, EventEmitter, Input, Output} from '@angular/core';
import {KategoriaMapOpenDto} from '../../../../../core/modele/kategoria-map-open-dto';
import {WyborMapyEvent} from '../karta-mapy/karta-mapy.component';
// import {ResposnsywnoscUtils} from '../../../../../core/responsywnosc/utils/resposnsywnosc-utils';
import { ResponsywnoscUtils } from '@modul-mapowy';

/**
 * Komponent kategoria mapy
 */
@Component({
  selector: 'app-kategorie-map',
  templateUrl: './kategorie-map.component.html',
  styleUrls: ['./kategorie-map.component.scss']
})
export class KategorieMapComponent {

  @Input()
  kategoriiMap: KategoriaMapOpenDto|undefined;

  @Input()
  zmianaMapy = false;

  zawartoscWidoczna = false;
  czyTrybDesktop = ResponsywnoscUtils.czyTrybDesktop();

  @Output()
  mapaWybrana = new EventEmitter<WyborMapyEvent>();

  /**
   * Funkcja rozwija kategorię mapy
   */
  pokazZawartosc(): void {
    this.zawartoscWidoczna = true;
  }
  /**
   * Funkcja zmienia widocznosc kategorii
   */
  zmienWidocznosc(): void {
    this.zawartoscWidoczna = !this.zawartoscWidoczna;
  }
  /**
   * Funkcja zwija kategorię mapy
   */
  ukryjZawartosc(): void {
    this.zawartoscWidoczna = false;
  }

  /**
   * Funkcja sygnalizuje wybraniwMapy
   */
  wybranoMape(event: WyborMapyEvent): void {
    this.mapaWybrana.emit(event);
  }

}
