import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mmAudio]'
})
export class AudioDirective {

  @Input() set mmAudio(mmAudio: string | undefined){
  this.ustawWidocznoscKomponentu(mmAudio);
}

embeddedView?: any;
private rozszerzeniaAudio = ['mp3', 'ogg', 'wav','flac'];

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
  if (!rozszerzenie || !this.rozszerzeniaAudio.includes(rozszerzenie)) {
    this.viewContainer.clear();
    this.embeddedView = undefined;
  } else {
    if (!this.embeddedView) {
      this.embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

}
