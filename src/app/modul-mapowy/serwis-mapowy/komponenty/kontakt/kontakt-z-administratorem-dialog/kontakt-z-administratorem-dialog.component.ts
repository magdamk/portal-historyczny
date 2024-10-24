import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mm-kontakt-z-administratorem-dialog',
  templateUrl: './kontakt-z-administratorem-dialog.component.html',
  styleUrls: ['./kontakt-z-administratorem-dialog.component.scss']
})
export class KontaktZAdministratoremDialogComponent implements OnInit {

  /**
   * Konstruktor
   * @param dialogRef
   */
  constructor(public dialogRef: MatDialogRef<KontaktZAdministratoremDialogComponent>) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
  }

  /**
   * Funkcja zamyka formularz kontaktowy
   */
  zamknijDialog(): void {
    this.dialogRef.close();
  }

}
