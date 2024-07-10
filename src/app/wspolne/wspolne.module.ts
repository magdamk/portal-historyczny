import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IkonySvgComponent } from './komponenty/ikony-svg/ikony-svg.component';
import { OdkazHtmlPipe } from './pipes/odkaz-html.pipe';
import { PrzyciskMydloComponent } from './komponenty/przyciski/przycisk-mydlo/przycisk-mydlo.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ObserversModule } from '@angular/cdk/observers';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateModule} from "@ngx-translate/core";
import {MatSliderModule} from '@angular/material/slider';
@NgModule({
  declarations: [
    IkonySvgComponent,
    OdkazHtmlPipe,
    PrzyciskMydloComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule,
    MatSliderModule,
    ObserversModule,
    MatIconModule,
    TranslateModule,
    MatSnackBarModule,
  ],
  exports:[
    PrzyciskMydloComponent,
    IkonySvgComponent,
    OdkazHtmlPipe,
  ]
})
export class WspolneModule { }
