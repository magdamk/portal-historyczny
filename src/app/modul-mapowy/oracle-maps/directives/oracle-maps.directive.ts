import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Map } from '../types/map';
import { OM } from '../types/om';
import { MAPVIEWER_KONFIGURACJA, OracleMapsService } from '../serwisy/oracle-maps.service';
import { Subscription } from 'rxjs';
import { KonfiguracjaModulMapowyAdapter } from "../../mm-core/providers/konfiguracja-adapter";
import { environment } from 'src/environments/environment';

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
      // console.log('oracle-maps directive constructor');
  }

  /**
   * Cykl życia kompnentu inicjalizacja
   */
  ngOnInit(): void {
    // console.log('oracle-maps directive oninit');
  }

  /**
   * Cykl życia komponentu po załadowaniu widoku
   */
  ngAfterViewInit(): void {
    // console.log('oracle-maps directive after view init');
    this.ladowanieBibliotekiSubscription = this.oracleMapsService.pobierzLadowanieBibliotekiSubject().subscribe((zaladowana) => {
      if (zaladowana) {
        this.zaladujMape();
      }
    });
    if (!this.oracleMapsService.pobierzLadowanieBibliotekiSubject().getValue()) {
    // this.oracleMapsService.zaladujBiblioteke(this.konfiguracja.pobierzMapViewerUrl() + MAPVIEWER_KONFIGURACJA.BIBLIOTEKA_JS_PATH);
    this.oracleMapsService.zaladujBiblioteke('assets/js/oraclemapsv2_svg.js');
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
    // console.log('oracle-maps directive zaladujMape');
    OM.gv.setResourcePath(environment.mapViewerUrl + MAPVIEWER_KONFIGURACJA.ZASOBY_SCIEZKA);
    OM.gv.setLogLevel('severe');

    var ngSrid = 2178;
    var config = {
        srid: ngSrid,
        bounds: new OM.geometry.Rectangle(7340000.0, 5700000.0, 7670000.0, 5890000.0, ngSrid),
        zoomLevels: [
            {
                "resolution": 270.9333333333333,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 135.46666666666664,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 67.73333333333332,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 33.86666666666666,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 16.93333333333333,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 8.466666666666665,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 6.614583333333333,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 4.2333333333333325,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 3.175,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 2.1166666666666663,
                "stretchRatio": 1,
                "infotip": "",
                "distancePerPixel": 2.1166666666666663
            },
            {
                "resolution": 1.5875,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 1.3229166666666667,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 1.0583333333333331,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 0.79375,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 0.5291666666666666,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 0.2645833333333333,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 0.13229166666666664,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 0.06614583333333332,
                "stretchRatio": 1,
                "infotip": ""
            },
            {
                "resolution": 0.03307291666666665,
                "stretchRatio": 1,
                "infotip": ""
            }
        ],
        numberOfZoomLevels: 19
    };
    // const myUniverse = new OM.universe.Universe(
    //   {
    //     srid: 2178,
    //     bounds: new OM.geometry.Rectangle(7489860.71, 5773789.51, 7518549.17, 5803861.96, 2178),
    //     numberOfZoomLevels: 19
    //   });
    this.kontenerMapy = this.el.nativeElement;
    this.mapView = new OM.Map(this.kontenerMapy, {
      mapviewerURL: environment.mapViewerUrl,
      wraparound: false,
      disableOverviewMap: true,
      autoLoadCss: true,
      universe: new OM.universe.Universe(config)
    });
    this.mapView.enableZoomAnimation(false);
    this.mapView.setZoomLevelRange(0, 18);
    // console.log('oracle-maps directive zaladujMape',this.mapView);
    this.mapaUtworzonaZmiana.emit(this.mapView);
  }
}
