import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface PopupData {
  uuidObiektu: string;
  tytul: string;
  tresc: string;
  zatwierdzPrzyciskEtykieta: string;
  anulujPrzyciskEtykieta: string;
}


/**
 * Implementacja wyskakującego okienka
 */
@Component({
  selector: 'app-potwierdzenie-popup',
  templateUrl: './potwierdzenie-popup.component.html',
  styleUrls: ['./potwierdzenie-popup.component.scss']
})
export class PotwierdzeniePopupComponent implements OnInit {
  /**
   * Konstruktor
   * @param data - dane wyskakującego okienka
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: PopupData) {
  }

  /**
   * Cykl życia obiektu
   */
  ngOnInit(): void {
  }

}
