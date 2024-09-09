// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  portalKonwersjiApiUrl: 'https://testmapa.um.warszawa.pl/api/modul-konwersji',
  portalMapowyApiUrl: 'https://testmapa.um.warszawa.pl/api/modul-mapowy',
  portalMultimediaApiUrl: 'https://testmapa.um.warszawa.pl/modul-multimediow',
  mapViewerUrl: 'https://testmapa.um.warszawa.pl/mapviewer',
  // mapViewerUrl: 'http://localhost/mapviewer',

  poziomHalasuUrl: "https://mapa.um.warszawa.pl/budynek/widok.html",
  ikonaAnalizyLinia: "https://testmapa.um.warszawa.pl/pliki/warstwy_grafika/ANALIZY_PRZESTRZENNE/analizy_linia.png",
  ikonaAnalizyPoligon: "https://testmapa.um.warszawa.pl/pliki/warstwy_grafika/ANALIZY_PRZESTRZENNE/analizy_poligon.png",
  ikonaAnalizyPunkt: "https://testmapa.um.warszawa.pl/pliki/warstwy_grafika/ANALIZY_PRZESTRZENNE/analizy_punkt.png",
  ikonaStrzalkiPolnocy: "https://testmapa.um.warszawa.pl/pliki/wydruk_mapy/znak_polnocy.png",
  ikonaZnakuWodnego: "https://testmapa.um.warszawa.pl/pliki/wydruk_mapy/znak_wodny.png",
  stylWarstwyAnalizyLinia: "dane_wawa:L.ANALIZY_LINIA",
  stylWarstwyAnalizyPoligon: "dane_wawa:C.ANALIZY_POLIGON",
  stylWarstwyAnalizyPunkt: "dane_wawa:M.ANALIZY_PUNKT",
  stylWszystkieObiektySelekcjaPoligon: "dane_wawa:A.SELEKCJA_POLIGON_OGOLNE",
  stylWszystkieObiektySelekcjaLinia: "dane_wawa:L.SELEKCJA_LINIA_OGOLNE",
  stylWszystkieObiektySelekcjaPunkt: "dane_wawa:M.SELEKCJA_PUNKT_OGOLNE",
  stylWybraneObiektySelekcjaPoligon: "dane_wawa:A.SELEKCJA_POLIGON_WYBRANY",
  stylWybraneObiektySelekcjaLinia: "dane_wawa:L.SELEKCJA_LINIA_WYBRANY",
  stylWybraneObiektySelekcjaPunkt: "dane_wawa:M.SELEKCJA_PUNKT_WYBRANY",

  // poziomHalasuUrl: 'https://mapa.um.warszawa.pl/budynek/widok.html',
  // ikonaAnalizyLinia: 'https://pliki.um-warszawa.corp.nekken.pl/assets/warstwy_grafika/ANALIZY_PRZESTRZENNE/analizy_lini.png',
  // ikonaAnalizyPoligon: 'https://pliki.um-warszawa.corp.nekken.pl/assets/warstwy_grafika/ANALIZY_PRZESTRZENNE/analizy_poligon.png',
  // ikonaAnalizyPunkt: 'https://pliki.um-warszawa.corp.nekken.pl/assets/warstwy_grafika/ANALIZY_PRZESTRZENNE/analizy_punkt.png',
  // ikonaStrzalkiPolnocy: 'assets/modul-mapowy/img/znak_polnocy.png',
  // ikonaZnakuWodnego: 'assets/modul-mapowy/img/znak_wodny.png',
  // stylWarstwyAnalizyLinia: 'nekken:C.ANALIZY_LINIA', //zrodlo:identyfikator_stylu
  // stylWarstwyAnalizyPoligon: 'nekken:C.ANALIZY_POLIGON', //zrodlo:identyfikator_stylu
  // stylWarstwyAnalizyPunkt: 'nekken:C.ANALIZY_PUNKT', //zrodlo:identyfikator_stylu
  // stylWszystkieObiektySelekcjaPoligon: 'nekken:A.SELEKCJA_POLIGON_OGOLNE',
  // stylWszystkieObiektySelekcjaLinia: 'nekken:L.SELEKCJA_LINIA_OGOLNE',
  // stylWszystkieObiektySelekcjaPunkt: 'nekken:M.SELEKCJA_PUNKT_OGOLNE',
  // stylWybraneObiektySelekcjaPoligon: 'nekken:A.SELEKCJA_POLIGON_WYBRANY',
  // stylWybraneObiektySelekcjaLinia: 'nekken:L.SELEKCJA_LINIA_WYBRANY',
  // stylWybraneObiektySelekcjaPunkt: 'nekken:M.SELEKCJA_PUNKT_WYBRANY',
  widocznoscUdostepnianiaMapy: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
