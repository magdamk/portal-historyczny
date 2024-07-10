import {Component} from '@angular/core';
import {TlumaczeniaService} from '../../../tlumaczenia/serwisy/tlumaczenia.service';
import {BehaviorSubject} from 'rxjs';

/**
 * Komponent przycisku zmiany języka
 */
@Component({
  selector: 'app-przycisk-zmien-jezyk',
  templateUrl: './przycisk-zmien-jezyk.component.html',
  styleUrls: ['./przycisk-zmien-jezyk.component.scss']
})
export class PrzyciskZmienJezykComponent {

  zmianaJezykaSubject: BehaviorSubject<string>;

  /**
   * Konstruktor
   * @param tlumaczeniaService - serwis tłumaczeń
   */
  constructor(private tlumaczeniaService: TlumaczeniaService) {
    this.zmianaJezykaSubject = tlumaczeniaService.getZmianaJezykaSubject();
  }

  /**
   * Funkcja wywołuje zmianę języka
   */
  zmienJezyk(): void {
    this.tlumaczeniaService.przelaczJezyk();
  }

}
