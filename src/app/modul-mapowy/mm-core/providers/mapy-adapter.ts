import {Mapa} from '../../serwis-mapowy/modele/mapa';
import {Observable} from 'rxjs';
import {TypWarstwy, TypWyswietlania} from '../../serwis-mapowy/modele/warstwa';

/**
 * Interfejs definuje obsługę map zapis/odczyt
 */
export interface MapyAdapter {

  /**
   * Funkcja służy do pobierania mapy po uuid
   * @param uuid - indetyfikator
   */
  pobierzMape(uuid: string): Observable<Mapa>;

  /**
   * Funkcja służy do zapisywania mapy
   * @param mapa - obiekt mapy
   */
  zapiszMape(mapa: Mapa): Observable<Mapa>;
}

/**
 * Klasa abstrakcyjna wymagana do zdefiniowania prowajdera
 */
export abstract class MapyModulMapowyAdapter implements MapyAdapter {

  /**
   * Funkcja służy do pobierania mapy po uuid
   * @param uuid - indetyfikator
   */
  abstract pobierzMape(uuid: string): Observable<Mapa>;

  /**
   * Funkcja służy do zapisywania mapy
   * @param mapa - obiekt mapy
   */
  abstract zapiszMape(mapa: Mapa): Observable<Mapa>;

}

export class DomyslneMapyModulMapowyAdapter implements MapyAdapter {

  /**
   * Funkcja służy do pobierania mapy po uuid
   * @param uuid - indetyfikator
   */
  pobierzMape(uuid: string): Observable<Mapa> {
    return new Observable(subscriber => {
      subscriber.next({
        uuid: '',
        nazwa: {pl: 'Rowerowa Warszawa', en: ''},
        opisWPortaluMapowym: {pl: 'Oto mapa prezentująca infrastrukturę przyjazną rowerzystom w Warszawie. Znalazły się na niej drogi i pasy dla rowerów, zaznaczone zostały również wypożyczalnie Veturilo oraz inne udogodnienia dla rowerzystów: stojaki i serwisy rowerowe.', en: ''},
        domyslnaSkala: 0,
        domyslnaSkalaWyszukiwania: 5,
        srodekMapyX: 7509994.654,
        srodekMapyY: 5787569.814,
        domyslneWarstwyPodkladowe: {
          uuidGrupaWarstw: '08d8ee39-311a-4429-9205-8fec5e4f24b3',
          uuidWarstwa: '08d8ee39-311a-4429-9205-8fec5e4f24b3'
        },
        warstwy: [
          {
            uuid: 'bb7e292b-82bf-45eb-88ee-bc334ac37d2x',
            uuidMapa: 'root.bb7e292b-82bf-45eb-88ee-bc334ac37d2x',
            nazwaOficjalna: {pl: 'BOS_ZIELEN_ZGODA_ALL', en: 'sdfdsd'},
            rozwiniecieWLegendzie: false,
            widocznoscWLegendzie: true,
            parametrySterujace: {
              widoczna: false,
              aktywna: true,
              edycjaNazwy: false,
              pozaZakresemZoom: false
            },
            typWyswietlania: TypWyswietlania.WARSTWA,
            sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
            szczegolyWarstwy: {
              nazwaMVC: 'BOS_ZIELEN_ZGODA_ALL',
              zrodloMVC: 'multimedia',
              typ: TypWarstwy.THEME_LAYER,
              minSkalaWidocznosci: 1, // do wdrożenia
              maksSkalaWidocznosci: 18, // do wdrożenia
              minSkalaKlikalnosci: 3, // do wdrożenia
              maksParametrKlastrowania: 3, // do wdrożenia
              informacjeOObiekcie: true,
              przezroczystosc: 1,
              opcjeKlastrowania: {
                clusterStyle: 'M.TOOLTIP',
                minPointCount: 2,
                maxClusteringLevel: 15,
              }
            }
          },
          {
            uuid: 'ac147245-a2e0-43c4-9304-2c0f2921dc15',
            uuidMapa: 'ac147245-a2e0-43c4-9304-2c0f2921dc15.79db19db-22ec-480e-86cf-4e0772cef473',
            nazwaOficjalna: {pl: 'Linie tramwajowe bardzo bardzo długa nazwa którą trzeba przyciąć', en: 'nazwy'},
            typWyswietlania: TypWyswietlania.WARSTWA,
            widocznoscWLegendzie: true,
            rozwiniecieWLegendzie: false,
            parametrySterujace: {
              widoczna: false,
              aktywna: true,
              edycjaNazwy: false,
              pozaZakresemZoom: false
            },
            sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/1_administracja/49_ambasada.png',
            szczegolyWarstwy: {
              nazwaMVC: 'LINIE_TRAMWAJOWE',
              zrodloMVC: 'nekken',
              typ: TypWarstwy.THEME_LAYER,
              minSkalaWidocznosci: 5, // do wdrożenia
              maksSkalaWidocznosci: 10, // do wdrożenia
              minSkalaKlikalnosci: 10, // do wdrożenia
              maksParametrKlastrowania: 3, // do wdrożenia
              przezroczystosc: 1,
              funkcjeDodatkowe: [{identyfikator: 'OSOBY_POCHOWANE'}, {identyfikator: 'NIERUCHOMOSCI'}]
            }
          },
          {
            nazwaOficjalna: {pl: 'Metro bardzo bardzo długa nazwa którą trzeba przyciąć', en: 'en'},
            uuid: '9c6ea6e8-c612-4c24-b3c3-b843496320bd',
            uuidMapa: '9c6ea6e8-c612-4c24-b3c3-b843496320bd.54e28b9b-f83e-4e7a-85f5-fdcf3f600453',
            widocznoscWLegendzie: true,
            rozwiniecieWLegendzie: true,
            parametrySterujace: {
              widoczna: true,
              aktywna: true,
              edycjaNazwy: false,
              pozaZakresemZoom: false
            },
            typWyswietlania: TypWyswietlania.KATALOG,
            sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
            warstwy: [
              {
                uuid: '0fe0bdbd-8cc4-4b0e-b396-a05d82d0c257',
                uuidMapa: '0fe0bdbd-8cc4-4b0e-b396-a05d82d0c257.d0e7ace1-8e53-4149-837b-4b8c32b0d799',
                nazwaOficjalna: {pl: 'Linie metra', en: 'en'},
                rozwiniecieWLegendzie: false,
                widocznoscWLegendzie: true,
                parametrySterujace: {
                  widoczna: true,
                  aktywna: true,
                  edycjaNazwy: false,
                  pozaZakresemZoom: false
                },
                typWyswietlania: TypWyswietlania.WARSTWA,
                sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
                szczegolyWarstwy: {
                  nazwaMVC: 'LINIE_METRA',
                  zrodloMVC: 'nekken',
                  typ: TypWarstwy.THEME_LAYER,
                  minSkalaWidocznosci: 3, // do wdrożenia
                  maksSkalaWidocznosci: 10, // do wdrożenia
                  minSkalaKlikalnosci: 8, // do wdrożenia
                  maksParametrKlastrowania: 3, // do wdrożenia
                  przezroczystosc: 1
                }
              },
              {
                uuid: 'a4d5682d-81a5-4b15-8cc2-cc1f6a082805',
                uuidMapa: 'a4d5682d-81a5-4b15-8cc2-cc1f6a082805.56a83f1d-c0d1-4feb-a40e-6138bbd4d43a',
                nazwaOficjalna: {pl: 'CIEKI', en: 'en'},
                rozwiniecieWLegendzie: false,
                widocznoscWLegendzie: true,
                parametrySterujace: {
                  widoczna: true,
                  aktywna: true,
                  edycjaNazwy: false,
                  pozaZakresemZoom: false
                },
                sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
                typWyswietlania: TypWyswietlania.WARSTWA,
                szczegolyWarstwy: {
                  nazwaMVC: 'CIEKI',
                  zrodloMVC: 'nekken',
                  typ: TypWarstwy.THEME_LAYER,
                  minSkalaWidocznosci: 4, // do wdrożenia
                  maksSkalaWidocznosci: 10, // do wdrożenia
                  minSkalaKlikalnosci: 9, // do wdrożenia
                  maksParametrKlastrowania: 3, // do wdrożenia
                  przezroczystosc: 1
                }
              },
            ]
          },
          {
            nazwaOficjalna: {pl: 'Inne', en: ''},
            uuid: '9baa5b72-6537-4fa2-ad31-19bc8fbe7bf3',
            uuidMapa: '9baa5b72-6537-4fa2-ad31-19bc8fbe7bf3.e19fe707-bb6f-459b-9bd9-228140a18348',
            widocznoscWLegendzie: true,
            rozwiniecieWLegendzie: false,
            parametrySterujace: {
              widoczna: true,
              aktywna: true,
              edycjaNazwy: false,
              pozaZakresemZoom: false
            },
            typWyswietlania: TypWyswietlania.KATALOG,
            sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
            warstwy: [
              {
                uuid: '19e839ad-e6b0-4cee-9476-23f24e1f9be4',
                uuidMapa: '19e839ad-e6b0-4cee-9476-23f24e1f9be4.b2a64703-a12a-42b7-8101-309e8f1ef4a0',
                nazwaOficjalna: {pl: 'PRZYSTANKI_SKM', en: 'en'},
                rozwiniecieWLegendzie: false,
                widocznoscWLegendzie: true,
                parametrySterujace: {
                  widoczna: true,
                  aktywna: true,
                  edycjaNazwy: false,
                  pozaZakresemZoom: false
                },
                typWyswietlania: TypWyswietlania.WARSTWA,
                sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
                szczegolyWarstwy: {
                  nazwaMVC: 'PRZYSTANKI_SKM',
                  zrodloMVC: 'nekken',
                  typ: TypWarstwy.THEME_LAYER,
                  minSkalaWidocznosci: 1, // do wdrożenia
                  maksSkalaWidocznosci: 10, // do wdrożenia
                  minSkalaKlikalnosci: 10, // do wdrożenia
                  maksParametrKlastrowania: 3, // do wdrożenia
                  przezroczystosc: 1
                }
              },
              {
                uuid: 'a5bf6c54-6f20-44f6-9ac9-08772f333484',
                uuidMapa: 'a5bf6c54-6f20-44f6-9ac9-08772f333484.37cba2db-41bc-4880-b142-43f513157a3c',
                nazwaOficjalna: {pl: 'PRZYSTANKI_WKD', en: 'en'},
                rozwiniecieWLegendzie: false,
                widocznoscWLegendzie: true,
                parametrySterujace: {
                  widoczna: true,
                  aktywna: true,
                  edycjaNazwy: false,
                  pozaZakresemZoom: false
                },
                typWyswietlania: TypWyswietlania.WARSTWA,
                sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
                szczegolyWarstwy: {
                  nazwaMVC: 'PRZYSTANKI_WKD',
                  zrodloMVC: 'nekken',
                  typ: TypWarstwy.THEME_LAYER,
                  minSkalaWidocznosci: 1, // do wdrożenia
                  maksSkalaWidocznosci: 10, // do wdrożenia
                  minSkalaKlikalnosci: 3, // do wdrożenia
                  maksParametrKlastrowania: 3, // do wdrożenia
                  przezroczystosc: 1,
                  opcjeKlastrowania: {
                    clusterStyle: 'M.POI',
                    minPointCount: 2,
                    maxClusteringLevel: 13,
                  }
                }
              },
            ]
          },
        ]
      });
    });
  }

  /**
   * Funkcja służy do zapisywania mapy
   * @param mapa - obiekt mapy
   */
  zapiszMape(mapa: Mapa): Observable<Mapa> {
    return new Observable(subscriber => {
      subscriber.next(mapa);
    });
  }

}

