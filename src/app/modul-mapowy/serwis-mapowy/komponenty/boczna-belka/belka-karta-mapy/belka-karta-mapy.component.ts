import { Component, Input } from '@angular/core';
import { KategoriaGrupaMapOpenDto } from 'src/app/core/modele/kategoria-grupa-map-open-dto';

@Component({
  selector: 'mm-belka-karta-mapy',
  templateUrl: './belka-karta-mapy.component.html',
  styleUrls: ['./belka-karta-mapy.component.scss']
})
export class BelkaKartaMapyComponent {
  @Input({ required: true }) temat!: KategoriaGrupaMapOpenDto;
  @Input() zmianaMapy = false;
  szczegoly = false;
  adresUrl?: string;
  miniaturkaUkryta = false;
}
