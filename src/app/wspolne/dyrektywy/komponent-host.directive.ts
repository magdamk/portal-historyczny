import {Directive, ViewContainerRef} from '@angular/core';

/**
 * Dyrektywa ładująca komponenty
 */
@Directive({
  selector: '[komponentHost]'
})
export class KomponentHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
