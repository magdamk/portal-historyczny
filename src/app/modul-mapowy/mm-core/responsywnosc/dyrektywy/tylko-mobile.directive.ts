import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ResponsywnoscUtils } from '../utils/responsywnosc-utils';

/**
 * Dyrektywa usuwa obiekty jeżeli tryb wyświetlania inny niż mobile
 */
@Directive({
  selector: '[mmTylkoMobile]'
})
export class TylkoMobileDirective implements OnInit, OnDestroy {


  resizeSubscription?: Subscription;
  embeddedView?: any;

  /**
   * Konstruktor
   * @param viewContainer
   * @param templateRef
   */
  constructor(private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.ustawWidocznoscKomponentu();
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(evt => {
      this.ustawWidocznoscKomponentu();
    });
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  /**
   * Funkcja ustawia widocnosc komponentu oznaczonego dyrektywą
   */
  private ustawWidocznoscKomponentu(): void {
    if (!ResponsywnoscUtils.czyTrybDesktop()) {
      if (!this.embeddedView) {
        this.embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
      this.embeddedView = undefined;
    }
  }


}
