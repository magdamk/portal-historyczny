import {Injectable} from '@angular/core';
import {TlumaczeniaService} from "../../core/tlumaczenia/serwisy/tlumaczenia.service";
import {
  KomunikatyAdapter,
  OpcjeKomunikatu
} from "../../core/adaptery/komunikaty-adapter";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {SnackbarData, SnackbarKomunikatComponent} from "../komponenty/snackbar-komunikat/snackbar-komunikat.component";
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KomunikatyProviderService implements KomunikatyAdapter {

  /**
   * Konstruktor
   * @param snackBar
   * @param tlumaczeniaSerwis
   */
  constructor(private snackBar: MatSnackBar, private tlumaczeniaSerwis: TlumaczeniaService, private router: Router) {
  }

  /**
   * Funkcja wyświetla komunikat sukcesu
   * @param wiadomoscLubKlucz
   * @param opcje
   */
  pokazKomunikatBledu(wiadomoscLubKlucz: string, opcje?: OpcjeKomunikatu): void {
    const snacbarRef = this.snackBar.openFromComponent(SnackbarKomunikatComponent, {
      ...opcje,
      duration: 1000000000000,
      panelClass: 'komunikaty-blad',
      verticalPosition: 'top',
      data: {
        tekst: this.tlumaczeniaSerwis.przetlumacz(wiadomoscLubKlucz),
        typ: 'ERROR',
      } as SnackbarData,
    });
    this.zamknijPoPrzekierowaniu(snacbarRef);
  }

  /**
   * Funkcja Wyświeta komunikat błędu
   * @param wiadomoscLubKlucz
   * @param opcje
   */
  pokazPomyslnyKomunikat(wiadomoscLubKlucz: string, opcje?: OpcjeKomunikatu): void {
    const snacbarRef = this.snackBar.openFromComponent(SnackbarKomunikatComponent, {
      ...opcje,
      duration: 1000000000000,
      panelClass: 'komunikaty-sukces',
      verticalPosition: 'top',
      data: {
        tekst: this.tlumaczeniaSerwis.przetlumacz(wiadomoscLubKlucz),
        typ: 'SUCCESS',
      } as SnackbarData,
    });
    this.zamknijPoPrzekierowaniu(snacbarRef);
  }


  /**
   * Funkcja obserwuje routing i w w razie potrzeby chowa komunikat
   * @param snackbar - obiekt snackbar
   */
  zamknijPoPrzekierowaniu(snackbar: MatSnackBarRef<SnackbarKomunikatComponent>): void {
    const sub = this.router.events
      .subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          snackbar.dismiss();
          sub.unsubscribe();
        }
      });
  }
}
