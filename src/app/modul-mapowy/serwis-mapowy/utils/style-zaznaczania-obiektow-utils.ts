import { Style } from '../../oracle-maps/types/style';
import { OM } from '../../oracle-maps/types/om';
import { Observable } from 'rxjs';
import { KonfiguracjaAdapter } from '../../mm-core/providers/konfiguracja-adapter';

declare var OM: OM;

export class StyleZaznaczaniaObiektowUtils {

  static pobierzStylZaznaczaniaObiektu(typ: string): Style {
    if (typ === 'Polygon' || typ === 'MultiPolygon') {
      return new OM.style.Color({
        styleName: 'kolor',
        fill: '#CC3333',
        fillOpacity: 0.5,
        strokeThickness: 0
      })
    }
    return new OM.style.Color({
      styleName: 'kolor',
      stroke: '#CC3333',
      strokeOpacity: 0.5,
      strokeThickness: 5
    })
  }

  /**
   * Funkcja zwraca predefiniowany styl dla zaznaczonych obiektow
   */
  static pobierzStylWybieraniaObiektu(typ: string): Style {
    if (typ === 'Polygon' || typ === 'MultiPolygon') {
      return new OM.style.Color({
        styleName: 'kolor-selekcji',
        fill: '#CC3333',
        fillOpacity: 1,
        strokeThickness: 0,
      });
    }
    return new OM.style.Color({
      styleName: 'kolor-selekcji',
      stroke: '#CC3333',
      strokeOpacity: 1,
      fillOpacity: 0,
      strokeThickness: 5,
    });
  }

  static pobierzStylZaznaczaniaObiektuZServera(typ: string, konfiguracja: KonfiguracjaAdapter): Observable<Style> {
    return new Observable<Style>(observer => {
      const konfiguracjStyli = konfiguracja.pobierzDefinicjeStyluWszystkieObiektyDlaSelekcji(typ);
      OM.style.StyleStore.getServerSideStyle(
        konfiguracjStyli.zrodlo,
        konfiguracjStyli.styl,
        {
          url: konfiguracja.pobierzMapViewerUrl(),
          callback: (serverSideStyle) => {
            observer.next(serverSideStyle);
            observer.complete();
          }
        });
    });
  }

  /**
   * Funkcja zwraca predefiniowany styl dla zaznaczonych obiektow
   */
  static pobierzStylWybieraniaObiektuZServera(typ: string, konfiguracja: KonfiguracjaAdapter): Observable<Style> {
    return new Observable<Style>(observer => {
      const konfiguracjStyli = konfiguracja.pobierzDefinicjeStyluWybraneObiektyDlaSelekcji(typ);
      OM.style.StyleStore.getServerSideStyle(
        konfiguracjStyli.zrodlo,
        konfiguracjStyli.styl,
        {
          url: konfiguracja.pobierzMapViewerUrl(),
          callback: (serverSideStyle) => {
            observer.next(serverSideStyle);
            observer.complete();
          }
        });
    });
  }
}
