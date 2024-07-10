import {Pipe, PipeTransform} from '@angular/core';
import {DataCzasService} from "../serwisy/data-czas.service";

@Pipe({
  name: 'formatujDate'
})
export class FormatujDatePipe implements PipeTransform {


  /**
   * Konstruktor
   * @param dataCzasSerwis - serwis data czas
   */
  constructor(private dataCzasSerwis: DataCzasService) {
  }

  /**
   * Funkcja wykonuje formatowanie
   * @param value - wartość przekazana do pipe
   * @param args - dodatkowe argumenty
   */
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return value;
    }
    const aktualnyJezyk = args[0] || 'pl';
    return this.dataCzasSerwis.dataDoWyswietlenia(value as string, aktualnyJezyk as string);
  }
}
