import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GrupaWarstwPodkladowych } from '../../../modele/grupa-warstw-podkladowych';
// import {PRZYCISK_IKONA_TYP} from '../../../../wspolne/komponenty/przycisk-ikona/przycisk-ikona.component';
import { Subscription } from "rxjs";
// import {GlobalneZdarzeniaService} from '../../../serwisy/globalne-zdarzenia.service';
// import {TlumaczeniaService} from "../../../../core/tlumaczenia/serwisy/tlumaczenia.service";
import { Mapa } from '../../../modele/mapa';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/mm-tlumaczenia.service';
import { PRZYCISK_IKONA_TYP } from 'src/app/modul-mapowy/commons/komponenty/przycisk-ikona/przycisk-ikona.component';
import { GlobalneZdarzeniaService } from '../../../serwisy/globalne-zdarzenia.service';

/**
 * Komponent wyboru warstw podkladowych
 */
@Component({
  selector: 'mm-kontroler-warstw-podkladowych',
  templateUrl: './kontroler-warstw-podkladowych.component.html',
  styleUrls: ['./kontroler-warstw-podkladowych.component.scss']
})
export class KontrolerWarstwPodkladowychComponent implements OnInit, OnDestroy {

  @Input()
  grupyWarstwPodkladowych: GrupaWarstwPodkladowych[] = [];

  @Input()
  mapa?: Mapa;

  @Output()
  zmianaPodkladu = new EventEmitter<GrupaWarstwPodkladowych>();

  @Input()
  lokalizacjaMapPodkladowych: 'LEWA' | 'PRAWA' = 'LEWA';

  PRZYCISK_IKONA_TYP = PRZYCISK_IKONA_TYP;
  trybZaawansowany = false;
  indeksWybranejGrupy = 0;
  kolejnaGrupa?: GrupaWarstwPodkladowych;

  aktualnyJezyk = 'pl';
  tlumaczeniaSubscribtion?: Subscription;

  /**
   * Funkcja nasłuchuje zdarzenia click dla dokumentu
   * @param event - zdarzenie
   */
  @HostListener('document:click', ['$event'])
  dokumentKlik(event: any): void {
    const nodeName = event.target.nodeName;
    if (!this.eRef.nativeElement.contains(event.target) &&
      this.trybZaawansowany &&
      nodeName !== 'svg' && nodeName !== 'path' && nodeName !== 'MM-DRZEWO-WARSTW' && nodeName !== 'MM-STEROWANIE-MAPY') {
      this.trybZaawansowany = false;
      this.globalneZdarzenia.zglosZamkniecieOkienka();
    }
  }

  /**
   * Konstruktor
   * @param eRef - referencja do kompoentu
   */
  constructor(private eRef: ElementRef,
    private globalneZdarzenia: GlobalneZdarzeniaService,
    private tlumaczenia: TlumaczeniaService) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.ustawKolejnaGrupe();
    this.tlumaczeniaSubscribtion = this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
      this.aktualnyJezyk = jezyk;
    });
    if (this.mapa && this.mapa.domyslneWarstwyPodkladowe && this.grupyWarstwPodkladowych?.length > 0) {
      this.indeksWybranejGrupy = this.grupyWarstwPodkladowych.findIndex(g => g.uuid === this.mapa?.domyslneWarstwyPodkladowe?.uuidGrupaWarstw);
      this.indeksWybranejGrupy = this.indeksWybranejGrupy >= 0 ? this.indeksWybranejGrupy : 0;
      this.ustawKolejnaGrupe();
    }
  }


  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    if (this.tlumaczeniaSubscribtion) {
      this.tlumaczeniaSubscribtion.unsubscribe();
    }
  }


  /**
   * Funkcja ładuje kolejną grupę warstw
   */
  pokazKolejnaGrupeWarstw(): void {
    this.indeksWybranejGrupy = this.indeksKolejnejGrupy();
    this.ustawKolejnaGrupe();
    this.zmianaPodkladu.emit(this.grupyWarstwPodkladowych[this.indeksWybranejGrupy]);
  }

  /**
   * Funkcja ustawia tryb zawansowany wyboru warstw
   */
  ustawTrybZawnsowany(event: PointerEvent): void {
    this.trybZaawansowany = true;
    event.stopPropagation();
  }

  /**
   * Funkcja ustawia tryb prosty wyboru warstw
   */
  ustawTrybProsty(): void {
    this.trybZaawansowany = false;
  }

  /**
   * Funkcja wybiera konkretną grupę warstw
   * @param indeks - indeks grypy warstw
   */
  zaladujGrupeWarstw(indeks: number): void {
    this.indeksWybranejGrupy = indeks;
    this.ustawKolejnaGrupe();
    this.zmianaPodkladu.emit(this.grupyWarstwPodkladowych[this.indeksWybranejGrupy]);
  }

  /**
   * Funkcja wybiera konkretną warstwę z grupy
   * @param indeks - index warstwy w grupie
   */
  zaladujWarstweZGrupy(indeks: number): void {
    this.grupyWarstwPodkladowych[this.indeksWybranejGrupy].wybranaWarstwa = indeks;
    this.zmianaPodkladu.emit(this.grupyWarstwPodkladowych[this.indeksWybranejGrupy]);
  }

  /**
   * Funkcja ładuje do bufora koleją grupę warstw do wybrania w trybie prostym
   */
  private ustawKolejnaGrupe(): void {
    this.kolejnaGrupa = this.grupyWarstwPodkladowych[this.indeksKolejnejGrupy()];
  }

  /**
   * Funkcja ustala warstość indeksu kolejneg grupy do załadowania
   */
  private indeksKolejnejGrupy(): number {
    let indeksKolejnejGrupy = this.indeksWybranejGrupy + 1;
    if (this.grupyWarstwPodkladowych.length < indeksKolejnejGrupy + 1) {
      indeksKolejnejGrupy = 0;
    }
    return indeksKolejnejGrupy;
  }

}
