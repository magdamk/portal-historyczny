import { Component, OnDestroy, OnInit } from '@angular/core';
import { SzablonyService } from '../../../../../core/szablony/serwisy/szablony.service';
import { Observable, Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TlumaczeniaService } from '../../../../../core/tlumaczenia/serwisy/tlumaczenia.service';
import { ControllerStronyCmsOpenService } from '../../../../../core/api/controller-strony-cms-open.service';
import { StronaCmsSzczegolyDto } from "../../../../../core/modele/strona-cms-szczegoly-dto";
import { StronaCmsSzczegolyOpenDto } from "../../../../../core/modele/strona-cms-szczegoly-open-dto";
/**
 * Komponent podstron
 */
@Component({
  selector: 'app-strona-cms',
  templateUrl: './strona-cms.component.html',
  styleUrls: ['./strona-cms.component.scss']
})
export class StronaCmsComponent implements OnInit, OnDestroy {
  $stronaCms: Observable<StronaCmsSzczegolyDto | any> = new Observable<StronaCmsSzczegolyDto>();
  subskrybcja = new Subscription();

  /**
   * Konstruktor
   * @param szablonyService - serwis szablon
   * @param route - serwis dostarczający infromacje o routingu i parametrach
   * @param router - serwis dostarczający infromacje o routingu i parametrach
   * @param cmsSerwis - serwis do komunikacji z modułem cms
   * @param tlumaczeniaSerwis - serwis do zarządzania językiem strony
   */
  constructor(private szablonyService: SzablonyService, private route: ActivatedRoute,
    private router: Router, private cmsSerwis: ControllerStronyCmsOpenService,
    private tlumaczeniaSerwis: TlumaczeniaService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  /**
   * Cykl życia komponentu
   */
  ngOnInit(): void {
    this.wczytajDaneStrony();
    this.subskrybujJezyk();
  }

  /**
   * Cykl życia komponentu
   */
  ngOnDestroy(): void {
    this.subskrybcja.unsubscribe();
  }

  /**
   * Metoda inicjująca subskrybcję języka
   */
  subskrybujJezyk(): void {
    this.subskrybcja.add(
      this.tlumaczeniaSerwis.getZmianaJezykaSubject()
        .pipe(distinctUntilChanged())
        .subscribe(() => this.wczytajDaneStrony())
    );
  }

  /**
   * Funkcja wczytująca dane strony cms
   */
  wczytajDaneStrony(): void {
    const sciezkaUrl = this.route.snapshot.paramMap.get('sciezkaUrl');
    if (sciezkaUrl) {
      this.$stronaCms = this.cmsSerwis.pobierzStronePoSciezce(sciezkaUrl)
        .pipe(map(val => val.content));
      this.$stronaCms.subscribe((val: StronaCmsSzczegolyOpenDto) => {
        this.szablonyService.ustawTytulStrony(val.nazwa ?? '');
      });
    }
  }

}
