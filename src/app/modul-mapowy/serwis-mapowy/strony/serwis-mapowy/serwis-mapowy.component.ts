import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PRZYCISK_IKONA_TYP } from 'src/app/modul-mapowy/commons/komponenty/przycisk-ikona/przycisk-ikona.component';
import { Router, RouterLink } from '@angular/router';
import { Mapa } from '../../modele/mapa';
import { ParametryStartoweMapy } from '../../modele/parametry-startowe-mapy';
import { GrupaWarstwPodkladowych } from '../../modele/grupa-warstw-podkladowych';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GrupyWarstwPodkladowychModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/grupy-warstw-podkladowych-adapter';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { MapaService } from '../../serwisy/mapa.service';
import { ObiektyMapyService } from '../../serwisy/obiekty-mapy.service';
import { KonwerterGeometriUtils } from '../../utils/konwerter-geometri-utils';
import { WarstwaUtils } from '../../utils/warstwa-utils';
import { InterfejsUzytkownikaInitialState, InterfejsUzytkownikaStan, WYSZUKIWARKI } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.reducer';
import { InterfejsUzytkownikaActions } from 'src/app/modul-mapowy/stan/interfejs-uzytkownika/interfejs-uzytkownika.actions';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';
import { WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
// import { OBSZARY_STERUJACE_ID } from 'src/app/modul-mapowy/stan/obszary/obszary.const';
// import { ObszaryActions } from 'src/app/modul-mapowy/stan/obszary/obszary.actions';

@Component({
  selector: 'mm-serwis-mapowy',
  templateUrl: './serwis-mapowy.component.html',
  styleUrls: ['./serwis-mapowy.component.scss']
})
export class SerwisMapowyComponent implements OnInit {
  // OBSZARY_IDENTYFIKATORY = OBSZARY_STERUJACE_ID;
  WIDOKI_IDENTYFIKATORY = WIDOKI_ID;
  interfejsUzytkownika$: Observable<InterfejsUzytkownikaStan>;
  interfejsUzytkownikaStan: InterfejsUzytkownikaStan;

  PRZYCISK_IKONA_TYP = PRZYCISK_IKONA_TYP;
  @Input() uuidMapy?: string;
  @Input() mapa?: Mapa;
  @Input() parametryStartoweMapy?: ParametryStartoweMapy;
  @Output() zmianaZoomISrodek = new EventEmitter();

  @Output() zmianaWarstw = new EventEmitter();

  @Output() mapaZaladowana = new EventEmitter();

  @Output() zapisMapyPrywatnej = new EventEmitter();


  mapy: Mapa[] = [];
  grupyWarstwPodkladowych: GrupaWarstwPodkladowych[] = [];
  subskrypcje$ = new Subscription();

  /**
  * Konstruktor
  */
  constructor(private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private grupyPodkladowAdapter: GrupyWarstwPodkladowychModulMapowyAdapter,
    private router: Router,
    private mapaSerwis: MapaService,
    // private legendaSerwis: LegendaService,
    private tlumaczenia: TlumaczeniaService,
    private obiektyMapySerwis: ObiektyMapyService,
    private store: Store<{ modulMapowy: any }>) {
    this.interfejsUzytkownika$ = store.select('modulMapowy', 'interfejsUzytkownika');
    this.interfejsUzytkownikaStan = InterfejsUzytkownikaInitialState;
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.zaladujWarstwyPodkladowe();
    this.aktualizacjaZoomISrodek();
    this.aktualizujWarstwy();
    this.aktualizacjaMapy();
    this.aktualizujStanInterfejsuUzytkownika();
    // this.obslugaWyboruMapyDoPorownania();
    // this.tlumaczenia.spawdzPoprawnoscJezyka();
  }


  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subskrypcje$.unsubscribe();
    this.obiektyMapySerwis.resetujStan();
    this.mapaSerwis.resetujStan();
    this.store.dispatch(LewyPanelWidokActions.reset());
    // this.store.dispatch(WyszukiwarkaActions.reset());
    // this.store.dispatch(WyszukiwarkaZaawansowanaActions.reset());
    this.store.dispatch(InterfejsUzytkownikaActions.reset());
  }


  /**
   * Funkcja ładuje grupy warstw podkładowych z serwera
   */
  private zaladujWarstwyPodkladowe(): void {
    this.grupyPodkladowAdapter.pobierzGrupyWarstwPodkladowych().subscribe(podklady => {
      this.grupyWarstwPodkladowych = podklady;
    });
  }

  /**
 * Funkcja aktywuje obserwowanie zmian srodka o zoom mapy
 */
  private aktualizacjaZoomISrodek(): void {
    this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectAktualizacjiZoomISrodek().subscribe(zoomISrodek => {
      if (zoomISrodek?.srodek && zoomISrodek?.zoom) {
        this.zmianaZoomISrodek.emit({
          x: zoomISrodek.srodek.getX(),
          y: zoomISrodek.srodek.getY(),
          zoom: zoomISrodek.zoom
        });
      }
    }));
  }
  /**
   * Funkcja aktywuje obserwowanie zmian warstw mapy
   */
  private aktualizujWarstwy(): void {
    this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectAktualizacjiWarstwy().subscribe(mapa => {
      this.zmianaWarstw.emit();
    }));
    this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectUsuwaniaWarstwy().subscribe(mapa => {
      this.zmianaWarstw.emit();
    }));
  }

  /**
   * Funkcja informuje o zaladowaniu mapy
   */
  private aktualizacjaMapy(): void {
    this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectMapaZaladowane().subscribe(zaladowana => {
      if (zaladowana) {
        if (this.mapa) {
          this.mapaSerwis.ustawMapeGlowna(this.mapa);
          this.mapaSerwis.ustawHashMapy(JSON.stringify(this.mapa));
        }
        this.zaladujWyszukiwanyObiekt();
        this.zaladujWyszukiwanaWarstwe();
        this.mapaZaladowana.emit();
      }
    }));
    this.subskrypcje$.add(this.mapaSerwis.pobierzSubjectZapisaniaMapyPrywatnej().subscribe(mapa => {
      if (!mapa) {
        return;
      }
      this.zapisMapyPrywatnej.emit();
    }))
  }

  /**
   * Funkcja łafuje wysukany obiekt
   */
  zaladujWyszukiwanyObiekt() {
    if (this.parametryStartoweMapy?.uuidWarstwy &&
      this.parametryStartoweMapy?.idObiektu &&
      this.parametryStartoweMapy?.srodekX && this.parametryStartoweMapy?.srodekY) {
      this.obiektyMapySerwis.przekazObiektDoDodania({
        id: this.parametryStartoweMapy.idObiektu,
        uuidWarstwy: this.parametryStartoweMapy.uuidWarstwy,
        typGeometrii: this.parametryStartoweMapy.typGeometrii,
        wspolrzedne: this.parametryStartoweMapy.wspolrzedne,
        lokalizacja: this.konwertujLokalizacje(this.parametryStartoweMapy.srodekX, this.parametryStartoweMapy.srodekY)
      });
    }
  }

  /**
   * Funkcja przygotowuje dane  lokalizacji w wymaganym formacie
   * @param x
   * @param y
   */
  private konwertujLokalizacje(x: number, y: number): string {
    const lokalizacja = KonwerterGeometriUtils.EPSG2178toEPSG4326(Math.floor(x), Math.floor(y));
    return `${lokalizacja?.x},${lokalizacja?.y}`;
  }
  /**
   * Funkcja wlacza wyszukana warstwe
   */
  zaladujWyszukiwanaWarstwe() {
    if (this.parametryStartoweMapy?.uuidWarstwy && !this.parametryStartoweMapy?.idObiektu) {
      const warstwy = WarstwaUtils.splaszczWarstwyPoUuid(this.mapa?.warstwy);
      // this.legendaSerwis.zanzaczWarstwe({
      //   uuidMapy: this.mapa?.uuid,
      //   warstwa: warstwy.get(this.parametryStartoweMapy.uuidWarstwy)!
      // });
    }
  }


  /**
    * Funkcja aktualizuje lokalny stan interfejsu uzytkownika
    */
  private aktualizujStanInterfejsuUzytkownika() {
    this.interfejsUzytkownika$.subscribe(stan => {
      this.interfejsUzytkownikaStan = {
        ...stan,
        belkaGorna: { ...stan.belkaGorna, ukryta: stan.belkaGorna.ukryta },
        wyszukiwarka: { ...stan.wyszukiwarka, ukryta: stan.wyszukiwarka.ukryta }
      };
    });
  }


  /**
   * Funkcja zmienia stan legendy zwija/rozwija
   */
  zmienStanPaskaBocznego(): void {
    console.log('zmienStanPaskaBocznego');
    this.store.dispatch(InterfejsUzytkownikaActions.odwrocRozwiniecieLewaBelka());
  }

  /**
   * Funkcja rozsuwa pasek boczny
   */
  pokazPasekBoczny(): void {
    console.log('pokazPasekBoczny');
    this.store.dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
  }

  /**
   * Funkcja aktywująca okienko domyślnej wyszukiwarki lub chowająca wyszukiwarkę
   */
  aktywujWyszukiwarkeDomyslna() {
    this.store.dispatch(InterfejsUzytkownikaActions.rozwinWyszukiwarke({ aktywna: WYSZUKIWARKI.DOMYSLNA }));
  }

  /**
   * Funkcja ukrywająca wyszukiwarkę
   */
  schowajWyszukiwarke() {
    this.store.dispatch(InterfejsUzytkownikaActions.zwinWyszukiwarke());
  }

}
