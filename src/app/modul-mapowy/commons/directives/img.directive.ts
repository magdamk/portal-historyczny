import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mmImg]'
})
export class ImgDirective {

  @Input() set mmImg(mmImg: string | undefined){
    this.ustawWidocznoscKomponentu(mmImg);
  }
  embeddedView?: any;
  private rozszerzeniaImg = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp','tif','tiff'];

  /**
   * Konstruktor
   * @param viewContainer
   * @param templateRef
   */
  constructor(private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>) {
  }

  /**
   * Funkcja ustawia widocznosc komponentu oznaczonego dyrektywą
   */
  private ustawWidocznoscKomponentu(rozszerzenie: string | undefined): void {
    if (!rozszerzenie || !this.rozszerzeniaImg.includes(rozszerzenie)) {
      this.viewContainer.clear();
      this.embeddedView = undefined;
    } else {
      if (!this.embeddedView) {
        this.embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }
}
