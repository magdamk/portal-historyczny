import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerwisMapowyComponent } from './serwis-mapowy/strony/serwis-mapowy/serwis-mapowy.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonsModule } from "./commons/commons.module";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TlumaczeiaModulMapowyAdapter, DomyslnyTlumaczeniaModulMapowyAdapter } from '../core/providers/tlumaczenia-modul-mapowy-adapter';
import { IkonaSvgDirective } from './commons/directives/ikona-svg.directive';


@NgModule({
  declarations: [
    SerwisMapowyComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    CommonsModule,
    TranslateModule,
  ],
  exports: [
    SerwisMapowyComponent,
    IkonaSvgDirective
  ],
  providers: [
    { provide: TlumaczeiaModulMapowyAdapter, useClass: DomyslnyTlumaczeniaModulMapowyAdapter },
  ]
})
export class ModulMapowyModule { }
