import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { KomunikatyModulMapowyAdapter } from 'src/app/core/adaptery/komunikaty-adapter';
import { ControllerMapyOpenService } from 'src/app/core/api/controller-mapy-open.service';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { ModulMapowyService } from 'src/app/modul-mapowy/serwis-mapowy/API/modul-mapowy.service';
import { Mapa } from 'src/app/modul-mapowy/serwis-mapowy/modele/mapa';
import { ParametryStartoweMapy } from 'src/app/modul-mapowy/serwis-mapowy/modele/parametry-startowe-mapy';
import { SerwisMapowyComponent } from 'src/app/modul-mapowy/serwis-mapowy/strony/serwis-mapowy/serwis-mapowy.component';
import { RoutingUtilsService } from 'src/app/wspolne/serwisy/routing-utils.service';
import { KomunikatPortaluMapowegoService } from '../../serwisy/komunikat-portalu-mapowego.service';
import { KomunikatSzczegolyOpenDto } from 'src/app/core/modele/komunikat-szczegoly-open-dto';
import { InformacjaPopupComponent } from 'src/app/wspolne/komponenty/informacja-popup/informacja-popup.component';
import { WidokMapyMapaSzczegolyDto } from 'src/app/core/modele/widok-mapy-mapa-szczegoly-dto';

@Component({
  selector: 'app-strona-mapy',
  templateUrl: './strona-mapy.component.html',
  styleUrls: ['./strona-mapy.component.scss']
})
export class StronaMapyComponent implements OnInit, OnDestroy {

  @ViewChild('serwisMapowy') serwisMapowy!: SerwisMapowyComponent;

  uuidMapy?: string;
  mapa?: Mapa;
  // mapaDoPorownania?: { mapa?: Mapa, status: 'WYBRANA' | 'BRAK' };
  parametryStartoweMapy?: ParametryStartoweMapy;

  mapaZainicjowana = false;
  zmianaNaMapie = false;
  wyswietlonoOstrzezenieOUtracieDanych = false;

  // zmianaMapyWidoczna = false;

  subscription$ = new Subscription();
  jezyk = '';



  /**
   * Konstruktor
   * @param dialog
   * @param route - serwis routingu
   * @param router
   * @param tlumaczeniaSerwis
   * @param mapySerwis
   * @param komunikaty
   * @param modulMapowyService
   * @param routingUtils
   * @param komunikatService
   */
  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private tlumaczeniaSerwis: TlumaczeniaService,
    private mapySerwis: ControllerMapyOpenService,
    private komunikaty: KomunikatyModulMapowyAdapter,
    private modulMapowyService: ModulMapowyService,
    private komunikatService: KomunikatPortaluMapowegoService,
    private routingUtils: RoutingUtilsService
  ) {
    // this.ustawOstrzezenieOUtracieDanych();
  }

  ngOnInit(): void {
    // console.log("strona mapy TEST",this.tlumaczeniaSerwis.pobierzAktualnyJezyk());
    this.subscription$.add(this.tlumaczeniaSerwis.getZmianaJezykaSubject().subscribe(jezyk => this.jezyk = jezyk));
    this.route.queryParams.subscribe(params => {
      this.parametryStartoweMapy = {
        zoom: params['zoom'] ? parseInt(params['zoom'], 10) : undefined,
        srodekX: params['srodekX'] ? Number.parseFloat(params['srodekX']) : undefined,
        srodekY: params['srodekY'] ? Number.parseFloat(params['srodekY']) : undefined,
        lokalizacjaX: params['lokalizacjaX'] ? Number.parseFloat(params['lokalizacjaX']) : undefined,
        lokalizacjaY: params['lokalizacjaY'] ? Number.parseFloat(params['lokalizacjaY']) : undefined,
        idObiektu: params['idObiektu'] ? Number.parseInt(params['idObiektu']) : undefined,
        typGeometrii: params['typGeometrii'] ? params['typGeometrii'] : undefined,
        wspolrzedne: this.pobierzWspolrzedneZLocalStorage(),
        uuidWarstwy: params['uuidWarstwy'] ? params['uuidWarstwy'].toString() : undefined,
        blad: params['blad'] ? params['blad'].toString() : undefined,
        lang: params['lang'] ? params['lang'].toString() : undefined
      };
      this.uuidMapy = this.route.snapshot.paramMap.get('uuid') || undefined;

      this.zaladujMape();
    });

  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    window.onbeforeunload = null;
  }

  /**
   * Funkcja ładuje mapę
   */
  private zaladujMape(): void {
    if (this.uuidMapy) {
      this.mapySerwis.pobierzOpublikowanaMape(this.uuidMapy)
        .subscribe(response => {
          if (response.content?.definicjaMapy) {
            this.mapa = response.content.definicjaMapy;
            // console.log('strona mapy definicja mapy: ', response.content.definicjaMapy);
            this.ustawParametryStartoweMapy(response.content.definicjaMapy);
            this.pobierzKomunikatIWyswietl();
            this.pokazKomunikatOBrakujacychWarstwach(response.content?.definicjaMapy);
            this.zmianaNaMapie = false;
            this.mapa ? this.mapa.rodzaj = this.pobierzRodzajZLocalStorage() : null;
            this.mapa ? this.mapa.sciezkaDoPlikuZGrafika = encodeURI(this.pobierzImgPathZLocalStorage()) : null;
            this.wyczyscParamZLocalStorage();
          }
        }, error1 => {
          if (error1.error.content) {
            window.location.href = `/mapa/${error1.error.content.definicjaMapy.uuid}?blad=brak-mapy`;
          }
        });
    } else {
      this.mapySerwis.pobierzPustaMape().subscribe(response => {
        this.mapa = response.content?.definicjaMapy;
        this.ustawParametryStartoweMapy(this.mapa);
        this.pobierzKomunikatIWyswietl();
      });
    }
    if (this.parametryStartoweMapy?.blad === 'brak-mapy') {
      this.komunikaty.pokazKomunikatBledu('codes.generyczne.niepoprawny-link-do-mapy', { duration: 5000 });
    }
  }



  /**
  * Funkcja pobiera parametry z url i przekazuje do mapy
  * @param mapa
  */
  private ustawParametryStartoweMapy(mapa?: Mapa): void {
    if (!mapa) {
      return;
    }
    mapa.domyslnaSkala = this.parametryStartoweMapy?.zoom ? this.parametryStartoweMapy?.zoom : mapa.domyslnaSkala;
    mapa.srodekMapyY = this.parametryStartoweMapy?.srodekY ? this.parametryStartoweMapy.srodekY : mapa.srodekMapyY;
    mapa.srodekMapyX = this.parametryStartoweMapy?.srodekX ? this.parametryStartoweMapy.srodekX : mapa.srodekMapyX;
    if (this.parametryStartoweMapy?.lokalizacjaX && this.parametryStartoweMapy?.lokalizacjaY) {
      mapa.udostepnionaLokalizacja = {
        x: this.parametryStartoweMapy.lokalizacjaX,
        y: this.parametryStartoweMapy.lokalizacjaY,
        srid: 2178
      }
    }
  }

  /**
   * Funkcja do pobierania i wyświetlania popup komunikatu portalu mapowego jeśli nie został zaakceptowany
   */
  private pobierzKomunikatIWyswietl(): void {
    this.komunikatService.pobierzKomunikatPortaluMapowego().subscribe(result => {
      if (result) {
        this.pokazOknoKomunikatuPotaluMapowego(result);
      }
    });
  }


  /**
   * Funkcja pokazuje okno komunikatu portalu mapowego
   */
  pokazOknoKomunikatuPotaluMapowego(komunikatPortalu: KomunikatSzczegolyOpenDto): void {
    const dialogRef = this.dialog.open(InformacjaPopupComponent, {
      width: '500px',
      panelClass: 'modul-mapowy-dialog',
      data: komunikatPortalu,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.komunikatService.zapiszJakoZaakceptowany(result.uuid);
      }
    });
  }

  /**
   * Funkcja do pokazywania komunikatu o brakujących warstwach
   * @param definicjaMapy definicja mapy
   */
  private pokazKomunikatOBrakujacychWarstwach(definicjaMapy: WidokMapyMapaSzczegolyDto): void {
    if (!definicjaMapy.usunieteWarstwy || definicjaMapy.usunieteWarstwy.length === 0) {
      return;
    }
    const brakujaceWarstwy = definicjaMapy.usunieteWarstwy
      .map(value => this.jezyk === 'pl' ? value.pl : value.en)
      .join(', ');
    const komunikat = this.tlumaczeniaSerwis
      .przetlumacz('codes.generyczne.komunikat-wczytanie-niepelnej-mapy') + brakujaceWarstwy + ').';
    this.komunikaty.pokazKomunikatBledu(komunikat);
  }

  /**
    * Funckcja pobierza wspolrzedne
    */
  private pobierzWspolrzedneZLocalStorage(): number[] | undefined {
    return localStorage.getItem('wspolrzedne')?.split(',').map(w => parseFloat(w));
  }

  /**
 * Funkcja informuje czy mapa zostala zinicjowana
 */
  mapaZaladowana() {
    this.mapaZainicjowana = true;
  }
  /**
   * Funkcja informuje czy na mapie wystapiły zmiany
   */
  aktualizacjaMapy() {
    if (this.mapaZainicjowana) {
      this.zmianaNaMapie = true;
    }
  }

  /**
   * Funkcja czysci rejestr zmian na mapie po zapisie mapy prywatnej
   */
  zapisMapyPrywatnej() {
    this.zmianaNaMapie = false;
  }



  pobierzRodzajZLocalStorage(): string {
    return sessionStorage.getItem('rodzaj') || '';
  }

  pobierzImgPathZLocalStorage(): string {
    return sessionStorage.getItem('imgPath') || '';
  }

  wyczyscParamZLocalStorage() {
    sessionStorage.removeItem('rodzaj');
    sessionStorage.removeItem('imgPath');
  }
}
