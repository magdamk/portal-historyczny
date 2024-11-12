import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { WynikWyszukiwaniaDtoDzialkaDto, WynikWyszukiwaniaDtoObiektDto, WyszukiwarkaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
import { InterfejsUzytkownikaActions } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.actions';
import { InterfejsUzytkownikaStan, WYSZUKIWARKI } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.reducer';
import { Warstwa } from '../../../modele/warstwa';
import { MapaService, TYPY_ZDARZEN_MYSZY, KlikniecieNaMapieEvent } from '../../../serwisy/mapa.service';
import { WarstwaUtils } from '../../../utils/warstwa-utils';

@Component({
  selector: 'mm-wyszukiwarka-mapowa',
  templateUrl: './wyszukiwarka-mapowa.component.html',
  styleUrls: ['./wyszukiwarka-mapowa.component.scss']
})
export class WyszukiwarkaMapowaComponent implements OnInit, OnDestroy {

  @Input()
  set ukryta(val: boolean) {
    if (val === true) {
      setTimeout(() => {
        this._ukryta = true
      }, 200);
      return;
    }
    this._ukryta = val;
  }

  _ukryta = false;
  @Input() aktywnaWyszukiwarka = 1;

  dzialki: WynikWyszukiwaniaDtoDzialkaDto | null = null;
  obiektyZLokalizacja: WynikWyszukiwaniaDtoObiektDto | null = null;
  obiektyAdresySkrzyzowania: WynikWyszukiwaniaDtoObiektDto | null = null;

  limitWynikowWyszukiwania = 100;
  informajceOKliknieteLokalizacji: string | undefined = undefined;

  subskrybcje$ = new Subscription();
  subskrybcjaKlikniecia$ = new Subscription();

  mapaWarstw = new Map<string, Warstwa>();


  /**
   * Konstruktor
   *
   * @param wyszukiwarkaSerwis - serwis do komunikacji z modułem wyszukiwania
   * @param konfiguracjaSerwis - serwis do pobrania konfiguracji
   * @param mapaSerwis - serwis mapy
   * @param store
   */
  constructor(private wyszukiwarkaSerwis: WyszukiwarkaModulMapowyAdapter,
              private konfiguracjaSerwis: KonfiguracjaModulMapowyAdapter,
              private mapaSerwis: MapaService,
              private store: Store<{ modulMapowy: any }>) {
    store.select('modulMapowy', 'interfejsUzytkownika').subscribe((stan: InterfejsUzytkownikaStan) => {
      this.aktywnaWyszukiwarka = stan.wyszukiwarka.aktywna;
    });
  }

  /**
   * Cykl życia obiektu
   */
  ngOnInit() {
    this.pobierzLimitWynikowWyszukiwania();
    this.inicjalizujSubskrybcjeMap();
    this.subskrybujKlikniecieNaMapie();
  }

  ngOnDestroy(): void {
    this.subskrybcje$.unsubscribe();
  }

  /**
   * Funkcja pobiera limit wynikow wyszukiwania
   */
  pobierzLimitWynikowWyszukiwania() {
    this.konfiguracjaSerwis.pobierzLimitWynikowWyszukiwania()
      .subscribe(res => {
        const listaKonfiguracji = res?.listaKonfiguracji;
        if (!listaKonfiguracji || listaKonfiguracji.length !== 1) {
          return;
        }
        let konfiguracjaLimituWyszukiwania = listaKonfiguracji[0]?.wartoscLiczbowa;
        this.limitWynikowWyszukiwania = konfiguracjaLimituWyszukiwania && konfiguracjaLimituWyszukiwania < 100 ? konfiguracjaLimituWyszukiwania : 100;
      });
  }

  /**
   * Inicjalizacja nasłuchowania zmiany mapy
   */
  inicjalizujSubskrybcjeMap() {
    this.subskrybcje$.add(
      this.mapaSerwis.pobierzSubjectAktualizacjiWarstwy().subscribe(mapa => {
        this.mapaWarstw = WarstwaUtils.splaszczWarstwyPoUuid(mapa?.warstwy);
      })
    );
  }

  /**
   * Funkcja aktywująca okienko wyszukiwarki działek
   */
  aktywujWyszukiwarkeDzialek() {
    this.store.dispatch(InterfejsUzytkownikaActions.rozwinWyszukiwarke({aktywna: WYSZUKIWARKI.DZIALKI}));
    // this.store.dispatch(NarzedziaActions.zamknijNarzedzie({identyfikator: NARZEDZIA_STERUJACE_ID.WYSZUKIWARKA_W_ODLEGLOSCI}))
  }

  /**
   * Funkcja aktywująca okienko wyszukiwarki obiektów
   */
  aktywujWyszukiwarkeObiektow() {
    this.store.dispatch(InterfejsUzytkownikaActions.rozwinWyszukiwarke({aktywna: WYSZUKIWARKI.OBIEKTY_W_ODLEGLOSCI}));
    // this.store.dispatch(NarzedziaActions.uruchomNarzedzie({identyfikator: NARZEDZIA_STERUJACE_ID.WYSZUKIWARKA_W_ODLEGLOSCI}))
  }

  /**
   * Funkcja wyszukująca działki
   *
   * @param event - obiekt zawierający dane do wyszukiwania
   */
  wyszukajDzialki(event: { obreb: string, dzialka: string }) {
    const parametry = {dzialka: event.dzialka, liczbaWynikow: this.limitWynikowWyszukiwania};
    const parametryWyszukiwania = this.przygotujParametry(parametry);
    this.wyszukiwarkaSerwis.wyszukajDzialki(event.obreb, parametryWyszukiwania).subscribe(res => {
      if (!res.content) {
        this.dzialki = {liczbaWynikow: 0, content: []};
        return;
      }
      this.dzialki = res;
    });
  }

  /**
   * Funkcja wyszukująca działki
   *
   * @param event - obiekt zawierający parametry wyszukiwania
   */
  wyszukajObiekty(event: { fraza: string, zasieg: string, lokalizacjaPoczatkowa: string }) {
    const parametry = this.przygotujParametry({liczbaWynikow: this.limitWynikowWyszukiwania});
    this.wyszukiwarkaSerwis.wyszukajObiektyZLokalizacja(event.fraza, event.lokalizacjaPoczatkowa, event.zasieg, parametry)
      .subscribe(res => {
        if (!res.content) {
          this.obiektyZLokalizacja = {liczbaWynikow: 0, content: []};
          return;
        }
        this.obiektyZLokalizacja = res;
      });
  }

  /**
   * Funkcja wyszukująca obiekty oraz adresy
   *
   * @param fraza - wyszukiwana fraza
   */
  wyszukajAdresyObiektySkrzyzowania(fraza: string) {
    const parametry = this.przygotujParametry({liczbaWynikow: this.limitWynikowWyszukiwania});
    this.wyszukiwarkaSerwis.wyszukajAdresyObiektySkrzyzowania(fraza, parametry).subscribe(res => {
      this.przypiszAdresyObiektySkrzyzowania(res);
    });
  }


  /**
   * Funkcja przygotowująca parametry w zależności od wersji aplikacji
   * @param parametry - bazowe parametry
   */
  private przygotujParametry(parametry: object): object {
      return parametry;
  }

  /**
   * Funkcja obsługująca odpowiedz serwera
   * @param res - odpowiedź serwera
   */
  private przypiszAdresyObiektySkrzyzowania(res: WynikWyszukiwaniaDtoObiektDto) {
    if (!res.content || res.content.length === 0) {
      this.obiektyAdresySkrzyzowania = {liczbaWynikow: 0, content: []};
      return;
    }
    this.obiektyAdresySkrzyzowania = res;
  }

  /**
   * Obsluga zdarzenia zmiany subnskrybcji klikniecia
   *
   * @param czyNasluchiwac - wartosc logiczna
   */
  odsubskrybujKlikniecieNaMapie() {
    this.subskrybcjaKlikniecia$.unsubscribe();
  }

  /**
   * Funkcja inicjalizująca subskrybcję kliknięcia na mapie
   */
  subskrybujKlikniecieNaMapie() {
    this.subskrybcje$.add(this.mapaSerwis.pobierzSubjectZdarzenMyszyNaMapie()
      .pipe(filter(e => e.typEventu === TYPY_ZDARZEN_MYSZY.TAPNIECIE))
      .subscribe(zaznaczenieEvent => {
        if (this.aktywnaWyszukiwarka !== WYSZUKIWARKI.OBIEKTY_W_ODLEGLOSCI) {
          return;
        }
        this.informajceOKliknieteLokalizacji = this.pobierzLokalizacje(zaznaczenieEvent);
        // this.store.dispatch(WyszukiwarkaActions.aktualizujDaneWyszukiwarkiObiektowOdleglosc(
        //   {daneWyszukiwarki: {lokalizacjaPoczatkowa: this.informajceOKliknieteLokalizacji}}));
        this.store.dispatch(InterfejsUzytkownikaActions.rozwinWyszukiwarke({aktywna: 3}));

      }));
  }

  /**
   * Funkcja ustawiająca lokalizację początkową
   * @param punktNaMapie - kliknięty punkt na mapie
   */
  private pobierzLokalizacje(zaznaczenieEvent?: KlikniecieNaMapieEvent): string {
    const punktNaMapie = zaznaczenieEvent?.pozycjaGeograficzna;
    const x = punktNaMapie?.getX();
    const y = punktNaMapie?.getY();
    if (!x || !y) {
      return '';
    }
    return `${Math.round(y)},${Math.round(x)}`;
  }

}
