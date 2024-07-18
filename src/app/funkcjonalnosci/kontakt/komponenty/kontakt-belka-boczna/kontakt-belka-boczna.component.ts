import {Component, OnInit} from '@angular/core';
import {SzablonyService} from '../../../../core/szablony/serwisy/szablony.service';

/**
 * Komponent dostosowujący formularz kontaktowy do belki bocznej
 */
@Component({
  selector: 'app-kontakt-belka-boczna',
  templateUrl: './kontakt-belka-boczna.component.html',
  styleUrls: ['./kontakt-belka-boczna.component.scss']
})
export class KontaktBelkaBocznaComponent implements OnInit {

  /**
   * Konstruktor
   * @param szablonService - serwis szablon
   */
  constructor(private szablonService: SzablonyService) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
  }

  /**
   * Funkcja pozwala zamknąć komponent
   */
  zamknijKontakt(): void {
    this.szablonService.ustawDomyslnyKomponentBelkiBocznej();
  }
}
