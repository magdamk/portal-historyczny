// @ts-ignore: Unreachable code error
import proj4 from 'proj4';
import {Punkt} from './punkt';
import {Point} from './point';
// import {Geometry} from "./geometry";
// import {ObiektyMapyUtils} from "./obiekty-mapy-utils";

export class KonwerterGeometriUtils {

  static EPSG2178 = '+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +units=m +no_defs';
  static EPSG2180 = '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
  static EPSG3857 = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs';

  /**
   * Konwerter punktu z układu EPSG2178 na układ EPSG4326(wgs84)
   * @param x - pozycja
   * @param y - pozycja
   * @return Punkt
   */
  static EPSG2178toEPSG4326(x?: number, y?: number): Punkt | undefined {
    if (x && y) {
      const punkt = proj4(this.EPSG2178, proj4('EPSG:4326'), [x, y]);
      if (punkt[0] !== Infinity && punkt[1] !== Infinity) {
        return {x: this.zaokraglanie(punkt[0], 6), y: this.zaokraglanie(punkt[1], 6), srid: 4326};
      }
    }
    return undefined;
  }

  /**
   * Konwerter punktu z układu EPSG2180 na układ EPSG4326(wgs84)
   * @param x - pozycja
   * @param y - pozycja
   * @return Punkt
   */
  static EPSG2180toEPSG4326(x?: number, y?: number): Punkt | undefined {
    if (x && y) {
      const punkt = proj4(this.EPSG2180, proj4('EPSG:4326'), [x, y]);
      if (punkt[0] !== Infinity && punkt[1] !== Infinity) {
        return {x: this.zaokraglanie(punkt[0], 6), y: this.zaokraglanie(punkt[1], 6), srid: 4326};
      }
    }
    return undefined;
  }

  /**
   * Konwerter punktu z układu EPSG2178 na układ EPSG4326(wgs84)
   * @param x - pozycjaó
   * @param y - pozycja
   * @return Punkt
   */
  static EPSG2178toEPSG3857(x?: number, y?: number): Punkt | undefined {
    if (x && y) {
      const punkt = proj4(this.EPSG2178, this.EPSG3857, [x, y]);
      if (punkt[0] !== Infinity && punkt[1] !== Infinity) {
        return {x: this.zaokraglanie(punkt[0], 6), y: this.zaokraglanie(punkt[1], 6), srid: 3857};
      }
    }
    return undefined;
  }


  /**
   * Konwerter punktu z układu EPSG2178 na układ EPSG4326(wgs84)
   * @param x - pozycja
   * @param y - pozycja
   * @return Punkt
   */
  static EPSG2178toEPSG2180(x?: number, y?: number): Punkt | undefined {
    if (x && y) {
      const punkt = proj4(this.EPSG2178, this.EPSG2180, [x, y]);
      if (punkt[0] !== Infinity && punkt[1] !== Infinity) {
        return {x: this.zaokraglanie(punkt[0], 6), y: this.zaokraglanie(punkt[1], 6), srid: 2180};
      }
    }
    return undefined;
  }

  /**
   * Konwerter punktu z układu EPSG4326(wgs84) na układ EPSG2178
   * @param x - pozycja
   * @param y - pozycja
   * @return Punkt
   */
  static EPSG4326toEPSG2178(x?: number, y?: number): Punkt | undefined {
    if (x && y) {
      const punkt = proj4(proj4('EPSG:4326'), this.EPSG2178, [x, y]);
      if (punkt[0] !== Infinity && punkt[1] !== Infinity) {
        return {x: this.zaokraglanie(punkt[0], 6), y: this.zaokraglanie(punkt[1], 6), srid: 2178};
      }
    }
    return undefined;
  }

  /**
   * Konwerter punktu z układu EPSG2180 na układ EPSG2178
   * @param x - pozycja
   * @param y - pozycja
   * @return Punkt
   */
  static EPSG2180toEPSG2178(x?: number, y?: number): Punkt | undefined {
    if (x && y) {
      const punkt = proj4(this.EPSG2180, this.EPSG2178, [x, y]);
      if (punkt[0] !== Infinity && punkt[1] !== Infinity) {
        return {x: this.zaokraglanie(punkt[0], 6), y: this.zaokraglanie(punkt[1], 6), srid: 2178};
      }
    }
    return undefined;
  }

  /**
   * Konwerter kolekcji punktów z układu EPSG2178 na EPSG4326
   * @param kordynaty
   */
  static colEPSG2178toEPSG4326(kordynaty: number[]): any[] {
    const resul: any[] = [];
    const punkty = this.formatujWspolrzedne(kordynaty);
    punkty.forEach(g => {
        resul.push(proj4(this.EPSG2178, proj4('EPSG:4326'), [g[0], g[1]]));
    });
    return resul;
  }

  /**
   * Konwerter kolekcji punktów z układu  EPSG4326 na EPSG2178
   * @param kordynaty
   */
  static colEPSG4326toEPSG2178(geometry: any[]): any[] {
    const resul: any[] = [];
    geometry.forEach(g => {
      resul.push(...proj4(proj4('EPSG:4326'), this.EPSG2178, [g[0], g[1]]));
    });
    return resul;
  }

  /**
   * Funkcja formatuje wspolrzedne
   * @param o
   */
  static formatujWspolrzedne(kordynaty: number[]): any[] {
    const coordinates: any[] = [];
    for (let i = 0; i < kordynaty.length; i += 2) {
      coordinates.push([kordynaty[i], kordynaty[i + 1]]);
    }
    return coordinates;
  }

  /**
   * Funkcja zaokrągla liczy do wskazanego miejsca po przecinku
   * @param liczba - liczba do zaokrąglenia
   * @param liczbaMiejscPoPrzecinku - liczba miejsc po przecinku
   */
  static zaokraglanie(liczba: number, liczbaMiejscPoPrzecinku: number): number {
    return Math.round(liczba * Math.pow(10, liczbaMiejscPoPrzecinku)) / Math.pow(10, liczbaMiejscPoPrzecinku);
  }

  /**
   * Funkcja zaokrągla i formatuje liczby w układzie EPSG2178
   * @param liczba - liczba do zaokrąglenia
   */
  static formatujWPSG2178(liczba: number): string {
    return ((Math.round((Math.round(liczba * 10)) / 2)) / 5).toFixed(1);
  }

  /**
   * Funkcja zaokrągla liczbę do całkowitej
   * @param liczba
   */
  static formatujDoCalkowitych(liczba: number): string {
    return Math.round(liczba).toString();
  }

  /**
   * Funkcja komwertuje punkt oracle na punkt
   * @param pozycja
   */
  static konwerujPointNaPunkt(pozycja: Point): Punkt {
    return {
      x: pozycja.getX(),
      y: pozycja.getY(),
      srid: pozycja.getSRID()
    };
  }

  /**
   * Funkcja zamienia zoom vmc na zoom osm
   *
   * @param zoom
   */
  static konwerujZoomNaZoomOsm(zoom?: number) {
    if (zoom) {
      const skale = [9, 10, 11, 12, 13, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 19, 20, 21, 22];
      return skale[zoom];
    }
    return 11;
  }

}
