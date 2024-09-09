import { Observable } from 'rxjs';
import { GeoJson } from '../../serwis-mapowy/utils/obiekty-mapy-utils';

export interface PobieranieDanych {
  format: string;
  ukladWspolrzednych: string;
  zakres?: number[];
  listaUuidWarstw?: string[];
  warstwyGeojson?: WarstwyGeojson[];
}

export interface PlikDto {
  name?: string;
  path?: string;
  type?: string;
  mimeType?: string;
  data?: Blob;
}

export interface DaneGeoreferencyjneDto {
  wielkoscPikselaY?: number;
  wielkoscPikselaX?: number;
  rotacjaX: number;
  rotacjaY: number;
  wspolrzednaYLewegoGornegoRogu?: number;
  wspolrzednaXLewegoGornegoRogu?: number;
}

export interface WarstwyGeojson {
  geoJson: GeoJson;
  nazwaWarstwy: string;
}


export interface KonwersjaMapDto {
  mapaBase64Png?: string;
  docelowyFormat?: string;
  tytulMapy?: string;
  opisMapy?: string;
  orientacja?: string;
  rozmiarStrony?: string;
  warstwyLegendy?: any; // WidokMapyMapaSzczegolyDto
  daneGeoreferencyjne?: DaneGeoreferencyjneDto;
  jezyk?: string;
}


/**
 * Interfejs definuje serwis pobierania danych
 */
export interface PobieranieDanychAdapter {
  /**
   * Funkcja pozwala pobrać dane w wybranym formacie i ukłdzie
   * @param dane
   */
  pobierzDane(dane: PobieranieDanych): Observable<PlikDto>;


  /**
   * Funkcja pozwala pobierać mapę do wydruku
   * @param dane - dane do konwersji
   */
  pobierzMape(dane: KonwersjaMapDto): Observable<PlikDto>;
}

/**
 * Klasa abstrakcyjna definiuje serwi pobierania danych
 */
export abstract class PobieranieDanychModulMapowyAdapter implements PobieranieDanychAdapter {
  /**
   * Funkcja pozwala pobrać dane w wybranym formacie i ukłdzie
   * @param dane
   */
  abstract pobierzDane(dane: PobieranieDanych): Observable<PlikDto>;


  /**
   * Funkcja pozwala pobierać mapę do wydruku
   * @param dane - dane do konwersji
   */
  abstract pobierzMape(dane: KonwersjaMapDto): Observable<PlikDto>;
}

/**
 * Domyślna implementacja pobierania danych
 */
export class DomyslnyPobieranieDanychAdapter implements PobieranieDanychAdapter {
  /**
   * Funkcja pozwala pobrać dane w wybranym formacie i ukłdzie
   * @param dane
   */
  pobierzDane(dane: PobieranieDanych): Observable<PlikDto> {
    return new Observable<PlikDto>(subscriber => {
      subscriber.next({});
    });
  }

  /**
   * Funkcja pozwala pobierać mapę do wydruku
   * @param dane - dane do konwersji
   */
  pobierzMape(dane: KonwersjaMapDto): Observable<PlikDto> {
    return new Observable<PlikDto>(subscriber => {
      subscriber.next({});
    });
  }
}


