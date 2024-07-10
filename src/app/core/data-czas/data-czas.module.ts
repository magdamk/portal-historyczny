import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatujDatePipe } from './pipes/formatuj-date.pipe';



@NgModule({
  declarations: [
    FormatujDatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class DataCzasModule { }
