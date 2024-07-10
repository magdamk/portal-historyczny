import {Injectable} from '@angular/core';
import {DATA_CZAS_FORMATY} from "../stale/data-czas-formaty";
import * as dayjs from 'dayjs';
import 'dayjs/locale/pl';

dayjs.locale('pl');

@Injectable({
  providedIn: 'root'
})
export class DataCzasService {

  /**
   * Konstruktor
   */
  constructor() {
  }

  /**
   * Funkcja tworzy datę dayjs
   * @param args - argumenty dayjs
   */
  uwtorzDate(...args: any): dayjs.Dayjs {
    return dayjs(args);
  }

  /**
   * Funkcja formatuje datę do wyświetlenia
   * @param data - data jako string lub Date lub dayjs
   * @param jezyk - aktualny język
   */
  dataDoWyswietlenia(data: string | Date | dayjs.Dayjs, jezyk: string) {
    return this.uwtorzDate(data as string).locale(jezyk).format(DATA_CZAS_FORMATY.display.dayWithDate);
  }
}
