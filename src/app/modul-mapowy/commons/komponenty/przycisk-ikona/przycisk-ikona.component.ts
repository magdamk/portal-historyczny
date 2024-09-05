import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * typy przycisków
 */
export const PRZYCISK_IKONA_TYP = {
  CZARNY: 'czarny',
  BIALY: 'bialy',
  BIALY_Z_BORDEREM: 'bialy-z-borderem',
  BIALY_POMARANCZ: 'bialy-pomarancz',
  SZARY_TLO: 'szary-tlo',
  CZARNO_BIALY: 'czarno-bialy',
  BIALO_CZARNY: 'bialo-czarny',
  BLEKITNY: 'blekitny',
  POMARANCZOWY: 'pomaranczowy',
  PRZEZROCZYSTY: 'przezroczysty',
  BLEKITNY_OKRAGLY: 'blekitny-okragly',
  GRADIENT: 'gradient'
};

/**
 * Komponent przycisku z ikoną
 */
@Component({
  selector: 'mm-przycisk-ikona',
  templateUrl: './przycisk-ikona.component.html',
  styleUrls: ['./przycisk-ikona.component.scss']
})
export class PrzyciskIkonaComponent implements OnInit {

  @Input()
  ikona = '';

  ikonaSvgObservable = new BehaviorSubject<string>('');

  @Input()
  typ = PRZYCISK_IKONA_TYP.BIALY;

  @Input()
  label = '';

  @Input()
  disabled = false;

  @Input()
  tabIndex = 0;

  @Output()
  onClick = new EventEmitter<any>();
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
