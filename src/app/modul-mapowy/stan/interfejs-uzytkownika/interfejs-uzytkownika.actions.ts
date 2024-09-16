import { createAction, props } from '@ngrx/store';

/**
 * Stala opisuje funkcje mozliwe do wykonania na interfejsie uzytkownika
 */
export const InterfejsUzytkownikaActions = {
  zwinLewaBelke: createAction('[INTERFEJS_UZYTKOWNIKA] zwinLewaBelke'),
  rozwinLewaBelke: createAction('[INTERFEJS_UZYTKOWNIKA] rozwinLewaBelke'),
  odwrocRozwiniecieLewaBelka: createAction('[INTERFEJS_UZYTKOWNIKA] odwrocRozwiniecieLewaBelka'),

  zwinWyszukiwarke: createAction('[INTERFEJS_UZYTKOWNIKA] zwinWyszukiwarke'),
  rozwinWyszukiwarke: createAction('[INTERFEJS_UZYTKOWNIKA] rozwinWyszukiwarke', props<{ aktywna: number }>()),
  odwrocRozwiniecieWyszukiwarka: createAction('[INTERFEJS_UZYTKOWNIKA] odwrocRozwiniecieWyszukiwarka'),

  ukryjWszystko: createAction('[INTERFEJS_UZYTKOWNIKA] ukryjWszytsko'),
  pokazWszystko: createAction('[INTERFEJS_UZYTKOWNIKA] pokazWszystko'),

  blokujWymuszonaAktualizacje: createAction('[INTERFEJS_UZYTKOWNIKA] blokujWymuszonaAktualizacje'),
  odblokujWymuszonaAktualizacje: createAction('[INTERFEJS_UZYTKOWNIKA] odblokujWymuszonaAktualizacje'),

  reset: createAction('[INTERFEJS_UZYTKOWNIKA] reset')
};
