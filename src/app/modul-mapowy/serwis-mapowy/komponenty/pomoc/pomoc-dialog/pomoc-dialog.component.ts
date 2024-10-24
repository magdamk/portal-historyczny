import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mm-pomoc-dialog',
  templateUrl: './pomoc-dialog.component.html',
  styleUrls: ['./pomoc-dialog.component.scss']
})
export class PomocDialogComponent {
  /**
   * Konstruktor
   * @param dialogRef
   */
  constructor(public dialogRef: MatDialogRef<PomocDialogComponent>) {
  }

  /**
   * Funkcja pozwala zamknąć dialog
   */
  zamknijDialog(): void {
    this.dialogRef.close();
  }
}
