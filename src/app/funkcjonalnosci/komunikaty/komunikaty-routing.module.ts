import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StronaKomunikatComponent} from './strony/strona-komunikat/strona-komunikat.component';

const routes: Routes = [
  {path: '', component: StronaKomunikatComponent}
];

/**
 * Definicja routingu dla modułu
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KomunikatyRoutingModule { }
