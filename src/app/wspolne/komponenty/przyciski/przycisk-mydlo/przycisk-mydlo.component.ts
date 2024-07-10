import {Component, Input, OnInit} from '@angular/core';

/**
 * Komponent przycisk z zaokrąglonymi rogami
 */
@Component({
  selector: 'app-przycisk-mydlo',
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

  ngOnInit(): void {
  }

}
