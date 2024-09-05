import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrzyciskIkonaComponent } from './komponenty/przycisk-ikona/przycisk-ikona.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IkonaSvgDirective } from './directives/ikona-svg.directive';



@NgModule({
  declarations: [
    PrzyciskIkonaComponent,
    IkonaSvgDirective
  ],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports:[
    IkonaSvgDirective,
    PrzyciskIkonaComponent
  ]
})
export class CommonsModule { }
