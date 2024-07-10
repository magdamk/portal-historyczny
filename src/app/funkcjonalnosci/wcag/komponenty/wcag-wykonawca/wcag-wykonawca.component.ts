import {Component, Inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ROZMIAR_CZCIONKI, TYP_CZCIONKI, TYP_FILTRA, WcagUstawieniaService} from '../../serwisy/wcag-ustawienia.service';
import {WcagUstawieniaModel} from '../../modele/wcag-ustawienia-model';
import {Subscription} from 'rxjs';

const FONT_ROZMIAR_KLASA = {
  MALY: 'maly-font',
  DUZY: 'duzy-font'
};

const FONT_TYP_KLASA = {
  PROSTA: 'prosty-font'
};

const FILT_KLASA = {
  CZARNO_BIALY: 'czarno-bialy',
  NEGATYW: 'negatyw'
};

const LINKI_KLASA = {
  PODKRESL_LINKI: 'podkreslone-linki'
};

/**
 * Komponent odpwoeidzialny za zmianę wyglądu zależną od ustawień wcag
 */
@Component({
  selector: 'app-wcag-wykonawca',
  templateUrl: './wcag-wykonawca.component.html',
  styleUrls: ['./wcag-wykonawca.component.scss']
})
export class WcagWykonawcaComponent implements OnDestroy {

  // TODO byc może lepiej zrobić dyrektywę

  wcagUstawienia: WcagUstawieniaModel;
  zmianaUstawienSubsciption: Subscription;

  /**
   * Konstruktor
   * @param document - natywny dokument drzewa dom
   * @param wcagUstawieniaService - serwis wcag
   */
  constructor(@Inject(DOCUMENT) private document: Document, private wcagUstawieniaService: WcagUstawieniaService) {
    this.wcagUstawienia = wcagUstawieniaService.pobierzDomyslneUstawienia();
    this.zmianaUstawienSubsciption = this.wcagUstawieniaService.getZmianaUstawienSubject()
      .subscribe(ustawienia => {
        this.wcagUstawienia = ustawienia;
        this.aktualizujRozmiarCzcionki();
        this.aktualizujTypCzcionki();
        this.aktualizujFiltry();
        this.aktualizujPodkresleniaLinkow();
      });
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.wcagUstawienia = this.wcagUstawieniaService.pobierzDomyslneUstawienia();
    this.aktualizujRozmiarCzcionki();
    this.aktualizujTypCzcionki();
    this.aktualizujFiltry();
    this.aktualizujPodkresleniaLinkow();
    if (this.zmianaUstawienSubsciption) {
      this.zmianaUstawienSubsciption.unsubscribe();
    }
  }

  /**
   * Funkcja aktulizuje filtry kolorystyczne strony
   */
  aktualizujFiltry(): void {
    this.document.body.classList.remove(FILT_KLASA.CZARNO_BIALY);
    this.document.body.classList.remove(FILT_KLASA.NEGATYW);

    if (this.wcagUstawienia.filtr === TYP_FILTRA.CZARNO_BIALA) {
      this.document.body.classList.add(FILT_KLASA.CZARNO_BIALY);
    }
    if (this.wcagUstawienia.filtr === TYP_FILTRA.NEGATYW) {
      this.document.body.classList.add(FILT_KLASA.NEGATYW);
    }
  }

  /**
   * Funkcja aktualizuje ustawionia rozmiaru czcionek strony
   */
  aktualizujRozmiarCzcionki(): void {
    const html = document.getElementsByTagName('html')[0];
    html.classList.remove(FONT_ROZMIAR_KLASA.MALY);
    html.classList.remove(FONT_ROZMIAR_KLASA.DUZY);

    if (this.wcagUstawienia.rozmiarCzcionki === ROZMIAR_CZCIONKI.MALY) {
      html.classList.add(FONT_ROZMIAR_KLASA.MALY);
    }
    if (this.wcagUstawienia.rozmiarCzcionki === ROZMIAR_CZCIONKI.DUZY) {
      html.classList.add(FONT_ROZMIAR_KLASA.DUZY);
    }
  }

  /**
   * Funkcja aktualizuje ustawienia typów czcionek strony
   */
  aktualizujTypCzcionki(): void {
    if (this.wcagUstawienia.typCzcionki === TYP_CZCIONKI.PROSTA) {
      this.document.body.classList.add(FONT_TYP_KLASA.PROSTA);
      return;
    }
    this.document.body.classList.remove(FONT_TYP_KLASA.PROSTA);
  }

  /**
   * Funkcja aktualizuje podkreślenia linków strony
   */
  aktualizujPodkresleniaLinkow(): void {
    if (this.wcagUstawienia.podkreslenieLinkow) {
      this.document.body.classList.add(LINKI_KLASA.PODKRESL_LINKI);
      return;
    }
    this.document.body.classList.remove(LINKI_KLASA.PODKRESL_LINKI);
  }

}
