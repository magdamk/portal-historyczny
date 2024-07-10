import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SzablonStronyGlownejComponent} from './core/szablony/szablon-strony-glownej/szablon-strony-glownej.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./funkcjonalnosci/strona-startowa/strona-startowa.module').then((m) => m.StronaStartowaModule),
  },
  // {
  //   path: 'mapa',
  //   loadChildren: () => import('./funkcjonalnosci/mapa/map.module').then((m) => m.MapModule),
  // },
  {
    path: 'komunikat',
    loadChildren: () => import('./funkcjonalnosci/komunikaty/komunikaty.module').then((m) => m.KomunikatyModule)
  },
  {
    path: 'aktualnosci',
    component: SzablonStronyGlownejComponent,
    loadChildren: () => import('./funkcjonalnosci/aktualnosci/aktualnosci.module').then((m) => m.AktualnosciModule)
  },
  {
    path: '**', redirectTo: ''
  }
];

/**
 * Definicja routingu dla modułu
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
