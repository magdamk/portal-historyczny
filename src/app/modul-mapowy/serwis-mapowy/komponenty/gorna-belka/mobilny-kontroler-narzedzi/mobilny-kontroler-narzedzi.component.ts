import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {Mapa} from '../../../modele/mapa';
// import {
//   KontaktZAdministratoremBelkaBocznaComponent
// } from '../../kontakt/kontakt-z-administratorem-belka-boczna/kontakt-z-administratorem-belka-boczna.component';
// import {MobilnyKontrolerNarzedziInterface} from '../../../../wspolne/interfejsy/mobilny-kontroler-narzedzi-interface';
// import {MobilnyKontrolerNarzedziService} from '../../../serwisy/mobilny-kontroler-narzedzi.service';
import {Subscription} from 'rxjs';
// import {Store} from '@ngrx/store';
// import {NarzedziaActions} from '../../../../stan/narzedzia/narzedzia.actions';
// import {NARZEDZIA_STERUJACE_ID} from '../../../../stan/narzedzia/narzedzia.const';
// import {InterfejsUzytkownikaActions} from '../../../../stan/interfejs-uzytkownika/interfejs-uzytkownika.actions';
// import {UdostepnianieMobilneComponent} from "../udostepnianie-mobilne/udostepnianie-mobilne.component";
// import {MapyModulMapowyAdapter} from "../../../../core/providers/mapy-adapter";
import {MapaService} from "../../../serwisy/mapa.service";
// import {PomocBelkaBocznaComponent} from "../../pomoc/pomoc-belka-boczna/pomoc-belka-boczna.component";
// import {
//   WyszukiwarkaZaawansowanaActions
// } from "../../../../stan/wyszukiwarka-zaawansowana/wyszukiwarka-zaawansowana.actions";
import {KolekcjeUtils} from "../../../utils/kolekcje-utils";
import { PRZYCISK_IKONA_TYP } from 'src/app/modul-mapowy/commons/komponenty/przycisk-ikona/przycisk-ikona.component';
import { KomponentHostDirective } from 'src/app/wspolne/dyrektywy/komponent-host.directive';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/mm-tlumaczenia.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { MapyModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/mapy-adapter';
import { Store } from '@ngrx/store';
import { MobilnyKontrolerNarzedziService } from '../../../serwisy/mobilny-kontroler-narzedzi.service';
import { MobilnyKontrolerNarzedziInterface } from 'src/app/modul-mapowy/commons/interfejsy/mobilny-kontroler-narzedzi-interface';

/**
 * Komponent służy do wyświetlania narzędzi w trybie mobilnym
 */
@Component({
  selector: 'mm-mobilny-kontroler-narzedzi',
  templateUrl: './mobilny-kontroler-narzedzi.component.html',
  styleUrls: ['./mobilny-kontroler-narzedzi.component.scss']
})
export class MobilnyKontrolerNarzedziComponent implements OnInit, OnDestroy {
  @ViewChild(KomponentHostDirective, {static: true}) appKomponentHost!: KomponentHostDirective;

  PRZYCISK = PRZYCISK_IKONA_TYP;

  // NARZEDZIA_IDENTYFIKATORY = NARZEDZIA_STERUJACE_ID;

  @Input()
  mapa?: Mapa;

  oknoWidoczne = false;

  // czyUdostepnianieWidoczne = this.konfiguracja.pobierzWidocznoscUdostepnianiaMapy();
  czyUdostepnianieWidoczne = true;

  aktualnyJezyk = 'pl';

  tlumaczeniasubscription?: Subscription;

  mobilnyKontrolerNarzedziaSubscription?: Subscription;

  /**
   * Konstruktor
   * @param narzedziaSerwis
   */
  constructor(private store: Store<{ modulMapowy: any }>,
              private mapyAdapter: MapyModulMapowyAdapter,
              private tlumaczenia: TlumaczeniaService,
              private mapaSerwis: MapaService,
              private mobilnyKontrlerSerwis: MobilnyKontrolerNarzedziService,
              private componentFactoryResolver: ComponentFactoryResolver,
              public konfiguracja: KonfiguracjaModulMapowyAdapter) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.mobilnyKontrolerNarzedziaSubscription = this.mobilnyKontrlerSerwis.pobierzSubjecNarzedzia().subscribe(narzedzie => {
      if (narzedzie) {
        this.zaladujKomponent(narzedzie);
      } else {
        this.zamknijKomponent();
      }
    });
    this.tlumaczeniasubscription = this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
      this.aktualnyJezyk = jezyk;
    });
  }

  /**
   * Cykl życia komonentu niszczenie
   */
  ngOnDestroy(): void {
    if (this.mobilnyKontrolerNarzedziaSubscription) {
      this.mobilnyKontrolerNarzedziaSubscription.unsubscribe();
    }
    if (this.tlumaczeniasubscription) {
      this.tlumaczeniasubscription.unsubscribe();
    }
  }


  /**
   * Funkcja zmienia stan okna
   */
  zmienStanOkna(): void {
    this.oknoWidoczne = !this.oknoWidoczne;
    this.zamknijKomponent();
  }

  /**
   * Funkcja włącza okno narzędzi
   */
  pokazOkno(): void {
    this.oknoWidoczne = !this.oknoWidoczne;
  }

  /**
   * Funkcja wyłącza okno narzędzi
   */
  ukryjOkno(): void {
    this.oknoWidoczne = false;
    this.zamknijKomponent();
  }

  /**
   * Funkcja urauchami narzędzi informacji o mapie
   */
  uruchomNarzedzieInfomracjiOMapie(): void {
    this.oknoWidoczne = false;
    if (this.mapa?.opisWPortaluMapowym && this.mapa?.opisWPortaluMapowym[this.aktualnyJezyk] !== '') {
      // this.store.dispatch(NarzedziaActions.uruchomNarzedzie({identyfikator: NARZEDZIA_STERUJACE_ID.INFORMACJE_O_MAPIE}));
      // this.store.dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
    }
  }

  /**
   * Funkcja uruchamia narzędzie na podstawie podanych parametrów
   * @param sekcja
   * @param narzedzie
   */
  uruchomNarzedzie(narzedzie: string): void {
    this.oknoWidoczne = false;
    // this.store.dispatch(NarzedziaActions.uruchomNarzedzie({identyfikator: narzedzie}));
    // this.store.dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
    // this.store.dispatch(WyszukiwarkaZaawansowanaActions.zamknijWyszukiwarkeZaawansowana());
    // this.store.dispatch(InterfejsUzytkownikaActions.zwinWyszukiwarke());
  }

  /**
   * Funkcja ładuje formularz kontaktu z administratorem
   */
  pokazFormlarzKontaktuZAdministratorem(): void {
    // this.zaladujKomponent(KontaktZAdministratoremBelkaBocznaComponent);
  }

  /**
   * Funkcja wywołuje formularz pomocy
   */
  pokazFormularzPomocy(){
    // this.zaladujKomponent(PomocBelkaBocznaComponent);
  }


  /**
   * Funkcja wywołuje zmianę języka
   */
  zmienJezyk(): void {
    this.tlumaczenia.przelaczJezyk();
  }

  /**
   * Funkcja ładuje formularz udostepniania
   */
  pokarzFormularzUdostepniania(): void {
    // if (this.mapaSerwis.czyMapaZmieniona(this.mapa)) {
    //   this.mapyAdapter.zapiszMape(KolekcjeUtils.klonowanieObiektu(this.mapa))
    //     .subscribe(m => {
    //       this.mapa = m;
    //       this.mapaSerwis.aktualizujWarstwe(this.mapa);
    //       this.mapaSerwis.zapisanoMapePrywatna(this.mapa);
    //       this.zaladujKomponent(UdostepnianieMobilneComponent);
    //     });
    //   return;
    // } else{
    //   this.zaladujKomponent(UdostepnianieMobilneComponent);
    // }

  }


  /**
   * Funkcja rendereuje komponent w oknie mobilnych narzędzi
   * @param komponent - komponent powinien implementować interfejs BelkaBocznaKomponent
   */
  private zaladujKomponent(komponent: Type<MobilnyKontrolerNarzedziInterface>): void {
    if (!this.appKomponentHost) {
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(komponent);
    const viewContainerRef = this.appKomponentHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<MobilnyKontrolerNarzedziInterface>(componentFactory);
  }

  /**
   * Funkcja zamyka komponent
   */
  private zamknijKomponent(): void {
    this.appKomponentHost.viewContainerRef.clear();
  }
}
