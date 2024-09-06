import { Injectable } from '@angular/core';
import { KLUCZE_LOCA_STORAGE, LocalStorageService } from "../../../wspolne/serwisy/local-storage.service";
// import {
//   ControllerKomunikatyOpenService,
//   JsonObjectContainerKomunikatSzczegolyOpenDto,
//   KomunikatSzczegolyOpenDto
// } from "../../../../../build/openapi_modul_mapowy_public";
import { Observable } from "rxjs";
import { ControllerKomunikatyOpenService } from 'src/app/core/api/controller-komunikaty-open.service';
import { KomunikatSzczegolyOpenDto } from 'src/app/core/modele/komunikat-szczegoly-open-dto';
import { JsonObjectContainerKomunikatSzczegolyOpenDto } from 'src/app/core/modele/json-object-container-komunikat-szczegoly-open-dto';

@Injectable({
  providedIn: 'root'
})
export class KomunikatPortaluMapowegoService {

  /**
   * Konstruktor
   * @param localStorageService serwis pamięci przeglądarki
   * @param controllerKomunikaty serwis zarządzajacy danymi komunikatów
   */
  constructor(private localStorageService: LocalStorageService,
    private controllerKomunikaty: ControllerKomunikatyOpenService) {
  }

  /**
   * Funkcja do pobierz komunikat
   */
  pobierzKomunikatPortaluMapowego(): Observable<KomunikatSzczegolyOpenDto | undefined> {
    return new Observable(subscriber => {
      this.controllerKomunikaty.pobierzKomunikatPortaluMapowego()
        .subscribe((result: JsonObjectContainerKomunikatSzczegolyOpenDto) => {
          if (this.sprawdzCzyNieZapisanyWLocalStorage(result.content)) {
            subscriber.next(result.content);
            return;
          }
          subscriber.next(undefined);
        },
          error => {
            subscriber.next(undefined);
          })
    })
  }

  /**
   * Funkcja do zapisywania akceptacji zapoznania użytkownika z komunikatem
   * @param uuid
   */
  zapiszJakoZaakceptowany(uuid: string): void {
    let uuidDoZapisu = uuid ?? '';
    this.localStorageService.zapiszWStorage(KLUCZE_LOCA_STORAGE.KOMUNIKAT_PORTALU_MAPOWEGO, uuidDoZapisu);
  }

  /**
   * Funkcja do sprawdzenia czy komunikat nie był jeszcze zaakceptowany przez użytkownika
   * @param komunikat komunikat
   */
  private sprawdzCzyNieZapisanyWLocalStorage(komunikat: KomunikatSzczegolyOpenDto | undefined): boolean {
    let uuidKomunikatuPortaluMapowego = this.localStorageService.odczytajZeStorage(KLUCZE_LOCA_STORAGE.KOMUNIKAT_PORTALU_MAPOWEGO);
    if (komunikat?.uuid && komunikat.uuid !== uuidKomunikatuPortaluMapowego) {
      return true;
    }
    return false;
  }
}
