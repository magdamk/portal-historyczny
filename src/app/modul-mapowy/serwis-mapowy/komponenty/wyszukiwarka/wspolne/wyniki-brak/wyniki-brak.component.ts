import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-wyniki-brak',
  templateUrl: './wyniki-brak.component.html',
  styleUrls: ['./wyniki-brak.component.scss']
})
export class WynikiBrakComponent {

  @Input() opisFunkcjonalnosciKod = '';
  @Input() nazwaFunkcjonalnosciKod = '';
  @Input() marginesGorny = true;
  @Input() wysrodkowany = false;

  constructor() {
  }
}
