import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { KategoriaGrupaMapOpenDto } from 'src/app/core/modele/kategoria-grupa-map-open-dto';
import { TypMapyObiektDto } from 'src/app/core/modele/typ-mapy-obiekt-dto';
import { ZmianaMapyUtils } from 'src/app/core/modele/zmiana-mapy-utils';
import { ResponsywnoscUtils } from 'src/app/modul-mapowy/mm-core/responsywnosc/utils/responsywnosc-utils';
import { Store } from '@ngrx/store';
import { WyborMapyEvent } from 'src/app/funkcjonalnosci/strona-startowa/strony/komponenty/karta-mapy/karta-mapy.component';
import { Subscription } from 'rxjs';
import { LewyPanelWidokInitialState } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';
import { WIDOK_INFO } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';

@Component({
  selector: 'mm-belka-karta-mapy',
  templateUrl: './belka-karta-mapy.component.html',
  styleUrls: ['./belka-karta-mapy.component.scss']
})
export class BelkaKartaMapyComponent implements OnInit, OnDestroy {
  @Input({ required: true }) temat!: KategoriaGrupaMapOpenDto;
  @Input() zmianaMapy = false;

  @Output() mapaWybrana = new EventEmitter<WyborMapyEvent>();

  szczegoly = false;
  adresUrl?: string;
  miniaturkaUkryta = false;

  subskrybcje$ = new Subscription();
  jezyk = '';
  suffix = '';
  /**
   * Konstruktor
   * @param router - natywny serwis routingu
   */
  constructor(private router: Router, private store: Store<{ modulMapowy: any }>,
    private tlumaczeniaSerwis: TlumaczeniaService
  ) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.wyczyscZbedneParametrySerwisuZewnetrznego();
    this.subskrybcje$.add(this.tlumaczeniaSerwis.getZmianaJezykaSubject().subscribe(jezyk => this.jezyk = jezyk));
    this.subskrybcje$.add(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        this.jezyk == 'en' ? this.suffix = '?lang=' + this.jezyk : null;
        // console.log(window.location.href," ",event.urlAfterRedirects);
        window.location.href = event.urlAfterRedirects + this.suffix;
      }
    }));
  }
  ngOnDestroy(): void {
    this.subskrybcje$.unsubscribe();
  }

  /**
   * Funkcja reaguje na przycisk enter i wywołuje przekierowanie
   */
  klikEnter(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.zapiszParametryWLocalStorage();
    // console.log(this.router.url.includes(this.temat.uuidMapy + ''));
    if (this.router.url.includes(this.temat.uuidMapy + '')) {
      this.store.dispatch(LewyPanelWidokActions.pokazObszar({ widokId: WIDOK_INFO.id }));
      this.wyczyscZbedneParametrySerwisuZewnetrznego();
    } else {
      // if (this.router.getCurrentNavigation() ==`/mapa/${this.temat.uuidMapy}` ){}

      // console.log(`/mapa/${this.temat.uuidMapy}` + encodeURI(`?rodzaj=${this.temat.rodzaj}`));
      if (this.zmianaMapy) {
        this.wybranoMape();
        // console.log('zmiana mapy');
        return;
      }
      if (this.adresUrl) {
        window.open(
          this.adresUrl,
          '_blank'
        );
        return;
      }
      // this.wybranoMape();
      // console.log(`/mapa/${this.mapa?.uuidMapy}`+encodeURI(`?rodzaj=${this.mapa?.rodzaj}`));
      // console.log(window.location.href," ",event.urlAfterRedirects);
      this.router.navigate([`portal-historyczny/mapa/${this.temat.uuidMapy}`]);
    }
  }

  /**
   * Funkcja sygnalizuje wybraniwMapy
   */
  wybranoMape(): void {
    if (this.temat!.adresUrl || this.zmianaMapy) {
      // console.log('wybrano mapę: ');
      this.mapaWybrana.emit({ url: this.temat!.adresUrl, uuidMapy: this.temat!.uuidMapy, typ: this.temat!.typ?.obiektEnum, rodzaj: this.temat!.rodzaj });
    }
  }

  /**
   * Funkcja obsługuje tapnięcie na kafelku mapy
   */
  tap(event: any) {
    this.zapiszParametryWLocalStorage();
    if (ResponsywnoscUtils.czyTrybDesktop()) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    }
    event.preventDefault();

    if (this.zmianaMapy) {
      this.wybranoMape();
      return;
    }
    if (this.temat!.typ?.obiektEnum === TypMapyObiektDto.ObiektEnumEnum.SerwisZewnetrzny && this.adresUrl) {
      window.open(this.adresUrl, '_blank');
      return;
    }
    this.router.navigate(['portal-historyczny/mapa/'+this.temat?.uuidMapy]);
  }

  /**
   * funkcja obsługuje przytrzymanie kafelka mapy
   */
  press() {
    this.miniaturkaUkryta = !this.miniaturkaUkryta;
  }


  /**
   * Funkcja czysci dodatkowe arametry url jezli przekierowanie ze strony startowej
   */
  private wyczyscZbedneParametrySerwisuZewnetrznego(): void {
    if (this.temat.adresUrl && !this.zmianaMapy) {
      this.adresUrl = ZmianaMapyUtils.wyczyscZbedneParametrySerwisuZewnetrznego(this.temat.adresUrl);
    }
  }


  zapiszParametryWLocalStorage() {
    localStorage.setItem('rodzaj', this.temat?.rodzaj ? this.temat.rodzaj : '');
    localStorage.setItem('imgPath', this.temat?.sciezkaDoPlikuZGrafika ? this.temat.sciezkaDoPlikuZGrafika : '');
  }
  zapiszJezykWLocalStorage() {
    localStorage.setItem('lang', this.jezyk);
  }
  // private aktualizujUrl(url: string): string {
  //   if (url.includes('?')) {
  //     if(!url.includes('zoom')){
  //       url= `${url}&zoom=${this.data.zoom}`;
  //     }
  //     if(!url.includes('srodekX')){
  //       url= `${url}&srodekX=${this.data.srodekX}`;
  //     }
  //     if(!url.includes('srodekY')){
  //       url= `${url}&srodekY=${this.data.srodekY}`;
  //     }
  //     if(!url.includes('lang')){
  //       url= `${url}&lang=${this.data.lang}`;
  //     }
  //     return url;
  //   }
  //   return `${url}?zoom=${this.data.zoom}&srodekX=${this.data.srodekX}&srodekY=${this.data.srodekY}&lang=${this.data.lang}`
  // }
}
