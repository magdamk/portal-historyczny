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
import { StylizowanyKursorDirective } from './dyrektywy/stylizowany-kursor.directive';
import { SnackbarKomunikatComponent } from './komponenty/snackbar-komunikat/snackbar-komunikat.component';
import { PrzyciskProstokatnyComponent } from './komponenty/przyciski/przycisk-prostokatny/przycisk-prostokatny.component';
import { KomunikatCookieComponent } from './komponenty/cookie/komunikat-cookie/komunikat-cookie.component';
import { InformacjaPopupComponent } from './komponenty/informacja-popup/informacja-popup.component';
import { PotwierdzeniePopupComponent } from './komponenty/potwierdzenie-popup/potwierdzenie-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { KontaktFormularzComponent } from './komponenty/kontakt-formularz/kontakt-formularz.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ZamienNaKbMbPipe } from './pipes/zamien-na-kb-mb.pipe';
import { KomponentHostDirective } from './dyrektywy/komponent-host.directive';
import { ModulMapowyModule } from '../modul-mapowy/modul-mapowy.module';
@NgModule({
  declarations: [
    IkonySvgComponent,
    OdkazHtmlPipe,
    PrzyciskMydloComponent,
    StylizowanyKursorDirective,
    SnackbarKomunikatComponent,
    PrzyciskProstokatnyComponent,
    KomunikatCookieComponent,
    KomponentHostDirective,
    InformacjaPopupComponent,
    PotwierdzeniePopupComponent,
    KontaktFormularzComponent,
    ZamienNaKbMbPipe,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule,
    ObserversModule,
    MatDialogModule,
    TranslateModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    ModulMapowyModule
  ],
  exports: [
    KomunikatCookieComponent,
    PrzyciskProstokatnyComponent,
    PrzyciskMydloComponent,
    IkonySvgComponent,
    OdkazHtmlPipe,
    StylizowanyKursorDirective,
    SnackbarKomunikatComponent,
    PotwierdzeniePopupComponent,
    ZamienNaKbMbPipe,
    KontaktFormularzComponent,
    KomponentHostDirective
  ]
})
export class WspolneModule { }
