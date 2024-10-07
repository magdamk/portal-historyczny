import {MatSnackBar} from '@angular/material/snack-bar';
// import {TlumaczeniaService} from '../tlumaczenia/serwisy/tlumaczenia.service';
import {Injectable} from '@angular/core';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';

/**
 * Obiekt zawierający ustawienia komunikatu
 */
export interface OpcjeKomunikatu {
  duration?: number;
  verticalPosition?: 'bottom' | 'top' | undefined;
  zamknijPoPrzekierowaniu?: boolean;
}

/**
 * Interfejs definuje klase komunikatów wyświetlanych użytkownikowi
 */
export interface KomunikatyAdapter {

  /**
   * Funkcja wyświetla komunikat sukcesu
   * @param wiadomoscLubKlucz
   * @param opcje
   */
  pokazPomyslnyKomunikat(wiadomoscLubKlucz: string, opcje?: OpcjeKomunikatu): void;

  /**
   * Funkcja Wyświeta komunikat błędu
   * @param wiadomoscLubKlucz
   * @param opcje
   */
  pokazKomunikatBledu(wiadomoscLubKlucz: string, opcje?: OpcjeKomunikatu): void;
}

export abstract class KomunikatyModulMapowyAdapter implements KomunikatyAdapter {

  /**
   * Funkcja wyświetla komunikat sukcesu
   * @param wiadomoscLubKlucz
   * @param opcje
   */
  abstract pokazPomyslnyKomunikat(wiadomoscLubKlucz: string, opcje?: OpcjeKomunikatu): void;

  /**
   * Funkcja Wyświeta komunikat błędu
   * @param wiadomoscLubKlucz
   * @param opcje
   */
  abstract pokazKomunikatBledu(wiadomoscLubKlucz: string, opcje?: OpcjeKomunikatu): void;
}

/**
 * Domyslna implementacj wyswietlajaca komunikaty dla użytkownika
 */
@Injectable()
export class DomyslneKomunikatyModulMapowyAdapter extends KomunikatyModulMapowyAdapter {

  /**
   * Konstruktor
   * @param snackBar
   * @param tlumaczeniaSerwis
   */
  constructor(private snackBar: MatSnackBar, private tlumaczeniaSerwis: TlumaczeniaService) {
    super();
  }

  /**
   * Funkcja wyświetla komunikat sukcesu
   * @param wiadomoscLubKlucz
   * @param opcje
   */
  pokazKomunikatBledu(wiadomoscLubKlucz: string, opcje?: OpcjeKomunikatu): void {
    this.snackBar.open(this.tlumaczeniaSerwis.przetlumacz(wiadomoscLubKlucz), '', {...opcje, panelClass: 'komunikaty-blad'});
  }

  /**
   * Funkcja Wyświeta komunikat błędu
   * @param wiadomoscLubKlucz
   * @param opcje
   */
  pokazPomyslnyKomunikat(wiadomoscLubKlucz: string, opcje?: OpcjeKomunikatu): void {
    this.snackBar.open(this.tlumaczeniaSerwis.przetlumacz(wiadomoscLubKlucz), '', {...opcje, panelClass: 'komunikaty-sukces'});
  }

}
