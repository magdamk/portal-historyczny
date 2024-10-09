import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListaPlikow, Plik, MultimediaIZalacznikiModulMapowyAdapter } from 'src/app/modul-mapowy/mm-core/providers/multimedia-i-zalaczniki-adapter';
import { Warstwa } from '../../../modele/warstwa';
import { InformacjeOObiekcie } from '../../../utils/obiekty-mapy-utils';
import { SekcjeOkna } from '../informacje-o-obiekcie/informacje-o-obiekcie.component';
import { ControllerMultimediaOpenService } from 'src/app/core/api/controller-multimedia-open.service';

interface ElementKaruzeli {
  index: number;
  plik: Plik;
}

@Component({
  selector: 'mm-obiekt-zalaczniki-i-zdjecia',
  templateUrl: './obiekt-zalaczniki-i-zdjecia.component.html',
  styleUrls: ['./obiekt-zalaczniki-i-zdjecia.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ObiektZalacznikiIZdjeciaComponent implements OnInit, OnChanges {

  @Input() warstwa?: Warstwa;
  @Input() obiekt?: InformacjeOObiekcie;
  @Input() sekcjeOkna?: SekcjeOkna;

  multimedia?: ListaPlikow;
  zalaczniki?: ListaPlikow;

  wybraneZdjecieIndeks = 0;
  wybraneZdjecie?: Plik;

  widocznaGaleriaPelnoekranowa = false;

  plikiWKaruzeli?: ElementKaruzeli[];
  url: string = "https://testmapa.um.warszawa.pl";
  /**
   * Konstruktor
   * @param multimediaIZalaczniki
   */
  constructor(
    // private multimediaIZalaczniki:
    // MultimediaIZalacznikiModulMapowyAdapter
    private multimediaIZalaczniki:
      ControllerMultimediaOpenService
  ) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.zaladujPliki();
  }

  /**
   * Cykl życia komponentu niszczenie
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.wyczyscDane();
    this.zaladujPliki();
  }

  /**
   * Funkcja pobiera załączniki i multimedia
   */
  zaladujPliki() {
    // if (this.warstwa && this.obiekt) {
    //   if (this.sekcjeOkna?.galeria.widoczna) {
    //     console.log('multimediaIZalaczniki.pobierzMultimedia: ',this.warstwa.szczegolyWarstwy?.zrodloMVC,
    //       this.warstwa.szczegolyWarstwy?.nazwaMVC, this.obiekt.id);
    //     this.multimediaIZalaczniki.pobierzMultimedia(this.warstwa.szczegolyWarstwy?.zrodloMVC,
    //       this.warstwa.szczegolyWarstwy?.nazwaMVC, this.obiekt.id)
    //       .subscribe(pliki => {
    //         this.multimedia = pliki;
    //         this.inicjujGalerie();
    //       });
    //   }
    //   if (this.sekcjeOkna?.zalaczniki.widoczna) {
    //     this.multimediaIZalaczniki.pobierzZalaczniki(this.warstwa.szczegolyWarstwy?.zrodloMVC,
    //       this.warstwa.szczegolyWarstwy?.nazwaMVC, this.obiekt.id)
    //       .subscribe(pliki => {
    //         this.zalaczniki = pliki;
    //       });
    //   }
    // }
    if (this.warstwa && this.obiekt) {
      if (this.sekcjeOkna?.galeria.widoczna) {
        console.log('multimediaIZalaczniki.pobierzMultimedia: ', this.warstwa.szczegolyWarstwy?.zrodloMVC,
          this.warstwa.szczegolyWarstwy?.nazwaMVC, this.obiekt.id);
        this.multimediaIZalaczniki.pobierzListePlikowPoZrodleDanychIMVC(this.warstwa.szczegolyWarstwy?.zrodloMVC as string,
          this.warstwa.szczegolyWarstwy?.nazwaMVC as string, +this.obiekt.id)
          .subscribe(result => {
            this.multimedia = { pliki: [] };
            this.multimedia.pliki = result.content as Plik[];
            // this.multimedia = result as ListaPlikow;
            console.log('subscribe: ', result)
            console.log('subscribe: ', result.content);
            console.log('subscribe: ', this.multimedia);
            this.inicjujGalerie();
          });
      }
      if (this.sekcjeOkna?.zalaczniki.widoczna) {
        this.multimediaIZalaczniki.pobierzListePlikowPoZrodleDanychIMVC(this.warstwa.szczegolyWarstwy?.zrodloMVC as string,
          this.warstwa.szczegolyWarstwy?.nazwaMVC as string, +this.obiekt.id)
          .subscribe(
            result => {
              this.zalaczniki = { pliki: [] };
              this.zalaczniki.pliki = result.content as Plik[];

            });
      }
    }
  }

  /**
   * Funkcja wyświetla kolejne zdjęcie
   */
  nastepneZdjecie() {
    if (this.multimedia && this.multimedia.pliki?.length > 0) {
      this.wybraneZdjecieIndeks = this.znajdzKolejnyIndex(this.wybraneZdjecieIndeks);
      this.wybraneZdjecie = this.multimedia.pliki[this.wybraneZdjecieIndeks];
      this.ustawMiniaturki();
    }
  }

  /**
   * Funkcja wyświetla poprzednie zdjęcie
   */
  poprzednieZdjecie() {
    if (this.multimedia && this.multimedia.pliki?.length > 0) {
      this.wybraneZdjecieIndeks = this.znajdzPoprzedniIndex(this.wybraneZdjecieIndeks);
      this.wybraneZdjecie = this.multimedia.pliki[this.wybraneZdjecieIndeks];
      this.ustawMiniaturki();
    }
  }

  /**
   * Funckaj ustawia zdjęcie po kliknięciu
   * @param index
   */
  ustawZdjecie(index: number) {
    if (this.multimedia && this.multimedia.pliki?.length > 0) {
      this.wybraneZdjecieIndeks = index;
      this.wybraneZdjecie = this.multimedia.pliki[index];
    }
  }

  /**
   * Funkcja ustala kolejny index obrazka
   * @param index
   */
  private znajdzKolejnyIndex(index: number): number {
    if (this.multimedia && this.multimedia.pliki.length > 0) {
      const nastepnyIndex = index + 1;
      if (nastepnyIndex > this.multimedia.pliki.length - 1) {
        return 0;
      }
      return nastepnyIndex;
    }
    return 0;
  }

  /**
   * Znajdowanie indeksu obrazkow dlakaruzeli obrazkow
   * @param index
   */
  private znajdzIndexDlaKaruzeli(index: number): number {
    if (!this.multimedia || this.multimedia.pliki.length === 0) {
      return 0;
    }
    if (index > this.multimedia.pliki.length - 1) {
      return index - this.multimedia.pliki.length;
    }
    return index;
  }

  /**
   * Funkcja ustala poprzedni index obrazka
   * @param index
   */
  private znajdzPoprzedniIndex(index: number) {
    if (this.multimedia && this.multimedia.pliki.length > 0) {
      const nastepnyIndex = index - 1;
      if (nastepnyIndex < 0) {
        return this.multimedia.pliki.length - 1;
      }
      return nastepnyIndex;
    }
    return 0;
  }

  /**
   * Funkcja inicjuje galerie
   */
  private inicjujGalerie() {
    console.log('inicjujGalerie: ', this.multimedia!.pliki.toString());
    if (this.multimedia && this.multimedia.pliki?.length > 0) {
      this.wybraneZdjecieIndeks = 0;
      this.wybraneZdjecie = this.multimedia.pliki[this.wybraneZdjecieIndeks];
      this.plikiWKaruzeli = [];
      if (this.multimedia.pliki.length >= 3) {
        this.plikiWKaruzeli.push({ plik: this.multimedia.pliki[0], index: 0 });
        this.plikiWKaruzeli.push({ plik: this.multimedia.pliki[1], index: 1 });
        this.plikiWKaruzeli.push({ plik: this.multimedia.pliki[2], index: 2 });
        this.ustawMiniaturki();
      } else {
        this.multimedia.pliki.forEach((p, i) => {
          this.plikiWKaruzeli?.push({ plik: p, index: i });
          this.ustawMiniaturki();
        });
      }
    }
  }

  /**
   * Funkcja ustawia obrazki w galerii
   */
  private ustawMiniaturki() {
    if (this.multimedia && this.multimedia.pliki?.length > 0) {
      this.plikiWKaruzeli?.forEach((p, i) => {
        p.index = this.znajdzIndexDlaKaruzeli(this.wybraneZdjecieIndeks + i);
        p.plik = this.multimedia!.pliki[p.index];
        console.log('ustawMiniaturki',p.plik);
        // p.plik.sciezkaMiniaturki ? p.plik.sciezkaMiniaturki = this.url+p.plik.sciezkaMiniaturki : p.plik.sciezkaMiniaturki = this.url+p.plik.sciezka;
        p.plik.rozszerzenie && (['mp3', 'ogg', 'wav', 'flac'].indexOf(p.plik.rozszerzenie) > -1) ? p.plik.sciezkaMiniaturki = 'assets/images/audio.png' : p.plik.sciezkaMiniaturki = this.url+p.plik.sciezka;
        console.log('ustawMiniaturki',p.plik);
      });
    }
  }

  /**
   * Funkcja pokazuje pełnoekranowa galerie
   */
  pokazGaleriePelnoekranowa() {
    this.widocznaGaleriaPelnoekranowa = true;
  }

  /**
   * Funkcja zamyka pełnoekranowa galerie
   */
  zamknijGaleriePelnoekranowa() {
    this.widocznaGaleriaPelnoekranowa = false;
  }

  /**
   * Funkcja czyści dane
   */
  wyczyscDane() {
    this.wybraneZdjecie = undefined;
    this.wybraneZdjecieIndeks = 0;
    this.plikiWKaruzeli = [];
    this.multimedia = undefined;
    this.zalaczniki = undefined;
  }
}
