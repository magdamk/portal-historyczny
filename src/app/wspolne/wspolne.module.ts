import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IkonySvgComponent } from './komponenty/ikony-svg/ikony-svg.component';
import { OdkazHtmlPipe } from './pipes/odkaz-html.pipe';
import { PrzyciskMydloComponent } from './komponenty/przyciski/przycisk-mydlo/przycisk-mydlo.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ObserversModule } from '@angular/cdk/observers';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from "@ngx-translate/core";
import { MatSliderModule } from '@angular/material/slider';
import { StylizowanyKursorDirective } from './dyrektywy/stylizowany-kursor.directive';
import { SnackbarKomunikatComponent } from './komponenty/snackbar-komunikat/snackbar-komunikat.component';
import { PrzyciskIkonaComponent } from './komponenty/przyciski/przycisk-ikona/przycisk-ikona.component';
import { PrzyciskProstokatnyComponent } from './komponenty/przyciski/przycisk-prostokatny/przycisk-prostokatny.component';
import { PrzyciskOkraglyComponent } from './komponenty/przyciski/przycisk-okragly/przycisk-okragly.component';
import { KomunikatCookieComponent } from './komponenty/cookie/komunikat-cookie/komunikat-cookie.component';
import { InformacjaPopupComponent } from './komponenty/informacja-popup/informacja-popup.component';
import { PotwierdzeniePopupComponent } from './komponenty/potwierdzenie-popup/potwierdzenie-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { KomponentHostDirective } from './dyrektywy/komponent-host.directive';
@NgModule({
  declarations: [
    IkonySvgComponent,
    OdkazHtmlPipe,
    PrzyciskMydloComponent,
    StylizowanyKursorDirective,
    SnackbarKomunikatComponent,
    PrzyciskIkonaComponent,
    PrzyciskProstokatnyComponent,
    PrzyciskOkraglyComponent,
    KomunikatCookieComponent,
    InformacjaPopupComponent,
    PotwierdzeniePopupComponent,
    KomponentHostDirective,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule,
    MatSliderModule,
    ObserversModule,
    MatDialogModule,
    TranslateModule,
    MatSnackBarModule,
    // ModulMapowyModule
  ],
  exports: [
    PrzyciskOkraglyComponent,
    KomunikatCookieComponent,
    PrzyciskProstokatnyComponent,
    PrzyciskMydloComponent,
    PrzyciskIkonaComponent,
    IkonySvgComponent,
    OdkazHtmlPipe,
    StylizowanyKursorDirective,
    SnackbarKomunikatComponent,
    PotwierdzeniePopupComponent,
    KomponentHostDirective
  ]
})
export class WspolneModule { }
