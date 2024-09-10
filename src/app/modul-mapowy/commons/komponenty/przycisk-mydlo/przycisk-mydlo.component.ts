import {Component, Input, OnInit} from '@angular/core';

/**
 * Komponent przycisk z zaokrąglonymi rogami
 */
@Component({
  selector: 'mm-przycisk-mydlo',
  templateUrl: './przycisk-mydlo.component.html',
  styleUrls: ['./przycisk-mydlo.component.scss']
})
export class PrzyciskMydloComponent implements OnInit {

  @Input()
  ikona = '';

  @Input()
  label = '';

  /**
   * Kontruktor
   */
  constructor() {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
  }

}
