import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * Serwis służy do zarządzania globalnymi zdarzeniami
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalneZdarzeniaService {

  /**
   * Konstruktor
   */
  constructor() {
  }

  private zamykanieOkien$ = new BehaviorSubject<string>('');

  /**
   * Funkcja informuje o zamknięci okana typu popup
   */
  zglosZamkniecieOkienka(): void {
    this.zamykanieOkien$.next('');
  }

  /**
   * Funkcja służy do pobierania obserwatora zmian stanu okna
   */
  pobierSubjectZamykaniaOkienka(): BehaviorSubject<string> {
    return this.zamykanieOkien$;
  }
}
