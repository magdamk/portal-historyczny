import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WyborMapyEvent} from '../karta-mapy/karta-mapy.component';
import {Router} from "@angular/router";

/**
 * Komponent kafelek własna mapa
 */
@Component({
  selector: 'app-karta-wlasna-mapa',
  templateUrl: './karta-wlasna-mapa.component.html',
  styleUrls: ['./karta-wlasna-mapa.component.scss']
})
export class KartaWlasnaMapaComponent implements OnInit {

  @Input()
  wyborMapyDoPorownania = false;

  @Output()
  mapaWybrana = new EventEmitter<WyborMapyEvent>();


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Funkcja sygnalizuje wybraniwMapy
   */
  wybranoMape(): void {
      this.mapaWybrana.emit({uuidMapy: 'PUSTA-MAPA'});
  }

  /**
   * Funkcja reaguje na przycisk enter i wywołuje przekierowanie
   */
  klikEnter(): void {
    if(this.wyborMapyDoPorownania){
      this.wybranoMape();
      return;
    }
    this.router.navigate([`/mapa`]);
  }

}
