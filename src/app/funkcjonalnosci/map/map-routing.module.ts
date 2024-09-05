import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StronaMapyComponent} from './strony/strona-mapy/strona-mapy.component';
import {SzablonMapaComponent} from "../../core/szablony/szablon-mapa/szablon-mapa.component";
// import {StronaMapyGuard} from "./guards/strona-mapy.guard";
import {StronaPodgladuMapyComponent} from "./strony/strona-podgladu-mapy/strona-podgladu-mapy.component";

// loadChildren: () => import('./funkcjonalnosci/komunikaty/komunikaty.module').then((m) => m.KomunikatyModule)
const routes: Routes = [
  {
    path: 'podglad',

    component: SzablonMapaComponent,
    children: [
      {path: ':uuid', component: StronaPodgladuMapyComponent}
    ]
  },
  {
    path: '',
    component: SzablonMapaComponent,
    children: [
      {path: '', component: StronaMapyComponent},
      {path: ':uuid', component: StronaMapyComponent}
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
