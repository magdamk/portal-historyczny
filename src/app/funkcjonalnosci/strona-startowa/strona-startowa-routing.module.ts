import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {SzablonStronyGlownejComponent} from '../../core/szablony/szablon-strony-glownej/szablon-strony-glownej.component';
import {StronaStartowaComponent} from './strony/strony/strona-startowa/strona-startowa.component';
import {StronaCmsComponent} from './strony/strony/strona-cms/strona-cms.component';

const routes: Routes = [
  {
    path: '',
    component: SzablonStronyGlownejComponent,
    children: [
      {path: '', component: StronaStartowaComponent},
      {path: 'strony/:sciezkaUrl', component: StronaCmsComponent},
      {
        path: 'dsh',
        component: SzablonStronyGlownejComponent,
            resolve: {
                url: 'externalUrlRedirectResolver'
            },
            data: {
                externalUrl: 'https://dsh.waw.pl/'
            }
      },
      {
        path: 'mw',
        component: SzablonStronyGlownejComponent,
            resolve: {
                url: 'externalUrlRedirectResolver'
            },
            data: {
                externalUrl: 'https://muzeumwarszawy.pl/'
            }
      },
      {
        path: 'ahm',
        component: SzablonStronyGlownejComponent,
            resolve: {
                url: 'externalUrlRedirectResolver'
            },
            data: {
                externalUrl: 'https://audiohistoria.pl/'
            }
      },
    ],
  },
  {
    path: 'dsh',
    component: SzablonStronyGlownejComponent,
        resolve: {
            url: 'externalUrlRedirectResolver'
        },
        data: {
            externalUrl: 'https://dsh.waw.pl/'
        }
  },
  {
    path: 'mw',
    component: SzablonStronyGlownejComponent,
        resolve: {
            url: 'externalUrlRedirectResolver'
        },
        data: {
            externalUrl: 'https://muzeumwarszawy.pl/'
        }
  },
  {
    path: 'ahm',
    component: SzablonStronyGlownejComponent,
        resolve: {
            url: 'externalUrlRedirectResolver'
        },
        data: {
            externalUrl: 'https://https://audiohistoria.pl/'
        }
  },
];

/**
 * Definicja routingu dla modułu
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
        provide: 'externalUrlRedirectResolver',
        useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        {
          window.open((route.data as any).externalUrl,'_blank');
          window.location.href = '';
        }
    }]
})
export class StronaStartowaRoutingModule {
}
