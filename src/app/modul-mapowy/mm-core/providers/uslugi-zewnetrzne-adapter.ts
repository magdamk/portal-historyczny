import {Observable} from 'rxjs';
import {TlumaczeniaNazw} from '../../serwis-mapowy/modele/tlumaczenia-nazw';

export interface UslugaZewnetrznaOdpowiedz {
  nazwa: TlumaczeniaNazw;
  adres: string;
  typ: string;
}


export interface UslugiZewnetrzneAdapter {

  /**
   * Funkcja pozwala pobrać liste zdefiniowanych usłóg zewnętrznych
   */
  pobierzUslugiZewnetrzne(): Observable<UslugaZewnetrznaOdpowiedz[]>;
}

export abstract class UslugiZewnetrzneModulMapowyAdapter implements UslugiZewnetrzneAdapter {
  /**
   * Funkcja pozwala pobrać liste zdefiniowanych usłóg zewnętrznych
   */
  abstract pobierzUslugiZewnetrzne(): Observable<UslugaZewnetrznaOdpowiedz[]>;
}

export class DomyslneUslugiZewnetrzneAdapter extends UslugiZewnetrzneModulMapowyAdapter {

  /**
   * Funkcja pozwala pobrać liste zdefiniowanych usłóg zewnętrznych
   */
  pobierzUslugiZewnetrzne(): Observable<UslugaZewnetrznaOdpowiedz[]> {
    return new Observable<UslugaZewnetrznaOdpowiedz[]>(subscriber => {
      subscriber.next([
        {
          nazwa: {pl: 'Cieniowanie WMS', en: 'Cieniowanie WMS EN'},
          adres: 'https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMS/ShadedRelief',
          typ: 'WMS'
        },
        {
          nazwa: {pl: 'Hipsometria WMS', en: 'Hipsometria WMS EN'},
          adres: 'https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMS/Hypsometry',
          typ: 'WMS'
        },
        {
          nazwa: {pl: 'Cieniowanie WMTS', en: 'Cieniowanie WMTS EN'},
          adres: 'https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMTS/ShadedRelief',
          typ: 'WMTS'
        },
        {
          nazwa: {pl: 'Hipsometria WMTS', en: 'Hipsometria WMTS EN'},
          adres: 'https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMTS/Hypsometry',
          typ: 'WMTS'
        },
        {
          nazwa: {pl: 'Państwowy Rejestr Nazw Geograficznych WFS', en: 'Państwowy Rejestr Nazw Geograficznych WFS EN'},
          adres: 'https://mapy.geoportal.gov.pl/wss/service/PZGiK/PRNG/WFS/GeographicalNames',
          typ: 'WFS'
        },
        {
          nazwa: {pl: 'Osnowa wysokościowa WFS', en: 'Osnowa wysokościowa WFS EN'},
          adres: 'http://mapy.geoportal.gov.pl/wss/service/PZGIK/PodstawowaOsnowaGeodezyjnaWysokosciowa',
          typ: 'WFS'
        }
      ])
    })
  }

}

