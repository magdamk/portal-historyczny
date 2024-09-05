import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Stałe dla ikon
 */
export const KONFIGURACJA_IKONY_SVG = {
  SCIEZKA_DOK_KATALOGU_IKON: 'assets/ikony/'
}

/**
 * Interfejs definujący obiekt ikony
 */
export interface IkonaSVG {
  nazwa: string;
  zawartosc: string;
}

/**
 * Serwis ładujący i keszujący ikony
 */
@Injectable({
  providedIn: 'root'
})
export class IkonyService {

  private ikony: IkonaSVG[] = [];

  /**
   * KOnstruktor
   * @param httpClient - natywny serwis klienta http
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Funkcja zwracająca zawartość ikony svg
   * @param nazwa
   */
  pobierzIkone(nazwa: string): Observable<IkonaSVG> {
    return new Observable<IkonaSVG>(subscriber => {
      const ikona = this.znajdzIkone(nazwa);
      if (ikona) {
        subscriber.next(ikona);
      } else {
        this.zaladujIkoneZSerwera(nazwa).subscribe(rIkona => {
          this.ikony.push(rIkona);
          subscriber.next(rIkona);
        });
      }
    });
  }

  /**
   * Funkcja wyszukuje w keszu ikony po nazwie
   * @param nazwa - nazwa ikony
   */
  znajdzIkone(nazwa: string): IkonaSVG | undefined {
    return this.ikony.find(i => i.nazwa === nazwa);
  }

  /**
   * Funkcja ładuje z serwera ikony
   * @param nazwa - mzawa ikony
   */
  zaladujIkoneZSerwera(nazwa: string): Observable<IkonaSVG> {
    return new Observable(subscriber => {
      this.httpClient.get(`${KONFIGURACJA_IKONY_SVG.SCIEZKA_DOK_KATALOGU_IKON}${nazwa}.svg`, {responseType: 'text'})
        .subscribe(data => {
          subscriber.next({nazwa, zawartosc: data});
        });
    });
  }


}
