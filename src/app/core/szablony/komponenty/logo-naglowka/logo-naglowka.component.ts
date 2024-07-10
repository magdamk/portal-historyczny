import {Component, OnInit} from '@angular/core';
import {TYP_FILTRA, WcagUstawieniaService} from '../../../../funkcjonalnosci/wcag/serwisy/wcag-ustawienia.service';
import {LANGS, TlumaczeniaService} from '../../../tlumaczenia/serwisy/tlumaczenia.service';
import {WcagUstawieniaModel} from '../../../../funkcjonalnosci/wcag/modele/wcag-ustawienia-model';
import {Router} from "@angular/router";

/**
 * Komponent odpowiedzialny za wyświetlanie loga
 */
@Component({
  selector: 'app-logo-naglowka',
  templateUrl: './logo-naglowka.component.html',
  styleUrls: ['./logo-naglowka.component.scss']
})
export class LogoNaglowkaComponent implements OnInit {

  wcagUstawienia: WcagUstawieniaModel;
  jezykUstawienia: string;
  syrenkaUrl = '';

  /**
   * Kostruktor
   * @param wcagService - serwis wcag
   * @param tlumaczeniaService - serwis tłumaczeń
   */
  constructor(private wcagService: WcagUstawieniaService, private tlumaczeniaService: TlumaczeniaService, private router: Router) {
    this.wcagUstawienia = wcagService.pobierzDomyslneUstawienia();
    this.jezykUstawienia = tlumaczeniaService.pobierzAktualnyJezyk();
    this.ustawLogo();
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    // TODO dodać odsubskrybowaie
    this.wcagService.getZmianaUstawienSubject().subscribe((ustawienia) => {
      this.wcagUstawienia = ustawienia;
      this.ustawLogo();
    });
    this.tlumaczeniaService.getZmianaJezykaSubject().subscribe((jezyk) => {
      this.jezykUstawienia = jezyk;
      this.ustawLogo();
    });
  }

  /**
   * Ustawia logo zależnie od wybranej opcji wcag
   */
  private ustawLogo(): void {
    let syrenkaUrl = 'assets/images/main-logo/logo_';
    if (this.wcagUstawienia.filtr === TYP_FILTRA.BRAK) {
      syrenkaUrl += 'kolorowe_';
    } else if (this.wcagUstawienia.filtr === TYP_FILTRA.CZARNO_BIALA) {
      syrenkaUrl += 'biale_';
    } else {
      syrenkaUrl += 'kontrast_';
    }
    if (this.jezykUstawienia === LANGS.PL) {
      syrenkaUrl += 'pl.svg';
    } else {
      syrenkaUrl += 'eng.svg';
    }
    this.syrenkaUrl = syrenkaUrl;
  }

  klikEnter():void{
    this.router.navigate(['/']);
  }

}
