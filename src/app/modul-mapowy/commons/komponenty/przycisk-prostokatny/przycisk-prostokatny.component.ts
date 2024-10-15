import {Component, Input, OnInit} from '@angular/core';

export const PRZYCISK_PROSTOKAT_TYP = {
  MALY: 'maly',
  DUZY: 'duzy'
};

export const PRZYCISK_PROSTOKAT_RODZAJ = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};

@Component({
  selector: 'mm-przycisk-prostokatny',
  templateUrl: './przycisk-prostokatny.component.html',
  styleUrls: ['./przycisk-prostokatny.component.scss']
})
export class PrzyciskProstokatnyComponent implements OnInit {

  @Input()
  typ = PRZYCISK_PROSTOKAT_TYP.MALY;

  @Input()
  label = '';

  @Input()
  disabled = false;

  @Input()
  rodzaj = PRZYCISK_PROSTOKAT_RODZAJ.SECONDARY;

  @Input()
  ikonaNaPoczatku?: string;

  @Input()
  ikonaNaKoncu?: string

  /**
   * Konstruktor
   * @param ikonySvgSerwis - serwis ładowania ikon
   * @param eRef - referencja do komponentu
   */
  constructor() {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {

  }

}
