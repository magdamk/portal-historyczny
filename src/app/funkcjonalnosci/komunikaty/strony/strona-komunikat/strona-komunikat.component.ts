import {Component, OnDestroy, OnInit} from '@angular/core';
import {KomunikatyService, KomunikatySystemowe} from '../../serwisy/komunikaty.service';
import {TlumaczeniaService} from "../../../../core/tlumaczenia/serwisy/tlumaczenia.service";
import {Subscription} from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


/**
 * Komponent strony komunikatu
 */
@Component({
  selector: 'app-strona-komunikat',
  templateUrl: './strona-komunikat.component.html',
  styleUrls: ['./strona-komunikat.component.scss']
})
export class StronaKomunikatComponent implements OnInit, OnDestroy {
  obecnyJezyk = '';
  daneKomunikatu: KomunikatySystemowe | undefined;
  tresc: SafeHtml|undefined;
  subskrybcja = new Subscription();

  /**
   * Konstruktor
   * @param komunikatyService - serwis komunikatów
   * @param tlumaczeniaService serwis do tłumaczeń
   */
  constructor(private komunikatyService: KomunikatyService,
              private dialogRef: MatDialog,
              private tlumaczeniaService: TlumaczeniaService,
              public sanitizer: DomSanitizer) {
  }

  /**
   * Cykl życia komponentu - inicjalizacja
   */
  ngOnInit(): void {
    this.obecnyJezyk = this.tlumaczeniaService.pobierzAktualnyJezyk();
    this.pobierzKomunikat();
    this.dialogRef.closeAll();
  }

  /**
   * Cykl życia komponentu - finalizacjań
   */
  ngOnDestroy(): void {
    this.subskrybcja.unsubscribe();
  }

  /**
   * Funkcja do pobierania komunikatu
   */
  private pobierzKomunikat(): void {
    this.subskrybcja = this.komunikatyService.getKomunikat$().subscribe(wartosc => {
      this.daneKomunikatu = wartosc;
      if (this.daneKomunikatu?.tresc) {
        this.tresc = this.sanitizer.bypassSecurityTrustHtml(this.daneKomunikatu.tresc);
      }
    });
  }

  /**
   * Funkcja pozwala zamknąć komunikat
   */
  zamknij(): void {
    this.komunikatyService.oznaczKomunikatJakoPrzeczytany(this.daneKomunikatu?.uuid);
  }

}
