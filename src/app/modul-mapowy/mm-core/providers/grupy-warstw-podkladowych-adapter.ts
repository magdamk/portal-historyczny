import {Observable} from 'rxjs';
import {GrupaWarstwPodkladowych} from '../../serwis-mapowy/modele/grupa-warstw-podkladowych';
import {TypWarstwy, TypWyswietlania} from '../../serwis-mapowy/modele/warstwa';

/**
 * Interfejs definiujący pobieranie warstw podkładowych
 */
export interface GrupyWarstwPodkladowychAdapter {

  /**
   * Funkcja służy do pobierania grup warstw podkładowych
   */
  pobierzGrupyWarstwPodkladowych(): Observable<GrupaWarstwPodkladowych[]>;

}

/**
 * Klasa abstrakcyjna wymagana dla definicji prowajdera
 */
export abstract class GrupyWarstwPodkladowychModulMapowyAdapter implements GrupyWarstwPodkladowychAdapter {
  /**
   * Funkcja służy do pobierania grup warstw podkładowych
   */
  abstract pobierzGrupyWarstwPodkladowych(): Observable<GrupaWarstwPodkladowych[]>;

}

/**
 * Domyślna implementacja prowajdera
 */
export class DomyslneGrupyWarstwPodkladowychAdapter extends GrupyWarstwPodkladowychModulMapowyAdapter {
  /**
   * Funkcja służy do pobierania grup warstw podkładowych
   */
  pobierzGrupyWarstwPodkladowych(): Observable<GrupaWarstwPodkladowych[]> {
    return new Observable(subscriber => {
      subscriber.next([
        {
          uuid: '08d8ee39-311a-4429-9205-8fec5e4f24b3',
          nazwa: 'podkład 1',
          wybranaWarstwa: 0,
          warstwy: [
            {
              nazwa: {pl: '1', en: '1'}, sciezkaDoPlikuGrafiki: '/assets/modul-mapowy/img/podklad-raster2.png',
              warstwa: {
                uuid: '08d8ee39-311a-4429-9205-8fec5e4f24b3',
                uuidMapa: '',
                typWyswietlania: TypWyswietlania.WARSTWA,
                nazwaOficjalna: {pl: '', en: ''},
                szczegolyWarstwy: {
                  przezroczystosc: 1,
                  typ: TypWarstwy.TILE_LAYER,
                  zrodloMVC: 'nekken',
                  nazwaMVC: 'TL_MAPA_PODKLADOWA_KOLOROWA',
                  minSkalaWidocznosci: 0,
                  maksSkalaWidocznosci: 18,
                  minSkalaKlikalnosci: 1,
                  maksParametrKlastrowania: 1,
                }
              }
            }
          ]
        },
        {
          uuid: '08d8ee39-311a-4429-9205-8fec5e4f24b4',
          nazwa: 'podkład 2',
          wybranaWarstwa: 0,
          warstwy: [
            {
              nazwa: {pl: '1', en: '1'}, sciezkaDoPlikuGrafiki: '/assets/modul-mapowy/img/podklad-raster.png',
              warstwa: {
                uuid: '08d8ee39-311a-4429-9205-8fec5e4f24b3',
                uuidMapa: '',
                typWyswietlania: TypWyswietlania.WARSTWA,
                nazwaOficjalna: {pl: '', en: ''},
                szczegolyWarstwy: {
                  przezroczystosc: 1,
                  typ: TypWarstwy.TILE_LAYER,
                  zrodloMVC: 'nekken',
                  nazwaMVC: 'TL_MAPA_PODKLADOWA_FOTOPLAN',
                  minSkalaWidocznosci: 0,
                  maksSkalaWidocznosci: 18,
                  minSkalaKlikalnosci: 1,
                  maksParametrKlastrowania: 1,
                }
              }
            }
          ]
        },
        {
          uuid: '08d8ee39-311a-4429-9205-8fec5e4f24b6',
          nazwa: 'podkład 2',
          wybranaWarstwa: 0,
          warstwy: [
            {
              nazwa: {pl: '2016', en: '2016'}, sciezkaDoPlikuGrafiki: '/assets/modul-mapowy/img/podklad-wektor.png',
              warstwa: {
                uuid: '08d8ee39-311a-4429-9205-8fec5e4f24b3',
                uuidMapa: '',
                typWyswietlania: TypWyswietlania.WARSTWA,
                nazwaOficjalna: {pl: '', en: ''},
                szczegolyWarstwy: {
                  przezroczystosc: 1,
                  typ: TypWarstwy.THEME_LAYER,
                  zrodloMVC: 'nekken',
                  nazwaMVC: 'TERENY_ZIELONE_MONO',
                  minSkalaWidocznosci: 0,
                  maksSkalaWidocznosci: 18,
                  minSkalaKlikalnosci: 1,
                  maksParametrKlastrowania: 1,
                }
              }
            },
            {
              nazwa: {pl: '2017', en: '2017'}, sciezkaDoPlikuGrafiki: '/assets/modul-mapowy/img/podklad-wektor.png',
              warstwa: {
                uuid: '18d8ee39-311a-4429-9205-8fec5e4f24b3',
                uuidMapa: '',
                typWyswietlania: TypWyswietlania.WARSTWA,
                nazwaOficjalna: {pl: '', en: ''},
                szczegolyWarstwy: {
                  przezroczystosc: 1,
                  typ: TypWarstwy.THEME_LAYER,
                  zrodloMVC: 'nekken',
                  nazwaMVC: 'TERENY_ZIELONE_MONO',
                  minSkalaWidocznosci: 0,
                  maksSkalaWidocznosci: 18,
                  minSkalaKlikalnosci: 1,
                  maksParametrKlastrowania: 1,
                }
              }
            },
            {
              nazwa: {pl: '2018', en: '2018'}, sciezkaDoPlikuGrafiki: '/assets/modul-mapowy/img/podklad-wektor.png',
              warstwa: {
                uuid: '28d8ee39-311a-4429-9205-8fec5e4f24b3',
                uuidMapa: '',
                typWyswietlania: TypWyswietlania.WARSTWA,
                nazwaOficjalna: {pl: '', en: ''},
                szczegolyWarstwy: {
                  przezroczystosc: 1,
                  typ: TypWarstwy.TILE_LAYER,
                  zrodloMVC: 'nekken',
                  nazwaMVC: 'TL_MAPA_PODKLADOWA_MONO',
                  minSkalaWidocznosci: 0,
                  maksSkalaWidocznosci: 18,
                  minSkalaKlikalnosci: 1,
                  maksParametrKlastrowania: 1,
                }
              }
            }
          ]
        }
      ]);
    });
  }
}
