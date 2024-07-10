import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SzablonyService } from '../../../../core/szablony/serwisy/szablony.service';
import { Subscription } from 'rxjs';
import { TlumaczeniaService } from '../../../../core/tlumaczenia/serwisy/tlumaczenia.service';
import { AktualnosciListaDto } from '../../../../core/modele/aktualnosci-lista-dto';
// import {  ControllerAktualnosciOpenService} from '../../../../../../build/openapi_modul_mapowy_public';
// import {PrzewijanyKomponentComponent} from '@modul-mapowy';

/**
 * Komponent aktualności
 */
@Component({
  selector: 'app-aktualnosci-belka-boczna',
  templateUrl: './aktualnosci-belka-boczna.component.html',
  styleUrls: ['./aktualnosci-belka-boczna.component.scss'],
})
export class AktualnosciBelkaBocznaComponent implements OnInit {

  // @ViewChild('przeijanyKomponent') przewijanyKomponent: PrzewijanyKomponentComponent

  jezyk: string|undefined;
  listaAktualnosci = new Array<AktualnosciListaDto>();
  subskrybcja = new Subscription();
  aktualnyIndex = 0;
  aktualnosc: AktualnosciListaDto|undefined;

  /**
   * Konstruktor
   * @param szablonyService - serwis szablonów
   * @param router - natywny serwis routingu
   * @param aktualnosciService - serwis aktualnosci
   * @param tlumaczeniaSerwis - serwis tlumaczen
   */
  constructor(private szablonyService: SzablonyService, private router: Router,
    // private aktualnosciService: ControllerAktualnosciOpenService,
    private tlumaczeniaSerwis: TlumaczeniaService) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
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
   * Funkcja ładuje następną aktualność
   */
  nastepna(): void {
    if (this.aktualnyIndex < this.listaAktualnosci?.length - 1) {
      this.aktualnyIndex++;
    } else {
      this.aktualnyIndex = 0;
    }
  }

  /**
   * Funckaj ładuje poprzednią aktualność
   */
  poprzednia(): void {
    if (this.aktualnyIndex >= 1) {
      this.aktualnyIndex--;
    } else {
      this.aktualnyIndex = this.listaAktualnosci?.length - 1;
    }
  }

  /**
   * Funkcja przekierowuje do archiwum aktualności
   */
  przekierujDoArchiwum(): void {
    this.router.navigate(['/aktualnosci']);
    this.szablonyService.zwinBelkeBoczna();
  }


  /**
   * Metoda sluzaca do wczytania aktualnosci
   */
  private wczytajListeAktualnosc() {
    // this.aktualnosciService.pobierzOkreslonaListeAktualnosci().subscribe((val) => this.listaAktualnosci = val);
    this.listaAktualnosci=[];
  }


}

