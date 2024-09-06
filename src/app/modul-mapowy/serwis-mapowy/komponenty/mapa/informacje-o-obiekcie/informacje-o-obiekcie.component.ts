import { Component } from '@angular/core';
import { Warstwa } from '../../../modele/warstwa';
import { InformacjeOObiekcie } from '../../../utils/obiekty-mapy-utils';

export interface InformajeOWarstwie {
  warstwa: Warstwa;
  uuidWarstwy: string;
  obiekty: InformacjeOObiekcie[];
  aktualnyObiekt: number;
}

@Component({
  selector: 'mm-informacje-o-obiekcie',
  templateUrl: './informacje-o-obiekcie.component.html',
  styleUrls: ['./informacje-o-obiekcie.component.scss']
})



export class InformacjeOObiekcieComponent {

}
