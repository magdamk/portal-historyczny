import {Pipe, PipeTransform} from '@angular/core';

/**
 * Pipe wyliczający rozmiar pliku w KB, MB
 */
@Pipe({
  name: 'zamienNaKBMB'
})
export class ZamienNaKbMbPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (isNaN(value as number)) {
      return 'n/n';
    }
    let jednostka = 'KB';
    let wynik = (value as number / 1024);
    if (wynik > 1000) {
      wynik = (value as number / (1024 * 1024));
      jednostka = 'MB';
    }
    return `${wynik.toFixed(2)}${jednostka}`;
  }

}
