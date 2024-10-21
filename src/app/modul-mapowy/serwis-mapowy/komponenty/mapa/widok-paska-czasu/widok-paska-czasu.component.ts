import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable, filter } from 'rxjs';
import { AktualizacjaKomponentuService } from 'src/app/modul-mapowy/commons/serwisy/aktualizacja-komponentu.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { Layer } from 'src/app/modul-mapowy/oracle-maps/types/layer';
import { ScaleBar } from 'src/app/modul-mapowy/oracle-maps/types/scale-bar';
import { GrupaWarstwPaskaCzasu } from '../../../modele/grupa-warstw-paska-czasu';
import { GrupaWarstwPodkladowych } from '../../../modele/grupa-warstw-podkladowych';
import { Mapa } from "../../../modele/mapa";
import { Map } from "../../../../oracle-maps/types/map";
import { Warstwa, TypWarstwy } from '../../../modele/warstwa';
import { MapaService } from '../../../serwisy/mapa.service';
import { EmptyUtils } from '../../../utils/empty-utils';
import { MapaUtils } from '../../../utils/mapa-utils';
import { WarstwaUtils } from '../../../utils/warstwa-utils';
import { OM } from "../../../../oracle-maps/types/om";
import { WidokiMapyState } from 'src/app/modul-mapowy/stan/mapa-widok/mapa-widok.reducer';
import { WIDOKI_MAPY_ID } from 'src/app/modul-mapowy/stan/mapa-widok/mapa-widok.const';
import { MapaWidokActions } from 'src/app/modul-mapowy/stan/mapa-widok/mapa-widok.actions';

declare var OM: OM;

@Component({
  selector: 'mm-widok-paska-czasu',
  templateUrl: './widok-paska-czasu.component.html',
  styleUrls: ['./widok-paska-czasu.component.scss']
})
export class WidokPaskaCzasuComponent implements OnInit, OnDestroy {

  @Input()
  grupyWarstwPodkladowych: GrupaWarstwPodkladowych[] = [];

  @Input()
  mapa?: Mapa;

  @Input()
  lokalizacjaMapPodkladowych: 'LEWA' | 'PRAWA' = 'LEWA';

  @Input()
  zmianaMapPodkladowychWidoczna = true;

  @Input()
  sterowanieMapyWidoczne = true;


  mapView?: Map;
  mapaZainicjowana = false;
  scaleBar?: ScaleBar;
  bibliotekaOracleZaladoana = true;
  subskryocje$ = new Subscription();

  widokAdministratora: boolean;
  podstawoweWarstwyPodkladoweDlaMapy: GrupaWarstwPodkladowych[] = [];

  widokMapy$: Observable<WidokiMapyState>;

  wybranaGrupaPaskaCzasu?: GrupaWarstwPaskaCzasu;


  /**
   * Konstruktor
   * @param mapaService - serwis mapowy
   */
  constructor(private eRef: ElementRef,
    private mapaSerwis: MapaService,
    private store: Store<{ modulMapowy: any }>,
    private aktualizacjaKomponentuService: AktualizacjaKomponentuService,
    private konfiguracja: KonfiguracjaModulMapowyAdapter) {
    this.widokMapy$ = store.select('modulMapowy', 'widokMapy');
    this.widokAdministratora = konfiguracja.widokAdministratora();
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.subskryocje$.add(this.widokMapy$
      .pipe(filter(n => n.widokMapyId === WIDOKI_MAPY_ID.WIDOK_PASKA_CZASU))
      .pipe(filter(n => n.dane))
      .subscribe(state => {
        if (this.mapView) {
          console.log("onInit: MAPVIEW 1 ", this.mapView);
          this.wybranaGrupaPaskaCzasu = state.dane;
          // this.inicjujMape();
          this.zaladujWarstwy();
          this.ustawWidocznoscWarstw();

          // this.aktullizujZoomISrodekMapyWDefinicjiMapy();
          return;
        }
        this.wybranaGrupaPaskaCzasu = state.dane;
        console.log("onInit: MAPVIEW 2", this.mapView);
        this.inicjujMape();

        // this.aktullizujZoomISrodekMapyWDefinicjiMapy();
        // this.zaladujWarstwy();
        // this.ustawWidocznoscWarstw();
      }));

  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subskryocje$.unsubscribe();
    this.store.dispatch(MapaWidokActions.reset());
    // this.store.dispatch(MapaWidokActions.zamknijMapaWidok({ widokMapyId: WIDOKI_MAPY_ID.WIDOK_PASKA_CZASU }));
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
   * Funkcja nasluchuje czy zostala przelaczona warstwa podkladowa
   * @param warstwa
   */
  przelaczonoMapePodkladowa(warstwa: GrupaWarstwPodkladowych): void {
    this.przelaczWarstwePodkladowaWWidokuMapy(warstwa);
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
    var optionsLayerControl = {
      anchorPosition: 6
      ,
      contentStyle: { minWidth: 310, maxHeight: 400, font_size: 11, font_family: "Arial" }
      , titleStyle: { font_size: 14, font_family: "Arial" }
    };
    let layerControl = new OM.control.LayerControl(optionsLayerControl);
    layerControl.setDraggable(true);
    this.mapView?.addMapDecoration(layerControl);
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
   * Funkcja inicjuje warstwy podkaldowe i tematyczne
   */
  private inicjujMape(): void {
    console.log('INICJUJ MAPĘ');
    if (this.grupyWarstwPodkladowych.length && this.mapa && this.bibliotekaOracleZaladoana && !this.mapaZainicjowana) {
      console.log('INICJUJ MAPĘ INSIDE');
      this.mapView?.addScaleBar();
      this.mapView?.setMouseWheelZoomBehavior(OM.Map.ZOOM_KEEP_MOUSE_POINT);
      this.mapView?.setMapCenter(new OM.geometry.Point(7502805.127594725, 5788955.369500488, 2178), true);
      this.mapView?.setMapZoomLevel(3);
      this.inicjujWarstwePodkladowa();
      this.mapView?.init();
      this.zaladujWarstwy();
      this.ustawWidocznoscWarstw();
      this.zarejestrujObslugeZdarzenMapy();
      this.wymusAktualizacjeKomponentu();
    }
  }

  /**
   * Funkcja dodaje obsługe podstawowych zdarzeń mapy
   */
  private zarejestrujObslugeZdarzenMapy(): void {
    if (this.mapView) {
      this.mapView.addListener(OM.event.MapEvent.MAP_AFTER_ZOOM, (event) => {
        if (this.mapaZainicjowana) {
          this.aktullizujZoomISrodekMapyWDefinicjiMapy();
          this.rozglosZmianeZoomISrodekMapy();
        }
      });
      this.mapView.addListener(OM.event.MapEvent.MAP_RECENTERED, (event) => {
        if (this.mapaZainicjowana) {
          this.aktullizujZoomISrodekMapyWDefinicjiMapy();
          this.rozglosZmianeZoomISrodekMapy();
        }
      });
      this.mapView.addListener(OM.event.MouseEvent.MOUSE_MOVE, (event) => {
        if (this.mapaZainicjowana) {
          this.rozglosZmianePozycjeKursora();
        }
      });
      this.mapView.addListener(OM.event.MapEvent.MAP_INITIALIZED, (event) => {
        this.mapaZainicjowana = true;
        // this.inicjujZoomISrodekWWidokuMapy();
        this.konfigurujPasekSkaliWWidokuMapy(event.target.ScaleBar);
        // this.aktullizujZoomISrodekMapyWDefinicjiMapy();
      });
      this.mapView.addListener(OM.event.MapEvent.MAP_AFTER_REFRESH, (event) => {
        if (this.mapaZainicjowana) {
          // this.aktullizujZoomISrodekMapyWDefinicjiMapy();
        }
      });
    }
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
   * Funkcja rozgłasza pozycję kursora myszki
   */
  private rozglosZmianePozycjeKursora(): void {
    this.mapaSerwis.aktualizjujPozycjeKursora({
      punktNaMapie: this.mapView?.getCursorLocation()
    });
  }

  /**
   * Funkcja rozgłasza stan mapy po zmianeie zoom lub środka mapy
   */
  private rozglosZmianeZoomISrodekMapy(): void {
    this.mapaSerwis.aktualizujZoomISrodek(
      {
        identyfikatorMapy: this.mapa?.uuid,
        zoom: this.mapView?.getMapZoomLevel(),
        srodek: this.mapView?.getMapCenter(),
        skala: this.mapView?.getMapScale(),
        pasekSkali: this.scaleBar
      });
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
   * Funkcja wymusza aktualizacje komponentu
   */
  private wymusAktualizacjeKomponentu() {
    this.aktualizacjaKomponentuService.wymusAktualizacjeKomponentu(this.eRef);
  }

  /**
   * Funkcja ładuje warstwy
   */
  zaladujWarstwy() {
    this.mapView?.removeAllFeatureLayers();
    // console.log('załaduj warstwy przed: '+ (this.mapView?.getTileLayers())?.toString());
    let dtls: Layer[] = [];
    this.mapView?.getTileLayers().forEach((l) => { console.log(l.name); if (l.name !== 'podklad') { dtls.push(l) } else { } });
    for (let i = 0; i < dtls.length; i++) {
      this.mapView?.removeLayer(dtls[i]);
    }
    this.wybranaGrupaPaskaCzasu!.warstwy.forEach(w => {
      this.zaladujWarstweTematyczna(w.warstwa);
    })
    let podklad = this.mapView?.getLayerByName('podklad');
    if (podklad) { podklad.setZIndex(10); }
    // setTimeout(() => {
    //   this.wybranaGrupaPaskaCzasu!.warstwy.forEach(w => {
    //     this.zaladujWarstweTematyczna(w.warstwa);
    //   })
    // }, 500);
    setTimeout(() => console.log('załaduj warstwy po: ', this.mapView?.getTileLayers()), 500);
  }

  /**
   * Funkcja ustawia widocznosc warstw
   */
  ustawWidocznoscWarstw() {
    console.log(this.wybranaGrupaPaskaCzasu!.warstwy);
    this.wybranaGrupaPaskaCzasu!.warstwy.forEach((w, k) => {


      const layer = this.mapView?.getLayerByName(w.warstwa.uuid);

      if (layer) {
        // layer.setVisible(false);
        layer.setVisible(w.warstwa.parametrySterujace!.widoczna)
      }
      // if (k === 0 && layer) {
      //   layer.setVisible(true)
      // } else if (layer){
      //   layer.setVisible(false)
      // }
    });

    // })
  }

  /**
   * Funkcja ładuje warstwę tematyczną
   * @param warstwa - warstwa tematyczna
   */
  private zaladujWarstweTematyczna(warstwa: Warstwa): Layer | undefined {
    const warstwaTematyczna = WarstwaUtils.utworzWarstweMapy(warstwa.uuid, warstwa, this.konfiguracja, this.mapView!);
    warstwaTematyczna.setZoomLevelRange(0, 18);
    if (!warstwaTematyczna) {
      return;
    }
    warstwaTematyczna.setVisible(warstwa.parametrySterujace!.widoczna);
    if (warstwa.szczegolyWarstwy?.typ === TypWarstwy.THEME_LAYER) {
      warstwaTematyczna.enableInfoWindow(false);
      WarstwaUtils.wlaczInfoWindow(warstwaTematyczna, false);
      WarstwaUtils.ustawWidocznoscTooltip(warstwaTematyczna, false);
    }
    this.mapView?.addLayer(warstwaTematyczna);
    return warstwaTematyczna;
  }

}
