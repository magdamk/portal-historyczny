import {Observable} from 'rxjs';

export interface ListaPlikow {
  pliki: Plik[];
}

export interface Plik {
  nazwa: string, sciezka: string, rozszerzenie?: string; sciezkaMiniaturki?: string;
}

/**
 * Interfejs opisujacy pobieranie multimediów i załączników
 */
export interface MultimediaIZalacznikiAdapter {

  /**
   * Funkcja pobiera zalaczniki
   * @param nazwaMVC
   * @param zrodloMVC
   * @param idObiektu
   */
  pobierzZalaczniki(nazwaMVC: string, zrodloMVC: string, idObiektu: string): Observable<ListaPlikow>;

  /**
   * Funkcja pobiera multimedia
   * @param nazwaMVC
   * @param zrodloMVC
   * @param idObiektu
   */
  pobierzMultimedia(nazwaMVC: string, zrodloMVC: string, idObiektu: string): Observable<ListaPlikow>;
}

/**
 * klasa abstrakcyjna opisujacy pobieranie multimediów i załączników
 */
export abstract class MultimediaIZalacznikiModulMapowyAdapter implements MultimediaIZalacznikiAdapter {

  /**
   * Funkcja pobiera zalaczniki
   * @param nazwaMVC
   * @param zrodloMVC
   * @param idObiektu
   */
  abstract pobierzZalaczniki(nazwaMVC?: string, zrodloMVC?: string, idObiektu?: string): Observable<ListaPlikow>;

  /**
   * Funkcja pobiera multimedia
   * @param nazwaMVC
   * @param zrodloMVC
   * @param idObiektu
   */
  abstract pobierzMultimedia(nazwaMVC?: string, zrodloMVC?: string, idObiektu?: string): Observable<ListaPlikow>;

}


/**
 * Domyslana implementacja pobieranie multimediów i załączników
 */
export class DomyslnyMultimediaIZalacznikiAdapter implements MultimediaIZalacznikiAdapter {

  /**
   * Funkcja pobiera zalaczniki
   * @param uuidWarstwy
   * @param idObiektu
   */
  pobierzZalaczniki(uuidWarstwy: string, idObiektu: string): Observable<ListaPlikow> {
    return new Observable(subscriber => {
      subscriber.next({
        pliki: [{
          nazwa: 'plik 1.pdf',
          sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_125250_20210819125306836.jpg'
        },
          {
            nazwa: 'plik 2.pdf',
            sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_125217_20210819125227683.jpg'
          },
          {
            nazwa: 'plik 3.pdf',
            sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_125217_20210819125227683.jpg'
          },
          {
            nazwa: 'plik 4.pdf',
            sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_125217_20210819125227683.jpg'
          },
          {
            nazwa: 'plik 5.pdf',
            sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_124611_20210819124734580.jpg'
          }]
      })
    });
  }

  /**
   * Funkcja pobiera multimedia
   * @param uuidWarstwy
   * @param idObiektu
   */
  pobierzMultimedia(uuidWarstwy: string, idObiektu: string): Observable<ListaPlikow> {
    return new Observable(subscriber => {
      subscriber.next({
        pliki: [{
          nazwa: 'plik 1.pdf',
          sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_125250_20210819125306836.jpg'
        },
          {
            nazwa: 'plik 2.pdf',
            sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_125217_20210819125227683.jpg'
          },
          {
            nazwa: 'plik 3.pdf',
            sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_125217_20210819125227683.jpg'
          },
          {
            nazwa: 'plik 4.pdf',
            sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_125217_20210819125227683.jpg'
          },
          {
            nazwa: 'plik 5.pdf',
            sciezka: 'http://localhost:7003/modul-multimediow/open/multimedia/pliki/a2e974de-c22c-41c4-a94f-823c72ef20a1/172494/IMG_20210819_124611_20210819124734580.jpg'
          }]
      })
    })
  }

}
