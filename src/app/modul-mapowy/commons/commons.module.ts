import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrzyciskIkonaComponent } from './komponenty/przycisk-ikona/przycisk-ikona.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatLegacySliderModule } from '@angular/material/legacy-slider';
import { IkonaSvgDirective } from './directives/ikona-svg.directive';
import { PrzewijanyKomponentComponent } from './komponenty/przewijany-komponent/przewijany-komponent.component';
import { RerenderDirective } from './directives/rerender.directive';



@NgModule({
  declarations: [
    PrzyciskIkonaComponent,
    IkonaSvgDirective,
    PrzewijanyKomponentComponent,
    RerenderDirective
  ],
  imports: [
    CommonModule,
    MatLegacySliderModule,
    MatTooltipModule
  ],
  exports:[
    IkonaSvgDirective,
    MatLegacySliderModule,
    PrzyciskIkonaComponent,
    PrzewijanyKomponentComponent,
    RerenderDirective
  ]
})
export class CommonsModule { }
