import {Injectable} from '@angular/core';
// import {ListaPlikow, MultimediaIZalacznikiAdapter} from '@modul-mapowy';
import {Observable} from 'rxjs';
import { ControllerMultimediaOpenService } from 'src/app/core/api/controller-multimedia-open.service';
// import { ControllerZalacznikiOpenService } from 'src/app/core/api/controller-zalaczniki-open.service';
import { MultimediaIZalacznikiAdapter, ListaPlikow } from 'src/app/modul-mapowy/mm-core/providers/multimedia-i-zalaczniki-adapter';
// import {ControllerMultimediaOpenService, ControllerZalacznikiOpenService} from '../../../../../build/openapi_modul_multimediow_public';

/**
 * Serwis pobieranie załączników i multimediow
 */
@Injectable({
  providedIn: 'root'
})
export class MultimediaIZalacznikiProviderService implements MultimediaIZalacznikiAdapter {

  /**
   * Konstruktor
   * @param multimedia
   * @param zalaczniki
   */
  constructor(private multimedia: ControllerMultimediaOpenService,
              // private zalaczniki: ControllerZalacznikiOpenService
            ) {
  }

  private rozszerzeniaVideo = ['mp4', 'ogv', 'webm','m4v'];
  private rozszerzeniaAudio = ['mp3', 'ogg', 'wav','flac'];
  private audioBackground = "/assets/modul-mapowy/img/audio.png";
  private videoBackground = "/assets/modul-mapowy/img/wideo.png";
  /**
   * Funkcja pobiera multimedia
   * @param nazwaMVC
   * @param zrodloMVC
   * @param idObiektu
   */
  pobierzMultimedia( zrodloMVC: string, nazwaMVC: string, idObiektu: string): Observable<ListaPlikow> {
    return new Observable(subscriber => {
      this.multimedia.pobierzListePlikowPoZrodleDanychIMVC( zrodloMVC, nazwaMVC, parseInt(idObiektu)).subscribe((dane: any) => {
        const wynik ={pliki: []}
        wynik.pliki = dane.content.map((u: any) => {
          if(u.rozszerzenie && this.rozszerzeniaVideo.includes(u.rozszerzenie)){
            return {nazwa: u.nazwaPliku, sciezka: encodeURI(u.sciezka), rozszerzenie: u.rozszerzenie, sciezkaMiniaturki: this.videoBackground }
          }
          if(u.rozszerzenie && this.rozszerzeniaAudio.includes(u.rozszerzenie)){
            return {nazwa: u.nazwaPliku, sciezka: encodeURI(u.sciezka), rozszerzenie: u.rozszerzenie, sciezkaMiniaturki: this.audioBackground}
          }
          return {nazwa: u.nazwaPliku, sciezka: encodeURI(u.sciezka), rozszerzenie: u.rozszerzenie, sciezkaMiniaturki:  encodeURI(u.sciezka)}
        });
        subscriber.next(wynik);
        subscriber.complete();
      })
    });
  }

  /**
   * Funkcja pobiera zalaczniki
   * @param uuidWarstwy
   * @param idObiektu
   */
  // pobierzZalaczniki(zrodloMVC: string, nazwaMVC: string,  idObiektu: string): Observable<ListaPlikow> {
  //   return new Observable(subscriber => {
  //     this.zalaczniki.pobierzListePlikowPoNazwieMVCiZrodle(zrodloMVC, nazwaMVC, parseInt(idObiektu)).subscribe((dane: any) => {
  //       const wynik ={pliki: []}
  //       wynik.pliki = dane.content.map((u: any) => {
  //         return {nazwa: u.nazwaPliku, sciezka: encodeURI(u.sciezka), rozszerzenie: u.rozszerzenie}
  //       });
  //       subscriber.next(wynik);
  //       subscriber.complete();
  //     })
  //   });
  // }

}
