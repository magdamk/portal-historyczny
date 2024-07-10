import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StronaArchiwumAktualnosciComponent} from './strony/strona-archiwum-aktualnosci/strona-archiwum-aktualnosci.component';

const routes: Routes = [
  {
    path: '', component: StronaArchiwumAktualnosciComponent
  }
];

/**
 * Definicja routingu dla modułu
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AktualnosciRoutingModule {
}
