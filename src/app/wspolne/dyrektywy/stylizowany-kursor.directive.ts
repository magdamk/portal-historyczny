import {AfterViewInit, Directive, ElementRef, HostListener, Inject, Input, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {BehaviorSubject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {WcagUstawieniaService} from '../../funkcjonalnosci/wcag/serwisy/wcag-ustawienia.service';

/**
 * Dyrektywa tworząca dedykowany kursor
 */
@Directive({
  selector: '[appStylizowanyKursor]'
})
export class StylizowanyKursorDirective implements AfterViewInit, OnDestroy {

  @Input()
  paddingLeft = 0;

  @Input()
  paddingRight = 0;

  @Input()
  kolorTla = 'white';

  pisanie = new BehaviorSubject<string>('');

  zaznaczony = false;

  cursor: any;
  resizer: any;

  wcagUstawieniaSubscription = new Subscription();

  /**
   * Konstruktor
   * @param el - instancja komponentu dyrektywy
   * @param document - dokument drzewa dom
   * @param wcagService - serwis wcag
   */
  constructor(private el: ElementRef, @Inject(DOCUMENT) private document: Document, private wcagService: WcagUstawieniaService) {
    this.cursor = document.createElement('span');
    this.resizer = document.createElement('span');
  }

  /**
   * Cykl życia komponentu renderowanie widoku
   */
  ngAfterViewInit(): void {
    this.inicjujKursor();
    this.wcagUstawieniaSubscription = this.wcagService.getZmianaUstawienSubject().subscribe(() => {
      this.inicjujKursor();
      this.aktualizujKursor();
    });
    this.pisanie.pipe(debounceTime(100)).subscribe(() => this.aktualizujKursor());
  }

  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.wcagUstawieniaSubscription.unsubscribe();
  }

  /**
   * Obsługa zdarzenia puszczenie klawisza
   */
  @HostListener('keyup') onKeyUp(): void {
    this.cursor.style.display = 'none';
    this.pisanie.next('');
  }

  /**
   * Obsługa zdarzenia focusin
   */
  @HostListener('focusin')
  focusIn(): void {
    this.onKeyUp();
    this.zaznaczony = true;
    this.aktualizujKursor();
  }

  /**
   * Obsługa zdarzenia focusout
   */
  @HostListener('focusout')
  focusOut(): void {
    this.zaznaczony = false;
    this.aktualizujKursor();
  }

  /**
   * Obsługa zdarzenia zmiana rozmiaru okna
   */
  @HostListener('window:resize')
  onResize(): void {
    this.inicjujKursor();
    this.aktualizujKursor();
  }

  /**
   * Obsługa zdarzenia klik
   */
  @HostListener('click')
  onClick(): void {
    this.aktualizujKursor();
  }

  /**
   * Obsługa zdarzenia select
   */
  @HostListener('select')
  onSelect(): void {
    this.aktualizujKursor();
  }

  /**
   * Funkcja inicjalizuje kursor
   */
  private inicjujKursor(): void {
    this.konfigurujKursor();
    this.konfigurujKontenerPomiarowy();
    const parent = this.el.nativeElement.parentNode;
    parent.style.cssText += 'position: relative';
    parent.appendChild(this.cursor);
    parent.appendChild(this.resizer);
  }

  /**
   * Funkcja aktualizuje położenie i stan kursora
   */
  private aktualizujKursor(): void {
    if (!this.zaznaczony) {
      this.cursor.style.display = 'none';
      return;
    }
    if (this.el.nativeElement.selectionStart !== this.el.nativeElement.selectionEnd) {
      this.cursor.style.display = 'none';
      return;
    }
    this.cursor.style.display = 'block';
    this.resizer.innerHTML = this.el.nativeElement.value.substring(0, this.el.nativeElement.selectionStart).replaceAll(' ', '&nbsp;');
    const resizerWidth = this.resizer.getBoundingClientRect().width;
    const inputWidth = this.el.nativeElement.getBoundingClientRect().width - this.paddingRight;
    if (resizerWidth < inputWidth) {
      this.cursor.style.left = `${resizerWidth}px`;
      return;
    }
    this.cursor.style.left = `${inputWidth}px`;
  }

  /**
   * Funkcja konfiguruje kursor (tworzy nowy element drzewa dom)
   */
  private konfigurujKursor(): void {
    const parent = this.el.nativeElement.parentNode;
    const inputHeight = this.el.nativeElement.getBoundingClientRect().height * 0.7;
    const parentHeight = parent.getBoundingClientRect().height;
    const kursorTop = (parentHeight - inputHeight) / 2;
    this.cursor.style.cssText = `height: ${inputHeight}px; top: ${kursorTop}px; left: ${this.paddingLeft}; display: none`;
    this.cursor.classList.add('stylizowany-kursor');
    this.el.nativeElement.style.caretColor = this.kolorTla;
  }

  /**
   * Funkcja konfiguruje element pozwalający wyliczyć położenie kursora
   */
  private konfigurujKontenerPomiarowy(): void {
    this.resizer.classList.add('resizer');
    this.resizer.style.paddingLeft = this.paddingLeft + 'px';
    this.ustawKlasyInputa();
  }

  /**
   * Funkcja kopiuje konfigurację input do elementu pomiarowego
   */
  private ustawKlasyInputa(): void {
    this.el.nativeElement.classList.forEach((c: any) => {
      this.resizer.classList.add(c as string);
    });
  }
}


