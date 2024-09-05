import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SzablonStronyGlownejComponent } from './szablon-strony-glownej/szablon-strony-glownej.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { StopkaComponent } from './komponenty/stopka/stopka.component';
import { LogoNaglowkaComponent } from './komponenty/logo-naglowka/logo-naglowka.component';
import { WcagModule } from 'src/app/funkcjonalnosci/wcag/wcag.module';
import { RouterModule } from '@angular/router';
import { PrzyciskZmienJezykComponent } from './komponenty/przycisk-zmien-jezyk/przycisk-zmien-jezyk.component';
import { WspolneModule } from 'src/app/wspolne/wspolne.module';
import { PrzyciskPokazKontaktComponent } from './komponenty/przycisk-pokaz-kontakt/przycisk-pokaz-kontakt.component';
import { PrzyciskPokazPomocComponent } from './komponenty/przycisk-pokaz-pomoc/przycisk-pokaz-pomoc.component';
import { AktualnosciModule } from 'src/app/funkcjonalnosci/aktualnosci/aktualnosci.module';
// import { ModulMapowyModule } from '@modul-mapowy';

@NgModule({
  declarations: [
    SzablonStronyGlownejComponent,
    StopkaComponent,
    LogoNaglowkaComponent,
    PrzyciskZmienJezykComponent,
    PrzyciskPokazKontaktComponent,
    PrzyciskPokazPomocComponent
  ],
  exports: [
    SzablonStronyGlownejComponent
  ],
  imports: [
    CommonModule,
    WcagModule,
    RouterModule,
    AktualnosciModule,
    WspolneModule,
    // PomocModule,
    MatIconModule,
    MatTooltipModule,
    // ModulMapowyModule,
    // ZmianaMapyModule,
    // WyborMapyModule,
    TranslateModule.forChild()
  ]
})
export class SzablonyModule { }
