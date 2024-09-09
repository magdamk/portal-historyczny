import {Injectable} from '@angular/core';
// import {GrupaWarstwPodkladowych, GrupyWarstwPodkladowychAdapter} from '@modul-mapowy';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { ControllerGrupyMapPodkladowychOpenService } from 'src/app/core/api/controller-grupy-map-podkladowych-open.service';
import { GrupyWarstwPodkladowychAdapter } from 'src/app/modul-mapowy/mm-core/providers/grupy-warstw-podkladowych-adapter';
import { GrupaWarstwPodkladowych } from 'src/app/modul-mapowy/serwis-mapowy/modele/grupa-warstw-podkladowych';
// import {ControllerGrupyMapPodkladowychOpenService} from "../../../../../build/openapi_modul_mapowy_public";

/**
 * Serwis implementuje adapter wartsw podkładowych
 */
@Injectable({
  providedIn: 'root'
})
export class GrupaWarstwPodkladowychProviderService implements GrupyWarstwPodkladowychAdapter {

  constructor(private grupyMapPodkladowych: ControllerGrupyMapPodkladowychOpenService) {
  }

  pobierzGrupyWarstwPodkladowych(): Observable<GrupaWarstwPodkladowych[]> {
    return this.grupyMapPodkladowych.pobierzListeGrupMapPokladowychDlaWidokuMap()
      .pipe(map((gwp: any) => gwp.content as GrupaWarstwPodkladowych[]))
  }


}
