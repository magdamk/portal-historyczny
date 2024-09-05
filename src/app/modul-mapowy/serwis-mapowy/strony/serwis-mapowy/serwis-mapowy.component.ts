import { Component, OnInit } from '@angular/core';
import { PRZYCISK_IKONA_TYP } from 'src/app/modul-mapowy/commons/komponenty/przycisk-ikona/przycisk-ikona.component';
import { Router, RouterLink } from '@angular/router';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/mm-tlumaczenia.service';

@Component({
  selector: 'mm-serwis-mapowy',
  templateUrl: './serwis-mapowy.component.html',
  styleUrls: ['./serwis-mapowy.component.scss']
})
export class SerwisMapowyComponent implements OnInit {

  PRZYCISK_IKONA_TYP = PRZYCISK_IKONA_TYP;

  constructor(
    private router: Router,
    private tlumaczenia: TlumaczeniaService,
  ) {

  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    // this.zaladujWarstwyPodkladowe();
    // this.aktualizacjazoomISrodek();
    // this.aktualizujWarstwy();
    // this.aktualizacjaMapy();
    // this.aktualizujStanInterfejsuUzytkownika();
    // this.obslugaWyboruMapyDoPorownania();
    this.tlumaczenia.spawdzPoprawnoscJezyka();
  }


}
