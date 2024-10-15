import { createAction, props } from "@ngrx/store";

export const LewyPanelWidokActions = {
  pokazObszar: createAction('[LEWY_PANEL_WIDOK] pokazObszar', props<{ widokId: string }>()),
  pokazNastepnyObszar: createAction('[LEWY_PANEL_WIDOK] pokazNastepnyObszar'),
  zapiszNastepnyObszar: createAction('[LEWY_PANEL_WIDOK] zapiszNastepnyObszar', props<{ nastepnyWidok: string }>()),
  reset: createAction('[LEWY_PANEL_WIDOK] reset')
}
