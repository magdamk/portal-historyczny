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
// import { PasekCzasuModulMapowyAdapter, DomyslnyPasekCzasuModulMapowyAdapter } from './mm-core/providers/pasek-czasu-adapter';
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
  ],
  imports: [
    CommonModule,
    CommonsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    OracleMapsModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    SerwisMapowyComponent,
    IkonaSvgDirective,
    OracleMapsModule,
    MatLegacySliderModule,
    MatProgressSpinnerModule,
    PrzewijanyKomponentComponent,
    TylkoDesktopDirective,
    TylkoMobileDirective,
    RerenderDirective
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
    { provide: MultimediaIZalacznikiModulMapowyAdapter, useClass: DomyslnyMultimediaIZalacznikiAdapter },
    { provide: PobieranieDanychModulMapowyAdapter, useClass: DomyslnyPobieranieDanychAdapter },
    // {provide: CmentarzeModulMapowyAdapter, useClass: DomyslneCmentarzeAdapter},
    // {provide: NieruchomosciModulMapowyAdapter, useClass: DomyslneNieruchomosciAdapter},
    // {provide: UslugiZewnetrzneModulMapowyAdapter, useClass: DomyslneUslugiZewnetrzneAdapter},
    // {provide: PasekCzasuModulMapowyAdapter, useClass: DomyslnyPasekCzasuModulMapowyAdapter},
    { provide: PomocModulMapowyAdapter, useClass: DomyslnaPomocModulMapowyAdapter },
    // {provide: AnalizyPrzestrzenneModulMapowyAdapter, useClass: DomyslneAnalizyPrzstrzenneAdapter},
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true, hasBackdrop: true } },
  ]
})
export class ModulMapowyModule { }
