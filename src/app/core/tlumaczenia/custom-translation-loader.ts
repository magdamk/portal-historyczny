import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Klasa sluzy do łączenia tłumaczeń w jeden zestaw
 */
export class CustomTranslationLoader implements TranslateLoader {

  private http;
  prefix?: string;
  suffix?: string;

  /**
   * Konstruktor
   * @param http
   * @param prefix
   * @param suffix
   */
  constructor(http: HttpClient, prefix?: string, suffix?: string) {
    this.http = http;
    this.prefix = prefix;
    this.suffix = suffix
  }

  /**
   * Pobieranie tlumaczen
   * @param lang
   */
  getTranslation(lang: string): Observable<Object> {
    return new Observable(subscriber => {
      this.http.get(`/assets/i18n/${lang}.json`).subscribe((gres: any) => {
        this.http.get(`/assets/modul-mapowy/i18n/${lang}.json`).subscribe((mres: any) => {
          Object.keys(mres.codes).forEach(k => {
            if (gres.codes[k]) {
              gres.codes[k] = { ...gres.codes[k], ...mres.codes[k] }
            } else {
              gres.codes[k] = mres.codes[k];
            }
          });
        });
        subscriber.next(gres);
      })
    })
  }
}
