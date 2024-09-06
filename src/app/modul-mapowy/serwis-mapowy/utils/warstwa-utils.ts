import { OM } from '../../oracle-maps/types/om';
import { TypWarstwy, TypWyswietlania, Warstwa } from '../modele/warstwa';
import { Layer } from '../../oracle-maps/types/layer';
import { VectorLayer } from '../../oracle-maps/types/vector-layer';
import { TileLayer } from '../../oracle-maps/types/tile-layer';
import { MAPVIEWER_KONFIGURACJA } from '../../oracle-maps/serwisy/oracle-maps.service';
import { TlumaczeniaNazw } from '../modele/tlumaczenia-nazw';
import { FUNKCJE_DODATKOWE_KONFIGURACJA } from '../modele/szczegoly-warstwy';
import { Map as Mapp } from '../../oracle-maps/types/map';
import { MarkerLayer } from '../../oracle-maps/types/marker-layer';
import { NarzedziaUtils } from './narzedzia-utils';
import { ObiektyMapyUtils } from './obiekty-mapy-utils';
import { KonwerterGeometriUtils } from './konwerter-geometri-utils';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { KonfiguracjaAdapter } from '../../mm-core/providers/konfiguracja-adapter';


declare var OM: OM;


export class WarstwaUtils {

  /**
   * Funckcja tworzy warstwę mapviewera
   * @param id - idetyfikator dla warstwy
   * @param warstwa - warstwa portalu mapowego
   */
  static utworzWarstweMapy(uuid: string | undefined, warstwa: Warstwa, konfiguracja: KonfiguracjaAdapter, map: Mapp): Layer {
    if (warstwa.szczegolyWarstwy?.typ === TypWarstwy.TILE_LAYER) {
      return this.utworzWarstweRastrowa(uuid, warstwa, konfiguracja);
    }
    if (warstwa.szczegolyWarstwy?.typ === TypWarstwy.ANAL_LAYER) {
      return this.utworzWarstweAnalityczna(uuid, warstwa, konfiguracja);
    }
    if (warstwa.szczegolyWarstwy?.typ === TypWarstwy.WMS_LAYER) {
      return this.utworzWarstweWms(uuid, warstwa, konfiguracja, map);
    }
    // if (warstwa.szczegolyWarstwy?.typ === TypWarstwy.WMTS_LAYER) {
    //   OM.gv.setHttpMethod('GET');
    //   return this.utworzWarstweWmts(uuid, warstwa, konfiguracja, map);
    // }
    if (warstwa.szczegolyWarstwy?.dynamicTileLayer) {
      return this.utworzWarstweDynamic(uuid, warstwa, konfiguracja, map);
    }
    return this.utworzWarstweWektorowa(uuid, warstwa, konfiguracja);
  }

  /**
   * Funkcja tworzy warstwę dynamiczna
   * @param id - idetyfikator dla warstwy
   * @param warstwa - warstwa portalu mapowego
   * @konfig
   * @map
   */
  static utworzWarstweDynamic(id: string | undefined, warstwa: Warstwa, konfiguracja: KonfiguracjaAdapter, map: Mapp): VectorLayer {
    const req = new OM.server.ServerMapRequest(konfiguracja.pobierzMapViewerUrl());
    req.setProperties({
      dataSource: warstwa.szczegolyWarstwy?.zrodloMVC,
      transparent: true,  // map image is set to be transparent
      antialiase: warstwa.szczegolyWarstwy?.antyaliasing ? "true" : "false"
    });
    req.addTheme(new OM.server.ServerPredefinedTheme(warstwa.szczegolyWarstwy?.nazwaMVC!));
    const dtl_props = {
      universe: map.getUniverse(),
      tileLayerConfig: new OM.layer.TileLayerConfig({ tileImageWidth: 512, tileImageHeight: 512 }),
      tileServerURL: konfiguracja.pobierzMapViewerUrl() + MAPVIEWER_KONFIGURACJA.WARSTWY_DYNAMICZNE_SCIEZKA,
      enableUTFGrid: true,
      enableUTFGridInfoWindow: true,
      utfGridResolution: 4
    };
    const nowaWarstwa = new OM.layer.DynamicTileLayer(id ? id : uuidv4(), dtl_props, req);
    this.ustawSkaleWidocznosci(nowaWarstwa, warstwa);
    this.ustawPrzezroczystosc(nowaWarstwa, warstwa);
    return nowaWarstwa;
  }

  /**
   * Funkcja generuje warstwe wektorowa
   * @param id
   * @param warstwa
   * @param konfiguracja
   */
  static utworzWarstweWektorowa(id: string | undefined, warstwa: Warstwa, konfiguracja: KonfiguracjaAdapter): VectorLayer {
    const nowaWarstwa = new OM.layer.VectorLayer(id ? id : uuidv4(),
      {
        def: {
          type: OM.layer.VectorLayer.TYPE_PREDEFINED,
          dataSource: warstwa.szczegolyWarstwy?.zrodloMVC,
          theme: warstwa.szczegolyWarstwy?.nazwaMVC,
          url: konfiguracja.pobierzMapViewerUrl()
        }
      }
    );
    this.ustawWidocznoscEtykiet(nowaWarstwa, warstwa);
    this.ustawSkaleWidocznosci(nowaWarstwa, warstwa);
    this.ustawPrzezroczystosc(nowaWarstwa, warstwa);
    this.ustawKlastrowanie(nowaWarstwa, warstwa, konfiguracja);
    return nowaWarstwa;
  }

  /**
   * Funkcja tworzy warstwę rastrową
   * @param iid - idetyfikator dla warstwy
   * @param warstwa - warstwa portalu mapowego
   */
  static utworzWarstweRastrowa(id: string | undefined, warstwa: Warstwa, konfiguracja: KonfiguracjaAdapter): TileLayer {
    const nowaWarstwa = new OM.layer.TileLayer(id ? id : uuidv4(),
      {
        dataSource: warstwa.szczegolyWarstwy?.zrodloMVC,
        tileLayer: warstwa.szczegolyWarstwy?.nazwaMVC,
        tileServerURL: konfiguracja.pobierzMapViewerUrl() + MAPVIEWER_KONFIGURACJA.WARSTWY_PODKLADOWE_SCIEZKA
      }
    );
    this.ustawSkaleWidocznosci(nowaWarstwa, warstwa);
    this.ustawPrzezroczystosc(nowaWarstwa, warstwa);
    return nowaWarstwa;
  }

  /**
   * Funkcja tworzy warstwę dla wyników analiz
   * @param id
   * @param warstwa
   * @param konfiguracja
   */
  static utworzWarstweAnalityczna(id: string | undefined, warstwa: Warstwa, konfiguracja: KonfiguracjaAdapter): MarkerLayer {
    const nowaWarstwa = new OM.layer.MarkerLayer(id ? id : uuidv4());
    warstwa.szczegolyWarstwy?.obiekty?.forEach((o, i) => {
      if (o.geometria) {
        nowaWarstwa.addFeature(new OM.Feature(`${i}-${o.id}`, ObiektyMapyUtils.utworzGeometrie(o.geometria), { renderingStyle: NarzedziaUtils.stylNarysowanegoNarzedzie() }))
      }
    });
    this.ustawPrzezroczystosc(nowaWarstwa, warstwa);
    this.ustawStyleDlaWarstwyAnalitycznej(nowaWarstwa, warstwa, konfiguracja);
    return nowaWarstwa;
  }

  /**
   * Funkcja tworzy warstwe wms
   * @param id
   * @param warstwa
   * @param konfiguracja
   * @param map
   */
  static utworzWarstweWms(id: string | undefined, warstwa: Warstwa, konfiguracja: KonfiguracjaAdapter, map: Mapp): any {
    const nowaWarstwa = new OM.layer.DynamicTileLayer(id ? id : uuidv4(), {
      universe: map.getUniverse(),
      enableUTFGrid: true,
      enableUTFGridInfoWindow: true,
      utfGridResolution: 4,
      wmsServerURL: warstwa.szczegolyWarstwy?.uslugiZewnetrzne?.url,
      urlBuilderOptions: {
        ...warstwa.szczegolyWarstwy?.uslugiZewnetrzne?.parametry,
        url: warstwa.szczegolyWarstwy?.uslugiZewnetrzne?.url
      },
      urlBuilder: warstwa.szczegolyWarstwy?.uslugiZewnetrzne?.odwrocWspolrzedne ? this.wmsUrlBuilderInwerted : this.wmsUrlbuilder
    })
    nowaWarstwa.setVisibleBound(new OM.geometry.Rectangle(7433860.71, 5742845, 7565549.17, 5846861.96, 2178));
    this.ustawPrzezroczystosc(nowaWarstwa, warstwa);
    return nowaWarstwa;
  }

  /**
   * Funkcja generuje url dla wms
   * @param w
   * @param h
   * @param minX
   * @param minY
   * @param maxX
   * @param maxY
   * @param options
   */
  static wmsUrlbuilder(w: number, h: number, minX: number, minY: number, maxX: number, maxY: number, options: any) {
    let str = `${options.url}?`;
    let optParams = "";
    str = `${str}&${WarstwaUtils.wmsPrzygotujbBox(w, h, minX, minY, maxX, maxY, options)}`;
    if (!(OM as any).isNull(options)) {
      for (var key in options) {
        if (key !== 'url') {
          optParams = optParams + "&" + key + "=" + options[key];
        }
      }
    }
    return str + optParams;
  }

  /**
   * Funkcja generuje url dla wsm z odwroconymi wspolrzednymi
   * @param w
   * @param h
   * @param minX
   * @param minY
   * @param maxX
   * @param maxY
   * @param options
   */
  static wmsUrlBuilderInwerted(w: number, h: number, minX: number, minY: number, maxX: number, maxY: number, options: any) {
    let str = `${options.url}?`;
    let optParams = "";
    str = `${str}&${WarstwaUtils.wmsPrzygotujbBox(w, h, minY, minX, maxY, maxX, options)}`;
    if (!(OM as any).isNull(options)) {
      for (var key in options) {
        if (key !== 'url') {
          optParams = optParams + "&" + key + "=" + options[key];
        }
      }
    }
    return str + optParams;
  }


  static wmsPrzygotujbBox(w: number, h: number, minX: number, minY: number, maxX: number, maxY: number, options: any): string {
    if (options['CRS'] === 'CRS:84' || options['SRS'] === 'EPSG:4326') {
      const wgs84Min = KonwerterGeometriUtils.EPSG2178toEPSG4326(minX, minY);
      const wgs84Max = KonwerterGeometriUtils.EPSG2178toEPSG4326(maxX, maxY);
      return `request=GetMap&bbox=${wgs84Min!.x},${wgs84Min!.y},${wgs84Max!.x},${wgs84Max!.y}&width=${w}&height=${h}`;
    }
    return `request=GetMap&bbox=${minX},${minY},${maxX},${maxY}&width=${w}&height=${h}`;
  }

  /**
   * Funkcja tworzy warstwe wmts
   * @param id
   * @param warstwa
   * @param konfiguracja
   * @param map
   */
  // static utworzWarstweWmts(id: string | undefined, warstwa: Warstwa, konfiguracja: KonfiguracjaAdapter, map: Mapp): any {
  //   const nowaWarstwa = new OM.layer.WMTSTileLayer(id ? id : uuidv4(), {
  //     universe: map.getUniverse(),
  //     url: warstwa.szczegolyWarstwy?.uslugiZewnetrzne?.url,
  //     layerID: warstwa.szczegolyWarstwy?.uslugiZewnetrzne?.parametry.layerID,
  //     tileMatrixSetID: warstwa.szczegolyWarstwy?.uslugiZewnetrzne?.parametry.tileMatrixSetID
  //   });
  //   this.ustawPrzezroczystosc(nowaWarstwa, warstwa);
  //   return nowaWarstwa;
  // }

  /**
   * Funkcja ustawia skalę widoczności dla warstwy
   * @param warstwa - warstwa
   * @param konfiguracjaWarstwy - konfiguracja
   */
  static ustawSkaleWidocznosci(warstwa: Layer, konfiguracjaWarstwy: Warstwa): void {
    if (warstwa && konfiguracjaWarstwy?.szczegolyWarstwy) {
      warstwa.setZoomLevelRange(
        konfiguracjaWarstwy.szczegolyWarstwy.minSkalaWidocznosci,
        konfiguracjaWarstwy.szczegolyWarstwy.maksSkalaWidocznosci);
    }
  }

  /**
   * Funkcja ustawia widocznosc etykiet
   * @param warstwa
   * @param konfiguracjaWarstwy
   */
  static ustawWidocznoscEtykiet(warstwa: Layer, konfiguracjaWarstwy: Warstwa): void {
    warstwa.setLabelsVisible(Boolean(konfiguracjaWarstwy.szczegolyWarstwy?.widocznoscEtykiet));
  }

  /**
   * Funkcja ustawia poziom przeźroczystości dla warstwy
   * @param warstwa - warstwa
   * @param konfiguracjaWarstwy - konfiguracja
   */
  static ustawPrzezroczystosc(warstwa: Layer, konfiguracjaWarstwy: Warstwa): void {
    if (warstwa && konfiguracjaWarstwy?.szczegolyWarstwy) {
      warstwa.setOpacity(1 - konfiguracjaWarstwy.szczegolyWarstwy.przezroczystosc);
    }
  }

  /**
   * Funkcja ustawia widocznosc tooltip dla warstwy
   * @param warstawa
   * @param widoczny
   */
  static ustawWidocznoscTooltip(warstawa: Layer | undefined, widoczny: boolean): void {
    if (!warstawa) {
      return
    }
    if (warstawa.enableToolTip) {
      warstawa.enableToolTip(widoczny);
    }
  }

  /**
   * Funkcja wlacza info window dla warstwy
   * @param warstwa
   * @param wlaczone
   */
  static wlaczInfoWindow(warstwa: Layer | undefined, wlaczone: boolean): void {
    if (!warstwa) {
      return;
    }
    warstwa.enableInfoWindow(wlaczone);
  }

  /**
   * Funkcja dodaje opcje klastrowania do warstwy
   * @param warstwa
   * @param konfiguracjaWarstwy
   */
  static ustawKlastrowanie(warstwa: Layer, konfiguracjaWarstwy: Warstwa, konfiguracja: KonfiguracjaAdapter): void {
    if (warstwa && konfiguracjaWarstwy?.szczegolyWarstwy?.opcjeKlastrowania &&
      konfiguracjaWarstwy.szczegolyWarstwy?.zrodloMVC) {
      const zachowaniePoKlikniecieu = konfiguracjaWarstwy.szczegolyWarstwy.opcjeKlastrowania.clickBehavior === 'WYBOR' ? 'select' : 'zoom';
      OM.style.StyleStore.getServerSideStyle(
        konfiguracjaWarstwy.szczegolyWarstwy?.zrodloMVC,
        konfiguracjaWarstwy.szczegolyWarstwy?.opcjeKlastrowania?.clusterStyle,
        {
          url: konfiguracja.pobierzMapViewerUrl(),
          callback: (serverSideStyle) => {
            warstwa.enableClustering(true,
              {
                ...konfiguracjaWarstwy.szczegolyWarstwy?.opcjeKlastrowania, ...{
                  clusterStyle: serverSideStyle,
                  clickBehavior: zachowaniePoKlikniecieu
                }
              }
            );
          }
        });
    }
  }

  /**
   * Funkcja ustawia style dla warstwy analityczne
   * @param warstwa
   * @param konfiguracjaWarstwy
   * @param konfiguracja
   */
  static ustawStyleDlaWarstwyAnalitycznej(warstwa: Layer, konfiguracjaWarstwy: Warstwa, konfiguracja: KonfiguracjaAdapter): void {
    if (!konfiguracjaWarstwy.szczegolyWarstwy?.typGeometrii) {
      return;
    }
    const konfiguracjStyli = konfiguracja.pobierzDefinicjeStyluDlaAnaliz(konfiguracjaWarstwy.szczegolyWarstwy.typGeometrii);
    OM.style.StyleStore.getServerSideStyle(
      konfiguracjStyli.zrodlo,
      konfiguracjStyli.styl,
      {
        url: konfiguracja.pobierzMapViewerUrl(),
        callback: (serverSideStyle) => {
          warstwa.setRenderingStyle(serverSideStyle);
        }
      });
  }

  /**
   * Funkcja dodaje pusty katalog do warstwy
   * @param warstwa - warstwa
   */
  static dodajPustyKatalog(warstwy?: Warstwa[]): void {
    if (warstwy) {
      let numer = 1;
      while (warstwy?.find(wx => wx.nazwaOficjalna?.pl === `Nowy katalog ${numer}`)) {
        numer++;
      }
      warstwy?.unshift(this.stworzPustyKatalog({ pl: `Nowy katalog ${numer}`, en: `New catalog ${numer}` }));
    }
  }

  /**
   * Funkcja tworzy pusty katalog
   */
  static stworzPustyKatalog(nazwa: TlumaczeniaNazw): Warstwa {
    const newUuid = uuidv4();
    return {
      nazwaOficjalna: nazwa,
      uuid: newUuid,
      uuidMapa: newUuid,
      widocznoscWLegendzie: true,
      rozwiniecieWLegendzie: true,
      mozliwoscRozwinieciaWlegendzie: true,
      widocznoscWLegendzieRodzica: true,
      typWyswietlania: TypWyswietlania.KATALOG,
      sciezkaDoPlikuSymbolu: `${window.origin}/assets/modul-mapowy/img/katalog.png`,
      wieleWarstw: true,
      parametrySterujace: {
        widoczna: true,
        aktywna: true,
        edycjaNazwy: false,
        pozaZakresemZoom: false,
        pozaZakresemPrzestrzennym: false,
        konflikt: false
      },
      szczegolyWarstwy: {
        zrodloMVC: '',
        nazwaMVC: '',
        minSkalaKlikalnosci: 0,
        minSkalaWidocznosci: 0,
        maksSkalaWidocznosci: 18,
        przezroczystosc: 0,
        typ: '',
        maksParametrKlastrowania: 0, //TODO do usunięcia
      },
      warstwy: []
    };
  }

  /**
   * Funkcja tworzy pusty katalog
   */
  static stworzPustaWarstwe(nazwa: TlumaczeniaNazw): Warstwa {
    const newUuid = uuidv4();
    return {
      nazwaOficjalna: nazwa,
      uuid: newUuid,
      uuidMapa: newUuid,
      widocznoscWLegendzie: true,
      rozwiniecieWLegendzie: false,
      mozliwoscZmianyWidocznosci: true,
      typWyswietlania: TypWyswietlania.WARSTWA,
      sciezkaDoPlikuSymbolu: '',
      parametrySterujace: {
        widoczna: true,
        aktywna: true,
        edycjaNazwy: false,
        pozaZakresemZoom: false,
        pozaZakresemPrzestrzennym: false,
        konflikt: false
      },
      szczegolyWarstwy: {
        zrodloMVC: '',
        nazwaMVC: '',
        minSkalaKlikalnosci: 0,
        minSkalaWidocznosci: 0,
        maksSkalaWidocznosci: 18,
        przezroczystosc: 0,
        typ: '',
        maksParametrKlastrowania: 0, //TODO do usunięcia
        obiekty: [],
        pobieranieDanych: false, //
        analizaPrzestrzenna: false, //
        typGeometrii: '' //
      },
      warstwy: []
    };
  }

  /**
   * Funkcja znajduje najwiekrzy numer warstwy analitycznej po nazwie
   * @param warstwy
   * @param nazwa
   */
  static znajdzMaxNumerWarstwyAnalitycznej(warstwy?: Warstwa[], nazwa?: string): number {
    if (!warstwy || !nazwa) {
      return 0;
    }
    let maxNumerWarstwy = 0;
    warstwy.filter(w => w.szczegolyWarstwy?.typ === TypWarstwy.ANAL_LAYER).forEach(w => {
      const numerWarstwy = (w.nazwaOficjalna?.pl) ? parseInt(w.nazwaOficjalna.pl.replace(nazwa, '')) : 0;
      if (numerWarstwy > maxNumerWarstwy) {
        maxNumerWarstwy = numerWarstwy;
      }
    })
    return maxNumerWarstwy;
  }


  /**
   * Funkcja usuwa katalog
   * @param warstwa - warstwa
   * @param warstwyRoot - root
   */
  static usunWarstwe(warstwa: Warstwa, warstwyRoot: Warstwa[] | undefined): void {
    if (!warstwyRoot) {
      return;
    }
    for (let i = 0; i <= warstwyRoot.length; i++) {
      if (!warstwyRoot[i]) {
        return;
      }
      if (warstwyRoot[i].uuidMapa === warstwa.uuidMapa) {
        warstwyRoot.splice(i, 1);
        break;
      } else {
        this.usunWarstwe(warstwa, warstwyRoot[i].warstwy);
      }
    }
  }

  /**
   * Funkcja sprawdza ży warstwa już istnieje w kolekcji wasrtw
   * @param warstwa
   * @param wastwy
   */
  static czyWarstwaIstniejeNaMapie(warstwa: Warstwa, wastwy?: Warstwa[]): boolean {
    let istnieje = false;
    if (wastwy) {
      wastwy.forEach(w => {
        if (w.typWyswietlania === TypWyswietlania.KATALOG) {
          if (w.uuidMapa === warstwa.uuidMapa || this.czyWarstwaIstniejeNaMapie(warstwa, w.warstwy)) {
            istnieje = true;
            return;
          }
        } else {
          if (w.uuidMapa === warstwa.uuidMapa) {
            istnieje = true;
            return;
          }
        }
      });
    }
    return istnieje;
  }

  /**
   * Funkcja zwraca listę narzędzi przypętych do warstw
   * @param warstwy
   */
  static pobierzListeNarzedziDoUruchomienia(warstwy?: Warstwa[]): string[] {
    const narzedzia: string[] = [];
    if (warstwy) {
      warstwy.forEach(w => {
        if (w.typWyswietlania === TypWyswietlania.KATALOG) {
          this.pobierzListeNarzedziDoUruchomienia(w.warstwy).forEach(f => {
            narzedzia.push(f);
          });
        } else {
          if (w.szczegolyWarstwy?.funkcjeDodatkowe && w.parametrySterujace?.widoczna && w.parametrySterujace?.aktywna) {
            w.szczegolyWarstwy.funkcjeDodatkowe.forEach(f => {
              if (FUNKCJE_DODATKOWE_KONFIGURACJA.get(f.identyfikator)?.uruchomNarzedzieSterujace) {
                narzedzia.push(f.identyfikator);
              }
            });
          }
        }
      });
    }
    return narzedzia;
  }

  /**
   * Funkcja wyszukuje warstwe po uuidMapy
   * @param uuidNaMapie
   * @param warstwy
   */
  static znajdzWarstwe(uuidNaMapie: string, warstwy: Warstwa[] | undefined): Warstwa | undefined {
    let wynik;
    warstwy?.forEach(w => {
      if (w.typWyswietlania === TypWyswietlania.KATALOG) {
        wynik = this.znajdzWarstwe(uuidNaMapie, w.warstwy);
      } else {
        if (w.uuidMapa === uuidNaMapie) {
          wynik = w;
          return;
        }
      }
    });
    return wynik;
  }

  /**
   * Funkcja spłaszcza drzewo warstw do mapy
   * @param warstwy
   */
  static splaszczWarstwy(warstwy: Warstwa[] | undefined): Map<string, Warstwa> {
    const wynik: Map<string, Warstwa> = new Map<string, Warstwa>();
    warstwy?.forEach(w => {
      if (w.typWyswietlania === TypWyswietlania.KATALOG) {
        wynik.set(w.uuidMapa, w);
        this.splaszczWarstwy(w.warstwy).forEach(wc => {
          if (wc.uuidMapa) {
            wynik.set(wc.uuidMapa, wc);
          }
        });
      } else {
        if (w.uuidMapa) {
          wynik.set(w.uuidMapa, w);
        }
      }
    });
    return wynik;
  }

  /**
   * Funkcja spłaszcza drzewo warstw do mapy
   * @param warstwy
   */
  static splaszczWarstwyIKatalogi(warstwy: Warstwa[] | undefined): Map<string, Warstwa> {
    const wynik: Map<string, Warstwa> = new Map<string, Warstwa>();
    warstwy?.forEach(w => {
      if (w.typWyswietlania === TypWyswietlania.KATALOG) {
        wynik.set(w.uuidMapa, w);
        this.splaszczWarstwy(w.warstwy).forEach(wc => {
          if (wc.uuidMapa) {
            wynik.set(wc.uuidMapa, wc);
          }
        });
      } else {
        if (w.uuidMapa) {
          wynik.set(w.uuidMapa, w);
        }
      }
    });
    return wynik;
  }


  /**
   * Funkcja spłaszcza drzewo warstw do mapy
   * @param warstwy
   */
  static splaszczWarstwyPoUuid(warstwy: Warstwa[] | undefined): Map<string, Warstwa> {
    const wynik: Map<string, Warstwa> = new Map<string, Warstwa>();
    warstwy?.forEach(w => {
      if (w.typWyswietlania === TypWyswietlania.KATALOG) {
        this.splaszczWarstwy(w.warstwy).forEach(wc => {
          if (wc.uuid) {
            wynik.set(wc.uuid, wc);
          }
        });
      } else {
        if (w.uuid) {
          wynik.set(w.uuid, w);
        }
      }
    });
    return wynik;
  }

  /**
   * Funckcja sprawdza czy warstwa jest widoczna
   * @param warstwa
   */
  static czyWarstwaWidoczna(warstwa?: Warstwa) {
    return warstwa &&
      warstwa.parametrySterujace &&
      warstwa.parametrySterujace.aktywna &&
      warstwa.parametrySterujace.widoczna &&
      !warstwa.parametrySterujace.konflikt &&
      !warstwa.parametrySterujace.pozaZakresemZoom &&
      !warstwa.parametrySterujace.pozaZakresemPrzestrzennym;
  }

}
