import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {bufferCount, take} from 'rxjs/operators';
import {KontaktZAdministratoremModulMapowyAdapter, WidomoscDoAdministratora, ZalacznikWiadomosci} from '../../../core/adaptery/kontakt-z-administratorem-adapter';
import {Router} from '@angular/router';
import {KomunikatyModulMapowyAdapter} from '../../../core/adaptery/komunikaty-adapter';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
// import {MapyModulMapowyAdapter} from '../../../core/providers/mapy-adapter';
// import {MapaService} from '../../../serwis-mapowy/serwisy/mapa.service';
import {KolekcjeUtils} from "../../../core/utils/kolekcje-utils";
import { KontaktService } from 'src/app/core/service/kontakt.service';

export const DOPUSZCZALNE_FORMATY_ZALACZNIKOW = ['application/pdf', 'application/x-zip-compressed', 'image/jpeg', 'image/png','application/zip'];

/**
 * Komponent formularz kontaktowy
 */
@Component({
  selector: 'app-kontakt-formularz',
  templateUrl: './kontakt-formularz.component.html',
  styleUrls: ['./kontakt-formularz.component.scss']
})
export class KontaktFormularzComponent {
  @Output() poWyslaniu = new EventEmitter<any>();
  wiadomoscLiczbaZnakow = 0;
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    wiadomosc: new FormControl('', Validators.required)
    // ,
    // pliki: new FormControl('0', Validators.max(10000000))
    // ,

  });
  zaladowanePliki: File[] = [];
  czyNiepoprawnyFormat = false;

  /**
   * Konstruktor
   */
  constructor(private kontaktService: KontaktService, private snackBar: MatSnackBar) {
    this.utworzFormGroup();
  }

  /**
   * Funkcja wysyła dane z formularza do serwera
   */
  wyslij(): void {
    // this.zapiszMape().subscribe((urlMapy) => {
    //   const wiadomosc = this.spakujWiadomosc();
    //   wiadomosc.adresBiezacejMapy = urlMapy;
    //   if (this.zaladowanePliki.length) {
    //     this.dodajZalaczniki(this.zaladowanePliki)
    //       .pipe(bufferCount(this.zaladowanePliki.length),
    //         take(1))
    //       .subscribe(zalaczniki => {
    //         wiadomosc.zalaczniki = zalaczniki;
    //         this.wyslijZadanieZapisu(wiadomosc);
    //       });
    //   } else {
    //     this.wyslijZadanieZapisu(wiadomosc);
    //   }
    // });
  }

  /**
   * Funkcja do pakowania danych wiadomości do wysłania
   */
  // private spakujWiadomosc(): WidomoscDoAdministratora {
  //   const wiadomosc: WidomoscDoAdministratora = {
  //     wyslaneOd: this.form.value.email,
  //     zawartosc: this.form.value.wiadomosc
  //   };
  //   return wiadomosc;
  // }

  /**
   * Funkcja do dodawania zalacznikow wiadomości
   * @param pliki załączniki
   */
  // private dodajZalaczniki(pliki: File[]): Observable<ZalacznikWiadomosci> {
  //   return new Observable<ZalacznikWiadomosci>(subscriber => {
  //     pliki.forEach(plik => {
  //       if (plik?.size) {
  //         const czytaczPliku = new FileReader();
  //         czytaczPliku.readAsDataURL(plik);
  //         czytaczPliku.onload = () => {
  //           subscriber.next({
  //             nazwaPliku: plik.name,
  //             typPliku: plik.type,
  //             danePliku: (czytaczPliku.result as string).split('base64,')[1]
  //           } as ZalacznikWiadomosci);
  //         };
  //       }
  //     });
  //   });
  // }

  /**
   * Funkcja do wysyłania żądania zapisu
   * @param wiadomosc wiadomość do administratora
   */
  // private wyslijZadanieZapisu(wiadomosc: WidomoscDoAdministratora): void {
  //   this.service.dodajWiadomoscDlaAdministratora(wiadomosc).subscribe(
  //     () => {
  //       this.serviceKomunikaty.pokazPomyslnyKomunikat('codes.generyczne.wyslano-pomyslnie', {duration: 5000});
  //       this.poWyslaniu.emit('');
  //     },
  //     (error) => {
  //       this.serviceKomunikaty.pokazKomunikatBledu('codes.generyczne.nieoczekiwany-blad', {duration: 5000});
  //     });
  // }

  /**
   * Funckja reaguje na wpisywany tekst i wylicza jego długość
   * @param event - natywne zdarzenie
   */
  zmianaWiadomosci(event: any): void {
    this.wiadomoscLiczbaZnakow = event.target.value.length;
  }
  addWiadomosc() {
    console.log(this.form.get('email')?.value);
    let email = this.form.get('email')?.value;
    let tresc = 'Klimatyczna mapa szkół <br />' + this.form.get('wiadomosc')?.value
    this.kontaktService.addEmail({
      wyslaneOd: email!,
      zawartosc: tresc!,
      adresBiezacejMapy: ''
    }).subscribe(() => {
      this.snackBar.open('Wysłano pomyślnie.', 'Zamknij', {
        panelClass: 'komunikaty-sukces',
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.poWyslaniu.emit('');
    },
      (error) => {
        this.snackBar.open('Wystąpił błąd, spróbuj ponownie.', 'Zamknij', {
          panelClass: 'komunikaty-blad',
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
    // this.poWyslaniu.emit();
  }
  /**
   * Funkcja inicjalizuje formularz
   */
  utworzFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      wiadomosc: new FormControl('', Validators.required),
      // pliki: new FormControl('0', Validators.max(10000000))
      // ,
      // dolaczBiezacyWidokMapy: new FormControl(false)
    });
  }

  /**
   * Funkcja wywołuje operację dodawania plików
   * @param plik - natywny obiekt pliku
   */
  // dodajPlik(plik: File): void {
  //   this.zaladowanePliki.push(plik);
  //   this.ustawRozmiarPlikow();
  //   this.sprawdzFormatyPlikow();
  // }

  /**
   * Funkcja usuwa plik
   * @param plik - natywny obiekt pliku
   */
  // usunPlik(plik: File): void {
  //   this.zaladowanePliki.splice(this.zaladowanePliki.map(f => f.name).indexOf(plik.name), 1);
  //   this.ustawRozmiarPlikow();
  //   this.sprawdzFormatyPlikow();
  // }

  /**
   * Funkcja wylicza rozmiar wszystkich plików
   */
  // ustawRozmiarPlikow(): void {
  //   let rozmiarPliku = 0;
  //   this.zaladowanePliki.forEach(plik => {
  //     rozmiarPliku += plik.size;
  //   });
  //   this.form.controls.pliki?.setValue(rozmiarPliku);
  // }

  /**
   * Funkcja wylicza rozmiar wszystkich plików
   */
  // sprawdzFormatyPlikow(): void {
  //   const bledneFormaty =
  //     this.zaladowanePliki.filter(plik => !DOPUSZCZALNE_FORMATY_ZALACZNIKOW.includes(plik.type));
  //   this.czyNiepoprawnyFormat = bledneFormaty && bledneFormaty.length > 0;
  // }

  /**
   * Funkcja usuwa wiodące spacje
   * @param event - natywne zdarzenie
   */
  usunWiodacaSpacje(event: KeyboardEvent): void {
    this.form.controls.email?.setValue(this.form.controls.email.value!.replace(/^\s+/g, ''));
    this.form.controls.wiadomosc?.setValue(this.form.controls.wiadomosc.value!.replace(/^\s+/g, ''));
  }

  /**
   * Funkcja zapisuje mape jezeli wybrano udosteonienie widoku mapy
   */

  // zapiszMape(): Observable<any> {
  //   return new Observable<any>(subscriber => {
  //     const mapaGlowna = this.mapaSerwis.mapaGlowna;
  //     if (!this.form.value.dolaczBiezacyWidokMapy) {
  //       subscriber.next('');
  //       subscriber.complete();
  //       return;
  //     }
  //     if (mapaGlowna && this.mapaSerwis.czyMapaZmieniona(mapaGlowna)) {
  //       this.mapyAdapter.zapiszMape(KolekcjeUtils.klonowanieObiektu(mapaGlowna))
  //         .subscribe(mapa => {
  //           this.mapaSerwis.zapisanoMapePrywatna(mapa);
  //             subscriber.next(`${window.location.origin}/mapa/${mapa.uuid}`);
  //             subscriber.complete();
  //             return;
  //         });
  //       return;
  //     }
  //     subscriber.next(`${window.location.origin}/mapa/${mapaGlowna?.uuid}`)
  //     subscriber.complete();
  //   })
  // }
}
