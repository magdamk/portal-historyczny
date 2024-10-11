import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GrupaWarstwPodkladowych } from '../../../modele/grupa-warstw-podkladowych';
import { Mapa } from '../../../modele/mapa';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { MapaService } from '../../../serwisy/mapa.service';
import {Map} from '../../../../oracle-maps/types/map';

@Component({
  selector: 'mm-widok-mapy-narzedzia-sekcja',
  templateUrl: './widok-mapy-narzedzia-sekcja.component.html',
  styleUrls: ['./widok-mapy-narzedzia-sekcja.component.scss']
})
export class WidokMapyNarzedziaSekcjaComponent implements OnInit, OnDestroy {

  // NARZEDZIA_IDENTYFIKATORY = NARZEDZIA_WYKONAWCZE_ID;

  wspoldzielone = false;
  rozwiniety = true;
  // narzedzia$: Observable<NarzedziaState>;
  // interfejsUzytkownika$: Observable<InterfejsUzytkownikaStan>;

  subskryocje$ = new Subscription();

  // widokAdministratora: boolean;

  rerenderuj = 0;

  mapView?: Map;

  @Input()
  mapa?: Mapa;

  @Input()
  grupyWarstwPodkladowych: GrupaWarstwPodkladowych[] = [];
@Output() mapViewInitiallised = new EventEmitter<Map>();
  /**
   * Konstruktor
   * @param narzedziaSerwis
   * @param changeDetector
   */
  constructor(
    // private store: Store<{ modulMapowy: any }>,
              private mapaService: MapaService,
              private konfiguracja: KonfiguracjaModulMapowyAdapter) {
    // this.widokAdministratora = this.konfiguracja.widokAdministratora();
    // this.narzedzia$ = store.select('modulMapowy', 'narzedzia');
    // this.interfejsUzytkownika$ = store.select('modulMapowy', 'interfejsUzytkownika');
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    // this.subskryocje$.add(this.narzedzia$.subscribe(stan => {
    //   this.zarzadzajInstancjaMapa(stan);
    //   this.wspoldzielone = stan.narzedziaSterujace[0].id === NARZEDZIA_STERUJACE_ID.NIERUCHOMOSCI;
    // }));
    this.subskryocje$.add(this.mapaService.pobierzSubjectRerenderowaniaMapyGlownej().subscribe(() => {
      this.mapView = undefined;
      this.rerenderuj++;
    }))
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subskryocje$.unsubscribe();
  }

  /**
   * Funkcja zwija lub rozwija pasek narzędzi
   */
  zmienStanPaskaDolnego(): void {
    this.rozwiniety = !this.rozwiniety;
  }

  /**
   * Funkcja czeka na zainicjowanie mapy
   * @param mapa
   */
  inicjalizacjaMapy(mapa: Map) {
    this.mapView = mapa;
    this.mapViewInitiallised.emit(this.mapView!);
  }

  /**
   * Funkcja zwraca parametr sledzenia tablicy
   * @param index
   * @param item
   */
  // trackByFn(index: number, item: NarzedziaWykonawcze) {
  //   return item.id;
  // }

  /**
   * Funkcja cysci instancje mapy przy zmianie narzedzia
   * @param stan
   */
  // zarzadzajInstancjaMapa(stan: NarzedziaState) {
  //   if (stan.narzedziaSterujace[0].id === NARZEDZIA_STERUJACE_ID.POROWNAJ_MAPY ||
  //     stan.narzedziaSterujace[0].id === NARZEDZIA_STERUJACE_ID.PASEK_CZASU) {
  //     this.mapView = undefined;
  //   }
  // }
}
