import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: '[mmDlugieNazwy]',
  templateUrl: './dlugie-nazwy.component.html',
  styleUrls: ['./dlugie-nazwy.component.scss']
})
export class DlugieNazwyComponent implements AfterViewInit {

  @ViewChild('zawartoscPomiarowa') zawartoscPomiarowa!: ElementRef;
  @ViewChild('zawartosc') zawartosc!: ElementRef;
  tooltip = '';

  @Input() nazwa!: string;
  @Input() liczbaWierszy: 1 | 2 = 2;

  constructor() {
    // console.log('XXXXXXXXXXXXXX');
   }

  ngAfterViewInit(): void {
    // console.log('dlugieNazwy ngAfterViewInit:', this.liczbaWierszy);
    this.aktualizuj();
  }

  /**
   * Funkcja aktualizuje tooltip dla długiej nazwy
   */
  aktualizuj(){
    // console.log("tooltip okno window");
    setTimeout(()=>{
      // console.log("tooltip okno window");
      this.zawartoscPomiarowa.nativeElement.innerHTML = this.zawartosc.nativeElement.innerHTML;
      this.generujTooltip();
    }, 200)
  }


  /**
   * Funkcja generuje tooltip długich nazw
   */
  private generujTooltip() {
    setTimeout(()=>{
      if (this.nazwaZbytDluga()) {
        this.tooltip = this.zawartosc.nativeElement.innerText;
        return;
      }
      this.tooltip = ''
    }, 200);
  }

  /**
   * Funkcja sprawdza czy nazwa warstwy jest zbyt długa
   */
  private nazwaZbytDluga(): boolean {
    if (!this.zawartoscPomiarowa.nativeElement) {
      return false;
    }
    const zawartoscPomiarowaWysokosc = this.zawartoscPomiarowa.nativeElement.getBoundingClientRect().height;
    const zawartoscWysokosc = this.zawartosc.nativeElement.getBoundingClientRect().height;
    return zawartoscPomiarowaWysokosc > zawartoscWysokosc;
  }

}
