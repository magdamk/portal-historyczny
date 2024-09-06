import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OracleMapsDirective } from './directives/oracle-maps.directive';



@NgModule({
  declarations: [
    OracleMapsDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OracleMapsDirective
  ]
})
export class OracleMapsModule { }
