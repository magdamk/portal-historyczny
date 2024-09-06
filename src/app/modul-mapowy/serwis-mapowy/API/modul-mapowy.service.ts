import { Injectable } from '@angular/core';
import { Mapa } from '../modele/mapa';
import { MapaUtils } from '../utils/mapa-utils';

export interface ZoomISrodek {
  x: number;
  y: number;
  zoom: number;
}

/**
 * Serwis Fasada da modulu mapowego
 */
@Injectable({
  providedIn: 'root'
})
export class ModulMapowyService {

  /**
   * Konstruktor
   */
  constructor() {
  }

  /**
   * Funkcja zwraca pustą mapę
   */
  utworzPustaMape(nazwa: string): Mapa {
    return MapaUtils.utworPustaMape(nazwa);
  }
}

