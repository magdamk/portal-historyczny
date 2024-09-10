import {Injectable} from '@angular/core';

export const WARSZAWA_WYSOKOSC_KONFIGURACJA = {
  minX: 7488800,
  minY: 5773000,
  maxX: 7519200,
  maxY: 5805000,
  geoTifUrl: 'assets/images/warszawa_wysokosc.png'
};

/**
 * Serwis służący do okreslania wysokości nad poziomem moża dla współżędnych
 */
@Injectable({
  providedIn: 'root'
})
export class WysokoscService {

  // TODO - rozważyć niszczenie grafiki i canvas  gdy już nie są potrzebne

  szerokosc = WARSZAWA_WYSOKOSC_KONFIGURACJA.maxX - WARSZAWA_WYSOKOSC_KONFIGURACJA.minX;
  wysokosc = WARSZAWA_WYSOKOSC_KONFIGURACJA.maxY - WARSZAWA_WYSOKOSC_KONFIGURACJA.minY;
  canvas?: any;

  /**
   * Konstruktor
   */
  constructor() {
    this.zaladujGeoTif();
  }

  /**
   * Funkcja pozwala pobrać wysokośc nad poziomem moża dla układy EPSG2178
   * @param x
   * @param y
   */
  pobierzWysokoscNPM(x: number, y: number): number | undefined {
    if (this.punktWGranicach(x, y) && this.canvas) {
      const xImg = this.pozycjaX(x);
      const yImg = this.pozycjaY(y);
      const pixelData = this.canvas.getContext('2d')?.getImageData(xImg, yImg, 1, 1).data;
      return pixelData[0];
    }
    return undefined;
  }

  private punktWGranicach(x: number, y: number): boolean {
    if (x < WARSZAWA_WYSOKOSC_KONFIGURACJA.minX ||
      x > WARSZAWA_WYSOKOSC_KONFIGURACJA.maxX ||
      y < WARSZAWA_WYSOKOSC_KONFIGURACJA.minY ||
      y > WARSZAWA_WYSOKOSC_KONFIGURACJA.maxY) {
      return false;
    }
    return true;
  }

  /**
   * Funkcja przelicza pozycje x EPSG2178 na pozycje pixela w grafice
   * @param x
   */
  private pozycjaX(x: number): number {
    return Math.round(((x - WARSZAWA_WYSOKOSC_KONFIGURACJA.minX) / this.szerokosc) * this.canvas.width);
  }

  /**
   * Funkcja przelicza pozycje y EPSG2178 na pozycje pixela w grafice
   * @param y
   */
  private pozycjaY(y: number): number {
    return this.canvas.height - Math.round(((y - WARSZAWA_WYSOKOSC_KONFIGURACJA.minY) / this.wysokosc) * this.canvas.height);
  }

  /**
   * Funkcja ładuje grafikę z opisem wysokosci
   */
  private zaladujGeoTif(): void {
    const img = new Image();
    img.src = WARSZAWA_WYSOKOSC_KONFIGURACJA.geoTifUrl;
    img.onload = (event: any) => {
      this.canvas = document.createElement('canvas');
      this.canvas.height = img.height;
      this.canvas.width = img.width;
      const ctx = this.canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
    };
  }
}

