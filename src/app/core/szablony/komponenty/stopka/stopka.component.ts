import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {TlumaczeniaService} from '../../../tlumaczenia/serwisy/tlumaczenia.service';
import {ControllerStronyCmsOpenService} from "../../../api/controller-strony-cms-open.service"
import { StronaCmsListaDto} from "../../../modele/strona-cms-lista-dto";

/**
 * Komponent stopki dla szablonu strony startowej
 */
@Component({
  selector: 'app-stopka',
  templateUrl: './stopka.component.html',
  styleUrls: ['./stopka.component.scss']
})
export class StopkaComponent implements OnInit, OnDestroy {

  $stronyCms = new Observable<StronaCmsListaDto[] | undefined>();
  subskrybcja = new Subscription();

  /**
   * Konstruktor
   * @param cmsService serwis do komunikacji z modułem cms
   * @param tlumaczeniaSerwis serwis tlumaczen
   */
  constructor(
    private cmsService: ControllerStronyCmsOpenService,
    private tlumaczeniaSerwis: TlumaczeniaService) {
  }

  /**
   * Cykl życia obiektu
   */
  ngOnInit(): void {
    this.wczytajListeStron();
    this.subskrybcja = this.tlumaczeniaSerwis.getZmianaJezykaSubject().subscribe(() => this.wczytajListeStron());
  }

  /**
   * Cykl życia obiektu
   */
  ngOnDestroy(): void {
    this.subskrybcja.unsubscribe();
  }

  /**
   * Funkcja wczytywania listy tematów pomocy
   */
  wczytajListeStron(): void {
    this.$stronyCms = this.cmsService.pobierzListeStronOpen('STRONA_STARTOWA', '')
      .pipe(map(val => val.content));
  }
}
