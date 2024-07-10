import {Component, Input, OnInit} from '@angular/core';

export const TYP_PRZYCISKU = {
  BASIC: 'BASIC',
  PRIMARY: 'PRIMARY'
}

/**
 * Komponent przycisk prostokątny
 */
@Component({
  selector: 'app-przycisk-prostokatny',
  templateUrl: './przycisk-prostokatny.component.html',
  styleUrls: ['./przycisk-prostokatny.component.scss']
})
export class PrzyciskProstokatnyComponent implements OnInit {

  @Input()
  label = '';

  @Input()
  typ = TYP_PRZYCISKU.BASIC;

  @Input()
  disabled = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
