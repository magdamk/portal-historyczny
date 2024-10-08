import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { TlumaczeniaService } from 'src/app/core/tlumaczenia/serwisy/tlumaczenia.service';
import { KonfiguracjaModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/konfiguracja-adapter';
import { LewyPanelWidokActions } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.actions';
import { WIDOKI_ID } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.const';
import { Widok } from 'src/app/modul-mapowy/stan/lewy-panel-widok/lewy-panel-widok.reducer';
import { Mapa } from '../../../modele/mapa';
import { TagiService } from '../../../serwisy/tagi.service';
import { TagiDto } from '../../../modele/tagi';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'mm-os-tagi',
  templateUrl: './os-tagi.component.html',
  styleUrls: ['./os-tagi.component.scss']
})
export class OsTagiComponent implements OnInit, OnDestroy {

  widokIdentyfikator = WIDOKI_ID.TAGI;
  @Input() widok!: Widok;
  @Input() mapa?: Mapa;
  @Input() obszarWidoczny?: boolean | undefined;

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  // @ViewChild('chipGrid') chipGrid!: ElementRef<HTMLInputElement>;

  aktualnyJezyk = 'pl';
  tagi: TagiDto[] = [];
  filterValue: string = '';
  filteredTagi?: TagiDto[];
  filteredTagi$?:Observable<TagiDto[]>;
  tagiFormControl = new FormControl('');
  selectedTag?: TagiDto;
  subscription$ = new Subscription();
  /**
   * Konstruktor
   */
  constructor(private tlumaczenia: TlumaczeniaService,
    private serviceTagi: TagiService,
    private formBuilder: FormBuilder,
    private konfiguracja: KonfiguracjaModulMapowyAdapter,
    private store: Store<{ modulMapowy: any }>) {
  }


  /**
  * Cykl życia komponentu inicjalizacja
  */
  ngOnInit(): void {
    this.pobierzTagi();
    this.subscription$.add(this.tlumaczenia.getZmianaJezykaSubject().subscribe(jezyk => {
      this.aktualnyJezyk = jezyk;
      this.pobierzTagi();

    }));

    this.pobierzTagi();

    // this.subscription$.add(this.obszary$.subscribe(stan => {
    //   this.obszarySterujace = stan.obszarySterujace.filter(n => n.wirtualne === false);
    //   // this.przygotujListeNarzedziWarstw(stan.narzedziaSterujace)
    // }));
  }
  pobierzTagi() {
    // this.serviceKategoriiMap.getKategorieMap()
    // .subscribe((result: any) => {
    //   console.log('pobierzListeKategoriiMap: ', result.content.kategorieTematyczne[1].grupyMap);
    //   // if (result.content.typ.ObiektEnum==='KATEGORIA_TEMATYCZNA') {
    //   this.zbiorMapPlanow = Array.from(result.content.kategorieTematyczne[1].grupyMap);
    //   console.log('!!!!pobierzListeKategoriiMap: ', this.zbiorMapPlanow);
    //   // }
    // });
    this.serviceTagi.getTagi().subscribe((result: any) => { this.tagi = Array.from(result);this.filteredTagi = this._filter(this.filterValue);  this.filteredTagi$ = of(this.filteredTagi);});

  }


  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  /**
  * Funkcja przenosi narzędzie na wierzch
  */
  przeniesNaWierzch(): void {
    this.store.dispatch(LewyPanelWidokActions.pokazObszar({ widokId: this.widokIdentyfikator }));
    // this.pobierzObszarySerwis().dispatch(InterfejsUzytkownikaActions.rozwinLewaBelke());
  }

  changeChip(val: TagiDto) {
    this.selectedTag = val;
    // this.filteredTagi = this._filter(this.filterValue);
  }

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.tagi.push(value);
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();

  //   this.fruitCtrl.setValue(null);
  // }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.fruits.push(event.option.viewValue);
    console.log('MatAutocompleteSelectedEvent viewValue: ', event.option.viewValue)
    this.selectedTag = this.tagi.find(tag => tag.tag == event.option.viewValue);
    this.tagInput!.nativeElement.value = '';
    this.tagiFormControl.setValue(null);
  }
  filter(value: string) {
    console.log('filter:<' + value + '>');
    this.filteredTagi = this._filter(value);
    console.log('filteredTagi:', this.filteredTagi.toString());
    this.filteredTagi$ = of(this.filteredTagi);
  }
  private _filter(value: string): TagiDto[] {
    const filterValue = value.toLowerCase();
    console.log('_filter: ' + filterValue);
    let filteredTagiTemp: TagiDto[] = [];
    this.tagi.forEach((tag) => { if (tag.tag.toLowerCase().includes(filterValue)) { filteredTagiTemp.push(tag) }; });
    return filteredTagiTemp;
  }

}
