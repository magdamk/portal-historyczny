import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {TYP_CZCIONKI, TYP_FILTRA, WcagUstawieniaService} from '../../serwisy/wcag-ustawienia.service';
import {UM_IKONY} from '../../../../wspolne/komponenty/ikony-svg/ikony-svg.component';

/**
 * Komponent kontrolera wcag
 */
@Component({
  selector: 'app-wcag-kontroler',
  templateUrl: './wcag-kontroler.component.html',
  styleUrls: ['./wcag-kontroler.component.scss']
})
export class WcagKontrolerComponent {

  UM_IKONY = UM_IKONY;

  @Input()
  menuPosition: 'LEFT' | 'RIGHT' = 'LEFT';

  menuVisible = false;

  /**
   * Konstruktor
   * @param wcagUstawieniaService - serwis wcag
   * @param eRef - referencja do natywnego komponentu
   */
  constructor(private wcagUstawieniaService: WcagUstawieniaService, private eRef: ElementRef) {
  }

  /**
   * funkcja pokazuje lub ukrywa menu wcag
   */
  pokazUkryjMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  /**
   * Funkcja nasłuchuje natywne zdarzenie kliknięcia dokumentu dom
   * @param event - natywne zdarzenie
   */
  @HostListener('document:click', ['$event'])
  dokumentKlik(event: any): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.menuVisible = false;
    }
  }

  /**
   * Funkcja pozwala powiększyć czcionkę
   */
  powiekrzCzcionke(): void {
    this.wcagUstawieniaService.powiekrzCzcionke();
  }

  /**
   * Funkcja pozwala zmniejszyć czcionkę
   */
  zmniejszCzcionke(): void {
    this.wcagUstawieniaService.zmniejszCzcionke();
  }

  /**
   * Funkcja pozwala zmienić kolor serwisu na czarno biały
   */
  setCzarnoBialy(): void {
    this.wcagUstawieniaService.ustawFiltr(TYP_FILTRA.CZARNO_BIALA);
  }

  /**
   * Funkcja pozwala ustawić negatyw dla serwisu
   */
  setNegatyw(): void {
    this.wcagUstawieniaService.ustawFiltr(TYP_FILTRA.NEGATYW);
  }

  /**
   * Funkcja pozwala podkreslić linki
   */
  setPodkreslenieLinkow(): void {
    this.wcagUstawieniaService.ustawPodkreslenieLinkow(true);
  }

  /**
   * Funkcja ustawia prostą czcionkę
   */
  setProstaCzcionka(): void {
    this.wcagUstawieniaService.ustawTypCzcionki(TYP_CZCIONKI.PROSTA);
  }

  /**
   * Funckcja przywraca domyślne ustawienia
   */
  reset(): void {
    this.wcagUstawieniaService.ustawDomyslnaKonfiguracja();
  }

}
