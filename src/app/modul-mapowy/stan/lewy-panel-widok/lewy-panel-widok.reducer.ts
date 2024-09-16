import { createReducer, on } from "@ngrx/store";
import { DEFINICJA_WIDOKOW, WIDOKI_ID } from "./lewy-panel-widok.const";
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
  top: WIDOKI_ID.INFO,
  widok: DEFINICJA_WIDOKOW.get(WIDOKI_ID.INFO)!,
  widoki: DEFINICJA_WIDOKOW
};

export interface WidokState {
  top: string,
  widok: Widok,
  widoki: any
}

export const lewyPanelWidokReducer = createReducer(
  LewyPanelWidokInitialState,
  on(LewyPanelWidokActions.pokazObszar, (state, { widokId }) => state = { ...state,top: widokId, widok: DEFINICJA_WIDOKOW.get(widokId)! })
)
