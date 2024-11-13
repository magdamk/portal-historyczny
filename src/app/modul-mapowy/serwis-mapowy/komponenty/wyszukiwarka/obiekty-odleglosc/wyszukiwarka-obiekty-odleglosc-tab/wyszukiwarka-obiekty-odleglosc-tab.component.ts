import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// import {WynikWyszukiwaniaDtoObiektDto} from '../../../../../core/providers/wyszukiwarka-adapter';
import { MapaService, TYPY_ZDARZEN_MYSZY } from '../../../../serwisy/mapa.service';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { KonwerterGeometriUtils } from '../../../../utils/konwerter-geometri-utils';
import { WarstwaUtils } from '../../../../utils/warstwa-utils';
import { Warstwa } from '../../../../modele/warstwa';
import { ObiektyMapyService } from '../../../../serwisy/obiekty-mapy.service';
import { debounceTime } from 'rxjs/operators';
import { Point } from '../../../../../oracle-maps/types/point';
import { WyszukiwarkaStan } from '../../../../../stan/wyszukiwarka/wyszukiwarka.reducer';
import { Store } from '@ngrx/store';
import { WyszukiwarkaActions } from '../../../../../stan/wyszukiwarka/wyszukiwarka.actions';
// import {WyszukiwarkaZaawansowanaActions} from '../../../../../stan/wyszukiwarka-zaawansowana/wyszukiwarka-zaawansowana.actions';
import { OM } from '../../../../../oracle-maps/types/om';
import { SterowanieMapyService } from '../../../../serwisy/sterowanie-mapy.service';
import { KomunikatyModulMapowyAdapter } from 'src/app/core/adaptery/komunikaty-adapter';
import { AktualizacjaKomponentuService } from 'src/app/modul-mapowy/commons/serwisy/aktualizacja-komponentu.service';
import { WynikWyszukiwaniaDtoObiektDto } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
// import {WYSZUKWIARKI_ZAAWANSOWANE} from '../../../../../stan/wyszukiwarka-zaawansowana/wyszukiwarka-zaawansowana.reducer';
// import {AktualizacjaKomponentuService} from '../../../../../wspolne/serwisy/aktualizacja-komponentu.service';
// import {NarzedziaActions} from '../../../../../stan/narzedzia/narzedzia.actions';
// import {NARZEDZIA_STERUJACE_ID} from '../../../../../stan/narzedzia/narzedzia.const';
// import {KomunikatyModulMapowyAdapter} from "../../../../../core/providers/komunikaty-adapter";

declare var OM: OM;

/**
 * Dane pola formularza
 */
export interface DaneInput {
  wartosc: string;
  czyPoprawna?: boolean;
  czyModyfikowana?: boolean;
}

/**
 * Komponent wyszukiwarki obiektów w odległości
 */
@Component({
  selector: 'mm-wyszukiwarka-obiekty-odleglosc-tab',
  templateUrl: './wyszukiwarka-obiekty-odleglosc-tab.component.html',
  styleUrls: ['./wyszukiwarka-obiekty-odleglosc-tab.component.scss']
})
export class WyszukiwarkaObiektyOdlegloscTabComponent implements OnInit, OnDestroy {


  @Input() wynikiWyszukiwania: WynikWyszukiwaniaDtoObiektDto | null = null;

  @Output() wyszukajObiektyClick = new EventEmitter();
  @Output() wyczyscWyszukiwanieClick = new EventEmitter();

  fraza = '';
  zasieg = 10;
  lokalizacjaPoczatkowa: DaneInput = { wartosc: '' };

  fraza$ = new BehaviorSubject('');
  zasieg$ = new BehaviorSubject(10);
  lokalizacjaPoczatkowa$ = new BehaviorSubject<DaneInput>({ wartosc: '' });

  mapaWarstw = new Map<string, Warstwa>();

  subskrybcje = new Subscription();
  stanWyszukiwarki$: Observable<WyszukiwarkaStan>;
  maxZasieg = 20000;
  minZasieg = 10;
  przekroczonyMaksymalnyZasieg = false;

  /**
   * Konstruktor
   */
  constructor(private mapaSerwis: MapaService, private obiektyMapySerwis: ObiektyMapyService,
    private sterowanieMapy: SterowanieMapyService,
    private eRef: ElementRef,
    private aktualizacjaKomponentuService: AktualizacjaKomponentuService,
    private store: Store<{ modulMapowy: any }>,
    private komunikaty: KomunikatyModulMapowyAdapter) {
    this.stanWyszukiwarki$ = store.select('modulMapowy', 'wyszukiwarka');
  }

  /**
   * Cykl życia obiektu
   */
  ngOnInit() {
    this.inicjalizujSubskrybcjeKlikniecia();
    this.inicjalizujSubskrybcjeMapy();
    this.inicjalizujSubskrybcjeZmiennyych();
    this.subskrybujDaneWyszukiwarki();
    // this.store.dispatch(NarzedziaActions.uruchomNarzedzie({identyfikator: NARZEDZIA_STERUJACE_ID.WYSZUKIWARKA_W_ODLEGLOSCI}));
  }

  /**
   * Cykl życia obiektu
   */
  ngOnDestroy() {
    this.subskrybcje.unsubscribe();
    // this.store.dispatch(NarzedziaActions.zamknijNarzedzie({identyfikator: NARZEDZIA_STERUJACE_ID.WYSZUKIWARKA_W_ODLEGLOSCI}));
  }

  /**
   * Funkcja inicjalizująca subskrybcję kliknięcia na mapie
   */
  inicjalizujSubskrybcjeKlikniecia() {
    this.subskrybcje.add(
      this.mapaSerwis.pobierzSubjectZdarzenMyszyNaMapie()
        .subscribe(zaznaczenieEvent => {
          if (zaznaczenieEvent.typEventu === TYPY_ZDARZEN_MYSZY.LEWY_KLIK ||
            zaznaczenieEvent.typEventu === TYPY_ZDARZEN_MYSZY.TAPNIECIE) {
            this.ustawLokalizacjePoczatkowa(zaznaczenieEvent?.pozycjaGeograficzna);
          }
        })
    );
  }

  /**
   * Inicjalizacja nasłuchowania zmiany mapy
   */
  inicjalizujSubskrybcjeMapy() {
    this.subskrybcje.add(
      this.mapaSerwis.pobierzSubjectAktualizacjiWarstwy().subscribe(mapa => {
        this.mapaWarstw = WarstwaUtils.splaszczWarstwyPoUuid(mapa?.warstwy);
      })
    );
  }

  /**
   * Inicjalizacja nasłuchowania zmiany zmiennych
   */
  inicjalizujSubskrybcjeZmiennyych() {
    this.subskrybcje.add(
      combineLatest([this.fraza$, this.zasieg$, this.lokalizacjaPoczatkowa$])
        .pipe(debounceTime(300))
        .subscribe(
          () => {
            this.aktualizujDaneWyszukiwarkiObiektowOdleglosc();
          }
        ));
  }

  /**
   * Funkcja pobierająca inicjalne dane
   */
  subskrybujDaneWyszukiwarki() {
    this.subskrybcje.add(
      this.stanWyszukiwarki$
        .subscribe(stan => {
          const dane = stan?.daneWyszukiwarkiObiektowOdleglosc;
          if (!dane) {
            return;
          }
          this.fraza = dane.fraza ?? '';
          this.zasieg = dane.zasieg ?? 10;
          this.lokalizacjaPoczatkowa.wartosc = dane.lokalizacjaPoczatkowa ?? '';
          this.czyLokalizacjaPoczatkowaWZakresie(this.lokalizacjaPoczatkowa.wartosc);
          this.przekroczonyMaksymalnyZasieg = this.zasieg > this.maxZasieg || this.minZasieg > this.zasieg;
        })
    );
  }

  /**
   * Funkcja emitująca zdarzenie wyszukania działek
   *
   */
  wyszukajObiekty() {
    if (!this.fraza || this.fraza.length < 2 || !this.zasieg || !this.lokalizacjaPoczatkowa) {
      this.wyczyscWyniki();
      return;
    }
    this.lokalizacjaPoczatkowa.czyPoprawna = this.czyLokalizacjaPoczatkowaWZakresie(this.lokalizacjaPoczatkowa.wartosc);
    if (!this.lokalizacjaPoczatkowa.czyPoprawna) {
      return;
    }
    this.wyszukajObiektyClick.emit({
      fraza: this.fraza,
      zasieg: `${this.zasieg}m`,
      lokalizacjaPoczatkowa: this.konwertujLokalizacje(this.lokalizacjaPoczatkowa.wartosc)
    });
  }

  /**
   * Funkcja czyscząca wyniki wyszukiwania
   *
   */
  wyczyscWyszukiwanie() {
    this.fraza = '';
    this.zasieg = 10;
    this.lokalizacjaPoczatkowa = { wartosc: '' };
    this.wyczyscWyszukiwanieClick.emit();
    this.aktualizujDaneWyszukiwarkiObiektowOdleglosc();
    this.obiektyMapySerwis.resetujStan();
  }

  /**
   * Funkcja czyscząca wyniki wyszukiwania
   *
   */
  wyczyscWyniki() {
    this.wyczyscWyszukiwanieClick.emit();
  }

  /**
   * Funkcja aktualizująca wartość ustawionego zasięgu
   *
   * @param event - wartość zasięgu
   */
  ustawZasieg(event: { value: number | null }) {
    if (!event.value) {
      return;
    }
    this.przekroczonyMaksymalnyZasieg = event.value > this.maxZasieg || this.minZasieg > event.value;
    this.zasieg = event.value;
    this.zasieg$.next(event.value);
  }

  /**
   * Funkcja aktualizująca wartość ustawionego zasięgu
   *
   * @param value - wartość zasięgu
   */
  ustawZasiegRecznie(value: number) {
    if (!value) {
      return;
    }
    this.ustawZasieg({ value });
  }

  /**
   * Funkcja aktualizująca wartość frazy
   *
   * @param nowaFraza - nowa fraza
   */
  frazaChange(nowaFraza: string) {
    this.fraza = nowaFraza;
    this.fraza$.next(nowaFraza);
  }

  /**
   * Funkcja aktualizująca stan wyszukiwarki
   */
  aktualizujDaneWyszukiwarkiObiektowOdleglosc() {
    this.store.dispatch(WyszukiwarkaActions.aktualizujDaneWyszukiwarkiObiektowOdleglosc({
      daneWyszukiwarki: {
        fraza: this.fraza,
        zasieg: this.zasieg,
        lokalizacjaPoczatkowa: this.lokalizacjaPoczatkowa.wartosc
      }
    }));
  }

  /**
   * Funkcja aktualizująca wartość lokalizacji
   *
   * @param lokalizacja - nowa lokalizacja
   */
  lokalizacjaPoczatkowaChange(lokalizacja: string) {
    const czyPoprawna = this.czyLokalizacjaPoczatkowaWZakresie(lokalizacja);
    this.lokalizacjaPoczatkowa = { ...this.lokalizacjaPoczatkowa, wartosc: lokalizacja, czyPoprawna, czyModyfikowana: true };
    this.wymusAktualizacjeKomponentu();
    this.lokalizacjaPoczatkowa$.next({ wartosc: lokalizacja });
  }

  /**
   * Funkcja wyznaczająca aktualną lokalizację użytkownika
   */
  wyznaczLokalizacje() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((event) => {
        const pozycja = KonwerterGeometriUtils.EPSG4326toEPSG2178(event.coords.longitude, event.coords.latitude);
        if (!pozycja) {
          return;
        }
        this.lokalizacjaPoczatkowaChange(`${Math.round(pozycja.y)},${Math.round(pozycja.x)}`);
        this.lokalizacjaPoczatkowa.czyPoprawna = this.czyLokalizacjaPoczatkowaWZakresie(this.lokalizacjaPoczatkowa.wartosc);
        this.sterowanieMapy.ustawLokalizacjeUzytkonika(pozycja);
      }, error => this.komunikaty.pokazKomunikatBledu('codes.obsluga-map.blad-pobrania-lokalizacja', { duration: 5000 }));
    }
  }

  /**
   * Funkcja wylicza lokalizacje poczatkowa
   * @param punktNaMapie - punkt na mapie
   */
  private ustawLokalizacjePoczatkowa(punktNaMapie?: Point) {
    const x = punktNaMapie?.getX();
    const y = punktNaMapie?.getY();
    if (!x || !y) {
      return;
    }
    this.lokalizacjaPoczatkowaChange(`${Math.round(y)},${Math.round(x)}`);
  }

  /**
   * Funkcja konwertująca lokalizację do formatu WGS84 oraz zamieniająca na string
   * @param localizationInEPSG2178 - lokalizacja w formacie EPSG2178
   */
  private konwertujLokalizacje(localizationInEPSG2178: string): string {
    const separator = this.rozpoznajSeparator(localizationInEPSG2178);
    const x = localizationInEPSG2178.split(separator)[1];
    const y = localizationInEPSG2178.split(separator)[0];
    const przekonwertowanaWartosc = KonwerterGeometriUtils.EPSG2178toEPSG4326(Number(x), Number(y));
    if (!przekonwertowanaWartosc) {
      return '';
    }
    return `${przekonwertowanaWartosc.x},${przekonwertowanaWartosc.y}`;
  }

  /**
   * Funkcja rozpoznająca separator w lokalizacji
   *
   * @param lokalizacja - lokalizacja oddzielona separatorem
   */
  private rozpoznajSeparator(lokalizacja: string): string {
    if (lokalizacja.split(',').length === 2) {
      return ',';
    }
    if (lokalizacja.split(';').length === 2) {
      return ';';
    }
    return '';
  }

  /**
   * Funkcja otwierająca okno wyszukiwarki zaawansowanej
   */
  wyswietlWszystkieWyniki() {
    // this.store.dispatch(WyszukiwarkaZaawansowanaActions.otworzWyszukiwarkeZaawansowana(
    //   {aktywna: WYSZUKWIARKI_ZAAWANSOWANE.OBIEKTY_W_ODLEGLOSCI, czyMobilna: false}));
  }

  /**
   * Funkcja otwierająca okno wyszukiwarki zaawansowanej
   */
  wyswietlWszystkieWynikiMobile() {
    this.wyczyscWyniki();
    // this.store.dispatch(WyszukiwarkaZaawansowanaActions.otworzWyszukiwarkeZaawansowana(
    //   {aktywna: WYSZUKWIARKI_ZAAWANSOWANE.OBIEKTY_W_ODLEGLOSCI, czyMobilna: true}));
  }

  /**
   * Funkcja wywołująca wyszukiwanie po wciśnięciu przycisku Enter
   *
   * @param event - zdarzenie wciśnięcia przycisku
   */
  wyszukajJesliEnter(event: KeyboardEvent) {
    this.lokalizacjaPoczatkowa.czyPoprawna = this.czyLokalizacjaPoczatkowaWZakresie(this.lokalizacjaPoczatkowa.wartosc);
    if (event.code !== 'Enter') {
      return;
    }
    this.wyszukajObiekty();
  }

  /**
   * Funkcja walidująca pole lokalizacji
   */
  private czyLokalizacjaPoczatkowaWZakresie(lokalizacja: string): boolean {
    const separator = this.rozpoznajSeparator(lokalizacja);
    const lokalizacjaX = Number(lokalizacja.split(separator)[0]);
    const lokalizacjaY = Number(lokalizacja.split(separator)[1]);
    return 5770000 <= lokalizacjaX && lokalizacjaX <= 5810000 && 7485000 <= lokalizacjaY && lokalizacjaY <= 7525000;
  }

  /**
   * Funkcja wymusza aktualizacje komponentu
   */
  wymusAktualizacjeKomponentu() {
    this.aktualizacjaKomponentuService.wymusAktualizacjeKomponentu(this.eRef);
  }
}
