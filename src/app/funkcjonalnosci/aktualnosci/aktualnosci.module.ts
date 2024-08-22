import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AktualnosciRoutingModule} from './aktualnosci-routing.module';
import {AktualnosciBelkaBocznaComponent} from './komponenty/aktualnosci-belka-boczna/aktualnosci-belka-boczna.component';
import {StronaArchiwumAktualnosciComponent} from './strony/strona-archiwum-aktualnosci/strona-archiwum-aktualnosci.component';
import {WspolneModule} from '../../wspolne/wspolne.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from "@angular/material/card";
import {DataCzasModule} from "../../core/data-czas/data-czas.module";
import { ModulMapowyModule } from '@modul-mapowy';

/**
 * Definicja modułu
 */
@NgModule({
  declarations: [
    AktualnosciBelkaBocznaComponent,
    StronaArchiwumAktualnosciComponent
  ],
  exports: [
    AktualnosciBelkaBocznaComponent
  ],
  imports: [
    CommonModule,
    WspolneModule,
    MatIconModule,
    TranslateModule,
    AktualnosciRoutingModule,
    MatCardModule,
    DataCzasModule,
    ModulMapowyModule
  ]
})
export class AktualnosciModule {
}
