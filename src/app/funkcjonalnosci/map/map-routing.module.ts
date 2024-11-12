import {NgModule} from '@angular/core';
import {provideRouter, RouterModule, Routes, withDebugTracing, withHashLocation} from '@angular/router';
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
      {path: ':uuid', component: StronaPodgladuMapyComponent,pathMatch: 'full',}
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
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withHashLocation())
  ]
})
export class MapRoutingModule {
}
