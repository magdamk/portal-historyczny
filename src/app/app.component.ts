import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portal-historyczny';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('[en]');
  }
  useLanguage(language: string): void {
    this.translate.use(language);
}
}
