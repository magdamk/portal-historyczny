import { Component, Inject } from '@angular/core';
// import {TranslateService} from "@ngx-translate/core";
import {LANGS, TlumaczeniaService} from './core/tlumaczenia/serwisy/tlumaczenia.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'core.strona-startowa.tytul';
  wersjaAplikacji = '#WERSJA#';
  constructor(private tlumaczeniaService: TlumaczeniaService,
    // private komunikatyService: KomunikatyService,
    @Inject(DOCUMENT) private document: Document) {
      this.inicjujJezyk();
      // komunikatyService.init();
      this.tlumaczeniaService.getZmianaJezykaSubject().subscribe(jezyk => {
        document.getElementsByTagName('html')[0].setAttribute('lang', jezyk);
      });
      this.wypiszWersjeAplikacji();
  }

  /**
   * Funkcja przy starcie, dodaje do logów informacje owersji.
   */
  private wypiszWersjeAplikacji() {
    // console.log(this.wersjaAplikacji);
  }

  /**
   * Funkcja inicjuje jezyk aplikacji
   */
  private inicjujJezyk(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const lang = urlParams.get('lang');
    if (lang) {
      this.tlumaczeniaService.init(lang);
      // console.log(lang);
      return;
    }
    this.tlumaczeniaService.init(LANGS.PL);
  }

}
