import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KomunikatyModulMapowyAdapter } from 'src/app/core/adaptery/komunikaty-adapter';
import { Point } from 'src/app/core/modele/point';
import { WysokoscService } from '../../../serwisy/wysokosc.service';
import { KonwerterGeometriUtils } from '../../../utils/konwerter-geometri-utils';

@Component({
  selector: 'mm-lokalizacja-opis',
  templateUrl: './lokalizacja-opis.component.html',
  styleUrls: ['./lokalizacja-opis.component.scss']
})
export class LokalizacjaOpisComponent implements OnInit, OnChanges {

  pozycjaKursoraEPSG2178X = '';
  pozycjaKursoraEPSG2178Y = '';
  pozycjaKursoraEPSG4326X = '';
  pozycjaKursoraEPSG4326Y = '';
  wysokosc = '';

  @Input() pozycjaGeograficzna?: Point;

  @Input() obiekt = false;

  /**
   * Konstruktor
   * @param wysokoscSerwis
   * @param komunikaty
   */
  constructor(private wysokoscSerwis: WysokoscService,
              private komunikaty: KomunikatyModulMapowyAdapter) {
  }

  /**
   * Cykl życia komponentu - inicjalizacja
   */
  ngOnInit(): void {
  }

  /**
   * Cykl życia komponentu zmiana
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pozycjaGeograficzna) {
      this.ustawInformacjeOPozycji(this.pozycjaGeograficzna);
    }
  }


  /**
   * Funkcja kopiuje do schowka lokalizację w układzie EPSG2178
   */
  udostepnijLokalizacjeEPSG2178(): void {
    navigator.clipboard.writeText(`${this.pozycjaKursoraEPSG2178Y}, ${this.pozycjaKursoraEPSG2178X}`);
    this.komunikaty.pokazPomyslnyKomunikat('codes.generyczne.pomyslnie-skopiowano', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  /**
   * Funkcja kopiuje do schowka kolalizację w układzie EPSG4326
   */
  udostepnijLokalizacjeEPSG4326(): void {
    navigator.clipboard.writeText(`${this.pozycjaKursoraEPSG4326Y}, ${this.pozycjaKursoraEPSG4326X}`);
    this.komunikaty.pokazPomyslnyKomunikat('codes.generyczne.pomyslnie-skopiowano', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }


  /**
   * Funkcja aktualizuje informacje o położeniu obiektu/kliknieciu
   * @param pozycjaMyszki
   */
  private ustawInformacjeOPozycji(pozycjaMyszki: Point): void {
    this.pozycjaKursoraEPSG2178X = KonwerterGeometriUtils.formatujDoCalkowitych(pozycjaMyszki.getX());
    this.pozycjaKursoraEPSG2178Y = KonwerterGeometriUtils.formatujDoCalkowitych(pozycjaMyszki.getY());
    const poycjaEPSG4326 = KonwerterGeometriUtils.EPSG2178toEPSG4326(pozycjaMyszki.getX(), pozycjaMyszki.getY());
    this.pozycjaKursoraEPSG4326X = poycjaEPSG4326?.x ? poycjaEPSG4326.x.toFixed(6) : '';
    this.pozycjaKursoraEPSG4326Y = poycjaEPSG4326?.y ? poycjaEPSG4326.y.toFixed(6) : '';
    if(!this.obiekt) {
      const wysokoscNpm = this.wysokoscSerwis.pobierzWysokoscNPM(pozycjaMyszki.getX(), pozycjaMyszki.getY());
      this.wysokosc = wysokoscNpm ? wysokoscNpm.toString() : '--';
    }
  }
}
