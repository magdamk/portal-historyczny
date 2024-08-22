import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WcagModule} from '../wcag/wcag.module';
import {SzablonyModule} from '../../core/szablony/szablony.module';
import {StronaStartowaRoutingModule} from './strona-startowa-routing.module';
import {KontaktModule} from '../kontakt/kontakt.module';
import {WspolneModule} from '../../wspolne/wspolne.module';
import {StronyModule} from './strony/strony.module';
import {ModulMapowyModule} from "@modul-mapowy"
import {HammerModule} from '@angular/platform-browser';

/**
 * Definicja modułu
 */
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StronaStartowaRoutingModule,
    KontaktModule,
    SzablonyModule,
    WspolneModule,
    StronyModule,
    WcagModule,
    HammerModule,
    ModulMapowyModule
  ],
})
export class StronaStartowaModule {
}
