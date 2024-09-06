import { Feature } from '../../oracle-maps/types/feature';
import { Point } from '../../oracle-maps/types/point';
import { InformajeOWarstwie } from '../komponenty/mapa/informacje-o-obiekcie/informacje-o-obiekcie.component';
import { OM } from '../../oracle-maps/types/om';
// import { KonfiguracjaModulMapowyAdapter } from '../../core/providers/konfiguracja-adapter';
import { Warstwa } from '../modele/warstwa';
import { Prostokat } from '../modele/prostokat';
import { Rectangle } from '../../oracle-maps/types/rectangle';
import { Geometry } from '../../oracle-maps/types/geometry';
import { KolekcjeUtils } from './kolekcje-utils';
import { WarstwaUtils } from './warstwa-utils';
import { Filter } from '../../oracle-maps/types/filter';
import { MarkerLayer } from '../../oracle-maps/types/marker-layer';
import { Map as OMap } from '../../oracle-maps/types/map';
// import { WybraneObiektyIWarstwy } from '../komponenty/boczna-belka/ns-selekcja/ns-selekcja.component';
// import { AnalizyPrzestrzenneUtils } from './analizy-przestrzenne-utils';
import { Punkt } from '../modele/punkt';
import { KonfiguracjaModulMapowyAdapter } from '../../mm-core/providers/konfiguracja-adapter';

declare var OM: OM;

export interface LabelWartosc {
  label: string;
  wartosc: string;
}

export interface InformacjeOObiekcie {
  opis: string;
  tytul: string;
  opisy: LabelWartosc[];
  geometria?: Geometry;
  pozycja?: Point;
  id: string;
  typ?: string;
  zaznaczony?: boolean;
}

export interface GeoJson {
  type: string;
  features: GeoJsonFeature[];
}

export interface GeoJsonFeature {
  type: string;
  geometry: GeoJsonGeometry;
  properties: { [key: string]: string }
}

export interface GeoJsonGeometry {
  type: string;
  coordinates: any[];
}

export const TABLICA_GESTOSCI_PIXELI = [
  270.2702703, //0
  135.1351351, //1
  67.56756757, //2
  33.89830508, //3
  16.94915254, //4
  8.474576271, //5
  6.578947368, //6
  4.255319149, //7
  3.174603175, //8
  2.127659574, //9
  1.587301587, //10
  1.315789474, //11
  1.063829787, //12
  0.7936507937, //13
  0.5319148936, //14
  0.2631578947, //15
  0.1315789474, //16
  0.06578947368, //17
  0.02941176471 //18 m/px
];

export const TABLICA_ROTACJI_PL_1992 = [
  7.2,
  3.6,
  1.8,
  0.9,
  0.45,
  0.225,
  0.175781,
  0.1175,
  0.0876,
  0.058,
  0.0438,
  0.0365,
  0.029,
  0.0219,
  0.0147,
  0.00735,
  0.003675,
  0.001838,
  0.000919
]

export const TABLICA_SKALI_MAPY = [
  1024000, //0
  512000, //1
  256000, //2
  128000, //3
  64000, //4
  32000, //5
  25000, //6
  16000, //7
  12000, //8
  8000, //9
  6000, //10
  5000, //11
  4000, //12
  3000, //13
  2000, //14
  1000, //15
  500, //16
  250, //17
  125, //18
];

export const TABLICA_ZASIEGOW_DLA_ZOOM = [
  1000, //0
  750, //1
  500, //2
  250, //3
  150, //4
  100, //5
  80, //6
  40, //7
  35, //8
  25, //9
  15, //10
  14, //11
  12, //12
  9, //13
  5, //14
  3, //15
  2, //16
  1, //17
  1 //18
]

/**
 * Klasa narzędziowa dla obiektów mapy
 */
export class ObiektyMapyUtils {

  /**
   * Funkcja tworzy informacje o obiekcie
   * @param obiekt
   */
  static utworzInformacjeOObiekcie(obiekt: Feature): InformacjeOObiekcie {
    const opisyDoWyswietlenia = this.przygotujOpisyDlaObiektu(obiekt);
    const tytul = obiekt.getAttributeValue('NAZWA_SERWIS');
    return {
      tytul: tytul ? tytul.toString() : '',
      opis: obiekt.getAttributeValue('_LABEL_'), id: obiekt.id,
      opisy: opisyDoWyswietlenia,
      pozycja: this.pobierzWrpolrzedneObiektu(obiekt),
      typ: obiekt.getGeometry().getType(),
      geometria: obiekt.getGeometry()
    };
  }

  /**
   * Funkcja generuje filtry wyszukiwania
   * @param obszar
   */
  static utworzFiltrWyszukiwaniaObiektow(obszar: Geometry): Filter {
    return new OM.filter.Or(new OM.filter.InsidePolygon(obszar),
      new OM.filter.AnyInteract(obszar));
  }

  /**
   * Funkcja sprawdza czy podana warstwa spełnia kryteria do wybierania obiektów
   * @param warstwa
   * @param zoom
   */
  static czyWarstwaSpelniaKryteriaWyszukiwania(warstwa?: Warstwa, zoom?: number): boolean {
    return (zoom != undefined &&
      WarstwaUtils.czyWarstwaWidoczna(warstwa) &&
      warstwa?.szczegolyWarstwy?.informacjeOObiekcie &&
      warstwa?.szczegolyWarstwy?.minSkalaKlikalnosci != undefined &&
      warstwa?.szczegolyWarstwy?.minSkalaKlikalnosci <= zoom) ? true : false;
  }

  /**
   * Funkcja przygotowuje opisy dla obiektu na podstawie wzorca z mapviewer
   * @param obiekt
   */
  static przygotujOpisyDlaObiektu(obiekt: Feature): LabelWartosc[] {
    const opisyDoWyswietlenia: LabelWartosc[] = [];
    if (obiekt.getAttributeValue('_LABEL_')) {
      (obiekt.getAttributeValue('_LABEL_').toString().split('\n') as string[]).forEach(opis => {
        const sekcjeOpisu = opis.split(': ');
        if (sekcjeOpisu.length === 2) {
          opisyDoWyswietlenia.push({ label: sekcjeOpisu[0], wartosc: sekcjeOpisu[1] });
        }
      });
    }
    return opisyDoWyswietlenia;
  }

  /**
   * Funkcjazwraca polozenie obiektu
   * @param obiekt
   */
  static pobierzWrpolrzedneObiektu(obiekt: Feature): Point | undefined {
    if (obiekt.getGeometry().getType() === 'Point') {
      return obiekt.getGeometry() as Point;
    } else {
      const mbr = obiekt.getGeometry().getMBR() as Rectangle;
      return mbr.getCenter();
    }
  }

  /**
   * Funkcja ustawia styl obiektu
   * @param obiekt
   * @param style
   * @param konfiguracjaWarstwy
   * @param konfiguracja
   */
  static ustawStylDlaObiektu(obiekt?: Feature, style?: string, konfiguracjaWarstwy?: Warstwa, konfiguracja?: KonfiguracjaModulMapowyAdapter) {
    if (obiekt && konfiguracja && konfiguracjaWarstwy?.szczegolyWarstwy?.zrodloMVC && style) {
      OM.style.StyleStore.getServerSideStyle(
        konfiguracjaWarstwy.szczegolyWarstwy?.zrodloMVC,
        style,
        {
          url: konfiguracja.pobierzMapViewerUrl(),
          callback: (serverSideStyle) => {
            obiekt.setRenderingStyle(serverSideStyle);
          }
        });
    }
  }


  /**
   * Funkcja komparatora obiektow
   * @param a
   * @param b
   */
  static komparatorObiektow(a: InformacjeOObiekcie, b: InformacjeOObiekcie) {
    if (a.tytul < b.tytul) {
      return -1;
    }
    if (a.tytul > b.tytul) {
      return 1;
    }
    return 0;
  }

  /**
   * Funkcja komparatora warstw
   * @param a
   * @param b
   */
  // static komparatorWarstw(a: InformajeOWarstwie | WybraneObiektyIWarstwy, b: InformajeOWarstwie | WybraneObiektyIWarstwy) {
  //   if (!a.warstwa.nazwaOficjalna?.pl || !b.warstwa.nazwaOficjalna?.pl) {
  //     return 0;
  //   }
  //   if (a.warstwa?.nazwaOficjalna.pl < b.warstwa?.nazwaOficjalna.pl) {
  //     return -1;
  //   }
  //   if (a.warstwa.nazwaOficjalna.pl > b.warstwa.nazwaOficjalna.pl) {
  //     return 1;
  //   }
  //   return 0;
  // }

  /**
   * Funkcja wylicza zoom na obiektów przestrzennych
   * @param wspolrzedne
   * @param szerokoscEkranu
   * @param wysokoscEkranu
   */
  static wyliczZoomDlaObiektu(wspolrzedne?: number[], szerokoscEkranu?: number, wysokoscEkranu?: number): number {
    if (!wspolrzedne || !szerokoscEkranu || !wysokoscEkranu) {
      return 0;
    }
    const mbr = this.znajdzMbr(wspolrzedne);
    const szerokoscGestosc = (mbr.maxX - mbr.minX) / szerokoscEkranu;
    const wysokoscGestosc = (mbr.maxY - mbr.minY) / wysokoscEkranu;
    const zoomSzerokosc = this.znajdzNajblizszaWartoscZoomDlaGestosci(szerokoscGestosc);
    const zoomWysokosc = this.znajdzNajblizszaWartoscZoomDlaGestosci(wysokoscGestosc);
    const wynik = zoomSzerokosc < zoomWysokosc ? zoomSzerokosc : zoomWysokosc;
    return wynik;
  }

  /**
   * Funkcja znajduje mbr dla poligonu/lini
   * @param tablicaPunktow
   */
  static znajdzMbr(tablicaPunktow?: number[]): Prostokat {
    let minX;
    let minY;
    let maxX;
    let maxY;
    if (tablicaPunktow) {
      for (let i = 0; i <= tablicaPunktow.length; i += 2) {
        if (!tablicaPunktow[i] || !tablicaPunktow[i + 1]) {
          break;
        }
        minX = (minX && minX < tablicaPunktow[i]) ? minX : tablicaPunktow[i];
        maxX = (maxX && maxX > tablicaPunktow[i]) ? maxX : tablicaPunktow[i];
        minY = (minY && minY < tablicaPunktow[i + 1]) ? minY : tablicaPunktow[i + 1];
        maxY = (maxY && maxY > tablicaPunktow[i + 1]) ? maxY : tablicaPunktow[i + 1];
      }
    }
    return {
      minX: (minX ? minX : 0),
      minY: (minY ? minY : 0),
      maxX: (maxX ? maxX : 0),
      maxY: (maxY ? maxY : 0),
      srid: 0
    };
  }

  /**
   * Funkcja wyszukije zoom dla gestosci pixeli
   * @param gestosc
   */
  static znajdzNajblizszaWartoscZoomDlaGestosci(gestosc: number): number {
    let zoom = 0;
    let zoomZnaleziony = false;
    let index = 0;
    KolekcjeUtils.forEachRevers(TABLICA_GESTOSCI_PIXELI, (v) => {
      if (v >= gestosc && !zoomZnaleziony) {
        zoom = index;
        zoomZnaleziony = true;
      }
      index++;
    });
    return 18 - zoom;
  }

  /**
   * Funkcja generuje kształty
   * @param typGeometri
   * @param tablicaPunktow
   */
  static generujKsztalt(typGeometri?: string, tablicaPunktow?: number[]): Geometry {
    if (!typGeometri || !tablicaPunktow) {
      return new OM.geometry.Geometry(2178);
    }
    if (typGeometri.endsWith('02')) {
      return new OM.geometry.LineString(tablicaPunktow, 2178, 2);
    }
    if (typGeometri.endsWith('06')) {
      const linie = this.generujTabliceLini(tablicaPunktow);
      return new OM.geometry.MultiLineString(linie, 2178, 2);
    }
    if (typGeometri.endsWith('03')) {
      const multiGeometria = this.generujTablicePoligonow(tablicaPunktow);
      return new OM.geometry.Polygon(multiGeometria, 2178, 2);
    }
    if (typGeometri.endsWith('07')) {
      const multiGeometria = this.generujTablicePoligonow(tablicaPunktow);
      return new OM.geometry.MultiPolygon(multiGeometria, 2178, 2);
    }
    return new OM.geometry.Geometry(2178);
  }

  /**
   * Funkcja dzieli tablice wspolrzednych na multi poligony
   * @param tablicaPunktow
   */
  private static generujTablicePoligonow(tablicaPunktow?: number[]): number[][] {
    if (!tablicaPunktow) {
      return [];
    }
    const wynik: number[][] = [];
    for (let i = 0; i <= tablicaPunktow.length; i += 2) {
      if (tablicaPunktow[i] === undefined) {
        break;
      }
      if (wynik.length > 0 && wynik[wynik.length - 1][0] === tablicaPunktow[i] && wynik[wynik.length - 1][1] === tablicaPunktow[i + 1]) {
        wynik[wynik.length - 1].push(tablicaPunktow[i]);
        wynik[wynik.length - 1].push(tablicaPunktow[i + 1]);
        if (tablicaPunktow[i + 2] !== undefined) {
          wynik.push([]);
        }
        continue;
      }
      if (wynik.length === 0) {
        wynik.push([tablicaPunktow[i], tablicaPunktow[i + 1]]);
      } else {
        wynik[wynik.length - 1].push(tablicaPunktow[i]);
        wynik[wynik.length - 1].push(tablicaPunktow[i + 1]);
      }
    }
    return wynik;
  }

  /**
   * Funkcja dzieli tablice wspolrzednych na multi linie
   * @param tablicaPunktow
   */
  private static generujTabliceLini(tablicaPunktow?: number[]): number[][] {
    const wynik: number[][] = [];
    if (!tablicaPunktow || tablicaPunktow.length < 2) {
      return [];
    }
    let poprzedniX = 0;
    let poprzedniY = 0;
    let kat = 0;
    let poprzedniKat = 0;
    wynik.push([]);
    for (let i = 0; i <= tablicaPunktow.length; i += 2) {
      poprzedniKat = kat;
      kat = this.znajdzKat(tablicaPunktow[i] - poprzedniX, tablicaPunktow[i + 1] - poprzedniY);
      poprzedniX = tablicaPunktow[i];
      poprzedniY = tablicaPunktow[i + 1];
      if (kat - poprzedniKat >= 100 || kat - poprzedniKat <= -100) {
        wynik.push([]);
      }
      if (tablicaPunktow[i] && tablicaPunktow[i + 1]) {
        wynik[wynik.length - 1].push(tablicaPunktow[i]);
        wynik[wynik.length - 1].push(tablicaPunktow[i + 1]);
      }
    }
    let i = wynik.length;
    // czyszczenie artefaktów, może zamiast je kasować dołączaś je do prawidłowych obiektów
    while (i--) {
      if (wynik[i].length < 4) {
        wynik.splice(i, 1);
      }
    }
    return wynik;
  }

  /**
   * Funkcja wylicza kąt wektora
   * @param x
   * @param y
   */
  private static znajdzKat(x: number, y: number): number {
    let beta: number;
    let alfa: number;
    const deg = 180 / Math.PI;
    if (x > 0 && y >= 0) {
      beta = Math.atan2(y, x) * deg;
      alfa = 90 - beta;
      return alfa
    } else if (x >= 0 && y <= 0) {
      beta = Math.atan2(x, y * -1) * deg;
      alfa = 180 - beta;
      return alfa;
    } else if (x <= 0 && y <= 0) {
      beta = Math.atan2(y * -1, x * -1) * deg;
      alfa = 270 - beta
      return alfa;
    } else if (x <= 0 && y >= 0) {
      beta = Math.atan2(x * -1, y) * deg;
      alfa = 360 - beta;
      return alfa;
    } else {
      return -1
    }
  }

  /**
   * Funkcja tworzy warstwe dla obiektow
   * @param map
   * @param nazwa
   */
  static dodajWarstweDlaObiektow(map: OMap, nazwa: string): MarkerLayer {
    let warstwaObiektow = map.getLayerByName(nazwa) as MarkerLayer;
    if (!warstwaObiektow) {
      warstwaObiektow = new OM.layer.MarkerLayer(nazwa);
      map.addLayer(warstwaObiektow);
    }
    warstwaObiektow.bringToTop();
    warstwaObiektow.enableInfoWindow(false);
    warstwaObiektow.enableToolTip(false);
    return warstwaObiektow;
  }

  /**
   * Funkcja generuje geojson
   * @param obekty
   */
  // static generujGeojsonSelekcja(obekty: InformacjeOObiekcie[]): GeoJson {
  //   const geojson: GeoJson = { type: 'FeatureCollection', features: [] };
  //   obekty.forEach(o => {
  //     const feature = AnalizyPrzestrzenneUtils.konwertujNaObiektTurf(o.geometria!);
  //     o.opisy.forEach(opis => {
  //       feature.properties[opis.label] = opis.wartosc;
  //     });
  //     geojson.features.push(feature);
  //   });
  //   return geojson;
  // }

  /**
   * Funkcja generuje geojson
   * @param obiekty
   */
  // static generujGeojsonPomiary(obiekty: Geometry[]): GeoJson {
  //   const geojson: GeoJson = { type: 'FeatureCollection', features: [] };
  //   obiekty.forEach((o: any) => {
  //     geojson.features.push(AnalizyPrzestrzenneUtils.konwertujNaObiektTurf(o));
  //   });
  //   return geojson;
  // }

  /**
   * Funkjca wylicza wielkosc piksela dla aktualnego poziomu zoom
   * @param zoom - aktualny poziom zoom
   * @return wielkosc piksela
   */
  static wyliczWielkoscPikselaYDlaUkladu(mapa: OMap, pozycja: Punkt, uklad: string): number {
    if (uklad === 'WGS_84') {
      return this.wyliczWielkoscPikselaY(mapa) * 0.000014643;
    }
    return this.wyliczWielkoscPikselaY(mapa);
  }

  /**
   * Funkjca wylicza wielkosc piksela dla aktualnego poziomu zoom
   * @param zoom - aktualny poziom zoom
   * @return wielkosc piksela
   */
  static wyliczWielkoscPikselaXDlaUkladu(mapa: OMap, uklad: string): number {
    if (uklad === 'WGS_84') {
      return this.wyliczWielkoscPikselaX(mapa) * 0.00000899322;
    }
    return this.wyliczWielkoscPikselaX(mapa)
  }

  /**
   * Wylicz rozmiar pixela
   * @param mapa
   */
  static wyliczWielkoscPikselaX(mapa: OMap): number {
    const wysokoscWMetrach = mapa.getMapWindowBoundingBox().getMaxY() - mapa.getMapWindowBoundingBox().getMinY();
    const wysokoscWPx = (mapa as any).defaultFeatureLayer.orgHeight;
    return wysokoscWMetrach / wysokoscWPx;
  }

  /**
   * Wylicz rozmiar pixela
   * @param mapa
   */
  static wyliczWielkoscPikselaY(mapa: OMap): number {
    const szerokoscWMetrach = mapa.getMapWindowBoundingBox().getMaxX() - mapa.getMapWindowBoundingBox().getMinX();
    const szerokoscWPx = (mapa as any).defaultFeatureLayer.orgWidth;
    return szerokoscWMetrach / szerokoscWPx;
  }



  /**
   * Dunkcja wylicza rotacje pl_1992 dla georeferencji
   * @param zoom
   * @param uklad
   */
  static wyliczRotacjeXDlaZoom(zoom: number, uklad: string): number {
    if (uklad === 'PL_1992') {
      return TABLICA_ROTACJI_PL_1992[zoom];
    }
    return 0;
  }

  /**
   * Dunkcja wylicza rotacje pl_1992 dla georeferencji
   * @param zoom
   * @param uklad
   */
  static wyliczRotacjeYDlaZoom(zoom: number, uklad: string): number {
    if (uklad === 'PL_1992') {
      return TABLICA_ROTACJI_PL_1992[zoom];
    }
    return 0;
  }

  /**
   * Funkcja tworzy now referencję geometrii
   * @param geometria
   */
  static utworzGeometrie(geometria: Geometry) {
    const geometry = (geometria as any)
    if (!geometry || !geometry.type || geometry.coordinates?.length === 0) {
      return new OM.geometry.Geometry(2178);
    }
    if (geometry.type === 'Point') {
      return new OM.geometry.Point((geometria as any).coordinates[0], (geometria as any).coordinates[1], 2178);
    }
    if (geometry.type === 'MultiPoint') {
      return new OM.geometry.MultiLineString([...(geometria as any).coordinates], 2178);
    }
    if (geometry.type === 'LineString') {
      return new OM.geometry.LineString([...(geometria as any).coordinates], 2178);
    }
    if (geometry.type === 'MultiLineString') {
      return new OM.geometry.MultiLineString([...(geometria as any).coordinates], 2178);
    }
    if (geometry.type === 'Polygon') {
      return new OM.geometry.Polygon([...(geometria as any).coordinates], 2178);
    }
    if (geometry.type === 'MultiPolygon') {
      return new OM.geometry.MultiPolygon([...(geometria as any).coordinates], 2178);
    }
    return new OM.geometry.Geometry(2178);
  }
}
