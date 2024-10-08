import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrzyciskIkonaComponent } from './komponenty/przycisk-ikona/przycisk-ikona.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatLegacySliderModule } from '@angular/material/legacy-slider';
import { IkonaSvgDirective } from './directives/ikona-svg.directive';
import { PrzewijanyKomponentComponent } from './komponenty/przewijany-komponent/przewijany-komponent.component';
import { RerenderDirective } from './directives/rerender.directive';
import { PrzyciskMydloComponent } from './komponenty/przycisk-mydlo/przycisk-mydlo.component';
import { PrzyciskOkraglyComponent } from './komponenty/przycisk-okragly/przycisk-okragly.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MMOdkazHtmlPipe } from './pipes/mm-odkaz-html.pipe';
import { DlugieNazwyComponent } from './komponenty/dlugie-nazwy/dlugie-nazwy.component';

@NgModule({
  declarations: [
    PrzyciskIkonaComponent,
    IkonaSvgDirective,
    MMOdkazHtmlPipe,
    PrzewijanyKomponentComponent,
    RerenderDirective,
    PrzyciskMydloComponent,
    PrzyciskOkraglyComponent,
    DlugieNazwyComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatLegacySliderModule,

    MatTooltipModule,
    RouterModule
  ],
  exports:[
    IkonaSvgDirective,
    MatLegacySliderModule,
    MMOdkazHtmlPipe,
    PrzyciskIkonaComponent,
    PrzyciskMydloComponent,
    PrzyciskOkraglyComponent,
    PrzewijanyKomponentComponent,
    RerenderDirective
  ]
})
export class CommonsModule { }
