import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Warstwa } from '../../../modele/warstwa';
import { InformacjeOObiekcie, ObiektyMapyUtils, TABLICA_ZASIEGOW_DLA_ZOOM } from '../../../utils/obiekty-mapy-utils';
import { Point } from 'src/app/core/modele/point';
import { Punkt } from '../../../modele/punkt';
import {OM} from '../../../../oracle-maps/types/om';
import { DlugieNazwyComponent } from 'src/app/modul-mapowy/commons/komponenty/dlugie-nazwy/dlugie-nazwy.component';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { AktualizacjaKomponentuService } from 'src/app/modul-mapowy/commons/serwisy/aktualizacja-komponentu.service';
import { Feature } from 'src/app/modul-mapowy/oracle-maps/types/feature';
import { MarkerLayer } from 'src/app/modul-mapowy/oracle-maps/types/marker-layer';
import { InterfejsUzytkownikaStan } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.reducer';
import { Mapa } from '../../../modele/mapa';
import { KlikniecieNaMapieEvent, MapaService, TYPY_ZDARZEN_MYSZY } from '../../../serwisy/mapa.service';
import { ObiektyMapyService } from '../../../serwisy/obiekty-mapy.service';
import {Map as OMap} from '../../../../oracle-maps/types/map';
import { Filter } from 'src/app/modul-mapowy/oracle-maps/types/filter';
import { Layer } from 'src/app/modul-mapowy/oracle-maps/types/layer';
import { InterfejsUzytkownikaActions } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.actions';
import { FunkcjeDodatkoweWarstwy, FUNKCJE_DODATKOWE_KONFIGURACJA } from '../../../modele/szczegoly-warstwy';
import { WarstwaUtils } from '../../../utils/warstwa-utils';
import { ResponsywnoscUtils } from 'src/app/modul-mapowy/mm-core/responsywnosc/utils/responsywnosc-utils';
import { Geometry } from 'src/app/modul-mapowy/oracle-maps/types/geometry';
import { StyleZaznaczaniaObiektowUtils } from '../../../utils/style-zaznaczania-obiektow-utils';
import { OknoInformacyjneUtils } from '../../../utils/okno-informacyjne-utils';

declare var OM: OM;

export interface InformajceOKliknietejPozycji {
  pozycjaGeograficzna: Point;
  pozycjaNaEkranie: Punkt;
  warstwy: InformajeOWarstwie[];
  zadokowane: boolean;
}

export interface RozmiaryOknaMapy {
  szerokosc: number;
  wysokosc: number;
}

export interface InformajeOWarstwie {
  warstwa: Warstwa;
  uuidWarstwy: string;
  obiekty: InformacjeOObiekcie[];
  aktualnyObiekt: number;
}

interface Sekcja {
  widoczna: boolean;
  wysokosc: number;
}

export interface SekcjeOkna {
  opis: Sekcja;
  galeria: Sekcja;
  zalaczniki: Sekcja;
  infoOPozycji: Sekcja;
  nawigacja: Sekcja;
  padding: Sekcja;
}

const WARSTWA_INFORMACJI_O_OBIEKCIE = 'warstwa-informacji-o-obiekcie';


@Component({
  selector: 'mm-informacje-o-obiekcie',
  templateUrl: './informacje-o-obiekcie.component.html',
  styleUrls: ['./informacje-o-obiekcie.component.scss']
})



export class InformacjeOObiekcieComponent implements OnInit, OnDestroy {

  @ViewChild('dlugaNazwa') dlugaNazwa: DlugieNazwyComponent | undefined;

  polozenieOknaOdLewej = 62;
  polozenieOknaOdGory = 50;

  wybranaWarstwaDoWyswietlenia?: InformajeOWarstwie;
  numerAktualnejWarstwy = 0;

  liczbaObiektow = 0;
  numerAktualnegoObiektu = 0;

  aktualnyJezyk = 'pl';
  subskrypcje$ = new Subscription();

  sekcjeOkna?: SekcjeOkna;

  rozmiaryOknaMapy?: RozmiaryOknaMapy;

  informacjeOKliknietejPozycji?: InformajceOKliknietejPozycji;

  interfejsUzytkownika$: Observable<InterfejsUzytkownikaStan>;
  // narzedzia$: Observable<NarzedziaState>;

  interfejsUzytkownikaUkryty = false;

  warstwaObiektow?: MarkerLayer;
  markerObiektu?: Feature;

  widokGotowy = false;
  warstwy?: Map<string, Warstwa>;

  @Input() mapView?: OMap;
  @Input() mapa?: Mapa;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.aktualizujRozmiarOknaMapy();
  }

  /**
   * Konstruktor
   * @param mapaService
   * @param wysokoscSerwis
   * @param komunikaty
   */
  constructor(private tlumaczenia: TlumaczeniaService,
              private mapaSerwis: MapaService,
              private aktualizacjaKomponentuService: AktualizacjaKomponentuService,
              private obiektyMapyService: ObiektyMapyService,
              private store: Store<{ modulMapowy: any }>,
              private eRef: ElementRef,
              // private ukrywanieInterfejsuUzytkownikaService: UkrywanieInterfejsuUzytkownikaService
            ) {
    this.interfejsUzytkownika$ = store.select('modulMapowy', 'interfejsUzytkownika');
    // this.narzedzia$ = store.select('modulMapowy', 'narzedzia');
  }
/**
   * Cykl życia komponentu inicjalizacja
   */
ngOnInit(): void {
  this.aktualizujRozmiarOknaMapy();
  this.subskrypcje$.add(this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
    this.aktualnyJezyk = jezyk;
  }));
  this.subskrybujZdarzeniaMyszyNaMapie();
  // this.subskrybujUkrywanieInterfejsu();
  this.subskrybujZdarzeniaWyszukiwania();
  this.aktualizujWarstwy();
  this.subskrybujCzyszczenieWyszukiwania();
}

/**
 * Cykl życia komponentu niszczenie
 */
ngOnDestroy(): void {
  this.subskrypcje$.unsubscribe();
  this.wyczyscInformacjeOKliknietejPozycji(false);
  this.wyczyscInformacjeOKliknietejPozycji(true);
}

/**
 * Funkcja subskrybuje flagę ukrywania interfejsu
 */
// subskrybujUkrywanieInterfejsu(): void {
//   this.subskrypcje$.add(this.ukrywanieInterfejsuUzytkownikaService.pobierzCzyUkrycInterferjs()
//     .subscribe(czyUkryc => {
//       if (czyUkryc) {
//         this.store.dispatch(InterfejsUzytkownikaActions.ukryjWszystko());
//         this.interfejsUzytkownikaUkryty = true;
//         return;
//       }
//       this.store.dispatch(InterfejsUzytkownikaActions.pokazWszystko());
//       this.interfejsUzytkownikaUkryty = false;
//     }));
// }

/**
 * Funkja subskrybuje zdarzenia wyszukiwarki
 */
subskrybujZdarzeniaWyszukiwania(): void {
  this.subskrypcje$.add(this.obiektyMapyService.pobierzSubjectInformacjiOObiekcie().subscribe(event => {
    this.wyczyscInformacjeOKliknietejPozycji(true);
  }));
  this.subskrypcje$.add(this.obiektyMapyService.pobierzSubjectInformacjiOLokalizacji().subscribe(event => {
    this.wyczyscInformacjeOKliknietejPozycji(true);
  }));
  this.subskrypcje$.add(this.obiektyMapyService.pobierzSubjectDodawaniaObiektu().subscribe(event => {
    this.wyczyscInformacjeOKliknietejPozycji(true);
  }));
}

/**
 * Funkcja zamyka okno informacji o obiekcie
 */
zamknij(): void {
  this.widokGotowy = false;
  this.wybranaWarstwaDoWyswietlenia = undefined;
  this.sekcjeOkna = undefined;
  this.wyczyscInformacjeOKliknietejPozycji(true);
}

/**
 * Funkcja szuka obiektów do wyświetlenia
 * @param event
 */
pokazInformacjeOObiektach(event: KlikniecieNaMapieEvent) {
  let informacjeOWarstwach: InformajeOWarstwie[] = [];
  this.przygotujWarstwyTymczasowe();
  this.mapView?.getFeatureLayers().forEach(layer => {
    const warstwa = this.warstwy?.get(layer.getName());
    const wartswaDoWyswietlenia = this.utworzInformacjeOWarstwie(warstwa, layer, event.pozycjaGeograficzna);
    if (wartswaDoWyswietlenia) {
      informacjeOWarstwach.push(wartswaDoWyswietlenia);
    }
  });
  if (informacjeOWarstwach.length > 0) {
    // informacjeOWarstwach.sort(ObiektyMapyUtils.komparatorWarstw);
    this.informacjeOKliknietejPozycji = {
      pozycjaGeograficzna: event.pozycjaGeograficzna,
      pozycjaNaEkranie: event.pozycjaNaEkranie, warstwy: informacjeOWarstwach,
      zadokowane: event.typEventu !== TYPY_ZDARZEN_MYSZY.ZAWISNIECIE_MYSZY ? true : false
    };
    this.zanzaczWybranyObiekt(this.informacjeOKliknietejPozycji?.warstwy[0]?.obiekty[0]?.geometria);
    this.wymusAktualizacjeKomponentu();
  }  else {
    this.wyczyscInformacjeOKliknietejPozycji(event.typEventu !== TYPY_ZDARZEN_MYSZY.ZAWISNIECIE_MYSZY);
  }
  this.inicjujWidok();
}


/**
 * Funkcja wyświetla kolejny znaleziony obiekt
 */
nastepnyObiekt(): void {
  if (!this.informacjeOKliknietejPozycji) {
    return;
  }
  const aktualnyObiekt = this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].aktualnyObiekt;
  const liczbaObiektowWAktualnejWarstwie = this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].obiekty.length;
  if (aktualnyObiekt < liczbaObiektowWAktualnejWarstwie - 1) {
    this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].aktualnyObiekt++;
  } else {
    if (this.numerAktualnejWarstwy < this.informacjeOKliknietejPozycji.warstwy.length - 1) {
      this.numerAktualnejWarstwy++;
      this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].aktualnyObiekt = 0;
    } else {
      this.numerAktualnejWarstwy = 0;
      this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].aktualnyObiekt = 0;
    }
  }
  this.aktualizujLicznikObiektow();
  this.ustawParametryOkna();
  this.zmianaPolozeniaPinezki();
  this.dlugaNazwa!.aktualizuj;
}

/**
 * Funkcja wyświetla poprzedni znaleziony obiekt
 */
poprzedniObiekt(): void {
  if (!this.informacjeOKliknietejPozycji) {
    return;
  }
  const aktualnyObiekt = this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].aktualnyObiekt;
  if (aktualnyObiekt > 0) {
    this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].aktualnyObiekt--;
  } else {
    if (this.numerAktualnejWarstwy > 0) {
      this.numerAktualnejWarstwy--;
      this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].aktualnyObiekt =
        this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].obiekty.length - 1;
    } else {
      this.numerAktualnejWarstwy = this.informacjeOKliknietejPozycji.warstwy.length - 1;
      this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].aktualnyObiekt =
        this.informacjeOKliknietejPozycji.warstwy[this.numerAktualnejWarstwy].obiekty.length - 1;
    }
  }
  this.aktualizujLicznikObiektow();
  this.ustawParametryOkna();
  this.zmianaPolozeniaPinezki();
  this.dlugaNazwa!.aktualizuj;
}

/**
 * Funkcja
 */
private ustawParametryOkna() {
  this.sekcjeOkna = {
    opis: {widoczna: true, wysokosc: 220},
    galeria: {
      widoczna: Boolean(this.wybranaWarstwaDoWyswietlenia?.warstwa?.szczegolyWarstwy?.multimedia),
      wysokosc: 360
    },
    zalaczniki: {
      widoczna: Boolean(this.wybranaWarstwaDoWyswietlenia?.warstwa?.szczegolyWarstwy?.zalaczniki),
      wysokosc: 360
    },
    infoOPozycji: {
      widoczna: Boolean(this.wybranaWarstwaDoWyswietlenia?.obiekty[this.wybranaWarstwaDoWyswietlenia?.aktualnyObiekt].typ === 'Point'),
      wysokosc: 120
    },
    nawigacja: {widoczna: this.liczbaObiektow > 1, wysokosc: 40},
    padding: {widoczna: true, wysokosc: 60}
  };
}

/**
 * Funkcja ustawia parametry starowe okna
 */
private inicjujWidok(): void {
  this.numerAktualnejWarstwy = 0;
  this.aktualizujLicznikObiektow();
  this.ustawParametryOkna();
  this.ustawPozycjeOknaInformacji();
  this.zmianaPolozeniaPinezki();
  this.widokGotowy = true;
  this.wymusAktualizacjeKomponentu();
}

/**
 * Funkcja sprawdza czy onko informacji ma być wyświetlane dla obiektów z warstwy
 * @param warstwa
 */
czyBlokowanieInformacjiOObiekcie(warstwa: Warstwa): boolean {
  if (!warstwa || !warstwa.szczegolyWarstwy?.informacjeOObiekcie) {
    return false;
  }
  const funkcjeBlokujaceInformacjeOObiekcie = warstwa.szczegolyWarstwy?.funkcjeDodatkowe
    ?.filter((f: FunkcjeDodatkoweWarstwy) => FUNKCJE_DODATKOWE_KONFIGURACJA.get(f.identyfikator)?.blokujInformacjeOObiekcie);
  return !!(funkcjeBlokujaceInformacjeOObiekcie?.length && funkcjeBlokujaceInformacjeOObiekcie.length > 0);
}

/**
 * Funkcja czyści informacje o pozycji
 */
wyczyscInformacjeOKliknietejPozycji(zadokowane: boolean) {
  if (!this.informacjeOKliknietejPozycji) {
    return;
  }
  if (this.informacjeOKliknietejPozycji?.zadokowane === zadokowane) {
    this.informacjeOKliknietejPozycji = undefined;
    this.usunPinezkeZMapy();
    this.wymusAktualizacjeKomponentu();
  }
}

/**
 * Funkcja pobiera warstwy po aktualizacji
 */
private aktualizujWarstwy() {
  this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectAktualizacjiWarstwy().subscribe((mapa) => {
    if (mapa) {
      this.warstwy = WarstwaUtils.splaszczWarstwy(mapa?.warstwy);
    }
  }));
}

/**
 * Funkcja subskrybuje czyszczenie wyników wyszukiwania z głównej wyszukiwarki,
 * dodatkowo usuwa warstwy tymczasowe z mapy
 */
private subskrybujCzyszczenieWyszukiwania() {
  this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectCzyszczeniaWyszukiwania()
    .subscribe(() => {
      this.obiektyMapyService.resetujStan()
    }));
}

/**
 * Funkcja subskrybuje zdarzenia myszy na mapie
 */
private subskrybujZdarzeniaMyszyNaMapie() {
  this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectZdarzenMyszyNaMapie().subscribe(zdarzenie => {
    if (zdarzenie.typEventu === TYPY_ZDARZEN_MYSZY.LEWY_KLIK || zdarzenie.typEventu === TYPY_ZDARZEN_MYSZY.TAPNIECIE) {
      this.pokazInformacjeOObiektach(zdarzenie);
      this.ukryjInterfejsUzytkownika(zdarzenie);
    }
    if (zdarzenie.typEventu === TYPY_ZDARZEN_MYSZY.ZAWISNIECIE_MYSZY && !this.informacjeOKliknietejPozycji?.zadokowane) {
      this.pokazInformacjeOObiektach(zdarzenie);
    }
    if (zdarzenie.typEventu === TYPY_ZDARZEN_MYSZY.PRAWY_KLIK) {
      this.zamknij();
    }
    if (zdarzenie.typEventu === TYPY_ZDARZEN_MYSZY.RUCH_MYSZY) {
      this.wyczyscInformacjeOKliknietejPozycji(false);
    }
  }));
}

/**
 * Funkcja rozgłasza zmiane widocznego obiektu
 */
private zmianaPolozeniaPinezki() {
  if (this.wybranaWarstwaDoWyswietlenia) {
    this.zanzaczWybranyObiekt(this.wybranaWarstwaDoWyswietlenia.obiekty[this.wybranaWarstwaDoWyswietlenia.aktualnyObiekt].geometria);
  }
}

/**
 * Funkcja aktualizuje licznik obiektów
 */
private aktualizujLicznikObiektow(): void {
  this.wybranaWarstwaDoWyswietlenia = this.informacjeOKliknietejPozycji?.warstwy[this.numerAktualnejWarstwy];
  let liczbaObiektow = 0;
  let numerAktualnegoObiektu = 0;
  this.informacjeOKliknietejPozycji?.warstwy.forEach((w, index) => {
    liczbaObiektow += w.obiekty.length;
    if (this.numerAktualnejWarstwy > index) {
      numerAktualnegoObiektu += w.obiekty.length;
    } else if (this.numerAktualnejWarstwy === index) {
      numerAktualnegoObiektu += w.aktualnyObiekt + 1;
    }
  });
  this.liczbaObiektow = liczbaObiektow;
  this.numerAktualnegoObiektu = numerAktualnegoObiektu;
}

/**
 * Funkcja ustawia polozenie okna informacji
 */
private ustawPozycjeOknaInformacji(): void {
  if (!this.informacjeOKliknietejPozycji) {
    return;
  }
  if (!ResponsywnoscUtils.czyTrybDesktop() || !this.eRef) {
    this.polozenieOknaOdLewej = 62;
    this.polozenieOknaOdGory = 50;
    return;
  }
  this.polozenieOknaOdLewej = this.obliczPozycjeOknaX(this.informacjeOKliknietejPozycji.pozycjaNaEkranie.x);
  this.polozenieOknaOdGory = this.obliczPozycjeOknaY(this.informacjeOKliknietejPozycji.pozycjaNaEkranie.y);
}

/**
 * Funkcja oblicza pozycje x okna informacji o obiekcie
 * @param punktX
 */
private obliczPozycjeOknaX(punktX: number): number {
  const szerokoscOkna = this.eRef.nativeElement.firstChild.clientWidth;
  const szerokoscMapa = this.rozmiaryOknaMapy?.szerokosc ? this.rozmiaryOknaMapy?.szerokosc : 0;
  return OknoInformacyjneUtils.obliczPozycjeOknaX(punktX, szerokoscOkna, szerokoscMapa);
}

/**
 * Funkcja oblicza pozycje y okna informacji o obiekcie
 * @param punktY
 */
private obliczPozycjeOknaY(punktY: number): number {
  const wysokoscOkna = 500;
  const wysokoscMapa = this.rozmiaryOknaMapy?.wysokosc ? this.rozmiaryOknaMapy?.wysokosc : 0;
  return OknoInformacyjneUtils.obliczPozycjeOknaY(punktY, wysokoscOkna, wysokoscMapa);
}

/**
 * Funkcja dodaje warstwy tymczasowe jeżeli istnieją do listy dostępnych warstw
 */
private przygotujWarstwyTymczasowe() {
  if (!this.mapa || !this.warstwy) {
    return;
  }
  if (this.mapa.warstwaTymczasowaWyszukiwania) {
    // this.warstwy.set(NAZWA_WARSTWY_TYMCZASOWEJ, this.mapa.warstwaTymczasowaWyszukiwania);
  } else {
    // this.warstwy.delete(NAZWA_WARSTWY_TYMCZASOWEJ);
  }
}

/**
 * Funkcja tworzy informacje o warstwie
 * @param warstwa
 * @param layer
 * @param pozycjaGeograficzna
 */
private utworzInformacjeOWarstwie(warstwa?: Warstwa, layer?: Layer, pozycjaGeograficzna?: Point): InformajeOWarstwie | undefined {
  if (!warstwa || !layer || !pozycjaGeograficzna || !this.czyWarstwaSpelniaKryteria(warstwa) || this.czyBlokowanieInformacjiOObiekcie(warstwa)) {
    return undefined;
  }
  const wartswaDoWyswietlenia: InformajeOWarstwie = {
    warstwa: warstwa, uuidWarstwy: warstwa?.uuid,
    aktualnyObiekt: 0, obiekty: []
  };
  this.znajdzObiektyNaWarstwie(layer, pozycjaGeograficzna).forEach(o => {
    wartswaDoWyswietlenia.obiekty.push(ObiektyMapyUtils.utworzInformacjeOObiekcie(o));
  });
  if (wartswaDoWyswietlenia.obiekty.length === 0) {
    return undefined;
  }
  wartswaDoWyswietlenia.obiekty.sort(ObiektyMapyUtils.komparatorObiektow);
  return wartswaDoWyswietlenia;
}

/**
 * Filtruj obiekty na warstwie
 * @param layer
 * @param pozycjaGeograficzna
 */
private znajdzObiektyNaWarstwie(layer: Layer, pozycjaGeograficzna: Point): Feature[] {
  try {
    const filtrPunktu = this.utworzFiltrWarstw(pozycjaGeograficzna);
    return layer.applyFilter(filtrPunktu, false).getAllFeatures();
  } catch (e) {
    console.error('błąd filtrowania warstwy: ', layer.getName(), e);
    return [];
  }
}

/**
 * Funkcja tworzy filtr wyszukiwania obiektów na warstwach
 * @param pozycjaMyszki
 */
private utworzFiltrWarstw(pozycjaMyszki: Point): Filter {
  const promienWyszukiwania = this.wyliczPromienPobieraniaObiektowDlaSkali();
  const okragWyszukiwania = new OM.geometry.Circle(pozycjaMyszki.getX(), pozycjaMyszki.getY(), promienWyszukiwania, pozycjaMyszki.getSRID());
  return ObiektyMapyUtils.utworzFiltrWyszukiwaniaObiektow(okragWyszukiwania);
}

/**
 * Funkcja wylicza proporcjonalna do skali srednice wybierania obiektow
 */
private wyliczPromienPobieraniaObiektowDlaSkali(): number {
  if (!this.mapView) {
    return 100;
  }
  return TABLICA_ZASIEGOW_DLA_ZOOM[this.mapView.getMapZoomLevel()];
}

/**
 * Funkcja dodaje pinezkę w miejscu kliknięcia
 * @param punkt
 */
private zanzaczWybranyObiekt(geometry?: Geometry): void {
  if (!geometry) {
    return;
  }
  this.dodajWarstweObiektu();
  this.warstwaObiektow?.removeAllFeatures();
  if (geometry.getType() === 'Point') {
    const punkt = geometry as Point;
    this.markerObiektu = new OM.MapMarker({
      id: 'marker-obiektu',
      renderingStyle: new OM.style.Marker({
        src: 'assets/ikony/moja_lokalizacja.svg',
        width: 42,
        height: 52,
        yOffset: -26,
        styleName: ''
      }),
      position: {x: punkt.getX(), y: punkt.getY(), srid: punkt.getSRID()}
    });
  } else {
    this.markerObiektu = new OM.Feature('poligon-obiektu', geometry, {
      renderingStyle: StyleZaznaczaniaObiektowUtils.pobierzStylZaznaczaniaObiektu(geometry.getType())
    });
  }
  this.warstwaObiektow?.addFeature(this.markerObiektu);
  this.warstwaObiektow?.bringToTop();
}

/**
 * Funkcja wymusza aktualizacje komponentu
 */
private wymusAktualizacjeKomponentu() {
  this.aktualizacjaKomponentuService.wymusAktualizacjeKomponentu(this.eRef);
}

/**
 * Funkcja sprawdza czy podana warstwa spełnia kryteria do wybierania obiektów
 * @param warstwa
 * @param zoom
 */
private czyWarstwaSpelniaKryteria(warstwa?: Warstwa): boolean {
  const zoom = this.mapView?.getMapZoomLevel() ? this.mapView?.getMapZoomLevel() : 0;
  return ObiektyMapyUtils.czyWarstwaSpelniaKryteriaWyszukiwania(warstwa, zoom);
}

/**
 * Funkcja dodaje warstwę dla pinezki
 */
private dodajWarstweObiektu(): void {
  this.warstwaObiektow = ObiektyMapyUtils.dodajWarstweDlaObiektow(this.mapView!, WARSTWA_INFORMACJI_O_OBIEKCIE);
}

/**
 * Funkcja usuwa aznaczenie kliknięcia
 */
private usunPinezkeZMapy(): void {
  if (this.warstwaObiektow) {
    this.mapView?.removeLayer(this.warstwaObiektow);
    this.warstwaObiektow = undefined;
    this.markerObiektu = undefined;
  }
}

/**
 * Funkcja aktualizuje informacje o rozmiarze okna mapy
 */
private aktualizujRozmiarOknaMapy(): void {
  if (this.mapView && (this.mapView as any).$oracleMapDiv) {
    this.rozmiaryOknaMapy = {
      wysokosc: (this.mapView as any).$oracleMapDiv[0].clientHeight,
      szerokosc: (this.mapView as any).$oracleMapDiv[0].clientWidth
    };
  }
}

/**
 * Funckaj ukrywa elementy interfejsu uzytkownia
 * @param event
 */
private ukryjInterfejsUzytkownika(event: KlikniecieNaMapieEvent) {
  if (this.informacjeOKliknietejPozycji !== undefined || event.typEventu !== TYPY_ZDARZEN_MYSZY.TAPNIECIE) {
    // this.ukrywanieInterfejsuUzytkownikaService.anulujUkrycieInterfejsu();
    return;
  }
  if (this.interfejsUzytkownikaUkryty) {
    // this.ukrywanieInterfejsuUzytkownikaService.anulujUkrycieInterfejsu();
    return;
  }
  // this.ukrywanieInterfejsuUzytkownikaService.ukryjInterfejs();
}


}
