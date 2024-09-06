import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import {DzialkaDto, ObiektDto} from '../../core/providers/wyszukiwarka-adapter';
import { Warstwa } from '../modele/warstwa';
// import { NieruchomoscWynajemListaDto } from '../../mm-core/providers/nieruchomosci-adapter';
import { DzialkaDto, ObiektDto } from '../../mm-core/providers/wyszukiwarka-adapter';
// import {NieruchomoscWynajemListaDto} from '../../core/providers/nieruchomosci-adapter';

export interface InformacjeOObiekcieEvent {
  obiekt: DzialkaDto | ObiektDto | undefined;
  warstwa?: Warstwa;
}

/**
 * Serwis obsługujący wydarzenia dodawania obiektów do map
 */
@Injectable({
  providedIn: 'root'
})
export class ObiektyMapyService {

  private wyswietlInformacjeOLokalizacji$ = new BehaviorSubject<InformacjeOObiekcieEvent | undefined>(undefined);
  private wyswietlInformacjeOObiekcie$ = new BehaviorSubject<InformacjeOObiekcieEvent | undefined>(undefined);
  private dodajObiektDoMapy$ = new BehaviorSubject<InformacjeOObiekcieEvent | undefined>(undefined);

  /**
   * Konstruktor
   */
  constructor() {
  }

  /**
   * Funkcja resetuje stan serwisu
   */
  resetujStan() {
    this.wyswietlInformacjeOLokalizacji$.next(undefined);
    this.wyswietlInformacjeOObiekcie$.next(undefined);
    this.dodajObiektDoMapy$.next(undefined);
  }

  /**
   * Funkcja wywołująca zdarzenie wyświetlenia obiektu na mapie
   *
   * @param obiekt - dane obiektu do wyswietlenia
   * @param uuidWarstwyNaMapie - dane warstwy do ktorej nalezy obiekt
   */
  przekazObiektDoWyswietlenia(obiekt: DzialkaDto | ObiektDto | undefined, warstwa?: Warstwa) {
    this.wyswietlInformacjeOObiekcie$.next({ obiekt, warstwa });
  }

  /**
   * Funckja zwraca subject informacji o obiekcie
   */
  pobierzSubjectInformacjiOObiekcie(): BehaviorSubject<InformacjeOObiekcieEvent | undefined> {
    return this.wyswietlInformacjeOObiekcie$;
  }

  /**
   * Funkcja wywołuje zdarzenie dodania obiektu do mapy
   * @param obiekt
   */
  przekazObiektDoDodania(obiekt: DzialkaDto | ObiektDto | undefined) {
    this.dodajObiektDoMapy$.next({ obiekt });
  }

  /**
   * Funkcja zwraca subject dodawania obiektu do mapy
   */
  pobierzSubjectDodawaniaObiektu(): BehaviorSubject<InformacjeOObiekcieEvent | undefined> {
    return this.dodajObiektDoMapy$;
  }

  /**
   * Funkcja wywołująca zdarzenie wyświetlenia lokalizacji na mapie
   *
   * @param obiekt - dane obiektu do wyswietlenia
   */
  przekazLokalizacjeDoWyswietlenia(obiekt: DzialkaDto | ObiektDto
    // | NieruchomoscWynajemListaDto
    | undefined) {
    this.wyswietlInformacjeOLokalizacji$.next({ obiekt });
  }

  /**
   * Funkcja zwraca subject informacji o lokalizacji
   */
  pobierzSubjectInformacjiOLokalizacji(): BehaviorSubject<InformacjeOObiekcieEvent | undefined> {
    return this.wyswietlInformacjeOLokalizacji$;
  }
}
