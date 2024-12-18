import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerwisMapowyComponent } from './serwis-mapowy/strony/serwis-mapowy/serwis-mapowy.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonsModule } from "./commons/commons.module";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TlumaczeiaModulMapowyAdapter, DomyslnyTlumaczeniaModulMapowyAdapter } from '../core/providers/tlumaczenia-modul-mapowy-adapter';
import { IkonaSvgDirective } from './commons/directives/ikona-svg.directive';
import { RouterModule } from '@angular/router';
import { PasekStanuComponent } from './serwis-mapowy/komponenty/dolna-belka/pasek-stanu/pasek-stanu.component';
import { TylkoMobileDirective } from './mm-core/responsywnosc/dyrektywy/tylko-mobile.directive';
import { TylkoDesktopDirective } from './mm-core/responsywnosc/dyrektywy/tylko-desktop.directive';
import { WidokMapyNarzedziaSekcjaComponent } from './serwis-mapowy/komponenty/mapa/widok-mapy-narzedzia-sekcja/widok-mapy-narzedzia-sekcja.component';
import { WidokMapyComponent } from './serwis-mapowy/komponenty/mapa/widok-mapy/widok-mapy.component';
import { InformacjeOObiekcieComponent } from './serwis-mapowy/komponenty/mapa/informacje-o-obiekcie/informacje-o-obiekcie.component';
import { DomyslnaKonfiguracjaModulMapowyAdapter, KonfiguracjaModulMapowyAdapter } from './mm-core/providers/konfiguracja-adapter';
import { GrupyWarstwPodkladowychModulMapowyAdapter, DomyslneGrupyWarstwPodkladowychAdapter } from './mm-core/providers/grupy-warstw-podkladowych-adapter';
import { OracleMapsModule } from './oracle-maps/oracle-maps.module';
import { DomyslnyDostepneWarstwyAdapter, DostepneWarstwyModulMapowyAdapter } from './mm-core/providers/dostepne-warstwy-adapter';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { KomunikatyModulMapowyAdapter, DomyslneKomunikatyModulMapowyAdapter } from '../core/adaptery/komunikaty-adapter';
import { KontaktZAdministratoremModulMapowyAdapter, DomyslnyKontaktZAdministratoremAdapter } from '../core/adaptery/kontakt-z-administratorem-adapter';
// import { AnalizyPrzestrzenneModulMapowyAdapter, DomyslneAnalizyPrzstrzenneAdapter } from './mm-core/providers/analizy-przestrzenne-adapter';
// import { CmentarzeModulMapowyAdapter, DomyslneCmentarzeAdapter } from './mm-core/providers/cmentarze-adapter';
import { MapyModulMapowyAdapter, DomyslneMapyModulMapowyAdapter } from './mm-core/providers/mapy-adapter';
import { MultimediaIZalacznikiModulMapowyAdapter, DomyslnyMultimediaIZalacznikiAdapter } from './mm-core/providers/multimedia-i-zalaczniki-adapter';
import { PasekCzasuModulMapowyAdapter, DomyslnyPasekCzasuModulMapowyAdapter } from './mm-core/providers/pasek-czasu-adapter';
import { PobieranieDanychModulMapowyAdapter, DomyslnyPobieranieDanychAdapter } from './mm-core/providers/pobieranie-danych-adapter';
import { PomocModulMapowyAdapter, DomyslnaPomocModulMapowyAdapter } from './mm-core/providers/pomoc-adapter';
// import { UslugiZewnetrzneModulMapowyAdapter, DomyslneUslugiZewnetrzneAdapter } from './mm-core/providers/uslugi-zewnetrzne-adapter';
import { WyszukiwarkaModulMapowyAdapter, DomyslnyWszukiwarkaAdapter } from './mm-core/providers/wyszukiwarka-adapter';
import { KontrolerWarstwPodkladowychComponent } from './serwis-mapowy/komponenty/mapa/kontroler-warstw-podkladowych/kontroler-warstw-podkladowych.component';
import { WyborTlumaczeniaPipe } from './serwis-mapowy/pipes/wybor-tlumaczenia.pipe';
import { PrzewijanyKomponentComponent } from './commons/komponenty/przewijany-komponent/przewijany-komponent.component';
import { MatLegacySliderModule } from '@angular/material/legacy-slider';
import { SterowanieMapyComponent } from './serwis-mapowy/komponenty/mapa/sterowanie-mapy/sterowanie-mapy.component';
import { MapaSpinnerComponent } from './serwis-mapowy/komponenty/mapa/mapa-spinner/mapa-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KlikalnoscNaMapieComponent } from './serwis-mapowy/komponenty/mapa/klikalnosc-na-mapie/klikalnosc-na-mapie.component';
import { RerenderDirective } from './commons/directives/rerender.directive';
import { KontrolerFunkcjiDodatkowychComponent } from './serwis-mapowy/komponenty/gorna-belka/kontroler-funkcji-dodatkowych/kontroler-funkcji-dodatkowych.component';
import { MobilnyKontrolerNarzedziComponent } from './serwis-mapowy/komponenty/gorna-belka/mobilny-kontroler-narzedzi/mobilny-kontroler-narzedzi.component';
import { BocznaBelkaKontenerComponent } from './serwis-mapowy/komponenty/boczna-belka/boczna-belka-kontener/boczna-belka-kontener.component';
import { PrzyciskIkonaComponent } from './commons/komponenty/przycisk-ikona/przycisk-ikona.component';
import { StoreModule } from '@ngrx/store';
import { interfejsUzytkowikaReducer } from './stan/interfejs-uzytkownika/interfejs-uzytkownika.reducer';
import { OsPrzegladanieComponent } from './serwis-mapowy/komponenty/boczna-belka/os-przegladanie/os-przegladanie.component';
import { OsTematyComponent } from './serwis-mapowy/komponenty/boczna-belka/os-tematy/os-tematy.component';
import { OsSzlakiComponent } from './serwis-mapowy/komponenty/boczna-belka/os-szlaki/os-szlaki.component';
import { OsTagiComponent } from './serwis-mapowy/komponenty/boczna-belka/os-tagi/os-tagi.component';
import { OsInfoComponent } from './serwis-mapowy/komponenty/boczna-belka/os-info/os-info.component';
import { lewyPanelWidokReducer } from './stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { BelkaKartaMapyComponent } from './serwis-mapowy/komponenty/boczna-belka/belka-karta-mapy/belka-karta-mapy.component';
import { PrzyciskOkraglyComponent } from './commons/komponenty/przycisk-okragly/przycisk-okragly.component';
import { OsMapyPlanyComponent } from './serwis-mapowy/komponenty/boczna-belka/os-mapy-plany/os-mapy-plany.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';
import { ObiektOpisComponent } from './serwis-mapowy/komponenty/mapa/obiekt-opis/obiekt-opis.component';
import { LokalizacjaOpisComponent } from './serwis-mapowy/komponenty/mapa/lokalizacja-opis/lokalizacja-opis.component';
import { ObiektZalacznikiIZdjeciaComponent } from './serwis-mapowy/komponenty/mapa/obiekt-zalaczniki-i-zdjecia/obiekt-zalaczniki-i-zdjecia.component';
import { OsPasekCzasuComponent } from './serwis-mapowy/komponenty/boczna-belka/os-pasek-czasu/os-pasek-czasu.component';
import { PasekCzasuComponent } from './serwis-mapowy/komponenty/boczna-belka/pasek-czasu/pasek-czasu.component';
import { WidokPaskaCzasuComponent } from './serwis-mapowy/komponenty/mapa/widok-paska-czasu/widok-paska-czasu.component';
import { mapaWidokReducer } from './stan/mapa-widok/mapa-widok.reducer';
import { NgxSliderModule } from 'ngx-slider-v2';
import { KontaktFormularzComponent } from './commons/komponenty/kontakt-formularz/kontakt-formularz.component';
import { KontaktZAdministratoremDialogComponent } from './serwis-mapowy/komponenty/kontakt/kontakt-z-administratorem-dialog/kontakt-z-administratorem-dialog.component';
import { PomocBelkaBocznaComponent } from './serwis-mapowy/komponenty/pomoc/pomoc-belka-boczna/pomoc-belka-boczna.component';
import { PomocDialogComponent } from './serwis-mapowy/komponenty/pomoc/pomoc-dialog/pomoc-dialog.component';
import { KontaktZAdministratoremBelkaBocznaComponent } from './serwis-mapowy/komponenty/kontakt/kontakt-z-administratorem-belka-boczna/kontakt-z-administratorem-belka-boczna.component';
import { WyszukiwarkaMapowaComponent } from './serwis-mapowy/komponenty/wyszukiwarka/wyszukiwarka-mapowa/wyszukiwarka-mapowa.component';
import { WyszukiwarkaObiektyTabComponent } from './serwis-mapowy/komponenty/wyszukiwarka/obiekty/wyszukiwarka-obiekty-tab/wyszukiwarka-obiekty-tab.component';
import { wyszukiwarkaReducer } from './stan/wyszukiwarka/wyszukiwarka.reducer';
import { WynikiBrakComponent } from './serwis-mapowy/komponenty/wyszukiwarka/wspolne/wyniki-brak/wyniki-brak.component';
import { WynikiObiektyDesktopComponent } from './serwis-mapowy/komponenty/wyszukiwarka/wspolne/wyniki-obiekty-desktop/wyniki-obiekty-desktop.component';
import { WynikiObiektyMobileComponent } from './serwis-mapowy/komponenty/wyszukiwarka/wspolne/wyniki-obiekty-mobile/wyniki-obiekty-mobile.component';
import { WyszukiwarkaObiektyOdlegloscTabComponent } from './serwis-mapowy/komponenty/wyszukiwarka/obiekty-odleglosc/wyszukiwarka-obiekty-odleglosc-tab/wyszukiwarka-obiekty-odleglosc-tab.component';
import { WyszukiwarkaDzialkiTabComponent } from './serwis-mapowy/komponenty/wyszukiwarka/dzialki/wyszukiwarka-dzialki-tab/wyszukiwarka-dzialki-tab.component';
import { WynikiDzialkiDesktopComponent } from './serwis-mapowy/komponenty/wyszukiwarka/dzialki/wyniki-dzialki-desktop/wyniki-dzialki-desktop.component';
import { WynikiDzialkiMobileComponent } from './serwis-mapowy/komponenty/wyszukiwarka/dzialki/wyniki-dzialki-mobile/wyniki-dzialki-mobile.component';
import { WyszukaneObiektyILokalizacjeComponent } from './serwis-mapowy/komponenty/mapa/wyszukane-obiekty-i-lokalizacje/wyszukane-obiekty-i-lokalizacje.component';

@NgModule({
  declarations: [
    SerwisMapowyComponent,
    PasekStanuComponent,
    // PrzewijanyKomponentComponent,
    SterowanieMapyComponent,
    TylkoDesktopDirective,
    TylkoMobileDirective,
    WidokMapyNarzedziaSekcjaComponent,
    WidokMapyComponent,
    InformacjeOObiekcieComponent,
    KontrolerWarstwPodkladowychComponent,
    WyborTlumaczeniaPipe,
    MapaSpinnerComponent,
    KlikalnoscNaMapieComponent,
    KontrolerFunkcjiDodatkowychComponent,
    MobilnyKontrolerNarzedziComponent,
    BocznaBelkaKontenerComponent,
    OsPrzegladanieComponent,
    OsTematyComponent,
    OsSzlakiComponent,
    OsTagiComponent,
    OsInfoComponent,
    BelkaKartaMapyComponent,
    OsMapyPlanyComponent,
    ObiektOpisComponent,
    LokalizacjaOpisComponent,
    ObiektZalacznikiIZdjeciaComponent,
    OsPasekCzasuComponent,
    PasekCzasuComponent,
    WidokPaskaCzasuComponent,
    KontaktZAdministratoremDialogComponent,
    PomocBelkaBocznaComponent,
    PomocDialogComponent,
    KontaktZAdministratoremBelkaBocznaComponent,
    WyszukiwarkaMapowaComponent,
    WyszukiwarkaObiektyTabComponent,
    WynikiBrakComponent,
    WynikiObiektyDesktopComponent,
    WynikiObiektyMobileComponent,
    WyszukiwarkaObiektyOdlegloscTabComponent,
    WyszukiwarkaDzialkiTabComponent,
    WynikiDzialkiDesktopComponent,
    WynikiDzialkiMobileComponent,
    WyszukaneObiektyILokalizacjeComponent
  ],
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    // MatSliderModule,
    MatTooltipModule,
    NgxSliderModule,
    OracleMapsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    StoreModule.forFeature('modulMapowy', {
      interfejsUzytkownika: interfejsUzytkowikaReducer,
      widoki: lewyPanelWidokReducer,
      widokMapy: mapaWidokReducer,
      wyszukiwarka: wyszukiwarkaReducer,
    }
    ),
  ],
  exports: [
    SerwisMapowyComponent,
    IkonaSvgDirective,
    KontaktFormularzComponent,
    OracleMapsModule,
    MatLegacySliderModule,
    MatProgressSpinnerModule,
    PrzewijanyKomponentComponent,
    PrzyciskIkonaComponent,
    PrzyciskOkraglyComponent,
    TylkoDesktopDirective,
    TylkoMobileDirective,
    RerenderDirective,
  ],
  providers: [
    { provide: TlumaczeiaModulMapowyAdapter, useClass: DomyslnyTlumaczeniaModulMapowyAdapter },
    { provide: DostepneWarstwyModulMapowyAdapter, useClass: DomyslnyDostepneWarstwyAdapter },
    { provide: MapyModulMapowyAdapter, useClass: DomyslneMapyModulMapowyAdapter },
    { provide: GrupyWarstwPodkladowychModulMapowyAdapter, useClass: DomyslneGrupyWarstwPodkladowychAdapter },
    { provide: KomunikatyModulMapowyAdapter, useClass: DomyslneKomunikatyModulMapowyAdapter },
    { provide: KontaktZAdministratoremModulMapowyAdapter, useClass: DomyslnyKontaktZAdministratoremAdapter },
    { provide: KonfiguracjaModulMapowyAdapter, useClass: DomyslnaKonfiguracjaModulMapowyAdapter },
    { provide: WyszukiwarkaModulMapowyAdapter, useClass: DomyslnyWszukiwarkaAdapter },
    // { provide: MultimediaIZalacznikiModulMapowyAdapter, useClass: DomyslnyMultimediaIZalacznikiAdapter },
    { provide: PobieranieDanychModulMapowyAdapter, useClass: DomyslnyPobieranieDanychAdapter },
    // {provide: CmentarzeModulMapowyAdapter, useClass: DomyslneCmentarzeAdapter},
    // {provide: NieruchomosciModulMapowyAdapter, useClass: DomyslneNieruchomosciAdapter},
    // {provide: UslugiZewnetrzneModulMapowyAdapter, useClass: DomyslneUslugiZewnetrzneAdapter},
    {provide: PasekCzasuModulMapowyAdapter, useClass: DomyslnyPasekCzasuModulMapowyAdapter},
    { provide: PomocModulMapowyAdapter, useClass: DomyslnaPomocModulMapowyAdapter },
    // {provide: AnalizyPrzestrzenneModulMapowyAdapter, useClass: DomyslneAnalizyPrzstrzenneAdapter},
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true, hasBackdrop: true } },
  ]
})
export class ModulMapowyModule { }
