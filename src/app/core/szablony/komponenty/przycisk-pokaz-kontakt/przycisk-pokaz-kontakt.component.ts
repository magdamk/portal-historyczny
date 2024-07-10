import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
// import {KontaktDialogComponent} from '../../../../funkcjonalnosci/kontakt/komponenty/kontakt-dialog/kontakt-dialog.component';
import {SzablonyService} from '../../serwisy/szablony.service';
// import {KontaktBelkaBocznaComponent} from '../../../../funkcjonalnosci/kontakt/komponenty/kontakt-belka-boczna/kontakt-belka-boczna.component';

/**
 * Komponent przycisku kontaktu
 */
@Component({
  selector: 'app-przycisk-pokaz-kontakt',
  templateUrl: './przycisk-pokaz-kontakt.component.html',
  styleUrls: ['./przycisk-pokaz-kontakt.component.scss']
})
export class PrzyciskPokazKontaktComponent {

  /**
   * Konstruktor
   * @param dialog - obsługa komponetu dialog
   * @param szablonyService - serwis szablonu
   */
  constructor(
    public dialog: MatDialog,
    private szablonyService: SzablonyService) {
  }

  /**
   * Funkcja wywołuje formularz kontaktowy w oknie
   */
  pokazKontaktDialog(): void {
    // const dialogRef = this.dialog.open(KontaktDialogComponent, {
    //   width: '642px',
    //   panelClass: 'um-dialog'
    // });
  }

  /**
   * Funkcja wywołuje formularz kontaktowy na belce bocznej
   */
  pokazKontaktBelkaBoczna(): void {
    // this.szablonyService.ustawKomponentBelkiBocznej(KontaktBelkaBocznaComponent);
  }

}
