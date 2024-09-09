import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Mapa } from '../../../modele/mapa';
import { Map } from '../../../../oracle-maps/types/map';
import { OM } from '../../../../oracle-maps/types/om';
import { ScaleBar } from 'src/app/modul-mapowy/oracle-maps/types/scale-bar';
import { debounceTime, Observable, Subscription, throttleTime } from 'rxjs';
import { MapaService } from '../../../serwisy/mapa.service';
import { AktualizacjaKomponentuService } from 'src/app/modul-mapowy/commons/serwisy/aktualizacja-komponentu.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { GrupaWarstwPodkladowych } from '../../../modele/grupa-warstw-podkladowych';
import { WarstwaUtils } from '../../../utils/warstwa-utils';
import { TypWarstwy, TypWyswietlania, Warstwa } from '../../../modele/warstwa';
import { KolekcjeUtils } from '../../../utils/kolekcje-utils';
import { Layer } from 'src/app/modul-mapowy/oracle-maps/types/layer';
import { MapaUtils } from '../../../utils/mapa-utils';
import { EmptyUtils } from '../../../utils/empty-utils';

declare var OM: OM;

@Component({
  selector: 'mm-widok-mapy',
  templateUrl: './widok-mapy.component.html',
  styleUrls: ['./widok-mapy.component.scss']
})



export class WidokMapyComponent implements OnInit, OnDestroy {
  @Input() grupyWarstwPodkladowych: GrupaWarstwPodkladowych[] = [];
  @Input() mapa?: Mapa;
  @Input() synchronizujZoomISrodek = true;
  @Input() lokalizacjaMapPodkladowych: 'LEWA' | 'PRAWA' = 'LEWA';
  @Input() zmianaMapPodkladowychWidocna = true;
  @Input() sterowanieMapyWidoczne = true;
  @Input() generowanieZdarzenMyszy = true;
  @Input() licencjaWidoczna = false;
  @Output() inicjalizacjaMapy = new EventEmitter<Map>();

  mapView?: Map;
  mapaZainicjowana = false;
  scaleBar?: ScaleBar;
  bibliotekaOracleZaladoana = true;
  subskryocje$ = new Subscription();

  // widokAdministratora: boolean;
  podstawoweWarstwyPodkladoweDlaMapy: GrupaWarstwPodkladowych[] = [];

  /**
     * Konstruktor
     * @param mapaService - serwis mapowy
     */
  constructor(private mapaService: MapaService,
    private eRef: ElementRef,
    private aktualizacjaKomponentuService: AktualizacjaKomponentuService,
    private konfiguracja: KonfiguracjaModulMapowyAdapter) {
    // this.widokAdministratora = konfiguracja.widokAdministratora();
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    console.log('widok mapy on init:', this.mapaService.mapaZaladowane);
    // this.konfigurujSynchronizacjeMap();
    // this.subskryocje$.add(this.mapaService.pobierzSubjectAktualizacjiWarstwy().subscribe(mapa => {
    //   if (mapa && this.mapa && mapa.uuid === this.mapa.uuid) {
    //     this.mapa = mapa;
    //     this.aktualizujWarstwyWWidokuMapy(this.mapa);
    //     //TODO Po aktualizacja komponentu mapy rerenderowanie mapy przy zmianie warstwy tail nie jest już konieczne
    //     //TODO jezeli problem nie wróci to funkcja do usunięcia
    //     // this.rerenderujMapeJezeliPosiadaWarstweTail(this.mapa.warstwy);
    //   }
    // }));
    // this.subskryocje$.add(this.mapaService.pobierzSubjectUsuwaniaWarstwy().subscribe(warstwa => {
    //   if (warstwa?.uuidMapy === this.mapa?.uuid)
    //     this.usunWarstweZWidokuMapy(warstwa?.warstwa);
    // }));
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.mapaService.resetujStan();
    this.subskryocje$.unsubscribe();
  }



  /**
   * Funkcja wywoływana po prawidłowej inicjalizacji mapy
   * @param mapa - obiekt mapy
   */
  widokMapyUtworzony(mapa: Map): void {
    this.mapView = mapa;
    this.inicjujMape();
  }

  /**
   * Funkcja inicjuje warstwy podkaldowe i tematyczne
   */
  private inicjujMape(): void {
    if (this.grupyWarstwPodkladowych.length && this.mapa && this.bibliotekaOracleZaladoana && !this.mapaZainicjowana) {
      this.mapView?.addScaleBar();
      this.mapView?.setMouseWheelZoomBehavior(OM.Map.ZOOM_KEEP_MOUSE_POINT);
      this.inicjujWarstwePodkladowa();
      console.log('widok-mapy inicjuj mape');
      this.mapView?.init();
      console.log('widok-mapy inicjuj mape', this.mapView);
      this.zarejestrujObslugeZdarzenMapy();
      this.wymusAktualizacjeKomponentu();
      // this.dodajTekstLicencji();
      this.mapaService.aktualizujWarstwe(this.mapa);
    }
  }

  /**
    * Funkcja pozwala załadować warstwy podkładowe
    */
  private inicjujWarstwePodkladowa(): void {
    this.grupyWarstwPodkladowych.forEach(gwp => gwp.wybranaWarstwa = 0);
    const grupaWarstw = this.wyszukajGrupeWarstwPoUUID(this.mapa?.domyslneWarstwyPodkladowe?.uuidGrupaWarstw);
    grupaWarstw.wybranaWarstwa = this.wyszukajIndeksWarstwyWGrupiePoUID(grupaWarstw, this.mapa?.domyslneWarstwyPodkladowe?.uuidWarstwa);
    this.przelaczWarstwePodkladowaWWidokuMapy(grupaWarstw);
  }

  /**
   * Funkcja ładuje wskazaną warstwę podkładową
   * @param warstwa - wybrana warstwa podkładowa
   */
  przelaczWarstwePodkladowaWWidokuMapy(warstwa: GrupaWarstwPodkladowych): void {
    this.usunStaraWarstwePodkladowa();
    const wybranaWarstwaPodkladowa = warstwa.warstwy[warstwa.wybranaWarstwa ? warstwa.wybranaWarstwa : 0].warstwa;
    const nowaWarstwaPodkladowa =
      WarstwaUtils.utworzWarstweMapy('podklad', wybranaWarstwaPodkladowa, this.konfiguracja, this.mapView!);
    this.mapView?.addLayer(nowaWarstwaPodkladowa);
    this.zapiszWybranaWarstwePodkladowaWdefinicjiMapy(warstwa);
    this.przeniesWarstweNaSpod('podklad');
    this.przeniesWarstweNaWierzch('warstwa-markerow');
  }
  /**
   * Funkcja usuwa ostatnią warstwę podkładowa z mapy
   */
  private usunStaraWarstwePodkladowa(): void {
    const warstwaPodkladowa = this.mapView?.getLayerByName('podklad');
    if (warstwaPodkladowa) {
      warstwaPodkladowa.setName('podklad_stary');
      this.mapView?.removeLayer(warstwaPodkladowa);
    }
  }

  /**
   * Funkcja zapisuje w mapie ostatnią wybraną grupę i warstwę podkładową
   * @param warstwa - wybrana grupa warstw
   */
  private zapiszWybranaWarstwePodkladowaWdefinicjiMapy(warstwa: GrupaWarstwPodkladowych): void {
    if (this.mapa) {
      this.mapa.domyslneWarstwyPodkladowe = {
        uuidGrupaWarstw: warstwa.uuid,
        uuidWarstwa: warstwa.warstwy[warstwa.wybranaWarstwa ? warstwa.wybranaWarstwa : 0].warstwa.uuid
      };
    }
  }


  /**
   * Funkcja ustawia z-index warstwy podkładowej na najniższy
   * @param idWarstwy - identyfikator warstwy na mapie
   */
  private przeniesWarstweNaSpod(idWarstwy: string): void {
    const w = this.mapView?.getLayerByName(idWarstwy);
    if (w) {
      w.sendToBottom();
    }
  }


  /**
   * Funkcja ustawia z-index warstwy podkładowej na najniższy
   * @param idWarstwy - identyfikator warstwy na mapie
   */
  private przeniesWarstweNaWierzch(idWarstwy: string): void {
    const w = this.mapView?.getLayerByName(idWarstwy);
    if (w) {
      w.bringToTop();
    }
  }

  /**
   * Funkcja wyszukuje grupę warstw podkładowych po uuid
   * @param uuidGrupyWarstw - uuid grupy warstw
   */
  private wyszukajGrupeWarstwPoUUID(uuidGrupyWarstw?: string): GrupaWarstwPodkladowych {
    if (uuidGrupyWarstw) {
      const grupaWarstw = this.grupyWarstwPodkladowych.find(g => g.uuid === this.mapa?.domyslneWarstwyPodkladowe?.uuidGrupaWarstw);
      return grupaWarstw ? grupaWarstw : this.grupyWarstwPodkladowych[0];
    }
    return this.grupyWarstwPodkladowych[0];
  }

  /**
    * Funkcja wyszukuje index warstwy w grupie wartw podkładowych po uuid
    * @param grupaWarstw - grupaWarstw
    * @param uuidWarstwyWGrupie - uuid warstwy
    */
  private wyszukajIndeksWarstwyWGrupiePoUID(grupaWarstw: GrupaWarstwPodkladowych, uuidWarstwyWGrupie?: string): number {
    if (uuidWarstwyWGrupie) {
      const indexWarstwy = grupaWarstw.warstwy.findIndex(w => w.warstwa.uuid === uuidWarstwyWGrupie);
      return indexWarstwy >= 0 ? indexWarstwy : 0;
    }
    return 0;
  }



  /**
   * Funkcja dodaje obsługe podstawowych zdarzeń mapy
   */
  private zarejestrujObslugeZdarzenMapy(): void {
    if (this.mapView) {
      this.obslugaEventuMapAfterZoom();
      this.obslugaEventuMouseMove();
      this.obslugaEwentuMapInitialized();
      this.obslugaEwentuMapRecentered();
      this.obslugaEventuAfterMapRefresh();
    }
  }

  /**
   * Funkcja definiuje obsługę eventu map after zoom
   */
  private obslugaEventuMapAfterZoom() {
    this.mapView?.addListener(OM.event.MapEvent.MAP_AFTER_ZOOM, (event) => {
      if (this.mapaZainicjowana) {
        this.rozglosZmianeZoomISrodekMapy();
        this.aktualizujWidocznoscWarstw(this.mapa?.warstwy);
        this.aktullizujZoomISrodekMapyWDefinicjiMapy();
      }
    });
  }
  /**
    * Funkcja rozgłasza stan mapy po zmianeie zoom lub środka mapy
    */
  private rozglosZmianeZoomISrodekMapy(): void {
    this.mapaService.aktualizujZoomISrodek(
      {
        identyfikatorMapy: this.mapa?.uuid,
        zoom: this.mapView?.getMapZoomLevel(),
        srodek: this.mapView?.getMapCenter(),
        skala: this.mapView?.getMapScale(),
        pasekSkali: this.scaleBar
      });
  }


  /**
   * Funkcja aktualizuje widocznosc warstw
   * @param warstwy
   */
  private aktualizujWidocznoscWarstw(warstwy?: Warstwa[]) {
    if (!warstwy) {
      return;
    }
    warstwy.forEach(w => {
      if (w.typWyswietlania === TypWyswietlania.KATALOG) {
        this.aktualizujWidocznoscWarstw(w.warstwy)
      } else {
        let layer = this.mapView?.getLayerByName(w.uuidMapa);
        if (layer) {
          layer.setVisible(Boolean(w.parametrySterujace?.widoczna && w.parametrySterujace?.aktywna && !w.parametrySterujace?.konflikt && !w.parametrySterujace.pozaZakresemPrzestrzennym))
        }
      }
    })
  }
  /**
   * Funkcja aktualizuje definicje mapy po zmianie zoom lub srodka
   */
  private aktullizujZoomISrodekMapyWDefinicjiMapy() {
    if (this.mapView && this.mapa) {
      const srodek = this.mapView.getMapCenter();
      this.mapa.srodekMapyX = srodek.getX();
      this.mapa.srodekMapyY = srodek.getY();
      this.mapa.domyslnaSkala = this.mapView?.getMapZoomLevel();
    }
  }
  /**
   * Funkcja rozgłasza pozycję kursora myszki
   */
  private rozglosZmianePozycjeKursora(): void {
    this.mapaService.aktualizjujPozycjeKursora({
      punktNaMapie: this.mapView?.getCursorLocation()
    });
  }

  /**
   * Funkcja rozgłasza inicjalizacje mapy
   */
  private rozglosZaladowanieMapy() {
    this.mapaService.mapaZaladowane(this.mapView!);
    this.inicjalizacjaMapy.emit(this.mapView!);
  }


  /**
   * Funkcja definiuje obsługę eventu mouse move
   */
  private obslugaEventuMouseMove() {
    this.mapView?.addListener(OM.event.MouseEvent.MOUSE_MOVE, (event) => {
      if (this.mapaZainicjowana) {
        this.rozglosZmianePozycjeKursora();
      }
    });
  }

  /**
   * Funkcja definiuje obsługę eventu map initialized
   */
  private obslugaEwentuMapInitialized() {
    this.mapView?.addListener(OM.event.MapEvent.MAP_INITIALIZED, (event) => {
      this.mapaZainicjowana = true;
      this.zaladujWarstwyTematyczne();
      this.inicjujZoomISrodekWWidokuMapy();
      this.konfigurujPasekSkaliWWidokuMapy(event.target.ScaleBar);
      this.aktullizujZoomISrodekMapyWDefinicjiMapy();
      this.rozglosZaladowanieMapy();
    });
  }
  /**
    * Funkcja konfiguruje mape i ładuje warstwy tematyczne
    */
  private zaladujWarstwyTematyczne(): void {
    if (this.mapa) {
      KolekcjeUtils.forEachRevers(this.mapa.warstwy, (w) => {
        this.zaladujKatalog(w);
      });
    }
  }

  /**
   * Funkcja wczytyuje katalog warstw
   * @param katalog - katalog z warstwami
   */
  private zaladujKatalog(katalog: Warstwa): void {
    switch (katalog.typWyswietlania) {
      case TypWyswietlania.KATALOG: {
        KolekcjeUtils.forEachRevers(katalog.warstwy, (w) => {
          this.zaladujKatalog(w);
        });
        break;
      }
      case TypWyswietlania.WARSTWA: {
        this.zaladujWarstweTematyczna(katalog);
        break;
      }
    }
  }

  /**
   * Funkcja ładuje warstwę tematyczną
   * @param warstwa - warstwa tematyczna
   */
  private zaladujWarstweTematyczna(warstwa: Warstwa): Layer | undefined {
    if (warstwa.usunieta) {
      return;
    }
    const warstwaTematyczna = WarstwaUtils.utworzWarstweMapy(warstwa.uuidMapa, warstwa, this.konfiguracja, this.mapView!);
    if (!warstwaTematyczna) {
      return;
    }
    warstwaTematyczna.setVisible(Boolean(warstwa.parametrySterujace?.widoczna && warstwa.parametrySterujace?.aktywna));
    if (warstwa.szczegolyWarstwy?.typ === TypWarstwy.THEME_LAYER) {
      WarstwaUtils.wlaczInfoWindow(warstwaTematyczna, false);
      WarstwaUtils.ustawWidocznoscTooltip(warstwaTematyczna, false);
    }
    this.mapView?.addLayer(warstwaTematyczna);
    return warstwaTematyczna;
  }


  /**
   * Funkcja ustawia startowy zoom i środek mapy
   */
  inicjujZoomISrodekWWidokuMapy(): void {
    const srodekMapy = MapaUtils.domyslnySrodekMap();
    const domyslnyZoom = !EmptyUtils.isNullOrUndefined(this.mapa?.domyslnaSkala) ? this.mapa?.domyslnaSkala : MapaUtils.domyslnyZoom();
    srodekMapy.x = this.mapa?.srodekMapyX ? this.mapa.srodekMapyX : srodekMapy.x;
    srodekMapy.y = this.mapa?.srodekMapyY ? this.mapa.srodekMapyY : srodekMapy.y;
    this.mapView?.setMapCenterAndZoomLevel(
      new OM.geometry.Point(srodekMapy.x, srodekMapy.y, srodekMapy.srid),
      domyslnyZoom!, true);
  }


  /**
   * Funkcja konfiguruje pasek skali
   * @param pasekSkali - komponent paska skali
   */
  private konfigurujPasekSkaliWWidokuMapy(pasekSkali: ScaleBar): void {
    this.scaleBar = pasekSkali;
    this.scaleBar?.setFormat('METRIC');
    this.scaleBar?.setDraggable(false);
    this.scaleBar?.setVisible(true);
  }

  /**
   * Funkcja definiuje obsługę eventu map recentered
   */
  private obslugaEwentuMapRecentered() {
    this.subskryocje$.add(new Observable<any>(subscriber => {
      this.mapView?.addListener(OM.event.MapEvent.MAP_RECENTERED, (event) => {
        subscriber.next(event)
      });
    }).pipe(debounceTime(1000))
      .subscribe(event => {
        if (this.mapaZainicjowana) {
          this.rozglosZmianeZoomISrodekMapy();
          this.aktullizujZoomISrodekMapyWDefinicjiMapy();
        }
      })
    )
  }

  /**
   * Funkcja definiuje obsluge eventu map after refresh
   */
  private obslugaEventuAfterMapRefresh() {
    this.subskryocje$.add(new Observable<any>(subscriber => {
      this.mapView?.addListener(OM.event.MapEvent.MAP_AFTER_REFRESH, (event) => {
        subscriber.next(event)
      });
    }).pipe(throttleTime(1000))
      .subscribe(event => {
        if (this.mapaZainicjowana) {
          this.aktullizujZoomISrodekMapyWDefinicjiMapy();
          this.rozglosZmianeZoomISrodekMapy();
        }
      }));
  }


  /**
     * Funkcja wymusza aktualizacje komponentu
     */
  private wymusAktualizacjeKomponentu() {
    this.aktualizacjaKomponentuService.wymusAktualizacjeKomponentu(this.eRef);
  }

}
