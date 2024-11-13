import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Point } from 'src/app/core/modele/point';
import { DostepneWarstwyModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/dostepne-warstwy-adapter';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { Feature } from 'src/app/modul-mapowy/oracle-maps/types/feature';
import { Filter } from 'src/app/modul-mapowy/oracle-maps/types/filter';
import { Layer } from 'src/app/modul-mapowy/oracle-maps/types/layer';
import { MarkerLayer } from 'src/app/modul-mapowy/oracle-maps/types/marker-layer';
import { VectorLayer } from 'src/app/modul-mapowy/oracle-maps/types/vector-layer';
import { Mapa } from '../../../modele/mapa';
import { Warstwa, TypWarstwy } from '../../../modele/warstwa';
import { MapaService, TYPY_ZDARZEN_MYSZY, KlikniecieNaMapieEvent } from '../../../serwisy/mapa.service';
import { ObiektyMapyService, InformacjeOObiekcieEvent } from '../../../serwisy/obiekty-mapy.service';
import { KonwerterGeometriUtils } from '../../../utils/konwerter-geometri-utils';
import { LegendaUtils } from '../../../utils/legenda-utils';
import { ObiektyMapyUtils, TABLICA_ZASIEGOW_DLA_ZOOM } from '../../../utils/obiekty-mapy-utils';
import { StyleZaznaczaniaObiektowUtils } from '../../../utils/style-zaznaczania-obiektow-utils';
import { WarstwaUtils } from '../../../utils/warstwa-utils';
import { RozmiaryOknaMapy } from '../informacje-o-obiekcie/informacje-o-obiekcie.component';
import {OM} from '../../../../oracle-maps/types/om';
import {Map as OMap} from '../../../../oracle-maps/types/map';
declare var OM: OM;

export const NAZWA_WARSTWY_TYMCZASOWEJ = 'warstwa-obiektow-wyszukiwanych';
const WARSTWA_WYSZUKANYCH_OBIEKTOW = 'warstwa-wyszukanych-obiektow';

@Component({
  selector: 'mm-wyszukane-obiekty-i-lokalizacje',
  templateUrl: './wyszukane-obiekty-i-lokalizacje.component.html',
  styleUrls: ['./wyszukane-obiekty-i-lokalizacje.component.scss']
})
export class WyszukaneObiektyILokalizacjeComponent implements OnInit, OnDestroy {

  subskrypcje$ = new Subscription();

  warstwaDoZaznaczenia?: Warstwa;

  rozmiaryOknaMapy?: RozmiaryOknaMapy;

  warstwaObiektow?: MarkerLayer;
  markerObiektu?: Feature;

  warstwaPoligonow?: VectorLayer;
  poligonObiektu?: Feature;

  lokalizacjaObiektuWidoczna = false;

  aktualieWybranaMapa?: string;

  @Input()
  mapView?: OMap;

  @Input()
  mapa?: Mapa;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.aktualizujRozmiarOknaMapy();
  }

  /**
   * Konstruktor
   * @param obiiektyMapySerwis
   * @param widoczneWarstwy
   * @param konfiguracja
   * @param legendaSerwis
   */
  constructor(private obiiektyMapySerwis: ObiektyMapyService,
              private mapaSerwis: MapaService,
              private widoczneWarstwy: DostepneWarstwyModulMapowyAdapter,
              private konfiguracja: KonfiguracjaModulMapowyAdapter) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.aktualizujRozmiarOknaMapy();
    this.subskrypcje$.add(this.obiiektyMapySerwis.pobierzSubjectInformacjiOObiekcie().subscribe(event => {
      if (this.mapa?.uuid === this.aktualieWybranaMapa) {
        this.pokazObiektNaIstniejacejWarstwie(event);
        this.pokazObiektNaWarstwieTymczasowej(event);
      }
    }));
    this.subskrypcje$.add(this.obiiektyMapySerwis.pobierzSubjectInformacjiOLokalizacji().subscribe(event => {
      if (this.mapa?.uuid === this.aktualieWybranaMapa) {
        this.pokazLokalizacjeWyszukanegoObiektu(event);
      }
    }));
    this.subskrypcje$.add(this.obiiektyMapySerwis.pobierzSubjectDodawaniaObiektu().subscribe(event => {
      if (this.mapa?.uuid === this.aktualieWybranaMapa) {
        this.pokazObiektNaNowejWarstwieWLegedzie(event);
      }
    }));
    this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectZdarzenMyszyNaMapie().subscribe((zdarzenie) => {
      if (zdarzenie.typEventu == TYPY_ZDARZEN_MYSZY.LEWY_KLIK ||
        zdarzenie.typEventu === TYPY_ZDARZEN_MYSZY.PRAWY_KLIK ||
        zdarzenie.typEventu === TYPY_ZDARZEN_MYSZY.TAPNIECIE ||
        zdarzenie.typEventu === TYPY_ZDARZEN_MYSZY.PRZYTRZYMANIE) {
        this.usunPinezkeZMapy();
        this.sprawdzCzyUsunacWarstweTymczasowa(zdarzenie);
      }
    }));
    this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectAktualizacjiWarstwy().subscribe(mapa => {
      this.aktualieWybranaMapa = mapa?.uuid;
      this.przeniesWarstwyWyszukanychObiektowNaWierzch();
    }));
    this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectUsuwaniaWarstwy().subscribe(() => {
      this.przeniesWarstwyWyszukanychObiektowNaWierzch();
    }));
    this.mapView?.addListener(OM.event.MapEvent.MAP_AFTER_ZOOM, (event) => {
      if (this.warstwaDoZaznaczenia) {
        this.warstwaDoZaznaczenia = undefined;
        this.przeniesWarstwyWyszukanychObiektowNaWierzch();
      }
    })
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subskrypcje$.unsubscribe();
    this.wyczyscInformacjeOObiekcie();
  }

  /**
   * Funkcja wyświetla lokalizacje wyszukanego obiektu
   * @param obiekt
   */
  pokazLokalizacjeWyszukanegoObiektu(obiekt?: InformacjeOObiekcieEvent) {
    this.wyczyscInformacjeOObiekcie();
    this.pokazLokalizacjeObiektu(obiekt)
  }

  /**
   * Funkcja pobiera warstwę dla wyszukanego obiektu i dodaje do mapy jako tymczasową
   * @param obiekt
   */
  pokazObiektNaWarstwieTymczasowej(obiekt?: InformacjeOObiekcieEvent) {
    if (!obiekt?.obiekt?.uuidWarstwy || obiekt.warstwa) {
      return;
    }
    this.wyczyscInformacjeOObiekcie();
    this.widoczneWarstwy.pobierzWidocznaWarstweLubKatalog(obiekt.obiekt.uuidWarstwy)
      .pipe(take(1))
      .subscribe(warstwa => {
        if (warstwa) {
          obiekt.warstwa = warstwa;
          this.dodajWarstwetymczasowaDlaWyszukanegoObiektu(warstwa);
          this.pokazLokalizacjeObiektu(obiekt);
        }
      })
  }

  /**
   * Funkcja pobiera warstwę i dodaje do legendy
   * @param obiekt
   */
  pokazObiektNaNowejWarstwieWLegedzie(obiekt?: InformacjeOObiekcieEvent) {
    if (!obiekt?.obiekt?.uuidWarstwy) {
      return
    }
    this.wyczyscInformacjeOObiekcie();
    this.widoczneWarstwy.pobierzWidocznaWarstweLubKatalog(obiekt.obiekt.uuidWarstwy)
      .pipe(take(1))
      .subscribe(warstwa => {
        if (warstwa) {
          if (warstwa.szczegolyWarstwy) {
            warstwa.szczegolyWarstwy.minSkalaWidocznosci = 0;
            warstwa.szczegolyWarstwy.maksSkalaWidocznosci = 18;
          }
          this.warstwaDoZaznaczenia = warstwa;
          warstwa.uuidMapa = `root.${warstwa.uuid}`;
          obiekt.warstwa = warstwa;
          this.pokazLokalizacjeObiektu(obiekt);
        }
      })
  }

  /**
   * Funkcja pokazuje wyszukany obiekt na istniejacej warstwie
   * @param obiekt
   */
  pokazObiektNaIstniejacejWarstwie(obiekt?: InformacjeOObiekcieEvent) {
    if (obiekt?.obiekt?.lokalizacja && obiekt.warstwa) {
      if (!obiekt.warstwa.parametrySterujace?.widoczna) {
        this.warstwaDoZaznaczenia = obiekt.warstwa;
      }
      this.wyczyscInformacjeOObiekcie();
      this.pokazLokalizacjeObiektu(obiekt);
    }
  }

  /**
   * Funkcja czyści informacje o pozycji
   */
  wyczyscInformacjeOObiekcie() {
    this.lokalizacjaObiektuWidoczna = false;
    this.usunPinezkeZMapy();
    this.usunPoligonObiektu();
    this.usunWarstweTymczasowa();
  }

  /**
   * Funkcja sprawdzająca czy usunąć warstwę tymczasową po kliknięciu
   * @param zdarzenie - zdarzenie/ typ kliknięcia
   */
  private sprawdzCzyUsunacWarstweTymczasowa(zdarzenie: KlikniecieNaMapieEvent) {
    this.mapView?.getFeatureLayers().forEach(layer => {
      if (layer.name === NAZWA_WARSTWY_TYMCZASOWEJ) {
        let obiektyNaWarstwie = this.znajdzObiektyNaWarstwie(layer, zdarzenie.pozycjaGeograficzna);
        if (!obiektyNaWarstwie.length) {
          this.wyczyscInformacjeOObiekcie()
        }
      }
    })
  }

  /**
   * Funckawskazuje pozycje obiektu
   * @param obiekt
   */
  private pokazLokalizacjeObiektu(obiekt?: InformacjeOObiekcieEvent) {
    if (!obiekt?.obiekt?.lokalizacja || !this.rozmiaryOknaMapy) {
      return;
    }
    const lokalizacja = obiekt.obiekt.lokalizacja.split(',');
    const lokalizacjaESPG2178 = KonwerterGeometriUtils.EPSG4326toEPSG2178(parseFloat(lokalizacja[0]), parseFloat(lokalizacja[1]));
    let pozycaGeograficzna = undefined;
    //Wysrodkowanie ekranu
    if (!lokalizacjaESPG2178) {
      return;
    }
    pozycaGeograficzna = new OM.geometry.Point(lokalizacjaESPG2178.x, lokalizacjaESPG2178.y, lokalizacjaESPG2178.srid);
    //Oznaczanie obiektow
    if (obiekt.obiekt.typGeometrii?.endsWith('01') && pozycaGeograficzna) {
      this.dodajPinezkeWMiejscuKlikniecia(pozycaGeograficzna);
      this.lokalizacjaObiektuWidoczna = true;
    } else {
      this.dodajPoligonObiektu(obiekt);
      this.lokalizacjaObiektuWidoczna = true;
    }
    // Ustawianie poziomu zoom
    if (obiekt.obiekt.typGeometrii?.endsWith('01') && this.mapa?.domyslnaSkalaWyszukiwania) {
      this.mapView?.setMapCenterAndZoomLevel(pozycaGeograficzna, this.mapa?.domyslnaSkalaWyszukiwania, false);
    } else {
      this.mapView?.setMapCenterAndZoomLevel(pozycaGeograficzna, ObiektyMapyUtils.wyliczZoomDlaObiektu(obiekt.obiekt.wspolrzedne,
        (this.mapView as any)?.graphics.width, (this.mapView as any)?.graphics.height) - 2, false);
    }
  }

  /**
   * Funkcja pobiera informacje o oknie mapy
   */
  private aktualizujRozmiarOknaMapy() {
    if (this.mapView && (this.mapView as any).$oracleMapDiv) {
      this.rozmiaryOknaMapy = {
        wysokosc: (this.mapView as any).$oracleMapDiv[0].clientHeight,
        szerokosc: (this.mapView as any).$oracleMapDiv[0].clientWidth
      }
    }
  }

  /**
   * Funkcja dodaje pinezkę w miejscu kliknięcia
   * @param punkt
   */
  private dodajPinezkeWMiejscuKlikniecia(punkt: Point): void {
    this.dodajWarstweObiektu();
    this.markerObiektu = this.warstwaObiektow?.getFeature('marker-obiektu') as Feature;
    if (this.markerObiektu) {
      this.markerObiektu.setPosition(punkt.getX(), punkt.getY(), punkt.getSRID());
    } else {
      this.markerObiektu = new OM.MapMarker({
        id: 'marker-obiektu',
        renderingStyle: new OM.style.Marker({
          src: 'assets/ikony/moja_lokalizacja.svg',
          width: 42,
          height: 52,
          yOffset: -26,
          styleName: ''
        }),
        position: {x: punkt.getX(), y: punkt.getY(), srid: punkt.getSRID()}
      });
      this.warstwaObiektow?.addMapMarker(this.markerObiektu);
    }
    this.warstwaObiektow?.bringToTop();
  }


  /**
   * Funckjadodaje poligon obiektu
   * @param obiekt
   */
  private dodajPoligonObiektu(obiekt?: InformacjeOObiekcieEvent) {
    this.dodajWarstwePoligonu();
    const ksztalt = ObiektyMapyUtils.generujKsztalt(obiekt?.obiekt?.typGeometrii, obiekt?.obiekt?.wspolrzedne);
    this.poligonObiektu = new OM.Feature('poligon-obiektu', ObiektyMapyUtils.generujKsztalt(obiekt?.obiekt?.typGeometrii, obiekt?.obiekt?.wspolrzedne), {
      renderingStyle: StyleZaznaczaniaObiektowUtils.pobierzStylZaznaczaniaObiektu(ksztalt.getType())
    });
    this.warstwaPoligonow?.addFeature(this.poligonObiektu);
  }


  /**
   * Funkcja usuwa poligon obiektu
   */
  private usunPoligonObiektu() {
    if (this.warstwaPoligonow) {
      this.mapView?.removeLayer(this.warstwaPoligonow);
      this.warstwaPoligonow = undefined;
      this.poligonObiektu = undefined;
    }
  }

  /**
   * Funkcja dodaje warstwę dla pinezki
   */
  private dodajWarstweObiektu(): void {
    this.warstwaObiektow = ObiektyMapyUtils.dodajWarstweDlaObiektow(this.mapView!, WARSTWA_WYSZUKANYCH_OBIEKTOW);
  }

  /**
   * Funkcja dodaje warstwę dla pinezki
   */
  private dodajWarstwePoligonu(): void {
    this.warstwaPoligonow = ObiektyMapyUtils.dodajWarstweDlaObiektow(this.mapView!, WARSTWA_WYSZUKANYCH_OBIEKTOW);
  }

  /**
   * Funkcja usuwa aznaczenie kliknięcia
   */
  private usunPinezkeZMapy(): void {
    if (this.warstwaObiektow) {
      this.mapView?.removeLayer(this.warstwaObiektow);
      this.warstwaObiektow = undefined;
      this.markerObiektu = undefined;
    }
  }

  /**
   * Funkcja dodaje warstwe obiektu jako tymczasową
   * @param warstwa
   */
  private dodajWarstwetymczasowaDlaWyszukanegoObiektu(warstwa: Warstwa) {
    warstwa.uuidMapa = NAZWA_WARSTWY_TYMCZASOWEJ;
    if (warstwa.szczegolyWarstwy) {
      warstwa.szczegolyWarstwy.minSkalaWidocznosci = 0;
      warstwa.szczegolyWarstwy.maksSkalaWidocznosci = 18;
    }
    LegendaUtils.dodajParametrySterujace(warstwa);
    this.mapView?.addLayer(WarstwaUtils.utworzWarstweMapy(NAZWA_WARSTWY_TYMCZASOWEJ, warstwa, this.konfiguracja, this.mapView));
    const layer = this.mapView?.getLayerByName(NAZWA_WARSTWY_TYMCZASOWEJ);
    if (warstwa.szczegolyWarstwy?.typ === TypWarstwy.THEME_LAYER) {
      WarstwaUtils.wlaczInfoWindow(layer, false);
      WarstwaUtils.ustawWidocznoscTooltip(layer, false);
    }
    layer?.bringToTop();
    if (this.mapa) {
      this.mapa.warstwaTymczasowaWyszukiwania = warstwa;
    }
  }

  /**
   * Funkcja usuwa warstwę tymczasową
   */
  private usunWarstweTymczasowa() {
    const layer = this.mapView?.getLayerByName(NAZWA_WARSTWY_TYMCZASOWEJ);
    if (layer) {
      this.mapView?.removeLayer(layer);
    }
    if (this.mapa) {
      this.mapa.warstwaTymczasowaWyszukiwania = undefined;
    }
  }

  /**
   * Funkcja przenosi warstwy wyszukanych obiektow na wierzch
   */
  private przeniesWarstwyWyszukanychObiektowNaWierzch(): void {
    this.warstwaObiektow?.bringToTop();
    this.warstwaPoligonow?.bringToTop();
  }

  /**
   * Filtruj obiekty na warstwie
   * @param layer
   * @param pozycjaGeograficzna
   */
  private znajdzObiektyNaWarstwie(layer: Layer, pozycjaGeograficzna: Point): Feature[] {
    try {
      const filtrPunktu = this.utworzFiltrWarstw(pozycjaGeograficzna);
      return  layer.applyFilter(filtrPunktu, false).getAllFeatures();
    } catch (e) {
      console.error('błąd filtrowania warstwy: ', layer.getName(), e);
      return [];
    }
  }

  /**
   * Funkcja tworzy filtr wyszukiwania obiektów na warstwach
   * @param pozycjaMyszki
   */
  private utworzFiltrWarstw(pozycjaMyszki: Point): Filter {
    const promienWyszukiwania = this.wyliczPromienPobieraniaObiektowDlaSkali();
    const okragWyszukiwania = new OM.geometry.Circle(pozycjaMyszki.getX(), pozycjaMyszki.getY(), promienWyszukiwania, pozycjaMyszki.getSRID());
    return ObiektyMapyUtils.utworzFiltrWyszukiwaniaObiektow(okragWyszukiwania);
  }

  /**
   * Funkcja wylicza proporcjonalna do skali srednice wybierania obiektow
   */
  private wyliczPromienPobieraniaObiektowDlaSkali(): number {
    if (!this.mapView) {
      return 100;
    }
    return TABLICA_ZASIEGOW_DLA_ZOOM[this.mapView.getMapZoomLevel()];
  }
}
