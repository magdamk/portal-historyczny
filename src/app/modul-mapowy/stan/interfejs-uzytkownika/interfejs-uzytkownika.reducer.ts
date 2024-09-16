import { Action, createReducer, on } from '@ngrx/store';
import { InterfejsUzytkownikaActions } from './interfejs-uzytkownika.actions';
import { ResponsywnoscUtils } from '../../mm-core/responsywnosc/utils/responsywnosc-utils';

export const WYSZUKIWARKI = {
  DOMYSLNA: 1,
  DZIALKI: 2,
  OBIEKTY_W_ODLEGLOSCI: 3
};

export interface InterfejsUzytkownikaStan {
  belkaBocznaLewa: {
    zwinieta: boolean;
    ukryta: boolean;
  },
  wyszukiwarka: {
    zwinieta: boolean;
    ukryta: boolean;
    aktywna: number;
  },
  mapaNawigacja: {
    ukryta: boolean;
  },
  belkaGorna: {
    ukryta: boolean;
  },
  mozliwoscWymuszonejAktualizacji: boolean;
}

/**
 * Domyslny stan interfejsu uzytkownika
 */
export const InterfejsUzytkownikaInitialState: InterfejsUzytkownikaStan = {
  belkaBocznaLewa: { zwinieta: !ResponsywnoscUtils.czyTrybDesktop(), ukryta: false },
  wyszukiwarka: { zwinieta: true, ukryta: false, aktywna: WYSZUKIWARKI.DOMYSLNA },
  belkaGorna: { ukryta: false },
  mapaNawigacja: { ukryta: false },
  mozliwoscWymuszonejAktualizacji: true
};

/**
 * Funkcja definiuje modyfikacje stanu dla interfejsu uzytkownika
 */
const _interfejsUzytkowikaReducer = createReducer(
  InterfejsUzytkownikaInitialState,
  on(InterfejsUzytkownikaActions.zwinLewaBelke, (state) => {
    return { ...state, belkaBocznaLewa: { ...state.belkaBocznaLewa, zwinieta: true } };
  }),
  on(InterfejsUzytkownikaActions.rozwinLewaBelke, (state) => {
    return { ...state, belkaBocznaLewa: { ...state.belkaBocznaLewa, zwinieta: false } };
  }),
  on(InterfejsUzytkownikaActions.odwrocRozwiniecieLewaBelka, (state) => {
    return { ...state, belkaBocznaLewa: { ...state.belkaBocznaLewa, zwinieta: !state.belkaBocznaLewa.zwinieta } };
  }),
  on(InterfejsUzytkownikaActions.zwinWyszukiwarke, (state) => {
    return { ...state, wyszukiwarka: { ...state.wyszukiwarka, zwinieta: true } };
  }),
  on(InterfejsUzytkownikaActions.rozwinWyszukiwarke, (state: InterfejsUzytkownikaStan, { aktywna }) => {
    if (state.wyszukiwarka.aktywna === aktywna && state.wyszukiwarka.aktywna === WYSZUKIWARKI.DOMYSLNA) {
      return { ...state, wyszukiwarka: { ...state.wyszukiwarka, zwinieta: !state.wyszukiwarka.zwinieta } };
    }
    return { ...state, wyszukiwarka: { ...state.wyszukiwarka, zwinieta: false, aktywna } };
  }),
  on(InterfejsUzytkownikaActions.odwrocRozwiniecieWyszukiwarka, (state) => {
    return { ...state, wyszukiwarka: { ...state.wyszukiwarka, zwinieta: !state.wyszukiwarka.zwinieta } };
  }),
  on(InterfejsUzytkownikaActions.ukryjWszystko, (state) => {
    return {
      ...state, wyszukiwarka: { ...state.wyszukiwarka, ukryta: true },
      belkaBocznaLewa: { ...state.belkaBocznaLewa, ukryta: true },
      belkaGorna: { ...state.belkaGorna, ukryta: true },
      mapaNawigacja: { ...state.mapaNawigacja, ukryta: true },
    };
  }),
  on(InterfejsUzytkownikaActions.pokazWszystko, (state) => {
    return {
      ...state, wyszukiwarka: { ...state.wyszukiwarka, ukryta: false },
      belkaBocznaLewa: { ...state.belkaBocznaLewa, ukryta: false },
      belkaGorna: { ...state.belkaGorna, ukryta: false },
      mapaNawigacja: { ...state.mapaNawigacja, ukryta: false },
    };
  }),
  on(InterfejsUzytkownikaActions.blokujWymuszonaAktualizacje, (state) => {
    return { ...state, mozliwoscWymuszonejAktualizacji: false };
  }),
  on(InterfejsUzytkownikaActions.odblokujWymuszonaAktualizacje, (state) => {
    return { ...state, mozliwoscWymuszonejAktualizacji: true };
  }),
  on(InterfejsUzytkownikaActions.reset, (state) => {
    return InterfejsUzytkownikaInitialState
  })
);

export function interfejsUzytkowikaReducer(state: InterfejsUzytkownikaStan | undefined, action: Action) {
  return _interfejsUzytkowikaReducer(state, action);
}
