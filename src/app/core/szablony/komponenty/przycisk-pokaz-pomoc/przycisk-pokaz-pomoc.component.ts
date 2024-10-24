import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
// import {PomocDialogComponent} from '../../../../funkcjonalnosci/pomoc/komponenty/pomoc-dialog/pomoc-dialog.component';
import {SzablonyService} from '../../serwisy/szablony.service';
import { PomocDialogComponent } from 'src/app/modul-mapowy/serwis-mapowy/komponenty/pomoc/pomoc-dialog/pomoc-dialog.component';
import { PomocBelkaBocznaComponent } from 'src/app/funkcjonalnosci/pomoc/pomoc-belka-boczna/pomoc-belka-boczna.component';
// import { PomocBelkaBocznaComponent } from 'src/app/modul-mapowy/serwis-mapowy/komponenty/pomoc/pomoc-belka-boczna/pomoc-belka-boczna.component';
// import {PomocBelkaBocznaComponent} from '../../../../funkcjonalnosci/pomoc/komponenty/pomoc-belka-boczna/pomoc-belka-boczna.component';

/**
 * Komponent przycisku pomocy
 */
@Component({
  selector: 'app-przycisk-pokaz-pomoc',
  templateUrl: './przycisk-pokaz-pomoc.component.html',
  styleUrls: ['./przycisk-pokaz-pomoc.component.scss']
})
export class PrzyciskPokazPomocComponent {

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
   * Funkcja wywołuje formularz pomocy w oknie
   */
  pokazPomocDialog(): void {
    const dialogRef = this.dialog.open(PomocDialogComponent, {
      width: '1170px',
      panelClass: 'um-dialog'
    });
  }

  /**
   * Funkcja wywołuje formularz pomocy na belce bocznej
   */
  pokazPomocBelkaBoczna(): void {
    this.szablonyService.ustawKomponentBelkiBocznej(PomocBelkaBocznaComponent);
  }

}
