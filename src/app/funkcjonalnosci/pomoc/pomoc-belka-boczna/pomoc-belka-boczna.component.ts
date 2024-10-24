import { Component, ViewChild } from '@angular/core';
import { SzablonyService } from 'src/app/core/szablony/serwisy/szablony.service';
import { BelkaBocznaKomponent } from 'src/app/wspolne/interfejsy/belka-boczna-komponent';

@Component({
  selector: 'app-pomoc-belka-boczna',
  templateUrl: './pomoc-belka-boczna.component.html',
  styleUrls: ['./pomoc-belka-boczna.component.scss']
})
export class PomocBelkaBocznaComponent implements BelkaBocznaKomponent {
  // @ViewChild('szczegolyKomponent') szczegolyKomponent: PomocSzczegolyComponent;

  /**
   * Konstruktor
   * @param szablonService - serwis szablon
   */
  constructor(private szablonService: SzablonyService) {
  }


  /**
   * Funkcja zamyka pomoc
   */
  zamknijPomoc(): void {
    // if (this.szczegolyKomponent.sciezkaUrlAktywnychSzczegolow !== '') {
    //   this.szczegolyKomponent.wyczyscSzczegoly();
    // } else {
      this.szablonService.ustawDomyslnyKomponentBelkiBocznej();
    // }
  }

}
