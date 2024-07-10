import {Component, OnInit} from '@angular/core';
import {KLUCZE_LOCA_STORAGE, LocalStorageService} from '../../../serwisy/local-storage.service';

/**
 * Komponent ciasteczka
 */
@Component({
  selector: 'app-komunikat-cookie',
  templateUrl: './komunikat-cookie.component.html',
  styleUrls: ['./komunikat-cookie.component.scss']
})
export class KomunikatCookieComponent implements OnInit {

  ukryty = true;

  /**
   * Konstruktor
   * @param localStorageService - serwis localStorage
   */
  constructor(private localStorageService: LocalStorageService) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.ukryty = this.localStorageService.odczytajZeStorage(KLUCZE_LOCA_STORAGE.COOKIE_ZGODA) === 'TAK' ? true : false;
  }

  /**
   * Funckaj pozwala zamknąć komponent i zapamiętać stan
   */
  zamknij(): void {
    this.localStorageService.zapiszWStorage(KLUCZE_LOCA_STORAGE.COOKIE_ZGODA, 'TAK');
    this.ukryty = true;
  }

}
