import { KonwerterGeometriUtils } from './konwerter-geometri-utils';
import { ParametryStartoweMapy } from './parametry-startowe-mapy';

export interface DostepneParametrySerwisZewnetrzny {
  zoom?: number;
  zoomOsm?: number;
  srodekX?: number;
  srodekY?: number;
  srodekX3857?: number;
  srodekY3857?: number;
  srodekX4326?: number;
  srodekY4326?: number;
}

/**
 * Klasa pomocnicza zmiany mapy
 */
export class ZmianaMapyUtils {

  /**
   * Funkcja czysci dodatkowe arametry url jezli przekierowanie ze strony startowej
   */
  static wyczyscZbedneParametrySerwisuZewnetrznego(adresUrl: string): string {
    let wyczyszczonyAdres = adresUrl.replace(/&[a-z, A-Z, _, -]+=#zoom#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/[a-z, A-Z, _, -]+=#zoom#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/&[a-z, A-Z, _, -]+=#zoomOsm#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/[a-z, A-Z, _, -]+=#zoomOsm#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/&[a-z, A-Z, _, -]+=#srodekX#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/[a-z, A-Z, _, -]+=#srodekX#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/&[a-z, A-Z, _, -]+=#srodekX3857#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/[a-z, A-Z, _, -]+=#srodekX3857#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/&[a-z, A-Z, _, -]+=#srodekX4326#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/[a-z, A-Z, _, -]+=#srodekX4326#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/&[a-z, A-Z, _, -]+=#srodekY#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/[a-z, A-Z, _, -]+=#srodekY#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/&[a-z, A-Z, _, -]+=#srodekY3857#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/[a-z, A-Z, _, -]+=#srodekY3857#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/&[a-z, A-Z, _, -]+=#srodekY4326#/, "");
    wyczyszczonyAdres = wyczyszczonyAdres.replace(/[a-z, A-Z, _, -]+=#srodekY4326#/, "");
    return wyczyszczonyAdres;

  }

  /**
   * Funkcja mapuje dostepne parametry url
   * @param parametryMapy
   * @param url
   */
  static mapujParametry(parametryMapy: ParametryStartoweMapy, url: string) {
    const parametryUrl = this.przygotujParametryUrl(parametryMapy);
    Object.entries(parametryUrl).forEach(e => {
      let val: string = e[1] ? e[1].toString() : '';
      let key = `#${e[0]}#`;
      url = url.replace(key, val);
    })
    return url;
  }

  /**
   * Funkcja przygotowuje dostepne parametry url
   * @param parametryMapy
   */
  static przygotujParametryUrl(parametryMapy: ParametryStartoweMapy): DostepneParametrySerwisZewnetrzny {
    const epsg4326 = KonwerterGeometriUtils.EPSG2178toEPSG4326(parametryMapy.srodekX, parametryMapy.srodekY);
    const epsg3857 = KonwerterGeometriUtils.EPSG2178toEPSG3857(parametryMapy.srodekX, parametryMapy.srodekY);
    return {
      zoom: parametryMapy.zoom,
      zoomOsm: KonwerterGeometriUtils.konwerujZoomNaZoomOsm(parametryMapy.zoom),
      srodekX: parametryMapy.srodekX,
      srodekY: parametryMapy.srodekY,
      srodekX4326: epsg4326!.x,
      srodekY4326: epsg4326!.y,
      srodekX3857: epsg3857!.x,
      srodekY3857: epsg3857!.y
    }
  }
}
