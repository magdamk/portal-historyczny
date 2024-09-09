import { Injectable } from '@angular/core';
// import {MapyAdapter, Mapa} from '@modul-mapowy';
import { Observable } from 'rxjs';
import { ControllerMapyOpenService } from 'src/app/core/api/controller-mapy-open.service';
import { MapyAdapter } from 'src/app/modul-mapowy/mm-core/providers/mapy-adapter';
import { Mapa } from 'src/app/modul-mapowy/serwis-mapowy/modele/mapa';
// import {ControllerMapyOpenService} from '../../../../../build/openapi_modul_mapowy_public';

/**
 * Serwis obsluguje zapis i oczyt mapy
 */
@Injectable({
  providedIn: 'root'
})
export class MapyProviderService implements MapyAdapter {

  /**
   * Konstruktor
   * @param mapaService
   */
  constructor(private mapaService: ControllerMapyOpenService) {
  }

  /**
   * Funkcja sluzy do pobierania mapy
   * @param uuid
   */
  pobierzMape(uuid: string): Observable<Mapa> {
    return new Observable<Mapa>();
  }

  /**
   * Funkcja sluzy do zapisywania mapy
   * @param mapa
   */
  zapiszMape(mapa: Mapa): Observable<Mapa> {
    return new Observable<Mapa>(subscriber => {
      this.mapaService.stworzMapePrywatna(mapa)
        .subscribe((response: any) => {
          subscriber.next(response.content.definicjaMapy);
          subscriber.complete();
        })
    });
  }


}
