import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Mapa } from '../../../modele/mapa';
import { Map } from '../../../../oracle-maps/types/map';
import { OM } from '../../../../oracle-maps/types/om';
import { ScaleBar } from 'src/app/modul-mapowy/oracle-maps/types/scale-bar';
import { Subscription } from 'rxjs';
import { MapaService } from '../../../serwisy/mapa.service';
import { AktualizacjaKomponentuService } from 'src/app/modul-mapowy/commons/serwisy/aktualizacja-komponentu.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { GrupaWarstwPodkladowych } from '../../../modele/grupa-warstw-podkladowych';
declare var OM: OM;
@Component({
  selector: 'mm-widok-mapy',
  templateUrl: './widok-mapy.component.html',
  styleUrls: ['./widok-mapy.component.scss']
})



export class WidokMapyComponent implements OnInit, OnDestroy {
  // @Input()
  grupyWarstwPodkladowych: GrupaWarstwPodkladowych[] = [];

  // @Input()
  mapa?: Mapa;

  // @Input()
  synchronizujZoomISrodek = true;

  // @Input()
  lokalizacjaMapPodkladowych: 'LEWA' | 'PRAWA' = 'LEWA';

  // @Input()
  zmianaMapPodkladowychWidocna = true;

  // @Input()
  sterowanieMapyWidoczne = true;

  // @Input()
  generowanieZdarzenMyszy = true;

  // @Input()
  licencjaWidoczna = false;

  @Output()
  inicjalizacjaMapy = new EventEmitter<Map>();



  mapView?: Map;
  mapaZainicjowana = false;
  scaleBar?: ScaleBar;
  bibliotekaOracleZaladoana = false;
  subskryocje$ = new Subscription();

  /**
     * Konstruktor
     * @param mapaService - serwis mapowy
     */
  constructor(private mapaService: MapaService,
    private eRef: ElementRef,
    private aktualizacjaKomponentuService: AktualizacjaKomponentuService,
    private konfiguracja: KonfiguracjaModulMapowyAdapter) {
    // this.widokAdministratora = konfiguracja.widokAdministratora();
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    console.log('widok mapy on init:', this.mapaService.mapaZaladowane);
    // this.konfigurujSynchronizacjeMap();
    // this.subskryocje$.add(this.mapaService.pobierzSubjectAktualizacjiWarstwy().subscribe(mapa => {
    //   if (mapa && this.mapa && mapa.uuid === this.mapa.uuid) {
    //     this.mapa = mapa;
    //     this.aktualizujWarstwyWWidokuMapy(this.mapa);
    //     //TODO Po aktualizacja komponentu mapy rerenderowanie mapy przy zmianie warstwy tail nie jest już konieczne
    //     //TODO jezeli problem nie wróci to funkcja do usunięcia
    //     // this.rerenderujMapeJezeliPosiadaWarstweTail(this.mapa.warstwy);
    //   }
    // }));
    // this.subskryocje$.add(this.mapaService.pobierzSubjectUsuwaniaWarstwy().subscribe(warstwa => {
    //   if (warstwa?.uuidMapy === this.mapa?.uuid)
    //     this.usunWarstweZWidokuMapy(warstwa?.warstwa);
    // }));
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.mapaService.resetujStan();
    this.subskryocje$.unsubscribe();
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
   * Funkcja inicjuje warstwy podkaldowe i tematyczne
   */
  private inicjujMape(): void {
    if (this.grupyWarstwPodkladowych.length && this.mapa && this.bibliotekaOracleZaladoana && !this.mapaZainicjowana) {
      this.mapView?.addScaleBar();
      this.mapView?.setMouseWheelZoomBehavior(OM.Map.ZOOM_KEEP_MOUSE_POINT);
      // this.inicjujWarstwePodkladowa();
      this.mapView?.init();
      // this.zarejestrujObslugeZdarzenMapy();
      // this.wymusAktualizacjeKomponentu();
      // this.dodajTekstLicencji();
      this.mapaService.aktualizujWarstwe(this.mapa);
    }
  }


}
