import { Widok } from "./lewy-panel-widok.reducer";

export const WIDOKI_ID = {

  TEMATY: 'TEMATY',
  MAPY_PLANY: 'MAPY_PLANY',
  SZLAKI: 'SZLAKI',
  PASKI_CZASU: 'PASKI_CZASU',
  TAGI: 'TAGI',
  INFO: 'INFO',
  // PRZEGLADANIE: 'PRZEGLADANIE',
};

// export const WIDOK_PRZEGLADANIE: Widok = {
//   id: WIDOKI_ID.PRZEGLADANIE,
//   zIndex: 51,
//   kolejnosc: 1,
//   desktop: true,
//   mobile: true,
//   wirtualne: false,
//   // parentId?: string,
//   // dane?: any,
// }

export const WIDOK_TEMATY: Widok = {
  id: WIDOKI_ID.TEMATY,
  zIndex: 51,
  kolejnosc: 1,
  desktop: true,
  mobile: true,
  wirtualne: false,
  // parentId?: string,
  // dane?: any,
}

export const WIDOK_MAPY_PLANY: Widok = {
  id: WIDOKI_ID.MAPY_PLANY,
  zIndex: 51,
  kolejnosc: 2,
  desktop: true,
  mobile: true,
  wirtualne: false,
  // parentId?: string,
  // dane?: any,
}
export const WIDOK_SZLAKI: Widok = {
  id: WIDOKI_ID.SZLAKI,
  zIndex: 51,
  kolejnosc: 3,
  desktop: true,
  mobile: true,
  wirtualne: false,
  // parentId?: string,
  // dane?: any,
}
export const WIDOK_PASKI_CZASU: Widok = {
  id: WIDOKI_ID.PASKI_CZASU,
  zIndex: 51,
  kolejnosc: 4,
  desktop: true,
  mobile: true,
  wirtualne: false,
  // parentId?: string,
  // dane?: any,
}
export const WIDOK_TAGI: Widok = {
  id: WIDOKI_ID.TAGI,
  zIndex: 51,
  kolejnosc: 5,
  desktop: true,
  mobile: true,
  wirtualne: false,
  // parentId?: string,
  // dane?: any,
}
export const WIDOK_INFO: Widok = {
  id: WIDOKI_ID.INFO,
  zIndex: 51,
  kolejnosc: 6,
  desktop: true,
  mobile: true,
  wirtualne: false,
  // parentId?: string,
  // dane?: any,
}
export const DEFINICJA_WIDOKOW = new Map<string, Widok>([
  // [WIDOKI_ID.PRZEGLADANIE, WIDOK_PRZEGLADANIE],
  [WIDOKI_ID.TEMATY, WIDOK_TEMATY],
  [WIDOKI_ID.MAPY_PLANY, WIDOK_MAPY_PLANY],
  [WIDOKI_ID.SZLAKI, WIDOK_SZLAKI],
  [WIDOKI_ID.PASKI_CZASU, WIDOK_PASKI_CZASU],
  [WIDOKI_ID.TAGI, WIDOK_TAGI],
  [WIDOKI_ID.INFO, WIDOK_INFO]
]);

export const WIDOKI_ARR: Widok[] = Array.from(DEFINICJA_WIDOKOW.values());
