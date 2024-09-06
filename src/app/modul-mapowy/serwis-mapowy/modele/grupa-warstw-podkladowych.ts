import {Warstwa} from './warstwa';
import {TlumaczeniaNazw} from './tlumaczenia-nazw';

/**
 * Interfejs dewiniuje elementGrupy warstw
 */
export interface ElementGrupyWarstwPodkladowych {
  nazwa: TlumaczeniaNazw;
  sciezkaDoPlikuGrafiki: string;
  warstwa: Warstwa;
}

/**
 * Interfejs definiuje grupe warstw podkladowych
 */
export interface GrupaWarstwPodkladowych {
  uuid: string;
  nazwa: string;
  wybranaWarstwa?: number;
  warstwy: ElementGrupyWarstwPodkladowych[];
}
