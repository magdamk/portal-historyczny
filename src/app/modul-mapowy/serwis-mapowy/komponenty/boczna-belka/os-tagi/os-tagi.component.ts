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
import { OM } from '../../../../oracle-maps/types/om';
import { Map as OMap } from '../../../../oracle-maps/types/map';
import { MatChipInputEvent } from '@angular/material/chips';
import { TlumaczeniaNazw } from '../../../modele/tlumaczenia-nazw';

declare var OM: OM;

@Component({
  selector: 'mm-os-tagi',
  templateUrl: './os-tagi.component.html',
  styleUrls: ['./os-tagi.component.scss']
})
export class OsTagiComponent implements OnInit, OnDestroy {

  widokIdentyfikator = WIDOKI_ID.TAGI;
  @Input() widok!: Widok;
  @Input() mapa?: Mapa;
  @Input() mapView!: OMap;
  @Input() obszarWidoczny?: boolean | undefined;

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  // @ViewChild('chipGrid') chipGrid!: ElementRef<HTMLInputElement>;

  aktualnyJezyk = 'pl';
  tagi: TagiDto[] = [];
  tagi_pl: any[] = [];
  tagi_en: any[] = [];
  tagi_all: any[] = [];
  filterValue: string = '';
  filteredTagi?: TagiDto[];
  filteredTagi$?: Observable<TagiDto[]>;
  tagiFormControl = new FormControl('');
  selectedTag?: TagiDto;
  selectedTagValue?: TlumaczeniaNazw;
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
      // this.pobierzTagi();

    }));
    // this.pobierzTagi();

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
    this.serviceTagi.getTagi().subscribe((result: any) => { this.tagi = this.shuffle(Array.from(result)); this.filteredTagi = this._filter(this.filterValue); this.filteredTagi$ = of(this.filteredTagi); });
  }


  /**
   * Cykl życia komponentu niszczenie
   */
  ngOnDestroy(): void {
    { }
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
    // console.log(this.mapView);
    // console.log(this.mapView?.getFeatureLayers().filter((layer) => layer.isVisible(this.mapView!.getMapZoomLevel())));
    // console.log(this.tagi_pl);
    // console.log(this.tagi_en);
    // this.tagi_pl.forEach((tagpl) => {
    //   console.log('tagpl: ',tagpl);
    //   let tagAll = { tagid: 0, tag: '' };
    //   tagAll = this.tagi_en.find((t) =>{
    //     //  console.log(t,tagpl);
    //     if( t.id == tagpl.id){this.tagi_all.push({tagid:tagpl.id, tag:{pl:tagpl.tag,en:t.tag}})};});
    //   // console.log('tag all: ',this.tagi_en.find((t) =>{ t.id == tagpl.id;})!);
    //   // this.tagi_all.push({ tagid: tagpl.id, tag: { en: tagAll.tag, pl: tagpl.tag } });
    // }); console.log(JSON.stringify(this.tagi_all));
    // this.tagi_all.forEach((t)=> console.log())
    //     const writeStream = fs.createWriteStream('filename.txt')
    // const encoder = new TextEncoder
    // let data = 'a'.repeat(1024)
    // let uint8array = encoder.encode(data + "\n\n")

    // writeStream.write(uint8array)
    // writeStream.close()
    // this.mapView!.refreshMap();
    if (this.selectedTagValue !== val.tag) {
      // this.setFilter();
      // setTimeout(() => {
      let layers = this.mapView!.getFeatureLayers().filter((layer) => layer.isVisible(this.mapView!.getMapZoomLevel()));
      console.log(layers);
      layers!.forEach((layer) => {
        layer.filterArray = [];
        layer.refresh();
        layer.applyFilter(new OM.filter.Like('TAGI', '%' + val.tag.pl!.toUpperCase() + '%'), true);
      });
      // }, 300);
      this.selectedTagValue = val.tag;
    } else {
      let layers = this.mapView!.getFeatureLayers().filter((layer) => layer.isVisible(this.mapView!.getMapZoomLevel()));
      layers!.forEach((layer) => {
        layer.filterArray = [];
        layer.refresh();
      });
      this.selectedTagValue = undefined;
    }
    // this.filteredTagi = this._filter(this.filterValue);
  }
  // setFilter() {
  //   let layers = this.mapView!.getFeatureLayers().filter((layer) => layer.isVisible(this.mapView!.getMapZoomLevel()));
  //   layers!.forEach((layer) =>
  //     layer.applyFilter(new OM.filter.Like('TAGI', this.selectedTag!.tag), true));
  //   // this.mapView!.addLayer(layer.applyFilter(new OM.filter.Like('TAGI', this.selectedTag!.tag), true))
  //   // );
  // }
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
    // console.log('MatAutocompleteSelectedEvent viewValue: ', event.option.viewValue)
    if (this.aktualnyJezyk === 'pl') {
      this.selectedTag = this.tagi.find(tag => tag.tag.pl === event.option.viewValue);
    }
    else {
      this.selectedTag = this.tagi.find(tag => tag.tag.en === event.option.viewValue);
    }

    this.tagInput!.nativeElement.value = '';
    this.tagiFormControl.setValue(null);
  }
  filter(value: string) {
    // console.log('filter:<' + value + '>');
    this.filteredTagi = this._filter(value);
    // console.log('filteredTagi:', this.filteredTagi.toString());
    this.filteredTagi$ = of(this.filteredTagi);
  }
  private _filter(value: string): TagiDto[] {
    const filterValue = value.toLowerCase();
    // console.log('_filter: ' + filterValue);
    let filteredTagiTemp: TagiDto[] = [];
    if (this.aktualnyJezyk === 'pl') {
      this.tagi.forEach((tag) => { if (tag.tag.pl!.toLowerCase().includes(filterValue)) { filteredTagiTemp.push(tag) }; });
    }
    else { this.tagi.forEach((tag) => { if (tag.tag.en!.toLowerCase().includes(filterValue)) { filteredTagiTemp.push(tag) }; }); }
    return filteredTagiTemp;
  }
  przelaczNaTematy() {
    console.log("Przełączam!");
    // this.store.dispatch(LewyPanelWidokActions.zapiszNastepnyObszar({ nastepnyWidok: WIDOKI_ID.TAGI }));
    this.store.dispatch(LewyPanelWidokActions.pokazObszar({ widokId: WIDOKI_ID.TEMATY }));
    sessionStorage.setItem('tagi','true');
  }
   shuffle(array:TagiDto[]):TagiDto[] {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

}
