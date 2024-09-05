import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StronaMapyComponent } from './strony/strona-mapy/strona-mapy.component';
import { StronaPodgladuMapyComponent } from './strony/strona-podgladu-mapy/strona-podgladu-mapy.component';
import { MapRoutingModule } from './map-routing.module';
import { ModulMapowyModule } from 'src/app/modul-mapowy/modul-mapowy.module';



@NgModule({
  declarations: [
    StronaMapyComponent,
    StronaPodgladuMapyComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    ModulMapowyModule
  ]
})
export class MapModule { }
