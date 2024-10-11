import {Component} from '@angular/core';
import { Router } from '@angular/router';

/**
 * Szablon widoku mapy
 */
@Component({
  selector: 'app-szablon-mapa',
  templateUrl: './szablon-mapa.component.html',
  styleUrls: ['./szablon-mapa.component.scss']
})
export class SzablonMapaComponent {

  constructor(private router: Router) {
    console.log('Szablon mapa component constructor');
    console.log('router.url',router.url);
    console.log('router.getCurrentNavigation',router.getCurrentNavigation());
    console.log('router.initialNavigation()',router.initialNavigation());
    console.log('router.lastSuccessfulNavigation',router.lastSuccessfulNavigation);
  }

}
