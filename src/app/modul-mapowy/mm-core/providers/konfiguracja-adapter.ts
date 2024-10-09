import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Interfejs do przesyłania danych konfiguracyjnych
 */
export interface KonfiguracjaGrupaDto {
  uuid?: string;
  listaPodgrupKonfiguracji?: Array<KonfiguracjaGrupaDto>;
  listaKonfiguracji?: Array<any>;
  typGrupyKonfiguracji?: { obiektEnum: string, tlumaczenie: string }
  kolejnosc?: number;
}

export interface ServerStylMapviewer {
  zrodlo: string;
  styl: string;
}

/**
 * Interfejs definiujący konfigurację modulu-mapowego
 */
export interface KonfiguracjaAdapter {
  /**
   * Funkcja zwraca adres serwera mapviewer
   */
  pobierzMapViewerUrl(): string;


  /**
   * Funkcja zwraca adres serwera kowersji
   */
  pobierzModulKonwersjiUrl(): string;

  /**
   * Funkcja zwraca informację czy modul-mapowy jest w widoku administratora
   */
  widokAdministratora(): boolean;

  /**
   * Funkcja zwraca limit wynikow wyszukiwania
   */
  pobierzLimitWynikowWyszukiwania(): Observable<KonfiguracjaGrupaDto>;

  /**
   * Funckja zwraca dostepne formaty plików
   */
  pobierzDostepneFormatyPlikowPrzestrzennych(): Observable<KonfiguracjaGrupaDto>;


  /**
   * Funkcja zwraca dostepne uklady wspolrzednych
   */
  pobierzDostepneUkladyPrzstrzenne(): Observable<KonfiguracjaGrupaDto>;


  /**
   * Funkcja zwraca url do aplikacji poziom hałau na budynkach
   */
  pobierzPoziomHalasuUrl(): string;

  /**
   * Funkcja zwraca url ikon dla warstw analitycznych o podanej geometrii
   * @param typGeometri
   */
  pobierzUrlIkonyAnalizy(typGeometri: string): string;

  /**
   * Funkcja zwraca url ikon dla strzalki polnocy w wydruku mapy
   */
  pobierzUrlStrzalkiPolnocy(): string;

  /**
   * Funkcja zwraca url ikon dla znaku wodnego w wydruku mapy
   */
  pobierzUrlZnakuWodnego(): string;

  /**
   * Funkcja zwraca definicje stylu dla podanej geometru
   * @param typGeometri
   */
  pobierzDefinicjeStyluDlaAnaliz(typGeometri: string): ServerStylMapviewer;

  /**
   * Funkcja zwraca definicje styli dla selekcji
   * @param typGeometri
   */
  pobierzDefinicjeStyluWszystkieObiektyDlaSelekcji(typGeometri: string): ServerStylMapviewer;

  /**
   * Funkcja zwraca definicje styli dla selekcji
   * @param typGeometri
   */
  pobierzDefinicjeStyluWybraneObiektyDlaSelekcji(typGeometri: string): ServerStylMapviewer;

}

/**
 * Klasa abstrakcyjna definiująca konfigurację modulu-mapowego
 */
export abstract class KonfiguracjaModulMapowyAdapter {

  /**
   * Funkcja zwraca url mapviewer
   */
  abstract pobierzMapViewerUrl(): string;

  /**
   * Funkcja zwraca adres serwera kowersji
   */
  abstract pobierzModulKonwersjiUrl(): string;

  /**
   * Funkcja zwraca widoczność przycisku udostępniania mapy
   */
  abstract pobierzWidocznoscUdostepnianiaMapy(): boolean;

  /**
   * Funkcja zwraca informację o widoku admina
   */
  abstract widokAdministratora(): boolean;

  /**
   * Funkcja zwraca limit wynikow wyszukiwania
   */
  abstract pobierzLimitWynikowWyszukiwania(): Observable<KonfiguracjaGrupaDto>;

  /**
   * Funckja zwraca dostepne formaty plików
   */
  abstract pobierzDostepneFormatyPlikowPrzestrzennych(): Observable<KonfiguracjaGrupaDto>;


  /**
   * Funkcja zwraca dostepne uklady wspolrzednych
   */
  abstract pobierzDostepneUkladyPrzstrzenne(): Observable<KonfiguracjaGrupaDto>;

  /**
   * Funkcja zwraca url do aplikacji poziom hałau na budynkach
   */
  abstract pobierzPoziomHalasuUrl(): string;

  /**
   * Funkcja zwraca url ikon dla warstw analitycznych o podanej geometrii
   * @param typGeometri
   */
  abstract pobierzUrlIkonyAnalizy(typGeometri: string): string;


  /**
   * Funkcja zwraca url ikon dla strzalki polnocy w wydruku mapy
   */
  abstract pobierzUrlStrzalkiPolnocy(): string;

  /**
   * Funkcja zwraca url ikon dla znaku wodnego w wydruku mapy
   */
  abstract pobierzUrlZnakuWodnego(): string;

  /**
   * Funkcja zwraca definicje stylu dla podanej geometru
   * @param typGeometri
   */
  abstract pobierzDefinicjeStyluDlaAnaliz(typGeometri: string): ServerStylMapviewer;

  /**
   * Funkcja zwraca definicje styli dla selekcji
   * @param typGeometri
   */
  abstract pobierzDefinicjeStyluWszystkieObiektyDlaSelekcji(typGeometri: string): ServerStylMapviewer;

  /**
   * Funkcja zwraca definicje styli dla selekcji
   * @param typGeometri
   */
  abstract pobierzDefinicjeStyluWybraneObiektyDlaSelekcji(typGeometri: string): ServerStylMapviewer;
}


/**
 * Podstawowa implementacja konfiguracji modulu mapowego
 */
export class DomyslnaKonfiguracjaModulMapowyAdapter extends KonfiguracjaModulMapowyAdapter {
  /**
   * Funkcja zwraca adres serwera mapviewer
   */
  pobierzMapViewerUrl(): string {
    return environment.mapViewerUrl;
  }

  /**
   * Funkcja zwraca adres serwera kowersji
   */
  pobierzModulKonwersjiUrl(): string {
    return '';
  }

  /**
   * Funkcja zwraca widoczność przycisku udostępniania mapy
   */
  pobierzWidocznoscUdostepnianiaMapy(): boolean {
    return false;
  }

  widokAdministratora(): boolean {
    return false;
  }

  /**
   * Funkcja zwraca limit wynikow wyszukiwania
   */
  pobierzLimitWynikowWyszukiwania(): Observable<KonfiguracjaGrupaDto> {
    return new Observable(subscriber => {
      subscriber.next({});
    });
  }

  /**
   * Funkcja zwraca limit wynikow wyszukiwania
   */
  pobierzDostepneFormatyPlikowPrzestrzennych(): Observable<KonfiguracjaGrupaDto> {
    return new Observable(subscriber => {
      subscriber.next({});
    });
  }

  /**
   * Funkcja zwraca limit wynikow wyszukiwania
   */
  pobierzDostepneUkladyPrzstrzenne(): Observable<KonfiguracjaGrupaDto> {
    return new Observable(subscriber => {
      subscriber.next({});
    });
  }

  /**
   * Funkcja zwraca url do aplikacji poziom hałau na budynkach
   */
  pobierzPoziomHalasuUrl(): string {
    return 'https://mapa.um.warszawa.pl/budynek/widok.html';
  }


  /**
   * Funkcja zwraca url ikon dla warstw analitycznych
   * @param typGeometri
   */
  pobierzUrlIkonyAnalizy(typGeometri: string): string {
    return '';
  }


  /**
   * Funkcja zwraca url ikon dla strzalki polnocy w wydruku mapy
   */
  pobierzUrlStrzalkiPolnocy(): string {
    return '';
  }

  /**
   * Funkcja zwraca url ikon dla znaku wodnego w wydruku mapy
   */
  pobierzUrlZnakuWodnego(): string {
    return '';
  }

  /**
   * Funkcja zwraca definicje stylu dla podanej geometru
   * @param typGeometri
   */
  pobierzDefinicjeStyluDlaAnaliz(typGeometri: string): ServerStylMapviewer {
    return {zrodlo: '', styl: ''};
  }

  /**
   * Funkcja zwraca definicje styli dla selekcji
   * @param typGeometri
   */
  pobierzDefinicjeStyluWszystkieObiektyDlaSelekcji(typGeometri: string): ServerStylMapviewer{
    return {zrodlo: '', styl: ''};
  }

  /**
   * Funkcja zwraca definicje styli dla selekcji
   * @param typGeometri
   */
  pobierzDefinicjeStyluWybraneObiektyDlaSelekcji(typGeometri: string): ServerStylMapviewer{
    return {zrodlo: '', styl: ''};
  }

}
