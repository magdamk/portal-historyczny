import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SzablonStronyGlownejComponent} from '../../core/szablony/szablon-strony-glownej/szablon-strony-glownej.component';
import {StronaStartowaComponent} from './strony/strony/strona-startowa/strona-startowa.component';
import {StronaCmsComponent} from './strony/strony/strona-cms/strona-cms.component';

const routes: Routes = [
  {
    path: '',
    component: SzablonStronyGlownejComponent,
    children: [
      {path: '', component: StronaStartowaComponent},
      {path: 'strony/:sciezkaUrl', component: StronaCmsComponent},
    ],
  }
];

/**
 * Definicja routingu dla modułu
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StronaStartowaRoutingModule {
}
