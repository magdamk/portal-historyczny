import { Injectable, NgModule } from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {JezykInterceptor} from './core/interceptory/jezyk.interceptor';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { WspolneModule } from './wspolne/wspolne.module';
import { StoreModule } from '@ngrx/store';
// import { TylkoDesktopDirective } from './core/responsywnosc/dyrektywy/tylko-desktop.directive';
// import { TylkoMobileDirective } from './core/responsywnosc/dyrektywy/tylko-mobile.directive';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
//   return new TranslateHttpLoader(http, './assets/modul-mapowy/i18n/', '.json');
// }
// @Injectable()
// export class MyHammerConfig extends HammerGestureConfig {
//     overrides = <any> {
//     swipe: { direction: Hammer.DIRECTION_ALL },
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    WspolneModule,
  ],

  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: JezykInterceptor,
    multi: true,
  },
  // {
  //   provide: HAMMER_GESTURE_CONFIG,
  //   useClass: MyHammerConfig,
  // },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
