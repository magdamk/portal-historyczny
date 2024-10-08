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
import { FormatowanieInformacjiOObiekcieDirective } from './directives/formatowanie-informacji-o-obiekcie.directive';
import { ImgDirective } from './directives/img.directive';
import { AudioDirective } from './directives/audio.directive';
import { VideoDirective } from './directives/video.directive';

@NgModule({
  declarations: [
    PrzyciskIkonaComponent,
    IkonaSvgDirective,
    MMOdkazHtmlPipe,
    PrzewijanyKomponentComponent,
    RerenderDirective,
    PrzyciskMydloComponent,
    PrzyciskOkraglyComponent,
    DlugieNazwyComponent,
    FormatowanieInformacjiOObiekcieDirective,
    ImgDirective,
    AudioDirective,
    VideoDirective
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatLegacySliderModule,

    MatTooltipModule,
    RouterModule
  ],
  exports:[
    AudioDirective,
    DlugieNazwyComponent,
    FormatowanieInformacjiOObiekcieDirective,
    IkonaSvgDirective,
    ImgDirective,
    MatLegacySliderModule,
    MMOdkazHtmlPipe,
    PrzyciskIkonaComponent,
    PrzyciskMydloComponent,
    PrzyciskOkraglyComponent,
    PrzewijanyKomponentComponent,
    RerenderDirective,
    VideoDirective
  ]
})
export class CommonsModule { }
