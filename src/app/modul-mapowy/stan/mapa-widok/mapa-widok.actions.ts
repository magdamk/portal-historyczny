import { createAction, props } from "@ngrx/store";

export const MapaWidokActions = {
  uruchomMapaWidok: createAction('[MAPA_WIDOK] uruchomMapaWidok', props<{ widokMapyId: string }>()),
  zamknijMapaWidok: createAction('[MAPA_WIDOK] zamknijMapaWidok', props<{ widokMapyId: string }>()),
  aktualizujDane: createAction('[MAPA_WIDOK] aktualizujDane', props<{ widokMapyId: string, dane: any }>()),
  reset: createAction('[MAPA_WIDOK] reset')
}
