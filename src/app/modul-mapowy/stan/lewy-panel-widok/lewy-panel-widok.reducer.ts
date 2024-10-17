import { createReducer, on } from "@ngrx/store";
import { DEFINICJA_WIDOKOW, WIDOKI_ARR, WIDOKI_ID } from "./lewy-panel-widok.const";
import { LewyPanelWidokActions } from "./lewy-panel-widok.actions";

export interface Widok {
  id: string,
  zIndex: number,
  kolejnosc: number,
  desktop: boolean,
  mobile: boolean,
  wirtualne: boolean,
  parentId?: string,
  dane?: any,
}

export const LewyPanelWidokInitialState: WidokState = {
  top: WIDOKI_ID.PASKI_CZASU,
  widok: DEFINICJA_WIDOKOW.get(WIDOKI_ID.PASKI_CZASU)!,
  nastepnyWidok: DEFINICJA_WIDOKOW.get(WIDOKI_ID.TAGI)!,
  widoki: WIDOKI_ARR
};

export interface WidokState {
  top: string,
  widok: Widok,
  nastepnyWidok: Widok,
  widoki: Widok[]
}



export const lewyPanelWidokReducer = createReducer(
  LewyPanelWidokInitialState,
  on(LewyPanelWidokActions.pokazObszar, (state, { widokId }) => state = { ...state, top: widokId, widok: DEFINICJA_WIDOKOW.get(widokId)! }),
  on(LewyPanelWidokActions.zapiszNastepnyObszar, (state, { nastepnyWidok }) => state = { ...state, nastepnyWidok: DEFINICJA_WIDOKOW.get(nastepnyWidok)! }),
  on(LewyPanelWidokActions.pokazNastepnyObszar, (state) => state = { ...state, top: state.nastepnyWidok.id, widok: DEFINICJA_WIDOKOW.get(state.nastepnyWidok.id)! }),
  on(LewyPanelWidokActions.reset, (state) => {
    return LewyPanelWidokInitialState
  })
)
