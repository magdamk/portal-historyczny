import { createReducer, on } from "@ngrx/store";
import { DEFINICJA_WIDOKOW_MAPY, WIDOKI_MAPY_ID } from "./mapa-widok.const";
import { MapaWidokActions } from "./mapa-widok.actions";

export interface WidokiMapy {
  id: string,
  desktop: boolean,
  mobile: boolean
}


export const WidokiMapyInitialState: WidokiMapyState = {
  widokMapyId: WIDOKI_MAPY_ID.WIDOK_MAPY
}

export interface WidokiMapyState {
  widokMapyId: string,
  dane?: any
}

export const mapaWidokReducer = createReducer(
  WidokiMapyInitialState,
  on(MapaWidokActions.uruchomMapaWidok, (state, { widokMapyId }) => state = { ...state, widokMapyId: DEFINICJA_WIDOKOW_MAPY.get(widokMapyId)!.id }),
  on(MapaWidokActions.zamknijMapaWidok, (state, { widokMapyId }) => state = { ...state, widokMapyId: DEFINICJA_WIDOKOW_MAPY.get(widokMapyId)!.id }),
  on(MapaWidokActions.aktualizujDane, (state, { widokMapyId, dane }) => state = { ...state, widokMapyId: DEFINICJA_WIDOKOW_MAPY.get(widokMapyId)!.id, dane: dane }),
  on(MapaWidokActions.reset, (state) => {
    return WidokiMapyInitialState
  })
)
