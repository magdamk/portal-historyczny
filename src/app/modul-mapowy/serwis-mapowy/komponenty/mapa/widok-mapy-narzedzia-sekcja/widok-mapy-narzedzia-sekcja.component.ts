import { Component, Input } from '@angular/core';
import { GrupaWarstwPodkladowych } from '../../../modele/grupa-warstw-podkladowych';
import { Mapa } from '../../../modele/mapa';

@Component({
  selector: 'mm-widok-mapy-narzedzia-sekcja',
  templateUrl: './widok-mapy-narzedzia-sekcja.component.html',
  styleUrls: ['./widok-mapy-narzedzia-sekcja.component.scss']
})
export class WidokMapyNarzedziaSekcjaComponent {
  @Input() mapa?: Mapa;

  @Input() grupyWarstwPodkladowych: GrupaWarstwPodkladowych[] = [];
}
