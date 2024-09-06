import {SzczegolyWarstwy} from './szczegoly-warstwy';
import {TlumaczeniaNazw} from './tlumaczenia-nazw';


export const  TypWyswietlania = {
  KATALOG: 'KATALOG',
  WARSTWA: 'WARSTWA'
}

export const TypWarstwy = {
  THEME_LAYER: 'THEME_LAYER',
  TILE_LAYER: 'TILE_LAYER',
  ANAL_LAYER: 'ANAL_LAYER',
  WMS_LAYER: 'WMS_LAYER',
  WMTS_LAYER: 'WMTS_LAYER',
  WFS_LAYER: 'WFS_LAYER',
  PUSTA: 'PUSTA'
}

export const TypGeometriWarstwy = {
  LINIA: 'Line',
  PUNKT: 'Point',
  POLIGON: 'Polygon',

}

export interface ParametrySterujaceWarstwy {
  widoczna: boolean;
  aktywna: boolean;
  pozaZakresemZoom?: boolean;
  pozaZakresemPrzestrzennym?: boolean;
  konflikt?: boolean;
  edycjaNazwy?: boolean;
}

/**
 * Interfejs definiuje warstwę / katalog
 */
// TODO być może lepiej zrobić interfejs bazowy i wykorzystać dziedziczenie
export interface Warstwa {
  uuid: string;
  uuidMapa: string;
  typWyswietlania: string; // parametr techniczny
  typGeometrii?: string;
  nazwaOficjalna?: TlumaczeniaNazw;
  opisDodatkowy?: TlumaczeniaNazw;
  tagi?: string;
  sciezkaDoPlikuSymbolu?: string;
  rozwiniecieWLegendzie?: boolean; // nazwa z ZD "domyślne rozwinięcie w legendzie"
  mozliwoscRozwinieciaWlegendzie?: boolean;
  widocznoscWLegendzie?: boolean;
  widocznoscWLegendzieRodzica?: boolean;
  mozliwoscZmianyWidocznosci?: boolean;
  wieleWarstw?: boolean;
  parametrySterujace?: ParametrySterujaceWarstwy;
  usunieta?: boolean;

  szczegolyWarstwy?: SzczegolyWarstwy;
  warstwy?: Warstwa[];
  warstwaUzytkownika?: boolean;
}
