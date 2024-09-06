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
import { TylkoDesktopDirective } from '../core/responsywnosc/dyrektywy/tylko-desktop.directive';
import { TylkoMobileDirective } from '../core/responsywnosc/dyrektywy/tylko-mobile.directive';


@NgModule({
  declarations: [
    SerwisMapowyComponent,
    PasekStanuComponent,
    TylkoDesktopDirective,
    TylkoMobileDirective
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
  ]
})
export class ModulMapowyModule { }
