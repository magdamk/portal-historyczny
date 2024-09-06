import {TypWarstwy, TypWyswietlania, Warstwa} from '../../serwis-mapowy/modele/warstwa';
import {Observable} from 'rxjs';

/**
 * Model warstw z serwera
 */
export interface WarstwyOdpowiedz {
  liczbaWszystkichElementow: number;
  liczbaStron: number;
  strona: number;
  warstwy: Warstwa[];
}

/**
 * Interfejs służący do określenia funkcjonalności powbierania warstw
 */
export interface DostepneWarstwyAdapter {

  /**
   * Funkcja zwraca widoczne warstwy i katalogi
   * @param szukaj - fraza
   * @param strona - strona paginacja
   */
  pobierzWidoczneWarstwyIKatalogi(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined>;


  /**
   * Funkcja zwraca widoczna warstwę lub katalog po uuid
   * @param uuid
   */
  pobierzWidocznaWarstweLubKatalog(uuid: string): Observable<Warstwa | undefined>;


  /**
   * Funkcja dla administratora pobieranie wszystkich warstw
   * @param szukaj - fraza
   * @param strona - strona paginacja
   */
  pobierzWszystkieWrstwy(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined>;

  /**
   * Funkcja dla administratora pobieranie wszystkich katalogów
   * @param szukaj - fraza
   * @param strona - strona paginacja
   */
  pobierzWszystkieKatalogi(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined>;
}

/**
 * Klasa abstrakcyjna wymagana do zdefiniowania prowajdera
 */
export abstract class DostepneWarstwyModulMapowyAdapter implements DostepneWarstwyAdapter {

  /**
   * Funkcja zwraca widoczne warstwy i katalogi
   * @param szukaj - fraza
   * @param strona - strona paginacja
   */
  abstract pobierzWidoczneWarstwyIKatalogi(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined>;

  /**
   * Funkcja zwraca widoczna warstwę lub katalog po uuid
   * @param uuid
   */
  abstract pobierzWidocznaWarstweLubKatalog(uuid: string): Observable<Warstwa | undefined>;


  /**
   * Funkcja dla administratora pobieranie wszystkich warstw
   * @param szukaj - fraza
   * @param strona - strona paginacja
   */
  abstract pobierzWszystkieWrstwy(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined>;

  /**
   * Funkcja dla administratora pobieranie wszystkich katalogów
   * @param szukaj - fraza
   * @param strona - strona paginacja
   */
  abstract pobierzWszystkieKatalogi(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined>;

}

/**
 * Domyslna implementacja prowajdera
 */
export class DomyslnyDostepneWarstwyAdapter extends DostepneWarstwyModulMapowyAdapter {
  /**
   * Funkcja zwraca widoczne warstwy i katalogi
   * @param szukaj - fraza
   * @param strona - strona paginacja
   */
  pobierzWidoczneWarstwyIKatalogi(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined> {
    return new Observable(subscriber => {
      subscriber.next(
        {
          liczbaWszystkichElementow: 100,
          liczbaStron: 10,
          strona: 0,
          warstwy: this.wszystkieWarstwyIKatalogi().filter(w => w.nazwaOficjalna?.pl?.includes(szukaj, strona))
        }
      );
    });
  }


  /**
   * Funkcja zwraca widoczna warstwę lub katalog po uuid
   * @param uuid
   */
  pobierzWidocznaWarstweLubKatalog(uuid: string): Observable<Warstwa | undefined> {
    return new Observable(subscriber => {
      subscriber.next(undefined);
    })
  }

  /**
   * Funkcja dla administratora pobieranie wszystkich warstw
   * @param szukaj - fraza
   * @param strona - strona paginacja
   */
  pobierzWszystkieKatalogi(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined> {
    return new Observable(subscriber => {
      subscriber.next(
        {
          liczbaWszystkichElementow: 100,
          liczbaStron: 10,
          strona: 0,
          warstwy: [],
        }
      );
    });
  }

  /**
   * Funkcja dla administratora pobieranie wszystkich katalogów
   * @param szukaj - fraza
   * @param strona - strona paginacja
   */
  pobierzWszystkieWrstwy(szukaj: string, strona: number, rozmiar: number): Observable<WarstwyOdpowiedz | undefined> {
    return new Observable(subscriber => {
      subscriber.next(
        {
          liczbaWszystkichElementow: 100,
          liczbaStron: 10,
          strona: 0,
          warstwy: [],
        }
      );
    });
  }

  /**
   * Funkcja pomocnicz dla domyślnej implementacji
   */
  private wszystkieWarstwyIKatalogi(): Warstwa[] {
    return [
      {
        uuid: 'eef7aa27-16c6-4c3f-b5b4-1e9852e0f7de',
        uuidMapa: 'root.eef7aa27-16c6-4c3f-b5b4-1e9852e0f7de',
        nazwaOficjalna: {pl: 'przystanki wkd', en: ''},
        rozwiniecieWLegendzie: false,
        widocznoscWLegendzie: true,
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
          przezroczystosc: 1
        }
      }, {
        nazwaOficjalna: {pl: 'katalog przystanki', en: ''},
        uuid: '727afcda-aa9f-4bf4-98c1-8c38512c6889',
        uuidMapa: 'root.727afcda-aa9f-4bf4-98c1-8c38512c6889',
        widocznoscWLegendzie: true,
        rozwiniecieWLegendzie: false,
        typWyswietlania: TypWyswietlania.KATALOG,
        sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
        warstwy: [
          {
            uuid: '807e5a85-566c-4832-8b36-b76a21fd6eff',
            uuidMapa: '727afcda-aa9f-4bf4-98c1-8c38512c6889.807e5a85-566c-4832-8b36-b76a21fd6eff',
            nazwaOficjalna: {pl: 'PRZYSTANKI_SKM', en: ''},
            rozwiniecieWLegendzie: false,
            widocznoscWLegendzie: true,
            typWyswietlania: TypWyswietlania.WARSTWA,
            sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
            szczegolyWarstwy: {
              nazwaMVC: 'PRZYSTANKI_SKM',
              zrodloMVC: 'nekken',
              typ: TypWarstwy.THEME_LAYER,
              minSkalaWidocznosci: 1, // do wdrożenia
              maksSkalaWidocznosci: 10, // do wdrożenia
              minSkalaKlikalnosci: 3, // do wdrożenia
              maksParametrKlastrowania: 3, // do wdrożenia
              przezroczystosc: 1
            }
          },
          {
            uuid: 'b8eac9ca-b085-4a37-a890-eb7ee02d6d50',
            uuidMapa: '727afcda-aa9f-4bf4-98c1-8c38512c6889.b8eac9ca-b085-4a37-a890-eb7ee02d6d50',
            nazwaOficjalna: {pl: 'PRZYSTANKI_WKD', en: ''},
            rozwiniecieWLegendzie: false,
            widocznoscWLegendzie: true,
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
                clusterStyle: 'M.BOS_ZIELEN_ZGODA_NEW',
                minPointCount: 2,
                maxClusteringLevel: 15,
              }
            }
          },
        ]
      },
      {
        uuid: '90172971-a7de-4ddb-a9af-f8e20cfc2ffe',
        uuidMapa: 'root.90172971-a7de-4ddb-a9af-f8e20cfc2ffe',
        nazwaOficjalna: {pl: 'Ciągi piesze', en: ''},
        rozwiniecieWLegendzie: false,
        widocznoscWLegendzie: true,
        typWyswietlania: TypWyswietlania.WARSTWA,
        sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
        szczegolyWarstwy: {
          nazwaMVC: 'CIAGI_PIESZE',
          zrodloMVC: 'nekken',
          typ: TypWarstwy.THEME_LAYER,
          minSkalaWidocznosci: 1, // do wdrożenia
          maksSkalaWidocznosci: 10, // do wdrożenia
          minSkalaKlikalnosci: 3, // do wdrożenia
          maksParametrKlastrowania: 3, // do wdrożenia
          przezroczystosc: 1
        }
      },
      {
        uuid: '16c94c42-9446-4902-b91a-44b6ed8f9a97',
        uuidMapa: 'root.16c94c42-9446-4902-b91a-44b6ed8f9a97',
        nazwaOficjalna: {pl: 'Gminy', en: ''},
        rozwiniecieWLegendzie: false,
        widocznoscWLegendzie: true,
        typWyswietlania: TypWyswietlania.WARSTWA,
        sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
        szczegolyWarstwy: {
          nazwaMVC: 'GMINY',
          zrodloMVC: 'nekken',
          typ: TypWarstwy.THEME_LAYER,
          minSkalaWidocznosci: 1, // do wdrożenia
          maksSkalaWidocznosci: 10, // do wdrożenia
          minSkalaKlikalnosci: 3, // do wdrożenia
          maksParametrKlastrowania: 3, // do wdrożenia
          przezroczystosc: 1
        }
      },
      {
        uuid: '5dde9a07-468e-4fe2-b15c-03f715f3f48e',
        uuidMapa: 'root.5dde9a07-468e-4fe2-b15c-03f715f3f48e',
        nazwaOficjalna: {pl: 'Obiekty mostowe', en: ''},
        rozwiniecieWLegendzie: false,
        widocznoscWLegendzie: true,
        typWyswietlania: TypWyswietlania.WARSTWA,
        sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
        szczegolyWarstwy: {
          nazwaMVC: 'OBIEKTY_MOSTOWE',
          zrodloMVC: 'nekken',
          typ: TypWarstwy.THEME_LAYER,
          minSkalaWidocznosci: 1, // do wdrożenia
          maksSkalaWidocznosci: 10, // do wdrożenia
          minSkalaKlikalnosci: 3, // do wdrożenia
          maksParametrKlastrowania: 3, // do wdrożenia
          przezroczystosc: 1
        }
      },
      {
        uuid: 'c0d921c5-6d74-43bf-bb09-cf498c6d3352',
        uuidMapa: 'root.c0d921c5-6d74-43bf-bb09-cf498c6d3352',
        nazwaOficjalna: {pl: 'Poi', en: ''},
        rozwiniecieWLegendzie: false,
        widocznoscWLegendzie: true,
        typWyswietlania: TypWyswietlania.WARSTWA,
        sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
        szczegolyWarstwy: {
          nazwaMVC: 'POI',
          zrodloMVC: 'nekken',
          typ: TypWarstwy.THEME_LAYER,
          minSkalaWidocznosci: 1, // do wdrożenia
          maksSkalaWidocznosci: 18, // do wdrożenia
          minSkalaKlikalnosci: 3, // do wdrożenia
          maksParametrKlastrowania: 3, // do wdrożenia
          przezroczystosc: 1,
          opcjeKlastrowania: {
            clusterStyle: 'M.POI_KLASTER',
            minPointCount: 2,
            maxClusteringLevel: 10,
          }
        }
      },
      {
        uuid: 'a7b7d35cd-0603-44ab-9f14-34284bc8cf59',
        uuidMapa: 'root.7b7d35cd-0603-44ab-9f14-34284bc8cf59',
        nazwaOficjalna: {pl: 'Rowery', en: ''},
        rozwiniecieWLegendzie: false,
        widocznoscWLegendzie: true,
        typWyswietlania: TypWyswietlania.WARSTWA,
        sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
        szczegolyWarstwy: {
          nazwaMVC: 'ROWY',
          zrodloMVC: 'nekken',
          typ: TypWarstwy.THEME_LAYER,
          minSkalaWidocznosci: 1, // do wdrożenia
          maksSkalaWidocznosci: 10, // do wdrożenia
          minSkalaKlikalnosci: 3, // do wdrożenia
          maksParametrKlastrowania: 3, // do wdrożenia
          przezroczystosc: 1
        }
      },
      {
        uuid: 'd8271c66-55da-4170-b907-f694d3a828b3',
        uuidMapa: 'root.d8271c66-55da-4170-b907-f694d3a828b3',
        nazwaOficjalna: {pl: 'Tereny zielone', en: ''},
        rozwiniecieWLegendzie: false,
        widocznoscWLegendzie: true,
        typWyswietlania: TypWyswietlania.WARSTWA,
        sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
        szczegolyWarstwy: {
          nazwaMVC: 'TERENY_ZIELONE',
          zrodloMVC: 'nekken',
          typ: TypWarstwy.THEME_LAYER,
          minSkalaWidocznosci: 1, // do wdrożenia
          maksSkalaWidocznosci: 10, // do wdrożenia
          minSkalaKlikalnosci: 3, // do wdrożenia
          maksParametrKlastrowania: 3, // do wdrożenia
          przezroczystosc: 1
        }
      },
      {
        uuid: 'bb7e292b-82bf-45eb-88ee-bc334ac37d2d',
        uuidMapa: 'root.bb7e292b-82bf-45eb-88ee-bc334ac37d2d',
        nazwaOficjalna: {pl: 'Zabudowy', en: ''},
        rozwiniecieWLegendzie: false,
        widocznoscWLegendzie: true,
        typWyswietlania: TypWyswietlania.WARSTWA,
        sciezkaDoPlikuSymbolu: 'http://mapa.um.warszawa.pl/mapaApp/Styles/Img/warstwy/9_turystyka/74_hotel_motel.png',
        szczegolyWarstwy: {
          nazwaMVC: 'ZABUDOWY',
          zrodloMVC: 'nekken',
          typ: TypWarstwy.THEME_LAYER,
          minSkalaWidocznosci: 1, // do wdrożenia
          maksSkalaWidocznosci: 10, // do wdrożenia
          minSkalaKlikalnosci: 3, // do wdrożenia
          maksParametrKlastrowania: 3, // do wdrożenia
          przezroczystosc: 1
        }
      },
      {
        uuid: 'bb7e292b-82bf-45eb-88ee-bc334ac37d2x',
        uuidMapa: 'root.bb7e292b-82bf-45eb-88ee-bc334ac37d2x',
        nazwaOficjalna: {pl: 'BOS_ZIELEN_ZGODA_ALL', en: ''},
        rozwiniecieWLegendzie: false,
        widocznoscWLegendzie: true,
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
          przezroczystosc: 1,
          opcjeKlastrowania: {
            clusterStyle: 'M.TOOLTIP',
            minPointCount: 2,
            maxClusteringLevel: 15,
          }
        }
      }
    ];
  }

}



