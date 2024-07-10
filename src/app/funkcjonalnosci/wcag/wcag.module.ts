import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { WcagWykonawcaComponent } from './komponenty/wcag-wykonawca/wcag-wykonawca.component';
import { WcagKontrolerComponent } from './komponenty/wcag-kontroler/wcag-kontroler.component';


@NgModule({
  declarations: [
    WcagWykonawcaComponent,
    WcagKontrolerComponent
  ],
  exports: [
    WcagKontrolerComponent,
    WcagWykonawcaComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    TranslateModule.forChild()
  ]
})
export class WcagModule { }
