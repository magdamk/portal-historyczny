import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StronaMapyComponent } from './strony/strona-mapy/strona-mapy.component';
import { StronaPodgladuMapyComponent } from './strony/strona-podgladu-mapy/strona-podgladu-mapy.component';
import { MapRoutingModule } from './map-routing.module';
import { ModulMapowyModule } from 'src/app/modul-mapowy/modul-mapowy.module';
import { KomunikatyModulMapowyAdapter } from 'src/app/core/adaptery/komunikaty-adapter';
import { KomunikatyProviderService } from 'src/app/wspolne/serwisy/komunikaty-provider.service';
import { MapyModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/mapy-adapter';
import { TlumaczeiaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/tlumaczenia-modul-mapowy-adapter';
import { KontaktZAdministratoremModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/kontakt-z-administratorem-adapter';
import { GrupyWarstwPodkladowychModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/grupy-warstw-podkladowych-adapter';
import { DostepneWarstwyModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/dostepne-warstwy-adapter';
import { MultimediaIZalacznikiModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/multimedia-i-zalaczniki-adapter';
import { WyszukiwarkaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/wyszukiwarka-adapter';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { MatPaginatorIntl } from '@angular/material/paginator';
// import { PobieranieDanychModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/pobieranie-danych-adapter';
// import { PomocModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/pomoc-adapter';
import { MapyProviderService } from './adaptery/mapy-provider.service';
import { TlumaczeniaProviderService } from './adaptery/tlumaczenia-provider.service';
import { GrupaWarstwPodkladowychProviderService } from './adaptery/grupa-warstw-podkladowych-provider.service';
import { PaginacjaTlumaczeniaService } from 'src/app/core/service/paginacja-tlumaczenia.service';
import { KontaktZAdministratoremProviderService } from '../kontakt/serwisy/kontakt-z-administratorem-provider.service';
import { WidoczneWarstwyProviderService } from './adaptery/widoczne-warstwy-provider.service';
import { WyszukiwarkaProviderService } from 'src/app/wspolne/serwisy/wyszukiwarka-provider.service';
// import { MultimediaIZalacznikiProviderService } from './adaptery/multimedia-i-zalaczniki-provider.service';
import { KonfiguracjaModulMapowyProviderService } from './adaptery/konfiguracja-modul-mapowy-provider.service';



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
    {provide: MapyModulMapowyAdapter, useClass: MapyProviderService},
    {provide: TlumaczeiaModulMapowyAdapter, useClass: TlumaczeniaProviderService},
    {provide: GrupyWarstwPodkladowychModulMapowyAdapter, useClass: GrupaWarstwPodkladowychProviderService},
    {provide: DostepneWarstwyModulMapowyAdapter, useClass: WidoczneWarstwyProviderService},
    {provide: WyszukiwarkaModulMapowyAdapter, useClass: WyszukiwarkaProviderService},
    // {provide: MultimediaIZalacznikiModulMapowyAdapter, useClass: MultimediaIZalacznikiProviderService},
    // {provide: KontaktZAdministratoremModulMapowyAdapter, useClass: KontaktZAdministratoremProviderService},
    {provide: KomunikatyModulMapowyAdapter, useClass: KomunikatyProviderService},
    {provide: KonfiguracjaModulMapowyAdapter, useClass: KonfiguracjaModulMapowyProviderService},
    {provide: MatPaginatorIntl, useClass: PaginacjaTlumaczeniaService},
    // {provide: PobieranieDanychModulMapowyAdapter, useClass: PobieranieDanychProviderService},
    // {provide: CmentarzeModulMapowyAdapter, useClass: CmentarzeProviderService},
    // {provide: NieruchomosciModulMapowyAdapter, useClass: NieruchomosciProviderService},
    // {provide: UslugiZewnetrzneModulMapowyAdapter, useClass: UslugiZewnetrzneProviderService},
    // {provide: PasekCzasuModulMapowyAdapter, useClass: PasekCzasuProviderService},
    // {provide: PomocModulMapowyAdapter, useClass: PomocProviderService},
    // {provide: AnalizyPrzestrzenneModulMapowyAdapter, useClass: AnalizyPrzestrzenneProvider}
    // {provide: KomunikatyModulMapowyAdapter, useClass: KomunikatyProviderService},
  ]
})
export class MapModule { }
