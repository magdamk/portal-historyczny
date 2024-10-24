import { Component, ViewChild } from '@angular/core';
import { MobilnyKontrolerNarzedziInterface } from 'src/app/modul-mapowy/commons/interfejsy/mobilny-kontroler-narzedzi-interface';
import { MobilnyKontrolerNarzedziService } from '../../../serwisy/mobilny-kontroler-narzedzi.service';

@Component({
  selector: 'mm-pomoc-belka-boczna',
  templateUrl: './pomoc-belka-boczna.component.html',
  styleUrls: ['./pomoc-belka-boczna.component.scss']
})
export class PomocBelkaBocznaComponent implements MobilnyKontrolerNarzedziInterface {

  // @ViewChild('szczegolyKomponent') szczegolyKomponent: PomocSzczegolyComponent;

  /**
   * Konstruktor
   * @param mobilnyKontrolerSerwis
   */
  constructor(private mobilnyKontrolerSerwis: MobilnyKontrolerNarzedziService) {
  }

  /**
   * Funkcja zamyka formularz kontaktowy
   */
  zamknijKontakt(): void {
    // if (this.szczegolyKomponent.sciezkaUrlAktywnychSzczegolow !== '') {
    //   this.szczegolyKomponent.wyczyscSzczegoly();
    // } else {
      this.mobilnyKontrolerSerwis.zamknijKomponent();
    // }
  }

}
