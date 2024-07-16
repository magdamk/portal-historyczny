import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnDestroy,
  OnInit,
  Type,
  ViewChild
} from '@angular/core';
import {Subscription} from 'rxjs';
import {BelkaBocznaKomponent} from '../../../wspolne/interfejsy/belka-boczna-komponent';
import {AktualnosciBelkaBocznaComponent} from '../../../funkcjonalnosci/aktualnosci/komponenty/aktualnosci-belka-boczna/aktualnosci-belka-boczna.component';
import {NavigationEnd, Router} from '@angular/router';
import {SzablonyService} from '../serwisy/szablony.service';
import {KomponentHostDirective} from '../../../wspolne/dyrektywy/komponent-host.directive';

/**
 * Komponent szablonu strony startowej
 */
@Component({
  selector: 'app-szablon-strony-glownej',
  templateUrl: './szablon-strony-glownej.component.html',
  styleUrls: ['./szablon-strony-glownej.component.scss']
})
export class SzablonStronyGlownejComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(KomponentHostDirective, {static: true}) appKomponentHost!: KomponentHostDirective;
  @ViewChild('main') glownyKontener!: ElementRef;


  tytulStrony = '';
  bocznaNawigazjaRozwinieta = false;
  tytulStronySubscription$ = new Subscription();
  zmianaBelkiBocznejSubscription$ = new Subscription();
  zmianaRozwinieciaBelkiBocznejSubscription$ = new Subscription();
  routerSubscription$ = new Subscription();

  /**
   * Konstruktor
   * @param szablonyService - serwis szablonu
   * @param router - serwis routingu
   * @param cd - serwis detektora zmian
   * @param componentFactoryResolver - renderer komponentu
   */
  constructor(private szablonyService: SzablonyService,
              private router: Router,
              private cd: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver) {

  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.szablonyService.zwinBelkeBoczna();
    this.zmianaBelkiBocznejSubscription$ = this.szablonyService.getZmianaZawartosciBelkiBocznejSubject()
      .subscribe((komponent) => this.zmianaKomponentuBelkiBocznej(komponent));
    this.tytulStronySubscription$ = this.szablonyService.getTytulStronySubject()
      .subscribe((tytul) => this.ustawTytulStrony(tytul));
    this.zmianaRozwinieciaBelkiBocznejSubscription$ = this.szablonyService.getZmianaRozwinieciaBelkiBocznejSubject()
      .subscribe(rozwinieta => this.ustawRozwiniecieBelkiBocznej(rozwinieta));
    this.routerSubscription$ = this.router.events
      .subscribe((event: any) => this.ustawSkrolStrony(event));
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.zmianaBelkiBocznejSubscription$.unsubscribe();
    this.zmianaRozwinieciaBelkiBocznejSubscription$.unsubscribe();
    this.tytulStronySubscription$.unsubscribe();
    this.routerSubscription$.unsubscribe();
  }

  /**
   * Cykl życia komponentu renderowanie widoku
   */
  ngAfterViewInit(): void {
    this.zaladujKomponentBelkiBocznej(AktualnosciBelkaBocznaComponent);
  }

  /**
   * Funkcja rowija belkę boczną
   */
  rozwinBocznaNawigacje(): void {
    this.szablonyService.rozwinBelkeBoczna();
  }

  /**
   * Funkcja zwija belkę boczną
   */
  zwinBocznaNawigacje(): void {
    this.zaladujKomponentBelkiBocznej(AktualnosciBelkaBocznaComponent);
    this.szablonyService.zwinBelkeBoczna();
  }

  /**
   * Funkcja zmienia komponent na belce bocznej
   * @param komponent - komponent powinien implementować interfejs BelkaBocznaKomponent
   */
  private zmianaKomponentuBelkiBocznej(komponent: Type<BelkaBocznaKomponent> | undefined): void {
    if (komponent !== undefined) {
      this.zaladujKomponentBelkiBocznej(komponent);
    } else {
      this.zaladujKomponentBelkiBocznej(AktualnosciBelkaBocznaComponent);
    }
  }

  /**
   * Funkcja rendereuje komponent belki bocznej
   * @param komponent - komponent powinien implementować interfejs BelkaBocznaKomponent
   */
  private zaladujKomponentBelkiBocznej(komponent: Type<BelkaBocznaKomponent>): void {
    if (!this.appKomponentHost) {
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(komponent);
    const viewContainerRef = this.appKomponentHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<BelkaBocznaKomponent>(componentFactory);
  }

  /**
   * Funkcja zeruje przewinięcie strony
   * @param event - zdarzenie
   */
  private ustawSkrolStrony(event: any): void {
    if (event instanceof NavigationEnd) {
      this.glownyKontener.nativeElement.scrollTop = 0;
    }
  }

  /**
   * Funkcja ustawia tytuł strony
   * @param tytul - tytuł strony
   */
  private ustawTytulStrony(tytul: string): void {
    this.tytulStrony = tytul;
    this.cd.detectChanges();
  }

  /**
   * Zmienia stan belki bocznej
   * @param rozwiniecie - stan
   */
  private ustawRozwiniecieBelkiBocznej(rozwiniecie: boolean): void {
    this.bocznaNawigazjaRozwinieta = rozwiniecie;
  }
}
