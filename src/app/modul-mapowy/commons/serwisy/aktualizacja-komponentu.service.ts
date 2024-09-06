import {ElementRef, Injectable, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
// import {InterfejsUzytkownikaStan} from '../../stan/interfejs-uzytkownika/interfejs-uzytkownika.reducer';
import {Subscription} from 'rxjs';

/**
 * Serwis umożliwuiający wymuszoną aktualizację komponenów
 */
@Injectable({
  providedIn: 'root'
})
export class AktualizacjaKomponentuService implements OnDestroy {
  mozliwoscWymuszonejAktualizacji = false;

  subskrybcja$ = new Subscription();


  /**
   * Konstruktor
   * @param store - serwis zarządzania stanem
   */
  constructor(private store: Store<{ modulMapowy: any }>) {
    this.subskrybujStanInterfejsu();
  }

  /**
   * Cykl życia obiektu
   */
  ngOnDestroy() {
    this.subskrybcja$.unsubscribe();
  }

  /**
   * Funkcja subskrybująca stan interfejsu
   */
  private subskrybujStanInterfejsu() {
    // this.subskrybcja$ = this.store.select('modulMapowy', 'interfejsUzytkownika')
    //   .subscribe((stan: InterfejsUzytkownikaStan) => {
    //     this.mozliwoscWymuszonejAktualizacji = stan.mozliwoscWymuszonejAktualizacji;
    //   });
  }

  /**
   * Funkcja wymuszająca aktualizacje komponentu
   * @param komponent - referencja komponentu
   */
  wymusAktualizacjeKomponentu(komponent: ElementRef) {
    if (this.mozliwoscWymuszonejAktualizacji) {
      komponent.nativeElement.click();
    }
  }
}
