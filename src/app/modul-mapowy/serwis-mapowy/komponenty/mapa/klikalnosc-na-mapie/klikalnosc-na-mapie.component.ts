import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Map as OMap } from "../../../../oracle-maps/types/map";
import { Mapa } from "../../../modele/mapa";
import { Observable, Subscription } from "rxjs";
import { OM } from "../../../../oracle-maps/types/om";
import { GlobalneZdarzeniaService } from "../../../serwisy/globalne-zdarzenia.service";
import { Point } from "../../../../oracle-maps/types/point";
import { Punkt } from "../../../modele/punkt";
import { KlikniecieNaMapieEvent, MapaService, TYPY_ZDARZEN_MYSZY } from "../../../serwisy/mapa.service";
import { ResponsywnoscUtils } from 'src/app/modul-mapowy/mm-core/responsywnosc/utils/resposnsywnosc-utils';
import { AktualizacjaKomponentuService } from 'src/app/modul-mapowy/commons/serwisy/aktualizacja-komponentu.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';

declare var OM: OM;

/**
 * Komponent służy do obsługi klikalności na mapie
 */
@Component({
  selector: 'mm-klikalnosc-na-mapie',
  templateUrl: './klikalnosc-na-mapie.component.html',
  styleUrls: ['./klikalnosc-na-mapie.component.scss']
})
export class KlikalnoscNaMapieComponent implements OnInit, OnDestroy {

  zamykanieOkienSubscription?: Subscription;

  timer?: any;
  timerMobilny?: any;

  @Input()
  mapView?: OMap;

  @Input()
  mapa?: Mapa;

  /**
   * Konstruktor
   * @param globalneZdarzenia
   * @param mapaSerwis
   */
  constructor(private globalneZdarzenia: GlobalneZdarzeniaService,
    private eRef: ElementRef,
    private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private aktualizacjaKomponentuService: AktualizacjaKomponentuService,
    private mapaSerwis: MapaService) {
      console.log('klikalnosc na mapie konstruktor');
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    if (ResponsywnoscUtils.czyTrybDesktop()) {
      this.generatorZdarzenLewyKlik().subscribe(zdarzenie => {
        clearInterval(this.timer);
        this.rozglosZdarzenieMyszyNaMapie(zdarzenie);
      });
      this.generatorZdarzenPrawyKlik().subscribe(zdarzenie => {
        clearInterval(this.timer);
        this.oddalZoom(zdarzenie);
        this.rozglosZdarzenieMyszyNaMapie(zdarzenie);
      });
      this.generaorZdarzenNajechanieMyszy().subscribe(zdarzenie => {
        this.rozglosZdarzenieMyszyNaMapie(zdarzenie);
      });
    } else {
      this.obslugaZdarzenMobile().subscribe(zdarzenie => {
        this.rozglosZdarzenieMyszyNaMapie(zdarzenie);
      });
    }
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    if (this.zamykanieOkienSubscription) {
      this.zamykanieOkienSubscription.unsubscribe();
    }
    this.mapView?.deleteListeners(OM.event.MouseEvent.MOUSE_CLICK);
    this.mapView?.deleteListeners(OM.event.MouseEvent.MOUSE_DOUBLE_CLICK);
    this.mapView?.deleteListeners(OM.event.MouseEvent.MOUSE_RIGHT_CLICK);
    this.mapView?.deleteListeners(OM.event.MouseEvent.MOUSE_DOWN);
    this.mapView?.deleteListeners(OM.event.MouseEvent.MOUSE_MOVE);
  }

  /**
   * Funkcja rozgłasza zdarzenia na myszy na mapie
   * @param event
   */
  private rozglosZdarzenieMyszyNaMapie(event: KlikniecieNaMapieEvent): void {
    this.mapaSerwis.aktualiujZdarzeniaMyszyNaMapie(event);
  }


  /**
   * Funkcja zmniejsza zoom
   * @param event
   */
  oddalZoom(event: KlikniecieNaMapieEvent) {
    if (event.typEventu === TYPY_ZDARZEN_MYSZY.PRAWY_DWUKLIK) {
      this.mapView?.zoomOut();
    }
  }

  /**
   * Funkcja definiuje zdarzenia dla lewego klika
   */
  private generatorZdarzenLewyKlik(): Observable<KlikniecieNaMapieEvent> {
    let blokujZdarzenie = false;
    let przesuniecieMyszy = 0
    return new Observable(subscriber => {
      this.mapView?.addListener(OM.event.MouseEvent.MOUSE_DOWN, (event) => {
        if (event.evt.button !== 0) {
          return;
        }
        blokujZdarzenie = false;
        const pozycjaGeograficzna = this.mapView?.getCursorLocation()!;
        const pozycjaNaEkranie: Punkt = {
          x: event.target.mLocX,
          y: event.target.mLocY,
          srid: 0
        }
        setTimeout(() => {
          if (!blokujZdarzenie) {
            przesuniecieMyszy = 0;
            subscriber.next({
              eventZrodlowy: event, typEventu: TYPY_ZDARZEN_MYSZY.LEWY_KLIK,
              pozycjaGeograficzna: pozycjaGeograficzna, pozycjaNaEkranie: pozycjaNaEkranie
            });
          }
        }, 300);
      });
      this.mapView?.addListener(OM.event.MouseEvent.MOUSE_DOUBLE_CLICK, (event) => {
        blokujZdarzenie = true;
        const pozycjaGeograficzna = this.mapView?.getCursorLocation()!;
        const pozycjaNaEkranie: Punkt = {
          x: event.target.mLocX,
          y: event.target.mLocY,
          srid: 0
        }
        subscriber.next({
          eventZrodlowy: event, typEventu: TYPY_ZDARZEN_MYSZY.LEWY_DWUKLIK,
          pozycjaGeograficzna: pozycjaGeograficzna, pozycjaNaEkranie: pozycjaNaEkranie
        });
      });
      this.mapView?.addListener(OM.event.MapEvent.MAP_BEFORE_ZOOM, () => {
        blokujZdarzenie = true;
        setTimeout(() => {
          blokujZdarzenie = true;
        }, 100)
      })
      this.mapView?.addListener(OM.event.MouseEvent.MOUSE_MOVE, () => {
        przesuniecieMyszy++;
        if (przesuniecieMyszy > 2) {
          blokujZdarzenie = true;
          przesuniecieMyszy = 0;
        }
      })
      this.zamykanieOkienSubscription = this.globalneZdarzenia.pobierSubjectZamykaniaOkienka().subscribe(() => {
        blokujZdarzenie = true;
      });
    })
  }


  /**
   * Funkcja generuje zdarzenia on najechania mysza
   */
  private generaorZdarzenNajechanieMyszy(): Observable<KlikniecieNaMapieEvent> {
    return new Observable(subscriber => {
      this.mapView?.addListener(OM.event.MouseEvent.MOUSE_MOVE, (event) => {
        const pozycjaGeograficzna = this.mapView?.getCursorLocation()!;
        const pozycjaNaEkranie: Punkt = {
          x: event.target.mLocX,
          y: event.target.mLocY,
          srid: 0
        }
        subscriber.next({
          pozycjaGeograficzna: pozycjaGeograficzna,
          pozycjaNaEkranie: pozycjaNaEkranie,
          eventZrodlowy: event,
          typEventu: TYPY_ZDARZEN_MYSZY.RUCH_MYSZY
        });
        clearInterval(this.timer);
        this.timer = setTimeout(() => {
          subscriber.next({
            pozycjaGeograficzna: pozycjaGeograficzna,
            pozycjaNaEkranie: pozycjaNaEkranie,
            eventZrodlowy: event,
            typEventu: TYPY_ZDARZEN_MYSZY.ZAWISNIECIE_MYSZY
          })
        }, 1000);
      })
      this.mapView?.addListener(OM.event.MouseEvent.MOUSE_OUT, (event) => {
        if (this.timer) {
          clearInterval(this.timer);
        }
        const pozycjaGeograficzna = this.mapView?.getCursorLocation()!;
        const pozycjaNaEkranie: Punkt = {
          x: event.target.mLocX,
          y: event.target.mLocY,
          srid: 0
        }
        subscriber.next({
          pozycjaGeograficzna: pozycjaGeograficzna,
          pozycjaNaEkranie: pozycjaNaEkranie,
          eventZrodlowy: event,
          typEventu: TYPY_ZDARZEN_MYSZY.WYJSCIE_Z_MAPY
        })
      })
    })
  }

  /**
   * Funkcja definiuje zdarzenia dla prawego klika
   */
  private generatorZdarzenPrawyKlik(): Observable<KlikniecieNaMapieEvent> {
    let pomiarTrwa = false;
    let klikniecia = 0;
    return new Observable<KlikniecieNaMapieEvent>(subscriber => {
      this, this.mapView?.addListener(OM.event.MouseEvent.MOUSE_DOWN, (event) => {
        if (event.evt.button !== 2) {
          return;
        }
        const pozycjaGeograficzna = this.mapView?.getCursorLocation()!
        const pozycjaNaEkranie: Punkt = {
          x: event.target.mLocX,
          y: event.target.mLocY,
          srid: 0
        }
        klikniecia++;
        if (pomiarTrwa) {
          return;
        }
        pomiarTrwa = true;
        setTimeout(() => {
          if (klikniecia >= 2) {
            subscriber.next({
              eventZrodlowy: event, typEventu: TYPY_ZDARZEN_MYSZY.PRAWY_DWUKLIK,
              pozycjaGeograficzna: pozycjaGeograficzna, pozycjaNaEkranie: pozycjaNaEkranie
            })
          } else {
            subscriber.next({
              eventZrodlowy: event, typEventu: TYPY_ZDARZEN_MYSZY.PRAWY_KLIK,
              pozycjaGeograficzna: pozycjaGeograficzna, pozycjaNaEkranie: pozycjaNaEkranie
            })
          }
          pomiarTrwa = false;
          klikniecia = 0;
        }, 300)
      });
    });
  }

  /**
   * Funkcja definiuje obsługę zdarzeń mobilnych na mapie
   */
  private obslugaZdarzenMobile(): Observable<KlikniecieNaMapieEvent> {
    const touchElement = (this.mapView as any).$oracleMapDiv[0].children[1].children[0];
    let czasStart = 0;
    let czasStop = 0;
    let blokuj = false;
    let przesuniecie = 0;
    let poprzedniePrzesuniecie: TouchEvent | undefined;
    let poprzednieTapniecie: TouchEvent | undefined;
    let pozycjaGeograficzna: Point;
    let pozycjaNaEkranie: Punkt;
    let liczbaKlikniec = 0;
    let trwaPomiar = false;
    return new Observable<KlikniecieNaMapieEvent>(subscriber => {
      touchElement.addEventListener("touchstart", (event: any) => {
        if (event.touches.length > 1) {
          blokuj = true;
          poprzedniePrzesuniecie = undefined;
          return;
        }
        pozycjaNaEkranie = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
          srid: 0
        }
        if (this.policzDystansTapniecia(poprzednieTapniecie, event) <= 50) {
          liczbaKlikniec++;
        }
        poprzednieTapniecie = event;
        czasStart = new Date().getTime();
        blokuj = false;
        przesuniecie = 0;
        poprzedniePrzesuniecie = undefined;
      });
      touchElement.addEventListener("touchend", (event: any) => {
        czasStop = new Date().getTime();
        let czasklikniecia = czasStop - czasStart;
        pozycjaGeograficzna = this.mapView?.getCursorLocation()!;
        if (trwaPomiar) {
          return
        }
        trwaPomiar = true;
        setTimeout(() => {
          let eventKlikniecia = this.przygotujeDaneZdarzenia(pozycjaGeograficzna, pozycjaNaEkranie, event, czasklikniecia, liczbaKlikniec, blokuj);
          if (eventKlikniecia) {
            subscriber.next(eventKlikniecia);
            czasStart = 0;
            przesuniecie = 0;
            blokuj = false;
            liczbaKlikniec = 0;
          }
          trwaPomiar = false;
        }, 200)
      });
      touchElement.addEventListener("touchmove", (event: any) => {
        przesuniecie += this.policzDystansPrzesuniecia(poprzedniePrzesuniecie, event);
        poprzedniePrzesuniecie = event;
        if (przesuniecie > 5) {
          blokuj = true;
          przesuniecie = 0;
        }
      });
      this.mapView?.addListener(OM.event.MapEvent.MAP_BEFORE_ZOOM, () => {
        blokuj = true;
        setTimeout(() => {
          blokuj = true;
        }, 100)
      })
    })
  }

  /**
   * Funkcja oblicza dystans przesuniecia kursora
   * @param poprzedniEvent
   * @param aktualnyEvent
   */
  private policzDystansPrzesuniecia(poprzedniEvent?: TouchEvent, aktualnyEvent?: TouchEvent): number {
    if (!poprzedniEvent || !aktualnyEvent) {
      return 0;
    }
    const przesuniecieX = aktualnyEvent.touches[0].clientX - poprzedniEvent.touches[0].clientX;
    const przesuniecieY = aktualnyEvent.touches[0].clientY - poprzedniEvent.touches[0].clientY;
    const wynik = Math.round(Math.sqrt(przesuniecieX * przesuniecieX + przesuniecieY * przesuniecieY));
    return wynik > 0 ? wynik : wynik * -1;
  }

  /**
   * Funkcja oblicza dystans miedzy tapnieciami
   * @param poprzedniEvent
   * @param aktualnyEvent
   */
  private policzDystansTapniecia(poprzedniEvent?: TouchEvent, aktualnyEvent?: TouchEvent): number {
    if (!poprzedniEvent || !aktualnyEvent) {
      return 0;
    }
    const przesuniecieX = aktualnyEvent.changedTouches[0].clientX - poprzedniEvent.changedTouches[0].clientX;
    const przesuniecieY = aktualnyEvent.changedTouches[0].clientY - poprzedniEvent.changedTouches[0].clientY;
    const wynik = Math.round(Math.sqrt(przesuniecieX * przesuniecieX + przesuniecieY * przesuniecieY));
    return wynik > 0 ? wynik : wynik * -1;
  }

  /**
   * Funkcja przygotowuje ewenty mobilne
   * @param pozycjaGeograficzna
   * @param pozycjaNaEkranie
   * @param czasKlikniecia
   * @param blokuj
   */
  private przygotujeDaneZdarzenia(pozycjaGeograficzna: Point, pozycjaNaEkranie: Punkt, event: any, czasKlikniecia: number, liczbaKlikniec: number, blokuj: boolean): KlikniecieNaMapieEvent | undefined {
    if (liczbaKlikniec > 1 && !blokuj) {
      return {
        eventZrodlowy: event, typEventu: TYPY_ZDARZEN_MYSZY.PODWOJNE_TAPNIECIE,
        pozycjaGeograficzna: pozycjaGeograficzna, pozycjaNaEkranie: pozycjaNaEkranie
      }
    }
    if (czasKlikniecia < 1000 && !blokuj) {
      return {
        eventZrodlowy: event, typEventu: TYPY_ZDARZEN_MYSZY.TAPNIECIE,
        pozycjaGeograficzna: pozycjaGeograficzna, pozycjaNaEkranie: pozycjaNaEkranie
      }
    }
    if (!blokuj) {
      return {
        eventZrodlowy: event, typEventu: TYPY_ZDARZEN_MYSZY.PRZYTRZYMANIE,
        pozycjaGeograficzna: pozycjaGeograficzna, pozycjaNaEkranie: pozycjaNaEkranie
      }
    }
    return undefined;
  }


}
