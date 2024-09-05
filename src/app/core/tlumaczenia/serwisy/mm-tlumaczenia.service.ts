import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';
import {take} from 'rxjs/operators';

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

  constructor(private translate: TranslateService) {
    this.init();
  }

  /**
   * Funkcja inicjalizuje obsługę wielu języków
   */
  init(): void {
    const lang = this.translate.currentLang;
    const zmiana = lang === LANGS.PL ? LANGS.EN : LANGS.PL
    this.translate.use(zmiana).subscribe(() => {
      this.translate.use(lang).subscribe(()=>{
        this.zmianaJezykaSubject$.next(lang);
      });

    })
  }

  /**
   * Funkcja pozwala skorygować aktualy jezyk
   */
  spawdzPoprawnoscJezyka() {
    if (this.zmianaJezykaSubject$.getValue() !== this.translate.currentLang) {
      this.zmianaJezykaSubject$.next(this.translate.currentLang);
    }
  }

  /**
   * Funkcja pozwala przetłumaczyć kod na aktualnie wybrany język
   * @param kod - kod tłumaczenia
   */
  przetlumacz(kod: string): string {
    return this.translate?.instant(kod);
  }

  /**
   * Funkcja pozwala przełączyć się pomiędzy językami
   */
  przelaczJezyk(): void {
    if (this.translate?.currentLang === LANGS.PL) {
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
    if (jezyk !== this.translate?.currentLang) {
      this.translate?.use(jezyk)
        .pipe(take(1)).subscribe(() => {
        this.translate?.use(jezyk)
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
