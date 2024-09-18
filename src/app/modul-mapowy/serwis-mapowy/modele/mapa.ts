import { Warstwa } from './warstwa';
import { TlumaczeniaNazw } from './tlumaczenia-nazw';
import { Punkt } from './punkt';

/**
 * Interfejs definiuje warstwy podkładowe dla mapy
 */
export interface DomyslneWartstyPodkladowe {
  uuidGrupaWarstw?: string;
  uuidWarstwa?: string;
}

/**
 * Interfejs definiuje mapę
 */
export interface Mapa {
  uuid?: string;
  nazwa?: TlumaczeniaNazw;
  opisWPortaluMapowym?: TlumaczeniaNazw;
  domyslnaSkala?: number;
  srodekMapyX?: number;
  srodekMapyY?: number;
  domyslnaSkalaWyszukiwania?: number;
  domyslneWarstwyPodkladowe?: DomyslneWartstyPodkladowe;
  warstwy: Warstwa[];
  limitWarstw?: number;
  sciezkaDoPlikuZGrafika?: string;
  rodzaj?: string;
  warstwaTymczasowaWyszukiwania?: Warstwa;
  liczbaWarstwUzytkownika?: number;
  osiagnietoLimitWarstwUzytkownika?: boolean;
  udostepnionaLokalizacja?: Punkt;
}
