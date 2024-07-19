import { Injectable } from '@angular/core';
import { KLUCZE_LOCA_STORAGE, LocalStorageService } from '../../../wspolne/serwisy/local-storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from "rxjs";
import { ControllerDostepnoscSerwisuOpenService } from '../../../core/api/controller-dostepnosc-serwisu-open.service';
import { ControllerKomunikatyOpenService } from '../../../core/api/controller-komunikaty-open.service'
import { JsonObjectContainerKomunikatSzczegolyOpenDto } from '../../../core/modele/json-object-container-komunikat-szczegoly-open-dto'
import { KomunikatSzczegolyOpenDto } from 'src/app/core/modele/komunikat-szczegoly-open-dto';
import { TlumaczeniaService } from "../../../core/tlumaczenia/serwisy/tlumaczenia.service";


export interface KomunikatySystemowe extends KomunikatSzczegolyOpenDto {
  zablokowany?: boolean
}

/**
 * Serwis komunikatów
 */
@Injectable({
  providedIn: 'root'
})
export class KomunikatyService {
  private komunikat$ = new BehaviorSubject<KomunikatySystemowe | undefined>(undefined);
  private urlDoPrzekierowania = '';
  private interval?: any;
  private beldySerwisu = 0;

  /**
   * Konstruktor
   * @param localStorageService - serwis localstorage
   * @param router - natywny serwis routingu
   * @param controllerKomunikaty serwis do komunikacji z serwerem zarządzającym danymi komunikatów
   */
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private tlumaczeniaSerwis: TlumaczeniaService,
    private controllerDostepnoscSerwisu: ControllerDostepnoscSerwisuOpenService,
    private controllerKomunikaty: ControllerKomunikatyOpenService) {
  }

  /**
   * Funkcja startowa komponentu
   */
  init(): void {
    const zdarzeniaSerwisuNawigacji = this.router.events.subscribe(zdarzenie => {
      if (zdarzenie instanceof NavigationEnd) {
        zdarzeniaSerwisuNawigacji.unsubscribe();
        this.ustawUrlPoKomunikacie();
        this.pobierzKomunikat();
      }
    });
    this.sprawdzajCzySerwisDostepny();
  }

  /**
   * Funkcja sprawdza czy serwis jest dostępny
   */
  sprawdzajCzySerwisDostepny() {
    this.interval = setInterval(() => {
      this.controllerDostepnoscSerwisu.dostepnoscSerwisu().subscribe(() => {
        this.beldySerwisu = 0;
      }, (error: any) => {
        this.beldySerwisu++;
        if (this.beldySerwisu > 3) {
          if (this.interval) {
            clearInterval(this.interval)
          }
          this.przekierujJesliSerwisNiedostepny(
            {
              uuid: 'niedostepnosc-serwisu',
              tresc: this.tlumaczeniaSerwis.przetlumacz('codes.generyczne.nieoczekiwany-blad'),
              zablokowany: true
            }
          )
        }
      })
    }, 10000);
  }

  /**
   * Getter atrybutu komunikat$
   */
  getKomunikat$(): BehaviorSubject<KomunikatSzczegolyOpenDto | undefined> {
    return this.komunikat$;
  }

  /**
   * Funkcja do pobierania komunikatu
   */
  private pobierzKomunikat(): void {
    this.controllerKomunikaty.pobierzAktualnyKomunikat().subscribe(
      (result: JsonObjectContainerKomunikatSzczegolyOpenDto) => {
        this.przekierujJesliIstniejeKomunikat(result.content);
      });
  }

  /**
   * Funkcja do ustawiania ścieżki url do otworzenia po zatwierdzeniu komunikatu
   */
  private ustawUrlPoKomunikacie(): void {
    if (this.router.url === '/komunikat') {
      this.urlDoPrzekierowania = '';
    } else {
      this.urlDoPrzekierowania = this.router.url;
    }
  }

  /**
   * Funkcja do wyświetlania komunikatu o przerwie technicznej
   * @param komunikat dane komunikatu
   */
  private przekierujJesliIstniejeKomunikat(komunikat: KomunikatSzczegolyOpenDto | undefined): void {
    let uuidObecnegoKomunikatu = this.localStorageService.odczytajZeStorage(KLUCZE_LOCA_STORAGE.KOMUNIKAT);
    this.komunikat$.next(komunikat);
    if (komunikat?.uuid && komunikat.uuid !== uuidObecnegoKomunikatu) {
      this.router.navigate(['/komunikat']);
    }
  }

  /**
   * Funkcja do wyświetlania komunikatu o przerwie technicznej
   * @param komunikat dane komunikatu
   */
  private przekierujJesliSerwisNiedostepny(komunikat: KomunikatySystemowe | undefined): void {
    this.komunikat$.next(komunikat);
    this.router.navigate(['/komunikat']);
  }


  /**
   * Funkcja oznacza komunikat jako przeczytany
   * @param uuid identyfikator komunikatu
   */
  oznaczKomunikatJakoPrzeczytany(uuid: string | undefined): void {
    uuid = uuid ? uuid : '';
    this.localStorageService.zapiszWStorage(KLUCZE_LOCA_STORAGE.KOMUNIKAT, uuid);
    if (this.urlDoPrzekierowania !== '') {
      this.router.navigate([this.urlDoPrzekierowania]);
    } else {
      this.router.navigate(['/']);
    }
  }

}
