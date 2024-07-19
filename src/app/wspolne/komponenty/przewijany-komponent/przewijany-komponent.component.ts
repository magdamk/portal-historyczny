import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {MatLegacySlider, MatLegacySliderChange} from '@angular/material/legacy-slider';
import {BehaviorSubject} from 'rxjs';
import {DOWN_ARROW, hasModifierKey, UP_ARROW} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-przewijany-komponent',
  templateUrl: './przewijany-komponent.component.html',
  styleUrls: ['./przewijany-komponent.component.scss']
})
export class PrzewijanyKomponentComponent implements AfterViewInit {

  @ViewChild('component') componentRef!: ElementRef;
  @ViewChild('suwak') suwak!: MatLegacySlider;

  @Input() czyBlokowacKlikniecie = false;
  @Input() wysokoscSuwaka = '100';

  @Input()
  stylBialy = false;

  @Output()
  osiagnietoKoniec = new EventEmitter();

  @Output()
  zmianaWidocznosci = new EventEmitter<boolean>();

  czySuwakWidoczny$ = new BehaviorSubject(false);


  /**
   * Konstruktor
   */
  constructor(private detektorZmian: ChangeDetectorRef) {
  }

  /**
   * Cykl życia obiektu
   */
  ngAfterViewInit(): void {
    this.ustawWidocznoscSuwaka(null);
    this.detektorZmian.detectChanges();
    this.nadpiszEventKeyDownSuwaka();
  }

  /**
   * funkcja nadpisuje obsluge eventu keydown suwaka
   */
  nadpiszEventKeyDownSuwaka() {
    this.suwak._onKeydown = (event: any) => {
      if (this.suwak.disabled || hasModifierKey(event)) {
        return;
      }
      const oldValue = this.suwak.value;
      switch (event.keyCode) {
        case UP_ARROW:
          this.suwakIncriment(-1);
          break;
        case DOWN_ARROW:
          this.suwakIncriment(1);
          break;
        default:
          return;
      }
      if (oldValue != this.suwak.value) {
        this.suwak.input.emit(this.suwakCreateChangeEvent(this.suwak.value));
      }
      this.suwak._isSliding = 'keyboard';
      event.preventDefault();
    };
  }

  /**
   * Funkcja nadpisuje event chnage suwaka
   * @param value
   */
  suwakCreateChangeEvent(value: any) {
    let event = new MatLegacySliderChange();
    event.source = this.suwak;
    event.value = value;
    return event;
  }

  /**
   * funkcja nadpisuje funkcje increment suwaka
   * @param numSteps
   */
  suwakIncriment(numSteps: number) {
    this.suwak.value = this.suwakClamp((this.suwak.value || 0) + this.suwak.step * numSteps, this.suwak.min, this.suwak.max);
  }

  /**
   * funkcja nadpisuje funkcje clamp suwaka
   * @param value
   * @param min
   * @param max
   */
  suwakClamp(value: any, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
  }

  /**
   * Obsluga przewijania treści tematu pomocy
   */
  przewijanie(): void {
    if (!this.suwak) {
      return;
    }
    const dlugoscSuwaka = (this.componentRef.nativeElement.scrollHeight - this.componentRef.nativeElement.offsetHeight);
    this.suwak.value = Math.round(100 * this.componentRef.nativeElement.scrollTop / dlugoscSuwaka);
    this.detektorZmian.detectChanges();
    if (dlugoscSuwaka <= Math.ceil(this.componentRef.nativeElement.scrollTop)) {
      this.osiagnietoKoniec.emit();
    }
  }


  /**
   * Manualne przesuwanie do końca
   */
  przewinNaKoniec(): void {
    if (!this.suwak) {
      return;
    }
    const dlugoscSuwaka = (this.componentRef.nativeElement.scrollHeight - this.componentRef.nativeElement.offsetHeight);
    this.suwak.value = 100;
    this.zmianaSuwaka({value: 100});
    this.detektorZmian.detectChanges();
    if (dlugoscSuwaka <= Math.ceil(this.componentRef.nativeElement.scrollTop)) {
      this.osiagnietoKoniec.emit();
    }
  }

  /**
   * Manualne przesuwanie do końca
   */
  przewinNaPoczatek(): void {
    if (!this.suwak) {
      return;
    }
    this.suwak.value = 0;
    this.zmianaSuwaka({value: 0});
    this.detektorZmian.detectChanges();
  }

  /**
   * Obsługa zmiany położenia suwaka
   * @param wartoscPolozenia - wartość położenia suwaka
   */
  zmianaSuwaka(wartoscPolozenia: any): void {
    this.componentRef.nativeElement.scrollTop =
      Math.round(wartoscPolozenia.value *
        (this.componentRef.nativeElement.scrollHeight - this.componentRef.nativeElement.offsetHeight) / 100);
  }

  /**
   * Metoda ustawiająca widoczność suwaka
   * @param zmiana - wydarzenie zmiany kontentu
   */
  ustawWidocznoscSuwaka(zmiana: any | null): void {
    let maxLiczbaTestow = 0;
    // console.log(zmiana);
    const czyWidoczny = this.czySuwakPotrzebny()
    this.czySuwakWidoczny$.next(czyWidoczny);
    this.zmianaWidocznosci.emit(czyWidoczny);
    const interval = setInterval(() => {
      const czyWidoczny = this.czySuwakPotrzebny();
      if (czyWidoczny || maxLiczbaTestow > 1000) {
        if (czyWidoczny) {
        // console.log('suwak test: ',czyWidoczny );
        clearInterval(interval);
        this.czySuwakWidoczny$.next(czyWidoczny);
        this.zmianaWidocznosci.emit(czyWidoczny);
      }
      maxLiczbaTestow++;
    }}, 200)
  }

  /**
   * Funkcja blokująca propagowanie klikniecia
   * @param event - zdarzenie klikniecia
   */
  blokujEmitowanieClick(event: MouseEvent) {
    if (this.czyBlokowacKlikniecie) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  czySuwakPotrzebny(): boolean{
    // console.log('czySuwakPotrzebny',this.componentRef?.nativeElement?.scrollHeight > this.componentRef?.nativeElement?.offsetHeight &&
      // this.componentRef?.nativeElement?.offsetHeight > 0);
    return this.componentRef?.nativeElement?.scrollHeight > this.componentRef?.nativeElement?.offsetHeight &&
    this.componentRef?.nativeElement?.offsetHeight > 0;
  }
}
