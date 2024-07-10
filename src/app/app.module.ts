import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { WspolneModule } from './wspolne/wspolne.module';
import { StoreModule } from '@ngrx/store';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

// @Injectable()
// export class MyHammerConfig extends HammerGestureConfig {
//   override overrides = <any> {
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

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
