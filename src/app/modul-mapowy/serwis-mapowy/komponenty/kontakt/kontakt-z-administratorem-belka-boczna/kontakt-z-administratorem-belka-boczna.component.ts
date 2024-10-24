import { Component, OnInit } from '@angular/core';
import { MobilnyKontrolerNarzedziInterface } from 'src/app/modul-mapowy/commons/interfejsy/mobilny-kontroler-narzedzi-interface';
import { MobilnyKontrolerNarzedziService } from '../../../serwisy/mobilny-kontroler-narzedzi.service';

@Component({
  selector: 'mm-kontakt-z-administratorem-belka-boczna',
  templateUrl: './kontakt-z-administratorem-belka-boczna.component.html',
  styleUrls: ['./kontakt-z-administratorem-belka-boczna.component.scss']
})
export class KontaktZAdministratoremBelkaBocznaComponent implements OnInit, MobilnyKontrolerNarzedziInterface {

  /**
   * Konstruktor
   * @param mobilnyKontrolerSerwis
   */
  constructor(private mobilnyKontrolerSerwis: MobilnyKontrolerNarzedziService) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
  }

  /**
   * Funkcja zamyka formularz kontaktowy
   */
  zamknijKontakt(): void {
    this.mobilnyKontrolerSerwis.zamknijKomponent();
  }
}
