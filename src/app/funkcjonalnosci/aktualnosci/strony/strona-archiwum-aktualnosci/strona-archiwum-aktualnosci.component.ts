import { Component, OnInit } from '@angular/core';
import { SzablonyService } from '../../../../core/szablony/serwisy/szablony.service';
import { Observable, Subscription } from "rxjs";
import { TlumaczeniaService } from "../../../../core/tlumaczenia/serwisy/tlumaczenia.service";
import { map } from "rxjs/operators";
import { AktualnosciListaDto } from '../../../../core/modele/aktualnosci-lista-dto';
// import {  ControllerAktualnosciOpenService} from '../../../../core/api/controller-aktualnosci-open.service';
import { ControllerAktualnosciService } from 'src/app/core/api/controller-aktualnosci.service';
/**
 * Komponent strona archiwum aktualności
 */
@Component({
  selector: 'app-strona-archiwum-aktualnosci',
  templateUrl: './strona-archiwum-aktualnosci.component.html',
  styleUrls: ['./strona-archiwum-aktualnosci.component.scss']
})
export class StronaArchiwumAktualnosciComponent implements OnInit {

  jezyk: string | undefined;
  // $listaZarchiwuzowanychAktualnosci = new Observable<AktualnosciListaDto[] | undefined>();
  lista = new Array<AktualnosciListaDto>();
  subskrybcja = new Subscription();

  /**
   * Konstruktor
   * @param szablonyService - serwis szablonu
   * @param aktualnosciService - serwis aktualnosci
   * @param tlumaczeniaSerwis - serwis tlumaczen
   */
  constructor(private szablonyService: SzablonyService,
    // private aktualnosciService: ControllerAktualnosciOpenService,
    private aktualnosciService: ControllerAktualnosciService,
    private tlumaczeniaSerwis: TlumaczeniaService) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.szablonyService.ustawTytulStrony('codes.aktualnosci.etykieta-archiwum');
    this.subskrybcja = this.tlumaczeniaSerwis.getZmianaJezykaSubject().subscribe((val) => {
      this.jezyk = val;
      this.wczytajListeAktualnosc();
    });

  }


  /**
   * Cykl życia obiektu
   */
  ngOnDestroy(): void {
    this.subskrybcja.unsubscribe();
  }


  /**
   * Metoda sluzaca do wczytania aktualnosci
   */
  private wczytajListeAktualnosc() {
    // this.$listaZarchiwuzowanychAktualnosci = this.aktualnosciService.pobierzListeZarchiwizowanychAktualnosci().pipe(map(val => val));
    this.aktualnosciService.getArchiwum().subscribe((val)=>this.lista=val);

  }
}
