import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StronaMapyComponent} from './strony/strona-mapy/strona-mapy.component';
import {SzablonMapaComponent} from "../../core/szablony/szablon-mapa/szablon-mapa.component";
// import {StronaMapyGuard} from "./guards/strona-mapy.guard";
import {StronaPodgladuMapyComponent} from "./strony/strona-podgladu-mapy/strona-podgladu-mapy.component";
import { BelkaKartaMapyComponent } from 'src/app/modul-mapowy/serwis-mapowy/komponenty/boczna-belka/belka-karta-mapy/belka-karta-mapy.component';

// loadChildren: () => import('./funkcjonalnosci/komunikaty/komunikaty.module').then((m) => m.KomunikatyModule)
const routes: Routes = [
  {
    path: 'podglad',

    component: SzablonMapaComponent,
    children: [
      {path: ':uuid', component: StronaPodgladuMapyComponent,pathMatch: 'full',}
    ]
  },
  {
    path: '',
    component: SzablonMapaComponent,
    children: [
      {path: '', component: StronaMapyComponent,pathMatch: 'full',},
      {path: ':uuid', component: StronaMapyComponent,pathMatch: 'full',}
    ],
  },
];

/**
 * Definicja routingu dla modułu
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {
}
