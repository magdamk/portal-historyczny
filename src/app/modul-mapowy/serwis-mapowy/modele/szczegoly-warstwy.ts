import {OknoInformacyjneWarstwy} from './okno-informacyjne-warstwy';
import {TlumaczeniaNazw} from './tlumaczenia-nazw';
// import {InformacjeOObiekcie} from '../utils/obiekty-mapy-utils';
import {KeyStringObject} from './key-string-object';
import { InformacjeOObiekcie } from '../utils/obiekty-mapy-utils';

export const FUNKCJE_DODATKOWE = {
  NIERUCHOMOSCI: 'NIERUCHOMOSCI',
  OSOBY_POCHOWANE: 'OSOBY_POCHOWANE',
  MAPA_AKUSTYCZNA: 'MAPA_AKUSTYCZNA',
  ADRESY: 'ADRESY',
  DZIALKI: 'DZIALKI'
};

export const FUNKCJE_DODATKOWE_KONFIGURACJA: Map<string, KonfiguracjaFunkcjiDodatkowych> =
  new Map<string, KonfiguracjaFunkcjiDodatkowych>([
    [FUNKCJE_DODATKOWE.NIERUCHOMOSCI, {blokujInformacjeOObiekcie: true, uruchomNarzedzieSterujace: true}],
    [FUNKCJE_DODATKOWE.OSOBY_POCHOWANE, {blokujInformacjeOObiekcie: true, uruchomNarzedzieSterujace: true}],
    [FUNKCJE_DODATKOWE.MAPA_AKUSTYCZNA, {blokujInformacjeOObiekcie: true, uruchomNarzedzieSterujace: true}],
    [FUNKCJE_DODATKOWE.ADRESY, {blokujInformacjeOObiekcie: false, uruchomNarzedzieSterujace: false}],
    [FUNKCJE_DODATKOWE.DZIALKI, {blokujInformacjeOObiekcie: false, uruchomNarzedzieSterujace: false}]
  ]);

export interface KonfiguracjaFunkcjiDodatkowych {
  blokujInformacjeOObiekcie: boolean;
  uruchomNarzedzieSterujace: boolean;
}

export interface FunkcjeDodatkoweWarstwy {
  identyfikator: string;
}

export interface OpcjeKalstrowania {
  threshold?: number;
  clusterStyle?: any;
  minPointCount?: number;
  maxClusteringLevel?: number;
  enableZoomIn?: boolean;
  zoomInLevels?: number;
  clickBehavior?: string;
}

export interface UslugiZewnetrzne {
  url: string;
  parametry: KeyStringObject;
  odwrocWspolrzedne?: boolean
}


export interface SzczegolyWarstwy {
  zrodloMVC: string;
  nazwaMVC: string; // nazwa z ZD "wskaż warstwę"
  typ: string;
  alias?: TlumaczeniaNazw;
  minSkalaWidocznosci: number;
  maksSkalaWidocznosci: number;
  minSkalaKlikalnosci: number; // do wdrożenia
  maksParametrKlastrowania: number; // TODO do usunięcia
  widocznoscEtykiet?: boolean; // do wdrożenia domyslnie false
  przezroczystosc: number; // nazwa z ZD "domyślna przeźroczystość"  TODO przenieść do obiektu warstwy
  pobieranieDanych?: boolean; // nazwa z ZD "możliwość pobierania danych" do wdrozenia domyslnie false
  opisZrodlaDanych?: TlumaczeniaNazw; // do wdrożenia
  znakWodny?: boolean; // do wdrożenia domyslnie brak
  analizaPrzestrzenna?: boolean; // nazwa z ZD "dostępność dla analiz przestrzennych" do wdrożenia domyślnie false
  informacjeOObiekcie?: boolean; // nazwa z ZD "wyświetlanie okna informacyjnego o obiekcie" do wdrożenia domyślnie false
  multimedia?: boolean; // nazwa z ZD "widoczność multimediów" do wdrożenia domyślnie false
  zalaczniki?: boolean; // nazwa z ZD "widoczność załączników"
  funkcjeDodatkowe?: FunkcjeDodatkoweWarstwy[]; // do wdrożenia
  warstwyKonfliktowe?: string[]; // to do wyjaśnienia
  informacjeOWarstwie?: OknoInformacyjneWarstwy; // nazwa z ZD "dodatkowe okno informacyjne warstwy"
  opcjeKlastrowania?: OpcjeKalstrowania;
  dynamicTileLayer?: boolean;
  antyaliasing?: boolean;
  typGeometrii?: string;
  obiekty?: InformacjeOObiekcie[];
  uslugiZewnetrzne?: UslugiZewnetrzne;
}
