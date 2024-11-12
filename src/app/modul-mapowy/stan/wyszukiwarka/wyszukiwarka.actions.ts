import {createAction, props} from '@ngrx/store';
import {DaneWyszukiwarki} from './wyszukiwarka.reducer';

/**
 * Stala opisuje funkcje mozliwe do wykonania na interfejsie uzytkownika
 */
export const WyszukiwarkaActions = {
  aktualizujDaneWyszukiwarkiObiektow: createAction('[WYSZUKIWARKA] aktualizujDaneWyszukiwarkiObiektow',
    props<{ daneWyszukiwarki: DaneWyszukiwarki }>()),
  aktualizujDaneWyszukiwarkiDzialek: createAction('[WYSZUKIWARKA] aktualizujDaneWyszukiwarkiDzialek',
    props<{ daneWyszukiwarki: DaneWyszukiwarki }>()),
  aktualizujDaneWyszukiwarkiObiektowOdleglosc: createAction('[WYSZUKIWARKA] aktualizujDaneWyszukiwarkiObiektowOdleglosc',
    props<{ daneWyszukiwarki: DaneWyszukiwarki }>()),
  reset: createAction('[WYSZUKIWARKA] reset'),

  /* POKAZ WIECEJ*/
  wyszukiwarkaObiektowPokazWiecej: createAction('[WYSZUKIWARKA] wyszukiwarkaObiektowPokazWiecej'),
  wyszukiwarkaOniektowPokazMniej: createAction('[WYSZUKIWARKA] wyszukiwarkaOniektowPokazMniej')
};
