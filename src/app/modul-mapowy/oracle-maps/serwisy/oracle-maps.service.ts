import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { OM } from '../types/om';

declare var $: any;
declare var OM: OM | undefined;

export const MAPVIEWER_KONFIGURACJA = {
  ZASOBY_SCIEZKA: '/jslib/v2',
  WARSTWY_PODKLADOWE_SCIEZKA: '/mcserver',
  WARSTWY_DYNAMICZNE_SCIEZKA: '/omserver',
  BIBLIOTEKA_JS_PATH: '/jslib/v2/oraclemapsv2_svg.js'
};

/**
 * Serwis ładujący bibliotekę js mapviewera
 */
@Injectable({
  providedIn: 'root'
})
export class OracleMapsService {

  private laduje = false;
  private ladowanieBiblitekiSubject = new BehaviorSubject<boolean>(false);

  /**
   * Konstruktor
   * @param document - referencja do root dokumentu
   */
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  /**
   * Funkcja ładuje biblioteke
   * @param url - url do biblioteki
   */
  zaladujBiblioteke(url: string): void {
    console.log('oracle-maps service, ładowanie biblioteki');
    if (this.laduje) {
      return;
    }
    if (this.document.getElementById('oraclemapsv2')) {
      this.ladowanieBiblitekiSubject.next(true);
      this.laduje = false;
      return;
    }
    this.laduje = true;
    const body = this.document.body;
    const script = document.createElement('script');
    script.setAttribute('id', 'oraclemapsv2');
    script.innerHTML = '';
    script.src = url;
    script.onload = () => {
      $(document).ready(() => {
        this.ladowanieBiblitekiSubject.next(true);
        this.laduje = false;
      });
    };
    body.appendChild(script);
  }

  /**
   * Funkcja dezaktywuje bibliotekę mapviewer
   */
  zniszczBiblioteke(): void {
    console.log('oracle-maps service, zniszczBiblioteke');
    this.ladowanieBiblitekiSubject.next(false);
  }

  /**
   * Funkcja pozwala pobrać event załadowania biblioteki
   */
  pobierzLadowanieBibliotekiSubject(): BehaviorSubject<boolean> {
    console.log('oracle-maps service, pobierzLadowanieBibliotekiSubject');
    return this.ladowanieBiblitekiSubject;
  }

}
