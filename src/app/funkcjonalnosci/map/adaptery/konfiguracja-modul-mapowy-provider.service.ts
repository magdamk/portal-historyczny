import {Injectable} from '@angular/core';
// import {KonfiguracjaAdapter, KonfiguracjaGrupaDto, ServerStylMapviewer, TypGeometriWarstwy} from '@modul-mapowy';
import {environment} from '../../../../environments/environment';
// import {ControllerKonfiguracjaOpenService} from '../../../../../build/openapi_modul_mapowy_public';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { KonfiguracjaAdapter, KonfiguracjaGrupaDto, ServerStylMapviewer } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { TypGeometriWarstwy } from 'src/app/modul-mapowy/serwis-mapowy/modele/warstwa';
import { ControllerKonfiguracjaOpenService } from 'src/app/core/api/controller-konfiguracja-open.service';

/**
 * Serwis konfiguracji modułu mapowego
 */
@Injectable({
  providedIn: 'root'
})
export class KonfiguracjaModulMapowyProviderService implements KonfiguracjaAdapter {

  constructor(private konfiguracjaOpenService: ControllerKonfiguracjaOpenService) {
  }

  /**
   * Funkcja zwraca adres serwera mapwiever
   */
  pobierzMapViewerUrl(): string {
    return environment.mapViewerUrl;
  }

  /**
   * Funkcja zwraca adres serwera kowersji
   */
  pobierzModulKonwersjiUrl(): string{
    return environment.portalKonwersjiApiUrl;
  }

  /**
   * Funkcja zwraca widoczność przycisku udostępniania mapy
   */
  pobierzWidocznoscUdostepnianiaMapy(): boolean {
    return environment.widocznoscUdostepnianiaMapy;
  }

  /**
   * Funkcja zwraca czy mapy w trybie admin
   */
  widokAdministratora(): boolean {
    return false;
  }

  /**
   * Funkcja zwraca limit wynikow wyszukiwania
   */
  pobierzLimitWynikowWyszukiwania(): Observable<KonfiguracjaGrupaDto> {
    return this.konfiguracjaOpenService.pobierzPoGrupieKonfiguracji('LIMIT_WIDOCZNYCH_WYNIKOW_WYSZUKIWANIA')
      .pipe(map((r: any) => r.content));
  }

  /**
   * Funckja zwraca dostepne formaty plików
   */
  pobierzDostepneFormatyPlikowPrzestrzennych(): Observable<KonfiguracjaGrupaDto> {
    return this.konfiguracjaOpenService.pobierzPoGrupieKonfiguracji('FORMATY_POBIERANIA')
      .pipe(map((r: any) => r.content));
  }

  /**
   * Funkcja zwraca dostepne uklady wspolrzednych
   */
  pobierzDostepneUkladyPrzstrzenne(): Observable<KonfiguracjaGrupaDto> {
    return this.konfiguracjaOpenService.pobierzPoGrupieKonfiguracji('UKLADY_WSPOLRZEDNYCH')
      .pipe(map((r: any) => r.content));
  }


  /**
   * Funkcja zwraca url do aplikacji poziom halasu na budynkach
   */
  pobierzPoziomHalasuUrl(): string {
    return environment.poziomHalasuUrl;
  }

  /**
   * Funkcja zwraca url ikon dla warstw analitycznych o podanej geometrii
   * @param typGeometri
   */
  pobierzUrlIkonyAnalizy(typGeometri: string): string {
    if (typGeometri === TypGeometriWarstwy.LINIA) {
      return environment.ikonaAnalizyLinia;
    }
    if (typGeometri === TypGeometriWarstwy.POLIGON) {
      return environment.ikonaAnalizyPoligon;
    }
    return environment.ikonaAnalizyPunkt;
  }

  /**
   * Funkcja zwraca url ikon dla strzalki polnocy w wydruku mapy
   */
  pobierzUrlStrzalkiPolnocy(): string {
    return environment.ikonaStrzalkiPolnocy;
  }

  /**
   * Funkcja zwraca url ikon dla znaku wodnego w wydruku mapy
   */
  pobierzUrlZnakuWodnego(): string {
    return environment.ikonaZnakuWodnego;
  }

  /**
   * Funkcja zwraca definicje stylu dla podanej geometru
   * @param typGeometri
   */
  pobierzDefinicjeStyluDlaAnaliz(typGeometri: string): ServerStylMapviewer {
    let parametry: string[] = [];
    if (typGeometri === TypGeometriWarstwy.LINIA) {
      parametry = environment.stylWarstwyAnalizyLinia.split(':');
    }
    if (typGeometri === TypGeometriWarstwy.POLIGON) {
      parametry = environment.stylWarstwyAnalizyPoligon.split(':');
    }
    if (typGeometri === TypGeometriWarstwy.PUNKT) {
      parametry = environment.stylWarstwyAnalizyPunkt.split(':');
    }
    if (parametry.length >= 2) {
      return {zrodlo: parametry[0], styl: parametry[1]};
    }
    return {zrodlo: '', styl: ''};
  }

  /**
   * Funkcja zwraca definicje styli dla selekcji
   * @param typGeometri
   */
  pobierzDefinicjeStyluWszystkieObiektyDlaSelekcji(typGeometri: string): ServerStylMapviewer {
    let parametry: string[] = [];
    if (typGeometri === 'LineString') {
      parametry = environment.stylWszystkieObiektySelekcjaLinia.split(':');
    }
    if (typGeometri === 'Polygon') {
      parametry = environment.stylWszystkieObiektySelekcjaPoligon.split(':');
    }
    if (typGeometri === 'Point') {
      parametry = environment.stylWszystkieObiektySelekcjaPunkt.split(':');
    }
    if (parametry.length >= 2) {
      return {zrodlo: parametry[0], styl: parametry[1]};
    }
    return {zrodlo: '', styl: ''};
  }

  /**
   * Funkcja zwraca definicje styli dla selekcji
   * @param typGeometri
   */
  pobierzDefinicjeStyluWybraneObiektyDlaSelekcji(typGeometri: string): ServerStylMapviewer {
    let parametry: string[] = [];
    if (typGeometri === 'LineString') {
      parametry = environment.stylWybraneObiektySelekcjaLinia.split(':');
    }
    if (typGeometri === 'Polygon') {
      parametry = environment.stylWybraneObiektySelekcjaPoligon.split(':');
    }
    if (typGeometri === 'Point') {
      parametry = environment.stylWybraneObiektySelekcjaPunkt.split(':');
    }
    if (parametry.length >= 2) {
      return {zrodlo: parametry[0], styl: parametry[1]};
    }
    return {zrodlo: '', styl: ''};
  }

}
