import { Directive, ElementRef, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { IkonyService } from '../serwisy/ikony.service';

@Directive({
  selector: '[mmIkonaSvg]'
})
export class IkonaSvgDirective {

  /**
   * Funkcja ładuje ikonę z pliku svg
   * @param ikonaNazwa
   */
  @Input()
  set mmIkonaSvg(ikonaNazwa: string) {
    if (ikonaNazwa && ikonaNazwa !== '') {
      this.ikonySvgSerwis.pobierzIkone(ikonaNazwa).pipe(take(1)).subscribe(ikona => {
        this.eRef.nativeElement.innerHTML = ikona.zawartosc;
      });
    }
  }

  /**
   * Konstruktor
   * @param eRef
   * @param ikonySvgSerwis
   */
  constructor(private eRef: ElementRef, private ikonySvgSerwis: IkonyService) {
  }

}
