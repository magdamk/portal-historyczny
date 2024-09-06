
export interface Narzedzia {
  sekcje: Map<string, Sekcja>;
}

export interface Sekcja {
  narzedzia: Map<string, any>;
  maksZIndex: number;
}

export interface Narzedzie {
  aktywne: boolean;
  zIndex: number;
  dane?: any[];
  zablokowane?: boolean;
  zarzdzaneWarstwami?: boolean;
  desktop?: boolean;
  mobile?: boolean;
}
