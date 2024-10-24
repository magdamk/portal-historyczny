import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mmKomponentHost]'
})
export class MMKomponentHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
