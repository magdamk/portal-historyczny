import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
// import {KomunikatSzczegolyOpenDto} from "../../../../../build/openapi_modul_mapowy_public";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

export interface KomunikatSzczegolyOpenDto {
  uuid?: string;
  tresc?: string;
}

@Component({
  selector: 'app-informacja-popup',
  templateUrl: './informacja-popup.component.html',
  styleUrls: ['./informacja-popup.component.scss']
})
export class InformacjaPopupComponent {

  komunikat: KomunikatSzczegolyOpenDto;
  tresc: SafeHtml='';

  /**
   * Konstruktor
   * @param dialogRef referencja do popup
   * @param data dane wejsciowe
   * @param sanitizer serwis zabezpieczajacy kod
   */
  constructor(public dialogRef: MatDialogRef<InformacjaPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: KomunikatSzczegolyOpenDto,
              public sanitizer: DomSanitizer) {
    this.komunikat = data;
    if (data?.tresc) {
      this.tresc = this.sanitizer.bypassSecurityTrustHtml(data.tresc);
    }
  }

  /**
   * Przycisk wywolywany podczas anulowania lub zamykania dialogu
   */
  zamknijOkno() {
    this.dialogRef.close(this.komunikat);
  }

}
