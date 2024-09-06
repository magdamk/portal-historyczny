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


@NgModule({
  declarations: [
    SerwisMapowyComponent,
    PasekStanuComponent,
    TylkoDesktopDirective,
    TylkoMobileDirective,
    WidokMapyNarzedziaSekcjaComponent,
    WidokMapyComponent,
    InformacjeOObiekcieComponent
  ],
  imports: [
    CommonModule,
    CommonsModule,
    MatTooltipModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    SerwisMapowyComponent,
    IkonaSvgDirective,
    TylkoDesktopDirective,
    TylkoMobileDirective
  ],
  providers: [
    { provide: TlumaczeiaModulMapowyAdapter, useClass: DomyslnyTlumaczeniaModulMapowyAdapter },
    { provide: KonfiguracjaModulMapowyAdapter, useClass: DomyslnaKonfiguracjaModulMapowyAdapter },
    { provide: GrupyWarstwPodkladowychModulMapowyAdapter, useClass: DomyslneGrupyWarstwPodkladowychAdapter },
  ]
})
export class ModulMapowyModule { }
