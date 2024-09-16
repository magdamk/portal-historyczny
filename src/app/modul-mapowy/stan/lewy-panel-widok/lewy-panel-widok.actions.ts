import { createAction, props } from "@ngrx/store";

export const LewyPanelWidokActions = {
  pokazObszar: createAction('[LEWY_PANEL_WIDOK] pokazObszar', props<{ widokId: string }>()),
  reset: createAction('[LEWY_PANEL_WIDOK] reset')
}
