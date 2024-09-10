import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mmRerender]'
})
export class RerenderDirective {

  /**
   * Konstruktor
   * @param templateRef
   * @param viewContainer
   */
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  /**
   * Funkcja nasłuchuje zmiany wartosci
   * @param val
   */
  @Input() set mmRerender(val: number) {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

}
