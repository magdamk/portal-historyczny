import {Warstwa} from './warstwa';
import {TlumaczeniaNazw} from './tlumaczenia-nazw';

/**
 * Interfejs dewiniuje elementGrupy warstw
 */
export interface ElementGrupyWarstwPaskaCzasu {
  nazwa: TlumaczeniaNazw;
  sciezkaDoPlikuGrafiki: string;
  warstwa: Warstwa;
}

/**
 * Interfejs definiuje grupe warstw podkladowych
 */
export interface GrupaWarstwPaskaCzasu {
  uuid: string;
  nazwa: TlumaczeniaNazw;
  wybranaWarstwa?: number;
  warstwy: ElementGrupyWarstwPaskaCzasu[];
}
