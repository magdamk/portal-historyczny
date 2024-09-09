import {Pipe, PipeTransform} from '@angular/core';
import {TlumaczeniaNazw} from '../../serwis-mapowy/modele/tlumaczenia-nazw';

/**
 * Pipse służy do wyboru tłumaczenia elementu mapy
 */
@Pipe({
  name: 'wyborTlumaczenia'
})
export class WyborTlumaczeniaPipe implements PipeTransform {

  /**
   * Funkcja wykonuje transformacje
   * @param value
   * @param args
   */
  transform(value?: TlumaczeniaNazw, ...args: unknown[]): unknown {
    if (value && args?.length) {
      return value[args[0] as string];
    }
    return '';
  }

}
