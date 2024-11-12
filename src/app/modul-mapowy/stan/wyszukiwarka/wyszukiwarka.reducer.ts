import {Action, createReducer, on} from '@ngrx/store';
import {WyszukiwarkaActions} from './wyszukiwarka.actions';


/**
 * Domyslny stan wyszukiwarki
 */
export interface WyszukiwarkaStan {
  daneWyszukiwarkiObiektow?: DaneWyszukiwarki;
  daneWyszukiwarkiDzialek?: DaneWyszukiwarki;
  daneWyszukiwarkiObiektowOdleglosc?: DaneWyszukiwarki;
}

/**
 * Interfejs do przechowywyania stanu wyszukiwarek
 *
 */
export interface DaneWyszukiwarki {
  fraza?: string;
  obreb?: string;
  dzialka?: string;
  lokalizacjaPoczatkowa?: string;
  zasieg?: number;
  pokazWiecej?: boolean;
}

/**
 * Domyslny stan interfejsu uzytkownika
 */
export const WyszukiwarkaInitialState: WyszukiwarkaStan = {
  daneWyszukiwarkiObiektow: undefined,
  daneWyszukiwarkiDzialek: undefined,
  daneWyszukiwarkiObiektowOdleglosc: undefined,
};

/**
 * Funkcja definiuje modyfikacje stanu dla interfejsu uzytkownika
 */
const _wyszukiwarkaReducer = createReducer(WyszukiwarkaInitialState,
  on(WyszukiwarkaActions.aktualizujDaneWyszukiwarkiObiektow, (state, {daneWyszukiwarki}) => {
    return {...state, daneWyszukiwarkiObiektow: {...state.daneWyszukiwarkiObiektow, ...daneWyszukiwarki}};
  }),
  on(WyszukiwarkaActions.aktualizujDaneWyszukiwarkiDzialek, (state, {daneWyszukiwarki}) => {
    return {...state, daneWyszukiwarkiDzialek: {...state.daneWyszukiwarkiDzialek, ...daneWyszukiwarki}};
  }),
  on(WyszukiwarkaActions.aktualizujDaneWyszukiwarkiObiektowOdleglosc, (state, {daneWyszukiwarki}) => {
    return {
      ...state,
      daneWyszukiwarkiObiektowOdleglosc: {...state.daneWyszukiwarkiObiektowOdleglosc, ...daneWyszukiwarki}
    };
  }),
  on(WyszukiwarkaActions.wyszukiwarkaObiektowPokazWiecej, (state)=>{
      return {...state, daneWyszukiwarkiObiektow: {...state.daneWyszukiwarkiObiektow, pokazWiecej: true}}
  }),
  on(WyszukiwarkaActions.wyszukiwarkaOniektowPokazMniej, (state)=>{
    return {...state, daneWyszukiwarkiObiektow: {...state.daneWyszukiwarkiObiektow, pokazWiecej: false}}
  }),
  on(WyszukiwarkaActions.reset, (state)=>{
    return WyszukiwarkaInitialState
  }),
);

export function wyszukiwarkaReducer(state: WyszukiwarkaStan | undefined, action: Action) {
  return _wyszukiwarkaReducer(state, action);
}
