import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';


/**
 * Komponent dostosowujący formularz kontaktowy do dialogu
 */
@Component({
  selector: 'app-kontakt-dialog',
  templateUrl: './kontakt-dialog.component.html',
  styleUrls: ['./kontakt-dialog.component.scss']
})
export class KontaktDialogComponent implements OnInit {

  /**
   * Konstruktor
   * @param dialogRef - natywny serwis angular
   */
  constructor(public dialogRef: MatDialogRef<KontaktDialogComponent>) { }

  /**
   * Cykl życia kompnentu inicjalizacja
   */
  ngOnInit(): void {
  }

  /**
   * Zamknięcie dialogu
   */
  zamknijDialog(): void{
    this.dialogRef.close();
  }
}
