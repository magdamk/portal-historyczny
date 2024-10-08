import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { TlumaczeniaNazw } from '../../../modele/tlumaczenia-nazw';
import { InformacjeOObiekcie } from '../../../utils/obiekty-mapy-utils';

@Component({
  selector: 'mm-obiekt-opis',
  templateUrl: './obiekt-opis.component.html',
  styleUrls: ['./obiekt-opis.component.scss']
})
export class ObiektOpisComponent implements OnInit, OnDestroy {

  @Input()
  nazwaWarstwy?: TlumaczeniaNazw;

  @Input()
  obiekt?: InformacjeOObiekcie;

  aktualnyJezyk = '';
  zmianaJezykaSubscription?: Subscription;

  /**
   * KOnstruktor
   * @param tlumaczenia
   */
  constructor(private tlumaczenia: TlumaczeniaService) { }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.zmianaJezykaSubscription = this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk=>{
      this.aktualnyJezyk = jezyk;
    })
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    if(this.zmianaJezykaSubscription){
      this.zmianaJezykaSubscription.unsubscribe();
    }
  }

}
