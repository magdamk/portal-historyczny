import {Injectable} from '@angular/core';

export const KLUCZE_LOCA_STORAGE = {
  COOKIE_ZGODA: 'COOKIE_ZGODA',
  KOMUNIKAT: 'KOMUNIKAT',
  KOMUNIKAT_PORTALU_MAPOWEGO: 'KOMUNIKAT_PORTALU_MAPOWEGO'
}

/**
 * Serwis odpowiedzialny za przechowywanie danych w przeglądarce
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * Funkcja zapisuje do storage
   * @param klucz - klucz parametru
   * @param wartosc - wartość parametru
   */
  zapiszWStorage(klucz: string, wartosc: string): void {
    localStorage.setItem(klucz, wartosc);
  }

  /**
   * Funkcja odczytuje dane ze storage
   * @param klucz - klucz parametru
   */
  odczytajZeStorage(klucz: string): string | null {
    return localStorage.getItem(klucz);
  }
}
