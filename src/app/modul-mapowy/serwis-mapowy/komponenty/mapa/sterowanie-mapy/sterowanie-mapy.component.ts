import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { KonwerterGeometriUtils } from '../../../utils/konwerter-geometri-utils';
import { Punkt } from '../../../modele/punkt';
import { MapaUtils } from '../../../utils/mapa-utils';
import { OM } from '../../../../oracle-maps/types/om';
import { Map } from '../../../../oracle-maps/types/map';
import { MarkerLayer } from '../../../../oracle-maps/types/marker-layer';
import { MapMarker } from '../../../../oracle-maps/types/map-marker';
import { MapaSpinnerComponent } from '../mapa-spinner/mapa-spinner.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
// import { InterfejsUzytkownikaStan } from '../../../../stan/interfejs-uzytkownika/interfejs-uzytkownika.reducer';
import { debounceTime, tap } from 'rxjs/operators';
// import { NarzedziaState } from '../../../../stan/narzedzia/narzedzia.reducer';
// import { NARZEDZIA_STERUJACE_ID } from '../../../../stan/narzedzia/narzedzia.const';
import { DomyslneKomunikatyModulMapowyAdapter, KomunikatyModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/komunikaty-adapter';
import { AktualizacjaKomponentuService } from 'src/app/modul-mapowy/commons/serwisy/aktualizacja-komponentu.service';
import { SterowanieMapyService } from '../../../serwisy/sterowanie-mapy.service';

declare var OM: OM;

export interface LokalizacjaUzytkownikaEvent {
  pozycja: Punkt;
}

/**
 * Komponent sterowania mapą
 */
@Component({
  selector: 'mm-sterowanie-mapy',
  templateUrl: './sterowanie-mapy.component.html',
  styleUrls: ['./sterowanie-mapy.component.scss'],
  providers:[{ provide: KomunikatyModulMapowyAdapter, useClass: DomyslneKomunikatyModulMapowyAdapter },]
})
export class SterowanieMapyComponent implements OnInit, OnDestroy {

  @Input()
  mapView?: Map;

  @Input()
  sterowanieMapyWidoczne = true;

  @Input()
  udostepnionaLokalizacja?: Punkt;

  warstwaUzytkownika?: MarkerLayer;
  markerUzytkownika?: MapMarker;

  spinnerRef?: MatDialogRef<MapaSpinnerComponent>;
  // interfejsUzytkownika$: Observable<InterfejsUzytkownikaStan>;
  // narzedzia$: Observable<NarzedziaState>;

  lokalizacjaUzytkownikaSubscription?: Subscription;

  subscriptions$ = new Subscription();
  marginesDolnyWlaczony = false;

  /**
   * Konstruktor
   * @param snackBar
   */
  constructor(
    private store: Store<{ modulMapowy: any }>,
    private dialog: MatDialog,
    private sterowanieMapy: SterowanieMapyService,
    private komunikaty: KomunikatyModulMapowyAdapter,
    private aktualizacjaKomponentu: AktualizacjaKomponentuService,
    private eref: ElementRef) {
      console.log('sterowanie-mapy konstruktor',this.mapView);
    // this.interfejsUzytkownika$ = store.select('modulMapowy', 'interfejsUzytkownika');
    // this.narzedzia$ = store.select('modulMapowy', 'narzedzia');
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.przygotujWarstweDlaLokalizacjiUzytkowika();
    this.obslugaSpinnera();
    this.subscriptions$.add(this.sterowanieMapy.pobierszSubjectZmianyLokalizacjiUzytkownika().subscribe(punkt => {
      this.ustawPozycjeUzytkonikaWWidokuMapy(punkt);
    }));
    this.subscriptions$.add(this.sterowanieMapy.pobierzSubjectWidocznosciSpinner().subscribe(widoczny => {
      this.ustawWidocznoscSpinnera(widoczny);
    }));
    if (this.udostepnionaLokalizacja) {
      this.ustawMarkerUdostepnionejLokalizacji(this.udostepnionaLokalizacja);
    }
    this.ustawMarginesDolny();
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  /**
   * Funkcja ustawia margines dla przycisków w przypadku widocznej wyszukiwarki nieruchomości
   */
  private ustawMarginesDolny() {
    // this.subbscriptions$.add(this.narzedzia$.subscribe(stan => {
    //   this.marginesDolnyWlaczony = stan.narzedziaSterujace[0].id === NARZEDZIA_STERUJACE_ID.NIERUCHOMOSCI;
    // }
    // ));
  }


  /**
   * Funkcja zarządza spinnerem mapy
   */
  obslugaSpinnera() {
    this.subscriptions$.add(this.pobierzZdarzeniaZoom()
      .pipe(tap(wlaczenieSpinnera => {
        if (!wlaczenieSpinnera) {
          this.ukryjSpinner();
        }
      }))
      .pipe(debounceTime(750))
      .subscribe(wlaczenieSpinnera => {
        if (wlaczenieSpinnera) {
          this.pokazSpinner();
        }
      }));

  }

  /**
   * Funkcja obsługuje zdarzenia scrollowania na mapie
   */
  private pobierzZdarzeniaZoom(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.mapView?.addListener(OM.event.MapEvent.MAP_AFTER_REFRESH, (event) => {
        subscriber.next(false);
      });

      this.mapView?.addListener(OM.event.MapEvent.MAP_AFTER_ZOOM, (event) => {
        subscriber.next(true);
        setTimeout(() => {
          subscriber.next(false);
        }, 10000);
      });
    });
  }

  /**
   * Funkcja ustala lokalizację użytkownika
   */
  mojaLokalizacja(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((event) => {
        const pozycja = KonwerterGeometriUtils.EPSG4326toEPSG2178(event.coords.longitude, event.coords.latitude);
        if (pozycja && MapaUtils.czyPunktWZasieguPrzestrzennymMapy(pozycja)) {
          this.sterowanieMapy.ustawLokalizacjeUzytkonika(pozycja);
          this.ustawPozycjeUzytkonikaWWidokuMapy(pozycja);
        } else {
          this.komunikaty.pokazKomunikatBledu('codes.obsluga-map.brak-obslugi-lokalizacji', {
            duration: 5000,
            verticalPosition: 'top'
          });
        }
      },
        error => this.komunikaty.pokazKomunikatBledu('codes.obsluga-map.blad-pobrania-lokalizacja', { duration: 5000 }));
    } else {
      this.komunikaty.pokazKomunikatBledu('codes.obsluga-map.brak-obslugi-lokalizacji', {
        duration: 5000,
        verticalPosition: 'top'
      });
    }
  }

  /**
   * Funkcja resetuje ustawienia mapy
   */
  srodekMapy(): void {
    const srodekMapy = MapaUtils.domyslnySrodekMap();
    this.mapView?.setMapCenterAndZoomLevel(new OM.geometry.Point(srodekMapy.x, srodekMapy.y, srodekMapy.srid),
      MapaUtils.domyslnyZoom(), true);
  }

  /**
   * Funkcja zwiękrza zoom
   */
  przybliz(): void {
    this.mapView?.zoomIn();
  }

  /**
   * Funkcja zmniejsza zoom
   */
  oddal(): void {
    this.mapView?.zoomOut();
  }

  /**
   * Funkcja ustawia pozycję i marker użytkownika
   * @param event - event
   */
  ustawPozycjeUzytkonikaWWidokuMapy(pozycja: Punkt): void {
    this.ustawMarkerUzytkowikaWWidokuMapy(pozycja);
    this.ustawSrodekMapy(pozycja);
  }

  /**
   * Funkcja tworzy warstwe dla lokalizacji użytkownika
   */
  private przygotujWarstweDlaLokalizacjiUzytkowika() {
    this.warstwaUzytkownika = new OM.layer.MarkerLayer('warstwa-markerow');
    this.mapView?.addLayer(this.warstwaUzytkownika);
  }


  /**
   * Funkcja tworzy/aktualizuje marker uzytkownika
   * @param pozycja - pozycja
   */
  private ustawMarkerUzytkowikaWWidokuMapy(pozycja: Punkt): void {
    if (this.markerUzytkownika) {
      this.markerUzytkownika.setPosition(pozycja.x, pozycja.y, pozycja.srid);
    } else {
      this.markerUzytkownika = new OM.MapMarker({
        id: 'marker-uzytkownika',
        renderingStyle: new OM.style.Marker({
          src: 'assets/ikony/lokalizacja_uzytkownika.svg',
          width: 20,
          height: 20,
          styleName: ''
        }),
        position: { x: pozycja.x, y: pozycja.y, srid: pozycja.srid }
      });
      this.warstwaUzytkownika?.addMapMarker(this.markerUzytkownika);
    }
  }

  /**
   * Funkcja tworzy/aktualizuje marker uzytkownika
   * @param pozycja - pozycja
   */
  private ustawMarkerUdostepnionejLokalizacji(pozycja: Punkt): void {
    const marker = new OM.MapMarker({
      id: 'marker-uzytkownika',
      renderingStyle: new OM.style.Marker({
        src: 'assets/ikony/moja_lokalizacja.svg',
        width: 40,
        height: 50,
        yOffset: -25,
        styleName: ''
      }),
      position: { x: pozycja.x, y: pozycja.y, srid: pozycja.srid }
    });
    this.warstwaUzytkownika?.addMapMarker(marker);
  }

  /**
   * Funkcja ustawia widocznosc spinnera
   * @param widoczny
   */
  private ustawWidocznoscSpinnera(widoczny: boolean) {
    if (widoczny) {
      this.pokazSpinner();
      return;
    }
    this.ukryjSpinner();
  }

  /**
   * Funkcja pokazuje spinner
   */
  private pokazSpinner() {
    if (this.spinnerRef?.componentInstance) {
      return;
    }
    this.spinnerRef = this.dialog.open(MapaSpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.aktualizacjaKomponentu.wymusAktualizacjeKomponentu(this.eref);
  }

  /**
   * Funkcja ukrywa spinner
   */
  private ukryjSpinner() {
    if (this.spinnerRef && this.spinnerRef.componentInstance) {
      this.spinnerRef.close();
      this.aktualizacjaKomponentu.wymusAktualizacjeKomponentu(this.eref);
    }
  }

  /**
   * Funkcja ustawia środek mapy
   * @param pozycja
   */
  private ustawSrodekMapy(pozycja: Punkt) {
    this.mapView?.setMapCenter(new OM.geometry.Point(pozycja.x, pozycja.y, 2178), true);
  }
}
