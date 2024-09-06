import {Mapa} from '../modele/mapa';
import {Punkt} from '../modele/punkt';
import {Prostokat} from '../modele/prostokat';
import {Warstwa} from '../modele/warstwa';
//@ts-ignore
import {v4 as uuidv4} from 'uuid';
import {KonwerterGeometriUtils} from './konwerter-geometri-utils';

export class MapaUtils {

  /**
   * Funkcja tworzy pustą mapę;
   */
  static utworPustaMape(nazwa: string): Mapa {
    return {
      uuid: uuidv4(),
      nazwa: {pl: nazwa, en: ''},
      opisWPortaluMapowym: {pl: '', en: ''},
      srodekMapyY: undefined,
      srodekMapyX: undefined,
      domyslnaSkala: undefined,
      warstwy: [] as Warstwa[]
    };
  }

  /**
   * Funkcja zwraca domyślny środek mapy
   */
  static domyslnySrodekMap(): Punkt {
    return {
      x: 7502805,
      y: 5788955,
      srid: 2178
    };
  }

  /**
   * Funckja zwraca zasięg przestrzenny portalu
   */
  static maksymalnyZasiegPrzestrzenny(): Prostokat {
    return {
      minX: 7485000,
      minY: 5770000,
      maxX: 7525000,
      maxY: 5810000,
      srid: 2178
    };
  }

  /**
   * Funckja zwraca zasięg przestrzenny portalu
   */
  static maksymalnyZasiegPrzestrzennyWgs84(): Prostokat {
    const zasieg2000 = this.maksymalnyZasiegPrzestrzenny();
    const minWgs84 = KonwerterGeometriUtils.EPSG2178toEPSG4326(zasieg2000.minX, zasieg2000.minY);
    const maxWgs84 = KonwerterGeometriUtils.EPSG2178toEPSG4326(zasieg2000.maxX, zasieg2000.maxY);
    return {
      minX: minWgs84!.x,
      minY: minWgs84!.y,
      maxX: maxWgs84!.x,
      maxY: maxWgs84!.y,
      srid: 4326
    }
  }

  /**
   * Funkcja sprawdaz czy podany punkt jest w zasięgu przestrzennym
   * @param punkt
   */
  static czyPunktWZasieguPrzestrzennymMapy(punkt: any): boolean {
    const zasiegPrzestrzenny = this.maksymalnyZasiegPrzestrzenny();
    if (punkt.type === 'Point' &&
      punkt.getX() >= zasiegPrzestrzenny.minX &&
      punkt.getX() <= zasiegPrzestrzenny.maxX &&
      punkt.getY() >= zasiegPrzestrzenny.minY &&
      punkt.getY() <= zasiegPrzestrzenny.maxY) {
      return true;
    }
    if (punkt.x >= zasiegPrzestrzenny.minX &&
      punkt.x <= zasiegPrzestrzenny.maxX &&
      punkt.y >= zasiegPrzestrzenny.minY &&
      punkt.y <= zasiegPrzestrzenny.maxY) {
      return true;
    }
    return false;
  }

  /**
   * Funkcja zwraca domyślny zoom
   */
  static domyslnyZoom(): number {
    return 2;
  }
}
