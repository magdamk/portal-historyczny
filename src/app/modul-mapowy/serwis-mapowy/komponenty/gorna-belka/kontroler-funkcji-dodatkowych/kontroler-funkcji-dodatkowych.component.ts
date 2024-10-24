import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import {KontaktZAdministratoremDialogComponent} from '../../kontakt/kontakt-z-administratorem-dialog/kontakt-z-administratorem-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { KontaktZAdministratoremDialogComponent } from '../../kontakt/kontakt-z-administratorem-dialog/kontakt-z-administratorem-dialog.component';
import { PomocDialogComponent } from '../../pomoc/pomoc-dialog/pomoc-dialog.component';
// import {PomocDialogComponent} from '../../pomoc/pomoc-dialog/pomoc-dialog.component';

@Component({
  selector: 'mm-kontroler-funkcji-dodatkowych',
  templateUrl: './kontroler-funkcji-dodatkowych.component.html',
  styleUrls: ['./kontroler-funkcji-dodatkowych.component.scss']
})
export class KontrolerFunkcjiDodatkowychComponent implements OnInit {

  zmianaJezykaSubject?: BehaviorSubject<string>;

  /**
   * Konstruktor
   * @param dialog
   * @param tlumaczeniaService
   */
  constructor(public dialog: MatDialog,
    private tlumaczeniaService: TlumaczeniaService) {
    this.zmianaJezykaSubject = tlumaczeniaService.getZmianaJezykaSubject();
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
  }

  /**
   * Funkcja ładuje okno formularza kontaktowego z admnistratorem
   */
  pokazFormularzKontaktowy(): void {
    const dialogRef = this.dialog.open(KontaktZAdministratoremDialogComponent, {
      width: '642px',
      panelClass: 'um-dialog'
    });
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
   * Funkcja wywołuje zmianę języka
   */
  zmienJezyk(): void {
    this.tlumaczeniaService.przelaczJezyk();
  }

}
