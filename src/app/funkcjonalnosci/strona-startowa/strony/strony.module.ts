import {NgModule} from '@angular/core';
import {StronaStartowaComponent} from './strony/strona-startowa/strona-startowa.component';
import {CommonModule} from '@angular/common';
import {GlownaWyszukiwarkaComponent} from './komponenty/glowna-wyszukiwarka/glowna-wyszukiwarka.component';
import {KategorieMapComponent} from './komponenty/kategorie-map/kategorie-map.component';
import {KartaMapyComponent} from './komponenty/karta-mapy/karta-mapy.component';
import {KartaWlasnaMapaComponent} from './komponenty/karta-wlasna-mapa/karta-wlasna-mapa.component';
import {WspolneModule} from '../../../wspolne/wspolne.module';
import {StronaCmsComponent} from './strony/strona-cms/strona-cms.component';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {WynikWyszukiwaniaComponent} from './komponenty/wynik-wyszukiwania/wynik-wyszukiwania.component';
import {MatDividerModule} from '@angular/material/divider';
// import {ModulMapowyModule} from '@modul-mapowy';

/**
 * Definicja modułu
 */
@NgModule({
  declarations: [
    StronaStartowaComponent,
    GlownaWyszukiwarkaComponent,
    KategorieMapComponent,
    KartaMapyComponent,
    KartaWlasnaMapaComponent,
    StronaCmsComponent,
    WynikWyszukiwaniaComponent,
  ],
  imports: [
    CommonModule,
    WspolneModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    TranslateModule.forChild(),
    MatDividerModule,
    // ModulMapowyModule,
    WspolneModule,
  ],
  exports: [
    StronaStartowaComponent
  ]
})
export class StronyModule { }
