import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';


export const UM_IKONY = {
  administrator: 'administrator',
  archiwum: 'archiwum',
  oko: 'oko',
  koperta: 'koperta',
  lewaStrzalka: 'lewa-strzalka',
  en: 'en',
  lupa: 'lupa',
  pl: 'pl',
  prawaStrzalka: 'prawa-strzalka',
  strzalkaWDol: 'strzalka-w-dol',
  strzalkaWGore: 'strzalka-w-gore',
  znakZapytania: 'znak-zapytania',
  kalendarz: 'kalendarz',
  menuMobilne: 'menu-mobilne',
  zamknij: 'zamknij',
  plus: 'plus',
  wcagCzarnoBialy: 'wcag-czarno-bialy',
  wcagOdwrocKolory: 'wcag-odwroc-kolory',
  wcagPodkreslLinki: 'wcag-podkresl-linki',
  wcagPomniejszTekst: 'wcag-pomniejsz-tekst',
  wcagPowiekszTekst: 'wcag-powieksz-tekst',
  wcagProstaCzcionka: 'wcag-prosta-czcionka',
  wcagResetUstawien: 'wcag-reset-ustawien',
  komunikatNegatywny: 'komunikat_negatywny',
  komunikatPozytywny: 'komunikat_pozytywny'
}

/**
 * Obsługa dedykowanych ikon
 */
@Component({
  selector: 'app-ikony-svg',
  templateUrl: './ikony-svg.component.html',
  styleUrls: ['./ikony-svg.component.scss']
})
export class IkonySvgComponent{

  /**
   * Konstruktor
   * @param iconRegistry - serwis natywny angular material
   * @param sanitizer - serwis natywny angular material
   */
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('administrator', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/administrator.svg'));
    iconRegistry.addSvgIcon('archiwum', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/archiwum.svg'));
    iconRegistry.addSvgIcon('oko', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/eye.svg'));
    iconRegistry.addSvgIcon('koperta', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/letter.svg'));
    iconRegistry.addSvgIcon('lewa-strzalka', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/lewa_strzalka.svg'));
    iconRegistry.addSvgIcon('en', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/en.svg'));
    iconRegistry.addSvgIcon('lupa', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/lupa.svg'));
    iconRegistry.addSvgIcon('pl', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/pl.svg'));
    iconRegistry.addSvgIcon('prawa-strzalka', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/prawa_strzalka.svg'));
    iconRegistry.addSvgIcon('strzalka-w-dol', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/strzalka_w_dol.svg'));
    iconRegistry.addSvgIcon('strzalka-w-gore', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/strzalka_w_gore.svg'));
    iconRegistry.addSvgIcon('ulice', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/ulice.svg'));
    iconRegistry.addSvgIcon('znak-zapytania', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/pomoc.svg'));
    iconRegistry.addSvgIcon('kalendarz', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/kalendarz.svg'));
    iconRegistry.addSvgIcon('menu-mobilne', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/hamburger_new.svg'));
    iconRegistry.addSvgIcon('zamknij', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/zamknij_menu.svg'));
    iconRegistry.addSvgIcon('zmien-mape', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/zmien_mape.svg'));
    iconRegistry.addSvgIcon('plus', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/plus.svg'));
    // wcag
    iconRegistry.addSvgIcon('wcag-czarno-bialy', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/wcag_czarno_bialy.svg'));
    iconRegistry.addSvgIcon('wcag-odwroc-kolory', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/wcag_odwroc_kolory.svg'));
    iconRegistry.addSvgIcon('wcag-podkresl-linki', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/wcag_podkresl_linki_v3.svg'));
    iconRegistry.addSvgIcon('wcag-pomniejsz-tekst', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/wcag_pomniejsz_tekst.svg'));
    iconRegistry.addSvgIcon('wcag-powieksz-tekst', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/wcag_powieksz_tekst.svg'));
    iconRegistry.addSvgIcon('wcag-prosta-czcionka', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/wcag_prosta_czcionka_v2.svg'));
    iconRegistry.addSvgIcon('wcag-reset-ustawien', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/wcag_reset_ustawien.svg'));
    iconRegistry.addSvgIcon('komunikat-negatywny', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/komunikat_negatywny.svg'));
    iconRegistry.addSvgIcon('komunikat-pozytywny', sanitizer.bypassSecurityTrustResourceUrl('assets/ikony/komunikat_pozytywny.svg'));
  }

}
