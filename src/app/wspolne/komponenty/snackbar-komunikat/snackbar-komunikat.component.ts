import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

export interface SnackbarData {
  tekst: string;
  typ: 'SUCCESS' | 'ERROR'
}

/**
 * Implementacja komuniaktu
 */
@Component({
  selector: 'app-snackbar-komunikat',
  templateUrl: './snackbar-komunikat.component.html',
  styleUrls: ['./snackbar-komunikat.component.scss']
})
export class SnackbarKomunikatComponent implements OnInit {

  /**
   * Konstruktor
   * @param data - dane komunikatu
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
              public snackBarRef: MatSnackBarRef<SnackbarKomunikatComponent>) {
  }

  /**
   * Cykl życia obiektu
   */
  ngOnInit(): void {
  }

  /**
   * Funkcja zamyka komunikat
   */
  zamknij() {
    this.snackBarRef.dismiss();
  }

}
