import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { NavigationEnd, Router } from "@angular/router";

export const LANGS = {
  PL: 'pl',
  EN: 'en'
}

/**
 * Serwis tłumaczeń
 */
@Injectable({
  providedIn: 'root'
})
export class TlumaczeniaService {

  private zmianaJezykaSubject$ = new BehaviorSubject<string>(LANGS.PL);

  constructor(private translate: TranslateService, private router: Router) {
    console.log('tumaczenia service constructor start: ', this.pobierzAktualnyJezyk());
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.translate.currentLang !== this.pobierzAktualnyJezyk()) {
          this.zmianaJezykaSubject$.next(this.translate.currentLang);
        }
      });
      console.log('tumaczenia serwice constructor end: ',this.pobierzAktualnyJezyk());
  }

  /**
   * Funkcja inicjalizuje obsługę wielu języków
   */
  init(lang: string): void {
    this.translate.use(lang);
    console.log('tumaczenia serwice init: ', lang);

  }

  /**
   * Funkcja pozwala przetłumaczyć kod na aktualnie wybrany język
   * @param kod - kod tłumaczenia
   */
  przetlumacz(kod: string): string {
    return this.translate.instant(kod);
  }

  /**
   * Funkcja pozwala przełączyć się pomiędzy językami
   */
  przelaczJezyk(): void {
    if (this.translate.currentLang === LANGS.PL) {
      this.zmienJezyk(LANGS.EN);
      return;
    }
    this.zmienJezyk(LANGS.PL);
  }

  /**
   * Funckaj pozwala zmienic język
   * @param jezyk - język
   */
  zmienJezyk(jezyk: string): void {
    if (jezyk !== this.translate.currentLang) {
      this.translate.use(jezyk)
        .pipe(take(1)).subscribe(() => {
          this.zmianaJezykaSubject$.next(jezyk);
        });
    }
  }

  /**
   * Funkcja zwraca obiekt śledzenia zmian języka
   */
  getZmianaJezykaSubject(): BehaviorSubject<string> {
    return this.zmianaJezykaSubject$;
  }

  /**
   * Funkcja pozwala pobrać aktualnie ustawiony język
   */
  pobierzAktualnyJezyk(): string {
    return this.zmianaJezykaSubject$.getValue();
  }
}
