import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
// import {AktualizacjaZoomISrodkaEvent, AktualizujPozycjeKursoraEvent, MapaService} from '../../../serwisy/mapa.service';
import {Subscription} from 'rxjs';
// import {KonwerterGeometriUtils} from '../../../utils/konwerter-geometri-utils';
import {auditTime} from 'rxjs/operators';
// import {WysokoscService} from '../../../serwisy/wysokosc.service';
import { KonwerterGeometriUtils } from 'src/app/core/modele/konwerter-geometri-utils';
import { AktualizacjaZoomISrodkaEvent, AktualizujPozycjeKursoraEvent, MapaService } from '../../../serwisy/mapa.service';
import { WysokoscService } from '../../../serwisy/wysokosc.service';


@Component({
  selector: 'mm-pasek-stanu',
  templateUrl: './pasek-stanu.component.html',
  styleUrls: ['./pasek-stanu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasekStanuComponent implements OnInit, OnDestroy {

  @ViewChild('epsg2178') epsg2178Ref!: ElementRef;
  @ViewChild('epsg4326') epsg4326Ref!: ElementRef;
  @ViewChild('wysokoscNpm') wysokoscNpmRef!: ElementRef;
  @ViewChild('skala') skalaRef!: ElementRef;
  @ViewChild('skalaPasek') skalaPasekRef!: ElementRef;

  aktualizacjaKursoraSubscription: Subscription;
  aktualizacjaSklaiSubscription: Subscription;

  /**
   * Konstruktor
   * @param mapaService - serwis portalu mapowego
   * @param wysokoscService - serwis do obliczania wysokości npm
   */
  constructor(
    private mapaService: MapaService, private wysokoscService: WysokoscService
  ) {
    this.aktualizacjaKursoraSubscription = this.aktualizacjaKursoraSubscription = mapaService.pobierzSubjectAktualizacjiKursora()
      .pipe(auditTime(80))
      .subscribe(event => {
        this.aktualizujPozycjeKursora(event);
        this.aktualizujWysokoscNpm(event);
      });
    this.aktualizacjaSklaiSubscription = mapaService.pobierzSubjectAktualizacjiZoomISrodek()
      .subscribe(event => {
        this.aktualizujWidokSkali(event);
        this.aktualizujWidokPasekSkali(event);
      });
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.aktualizacjaKursoraSubscription.unsubscribe();
    this.aktualizacjaSklaiSubscription.unsubscribe();
  }

  /**
   * Funkcja aktualizuje informację o pozycji kursora na pasku
   * @param event - zdarzenie z pozycją kursora
   */
  private aktualizujPozycjeKursora(event: AktualizujPozycjeKursoraEvent | undefined): void {
    if (event) {
      this.aktualizujWidokEpsg2178(event);
      this.aktualizujWidokEpsg4326(event);
    }
  }

  /**
   * Funkcja aktualizuje widok dla pozycji myszki w układzie EPSG2178
   * @param event - zadarzenie
   */
  private aktualizujWidokEpsg2178(event: AktualizujPozycjeKursoraEvent): void {
    if (this.epsg2178Ref && event.punktNaMapie) {
      this.epsg2178Ref.nativeElement.innerHTML =
        `X: ${KonwerterGeometriUtils.formatujDoCalkowitych(event.punktNaMapie.getY())}
          Y: ${KonwerterGeometriUtils.formatujDoCalkowitych(event.punktNaMapie.getX())}`;
    }
  }

  /**
   * Funkcja aktualizuje widok dla pozycji myszki w układzie EPSG4326
   * @param event - zadarzenie
   */
  private aktualizujWidokEpsg4326(event: AktualizujPozycjeKursoraEvent): void {
    if (this.epsg2178Ref && event.punktNaMapie) {
      const punkt = KonwerterGeometriUtils.EPSG2178toEPSG4326(event.punktNaMapie.getX(), event.punktNaMapie.getY());
      this.epsg4326Ref.nativeElement.innerHTML = `B: ${punkt?.y.toFixed(6)} L: ${punkt?.x.toFixed(6)}`;
    }
  }

  /**
   * Funkcja aktualizuje widok skali liczbowej
   * @param event - zdarzenie
   */
  private aktualizujWidokSkali(event: AktualizacjaZoomISrodkaEvent | undefined): void {
    if (event?.skala && this.skalaRef) {
      this.skalaRef.nativeElement.innerHTML = `1:${Math.round(event.skala)}`;
    }
  }

  /**
   * Funkcja aktualizuje widok paska skali
   * @param event - zdarzenie
   */
  private aktualizujWidokPasekSkali(event: AktualizacjaZoomISrodkaEvent | undefined): void {
    if (event?.pasekSkali && this.skalaRef) {
      const element = (event.pasekSkali as any).$DecorationDiv[0];
      element.style.position = 'relative';
      this.skalaPasekRef.nativeElement.innerHTML = element.innerHTML;
    }
  }

  /**
   * Funcka aktualizuje widok informacji o wysokości n.p.m
   * @param event
   */
  private aktualizujWysokoscNpm(event: AktualizujPozycjeKursoraEvent | undefined): void {
    if (event?.punktNaMapie && this.skalaRef) {
      const wysokosc = this.wysokoscService.pobierzWysokoscNPM(event.punktNaMapie.getX(), event.punktNaMapie.getY());
      this.wysokoscNpmRef.nativeElement.innerHTML = `H: ${wysokosc ? wysokosc : '--'} m n.p.m.`;
    }
  }

}
