import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KomunikatyRoutingModule} from './komunikaty-routing.module';
import {StronaKomunikatComponent} from './strony/strona-komunikat/strona-komunikat.component';
import {WspolneModule} from '../../wspolne/wspolne.module';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Definicja modułu
 */
@NgModule({
  declarations: [
    StronaKomunikatComponent
  ],
    imports: [
        CommonModule,
        KomunikatyRoutingModule,
        WspolneModule,
        TranslateModule
    ]
})
export class KomunikatyModule {
}
