import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PomocBelkaBocznaComponent } from './pomoc-belka-boczna/pomoc-belka-boczna.component';
import { ModulMapowyModule } from 'src/app/modul-mapowy/modul-mapowy.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    PomocBelkaBocznaComponent
  ],
  imports: [
    CommonModule,
    ModulMapowyModule,
    TranslateModule
  ]
})
export class PomocModule { }
