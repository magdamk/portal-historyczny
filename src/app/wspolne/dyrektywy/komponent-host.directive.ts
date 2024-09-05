import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appKomponentHost]'
})
export class KomponentHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
