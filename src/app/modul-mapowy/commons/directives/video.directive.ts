import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mmVideo]'
})
export class VideoDirective {

  @Input() set mmVideo(mmVideo: string | undefined){
    this.ustawWidocznoscKomponentu(mmVideo);
  }
  embeddedView?: any;
  private rozszerzeniaVideo = ['mp4', 'ogv', 'webm','m4v'];

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
    if (!rozszerzenie || !this.rozszerzeniaVideo.includes(rozszerzenie)) {
      this.viewContainer.clear();
      this.embeddedView = undefined;
    } else {
      if (!this.embeddedView) {
        this.embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }
}
