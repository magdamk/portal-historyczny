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
import { PrzyciskProstokatnyComponent } from './komponenty/przycisk-prostokatny/przycisk-prostokatny.component';
import { KontaktFormularzComponent } from './komponenty/kontakt-formularz/kontakt-formularz.component';
import { TranslateModule } from "@ngx-translate/core";
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    VideoDirective,
    PrzyciskProstokatnyComponent,
    KontaktFormularzComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatLegacySliderModule,
    MatTooltipModule,
    TranslateModule,
    RouterModule,
    MatTooltipModule,
    // ObserversModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    // MatSelectModule,
  ],
  exports:[
    AudioDirective,
    DlugieNazwyComponent,
    FormatowanieInformacjiOObiekcieDirective,
    IkonaSvgDirective,
    ImgDirective,
    KontaktFormularzComponent,
    // MatLegacySliderModule,
    // MatFormFieldModule,
    // ReactiveFormsModule,
    // MatCheckboxModule,
    // FormsModule,
    MMOdkazHtmlPipe,
    PrzyciskIkonaComponent,
    PrzyciskMydloComponent,
    PrzyciskOkraglyComponent,
    PrzyciskProstokatnyComponent,
    PrzewijanyKomponentComponent,
    RerenderDirective,
    VideoDirective
  ]
})
export class CommonsModule { }
