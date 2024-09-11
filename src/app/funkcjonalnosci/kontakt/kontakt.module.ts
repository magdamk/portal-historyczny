import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KontaktRoutingModule} from './kontakt-routing.module';
import {KontaktDialogComponent} from './komponenty/kontakt-dialog/kontakt-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {WspolneModule} from '../../wspolne/wspolne.module';
import {TranslateModule} from '@ngx-translate/core';
import {KontaktBelkaBocznaComponent} from './komponenty/kontakt-belka-boczna/kontakt-belka-boczna.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  // KomunikatyModulMapowyAdapter,
  KontaktZAdministratoremModulMapowyAdapter,
  // ModulMapowyModule
} from '../../core/adaptery/kontakt-z-administratorem-adapter';
import {KontaktZAdministratoremProviderService} from './serwisy/kontakt-z-administratorem-provider.service';
import {KomunikatyProviderService} from "../../wspolne/serwisy/komunikaty-provider.service";
import {MatTooltipModule} from '@angular/material/tooltip';
import { KomunikatyModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/komunikaty-adapter';
import { ModulMapowyModule } from 'src/app/modul-mapowy/modul-mapowy.module';

/**
 * Definicja modułu
 */
@NgModule({
  declarations: [
    KontaktDialogComponent,
    KontaktBelkaBocznaComponent
  ],
  imports: [
    CommonModule,
    KontaktRoutingModule,
    MatDialogModule,
    MatInputModule,
    WspolneModule,
    TranslateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTooltipModule,
    ModulMapowyModule
  ],
  providers: [
    {provide: KontaktZAdministratoremModulMapowyAdapter, useClass: KontaktZAdministratoremProviderService},
    {provide: KomunikatyModulMapowyAdapter, useClass: KomunikatyProviderService},
  ]

})
export class KontaktModule {
}



