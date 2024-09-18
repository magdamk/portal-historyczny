import {Component, Input} from '@angular/core';


export const TYP_PRZYCISU = {
  BASIC: 'BASIC',
  PRIMARY: 'PRIMARY'
}

/**
 * Komponent przycik okrągły
 */
@Component({
  selector: 'mm-przycisk-okragly',
  templateUrl: './przycisk-okragly.component.html',
  styleUrls: ['./przycisk-okragly.component.scss']
})
export class PrzyciskOkraglyComponent {

  @Input() ikona = '';
  @Input() label = '';
  @Input() typ = TYP_PRZYCISU.BASIC;
  @Input() link?: string;
  @Input() linkParams?: {};
  @Input() href?: string;

}
