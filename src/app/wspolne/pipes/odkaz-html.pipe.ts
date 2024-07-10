import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/**
 * Funkcja przetwarzająca html w celu bezpieczenstwa
 */
@Pipe({
  name: 'odkazHtml',
})
export class OdkazHtmlPipe implements PipeTransform {
  /**
   * Konstruktor
   * @param odkazacz - serwis przetwarzający html
   */
  constructor(private odkazacz: DomSanitizer) {
  }

  /**
   * Funkcja transformująca
   * @param html - surowy html
   */
  transform(html: string): SafeHtml {
    return this.odkazacz.bypassSecurityTrustHtml(html);
  }
}
