import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StronaMapyComponent } from './strony/strona-mapy/strona-mapy.component';
import { StronaPodgladuMapyComponent } from './strony/strona-podgladu-mapy/strona-podgladu-mapy.component';
import { MapRoutingModule } from './map-routing.module';
import { ModulMapowyModule } from 'src/app/modul-mapowy/modul-mapowy.module';
import { KomunikatyModulMapowyAdapter } from 'src/app/core/adaptery/komunikaty-adapter';
import { KomunikatyProviderService } from 'src/app/wspolne/serwisy/komunikaty-provider.service';



@NgModule({
  declarations: [
    StronaMapyComponent,
    StronaPodgladuMapyComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    ModulMapowyModule
  ],
  providers:[
    {provide: KomunikatyModulMapowyAdapter, useClass: KomunikatyProviderService},
  ]
})
export class MapModule { }
