import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Map } from '../types/map';
import { OM } from '../types/om';
import { MAPVIEWER_KONFIGURACJA, OracleMapsService } from '../serwisy/oracle-maps.service';
import { Subscription } from 'rxjs';
import { KonfiguracjaModulMapowyAdapter } from "../../mm-core/providers/konfiguracja-adapter";

declare var OM: OM;

/**
 * Dyrektywa rysująca mapę mapviewera
 */
@Directive({
  selector: '[mmOracleMaps]'
})
export class OracleMapsDirective implements AfterViewInit, OnInit, OnDestroy {

  kontenerMapy?: ElementRef;
  mapView?: Map;

  @Output()
  mapaUtworzonaZmiana = new EventEmitter<Map>();

  ladowanieBibliotekiSubscription?: Subscription;

  /**
   * Konstruktor
   * @param el - referencja do komponentu
   * @param oracleMapsService - serwis ładujący bibliotekę js mapviewer
   */
  constructor(private el: ElementRef,
    private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private oracleMapsService: OracleMapsService) {
      console.log('oracle-maps directive constructor');
  }

  /**
   * Cykl życia kompnentu inicjalizacja
   */
  ngOnInit(): void {
    console.log('oracle-maps directive oninit');
  }

  /**
   * Cykl życia komponentu po załadowaniu widoku
   */
  ngAfterViewInit(): void {
    console.log('oracle-maps directive after view init');
    this.ladowanieBibliotekiSubscription = this.oracleMapsService.pobierzLadowanieBibliotekiSubject().subscribe((zaladowana) => {
      if (zaladowana) {
        this.zaladujMape();
      }
    });
    if (!this.oracleMapsService.pobierzLadowanieBibliotekiSubject().getValue()) {
      this.oracleMapsService.zaladujBiblioteke(this.konfiguracja.pobierzMapViewerUrl() + MAPVIEWER_KONFIGURACJA.BIBLIOTEKA_JS_PATH);
    } else {
      this.zaladujMape();
    }
  }

  /**
   * Cykl życia komponenu niszczenie
   */
  ngOnDestroy(): void {
    this.mapView?.destroyMap();
    this.ladowanieBibliotekiSubscription?.unsubscribe();
  }

  /**
   * Funkcja ładująca mapę
   */
  private zaladujMape(): void {
    OM.gv.setResourcePath(this.konfiguracja.pobierzMapViewerUrl() + MAPVIEWER_KONFIGURACJA.ZASOBY_SCIEZKA);
    OM.gv.setLogLevel('severe');
    const myUniverse = new OM.universe.Universe(
      {
        srid: 2178,
        bounds: new OM.geometry.Rectangle(7489860.71, 5773789.51, 7518549.17, 5803861.96, 2178),
        numberOfZoomLevels: 19
      });
    this.kontenerMapy = this.el.nativeElement;
    this.mapView = new OM.Map(this.kontenerMapy, {
      mapviewerURL: this.konfiguracja.pobierzMapViewerUrl(),
      wraparound: false,
      disableOverviewMap: true,
      autoLoadCss: true,
      universe: myUniverse
    });
    this.mapView.enableZoomAnimation(false);
    this.mapView.setZoomLevelRange(0, 18);
    this.mapView.init();
    this.mapaUtworzonaZmiana.emit(this.mapView);
  }
}
