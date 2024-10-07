import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LANGS } from '../tlumaczenia/serwisy/tlumaczenia.service';

/**
 * Interceptor dla ustawiania języka
 */
@Injectable()
export class JezykInterceptor implements HttpInterceptor {

  /**
   * Konstruktor
   * @param translate serwis tłumaczeń
   */
  constructor(private translate: TranslateService) {
  }

  /**
   * Funkcja przechwytuje zapytania rest i dodaje język do nagłówka
   * @param req - zapytanie
   * @param next - handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestHeaders = {
      'Accept-Language': LANGS.PL,
    };

    if (this.translate.currentLang) {
      requestHeaders = {
        'Accept-Language': this.translate.currentLang,
      };
    }
    const newReq = req.clone({
      setHeaders: requestHeaders,
    });
    return next.handle(newReq);
  }
}
