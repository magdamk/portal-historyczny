import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SzablonyService } from '../../../../core/szablony/serwisy/szablony.service';
import { Subscription } from 'rxjs';
import { TlumaczeniaService } from '../../../../core/tlumaczenia/serwisy/tlumaczenia.service';
import { AktualnosciListaDto } from '../../../../core/modele/aktualnosci-lista-dto';
// import { ControllerAktualnosciOpenService } from '../../../../core/api/controller-aktualnosci-open.service';
import { ControllerAktualnosciService } from 'src/app/core/api/controller-aktualnosci.service';
import { PrzewijanyKomponentComponent } from '../../../../wspolne/komponenty/przewijany-komponent/przewijany-komponent.component';

/**
 * Komponent aktualności
 */
@Component({
  selector: 'app-aktualnosci-belka-boczna',
  templateUrl: './aktualnosci-belka-boczna.component.html',
  styleUrls: ['./aktualnosci-belka-boczna.component.scss'],
})
export class AktualnosciBelkaBocznaComponent implements OnInit {

  @ViewChild('przewijanyKomponent') przewijanyKomponent: PrzewijanyKomponentComponent | undefined;

  jezyk: string | undefined;
  listaAktualnosci = new Array<AktualnosciListaDto>();
  subskrybcja = new Subscription();
  aktualnyIndex = 0;
  aktualnosc: AktualnosciListaDto | undefined;

  /**
   * Konstruktor
   * @param szablonyService - serwis szablonów
   * @param router - natywny serwis routingu
   * @param aktualnosciService - serwis aktualnosci
   * @param tlumaczeniaSerwis - serwis tlumaczen
   */
  constructor(private szablonyService: SzablonyService, private router: Router,
    // private aktualnosciService: ControllerAktualnosciOpenService,
    private aktualnosciService: ControllerAktualnosciService,
    private tlumaczeniaSerwis: TlumaczeniaService) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.subskrybcja = this.tlumaczeniaSerwis.getZmianaJezykaSubject().subscribe((val) => {
      this.jezyk = val;
      this.wczytajListeAktualnosc();
    });
  }

  /**
   * Cykl życia obiektu
   */
  ngOnDestroy(): void {
    this.subskrybcja.unsubscribe();
  }

  /**
   * Funkcja ładuje następną aktualność
   */
  nastepna(): void {
    if (this.aktualnyIndex < this.listaAktualnosci?.length - 1) {
      this.aktualnyIndex++;
    } else {
      this.aktualnyIndex = 0;
    }
  }

  /**
   * Funckaj ładuje poprzednią aktualność
   */
  poprzednia(): void {
    if (this.aktualnyIndex >= 1) {
      this.aktualnyIndex--;
    } else {
      this.aktualnyIndex = this.listaAktualnosci?.length - 1;
    }
  }

  /**
   * Funkcja przekierowuje do archiwum aktualności
   */
  przekierujDoArchiwum(): void {
    this.router.navigate(['/aktualnosci']);
    this.szablonyService.zwinBelkeBoczna();
  }


  /**
   * Metoda sluzaca do wczytania aktualnosci
   */
  private wczytajListeAktualnosc() {
    // this.aktualnosciService.pobierzOkreslonaListeAktualnosci().subscribe((val) => this.listaAktualnosci = val);
    this.aktualnosciService.getAktualnosci().subscribe((val)=>this.listaAktualnosci=val);
    //   this.listaAktualnosci=[
    //     {
    //         "uuid": "6efe2ab0-2fde-4030-b132-f442437be8aa",
    //         "tytul": "Mapa #startart",
    //         "tytulEn": "#startart map",
    //         "tresc": "<p>W kategorii&nbsp;Turystyka, kultura,\nhistoria&nbsp;opublikowaliśmy <a href=\"https://testmapa.um.warszawa.pl/mapa/5735ed8b-b464-4ac2-a307-8e33f83079f5\"><u>mapę&nbsp;#startart</u></a> z wyznaczonymi miejscami do tworzenia streetartu.</p>",
    //         "trescEn": "<p>In the category Tourism, culture, history we have published a <a href=\"https://testmapa.um.warszawa.pl/mapa/5735ed8b-b464-4ac2-a307-8e33f83079f5\"><u>#startart map </u></a>with designated places to create street art.</p>",
    //         "trescProsta": "W kategorii Turystyka, kultura, historia opublikowaliśmy mapę #startart z wyznaczonymi miejscami do tworzenia streetartu.",
    //         "trescEnProsta": "In the category Tourism, culture, history we have published a #startart map with designated places to create street art.",
    //         "dataUtworzenia": "2024-07-09T12:56:03.620Z",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     },
    //     {
    //         "uuid": "11bd22d6-85b3-4494-8608-18abd71064e8",
    //         "tytul": "Mapy średnich cen dla III kwartału 2023 roku",
    //         "tytulEn": "Maps of average prices for the third quarter of 2023",
    //         "tresc": "<p>W serwisie „<a href=\"https://testmapa.um.warszawa.pl/mapa/39b58fd4-42bd-4d43-939b-4b9a5baa7e56\"><u>Rejestr Cen</u></a>”\nudostępniliśmy mapy średnich cen transakcyjnych 1 m² lokali mieszkalnych (rynek\npierwotny i wtórny) oraz średnich cen transakcyjnych 1 m² gruntów\nniezabudowanych dla III kwartału 2023 roku.</p>",
    //         "trescEn": "<p>On the&nbsp;<a href=\"https://testmapa.um.warszawa.pl/mapa/39b58fd4-42bd-4d43-939b-4b9a5baa7e56\"><u>Register of Real Estate Prices map</u></a> new data has been published - average transaction prices in the residential flats for the third quarter of 2023 (primary and secondary market) and average transaction prices of undeveloped land for&nbsp;the third quarter of 2023.</p>",
    //         "trescProsta": "W serwisie „Rejestr Cen” udostępniliśmy mapy średnich cen transakcyjnych 1 m² lokali mieszkalnych (rynek pierwotny i wtórny) oraz średnich cen transakcyjnych 1 m² gruntów niezabudowanych dla III kwartału 2023 roku.",
    //         "trescEnProsta": "On the Register of Real Estate Prices map new data has been published - average transaction prices in the residential flats for the third quarter of 2023 (primary and secondary market) and average transaction prices of undeveloped land for the third quarter of 2023.",
    //         "dataUtworzenia": "2024-06-06T07:45:36.413Z",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     },
    //     {
    //         "uuid": "0b892695-e206-44f4-97eb-5b185309513a",
    //         "tytul": "Mapy średnich cen dla II kwartału 2023 roku",
    //         "tytulEn": "Maps of average prices for the second quarter of 2023",
    //         "tresc": "<p>W serwisie <a href=\"https://testsmapa.um.warszawa.pl/mapa/ad28f9d8-5e08-4385-a3ea-d340ec5d2d3e\"><u>„Rejestr Cen”</u></a>\nudostępniliśmy mapy średnich cen transakcyjnych 1 m² lokali mieszkalnych (rynek\npierwotny i wtórny) oraz średnich cen transakcyjnych 1 m² gruntów\nniezabudowanych dla II kwartału 2023 roku.</p>",
    //         "trescEn": "<p>On the&nbsp;<a href=\"https://testsmapa.um.warszawa.pl/mapa/ad28f9d8-5e08-4385-a3ea-d340ec5d2d3e\"><u>Register of Real Estate Prices map </u></a>new data has been published - average transaction prices in the residential flats for the second quarter of 2023 (primary and secondary market) and average transaction prices of undeveloped land for&nbsp;the second quarter of 2023.</p>",
    //         "trescProsta": "W serwisie „Rejestr Cen” udostępniliśmy mapy średnich cen transakcyjnych 1 m² lokali mieszkalnych (rynek pierwotny i wtórny) oraz średnich cen transakcyjnych 1 m² gruntów niezabudowanych dla II kwartału 2023 roku.",
    //         "trescEnProsta": "On the Register of Real Estate Prices map new data has been published - average transaction prices in the residential flats for the second quarter of 2023 (primary and secondary market) and average transaction prices of undeveloped land for the second quarter of 2023.",
    //         "dataUtworzenia": "2024-05-13T12:06:12.167Z",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     },
    //     {
    //         "uuid": "50618d83-4e28-4a48-944e-646405474aa0",
    //         "tytul": "Obiekty sportowe m.st. Warszawy",
    //         "tytulEn": "Sports facilities of the City of Warsaw",
    //         "tresc": "<p>Za oknem\npiękna pogoda a Ty zastanawiasz się, gdzie\nmógłbyś pograć w piłkę lub spróbować innych aktywności sportowych? <br>Szukasz\nobiektu sportowego blisko domu? Sprawdź nową <a href=\"https://testmapa.um.warszawa.pl/mapa/bbf024f0-bbdb-4a3b-8c93-b9555d94142e\"><u>mapę miejskich obiektów sportowych</u></a>!\n<br><br>Znajdziesz\nna niej miejskie pływalnie, hale i sale sportowe, boiska, siłownie\nzewnętrzne, street workout oraz wiele innych obiektów. </p><p>Łącznie ponad 2&nbsp;500\nmiejsc aktywności.\n</p><p>Mapa będzie\nsukcesywnie aktualizowana o nowe obiekty sportowe oraz wzbogacana o nowe\ninformacje.</p>",
    //         "trescEn": "<p>There is a beautiful\nweather outside, and you are wondering where You can play ball or try other\nsports activities?</p><p> Are You looking for a sports facility close to\nhome? Check out the new <a href=\"https://testmapa.um.warszawa.pl/mapa/bbf024f0-bbdb-4a3b-8c93-b9555d94142e\"><u>map of municipal sport facilities</u></a>!\n</p><p>You can find\nthere swimming pools, sports halls, playing fields, outdoor gyms, street\nworkout and many other facilities. </p><p>A total of over 2,500 activity places.\n</p><p>Map will be gradually\nupdated with new sports facilities and enriched with more information.</p>",
    //         "trescProsta": "Za oknem piękna pogoda a Ty zastanawiasz się, gdzie mógłbyś pograć w piłkę lub spróbować innych aktywności sportowych? Szukasz obiektu sportowego blisko domu? Sprawdź nową mapę miejskich obiektów sportowych! Znajdziesz na niej miejskie pływalnie, hale i sale sportowe, boiska, siłownie zewnętrzne, street workout oraz wiele innych obiektów. Łącznie ponad 2 500 miejsc aktywności. Mapa będzie sukcesywnie aktualizowana o nowe obiekty sportowe oraz wzbogacana o nowe informacje.",
    //         "trescEnProsta": "There is a beautiful weather outside, and you are wondering where You can play ball or try other sports activities? Are You looking for a sports facility close to home? Check out the new map of municipal sport facilities! You can find there swimming pools, sports halls, playing fields, outdoor gyms, street workout and many other facilities. A total of over 2,500 activity places. Map will be gradually updated with new sports facilities and enriched with more information.",
    //         "dataUtworzenia": "2024-05-09T06:57:21.118Z",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     },
    //     {
    //         "uuid": "c1fb7b26-1fc0-4682-a96a-c52487b39457",
    //         "tytul": "Strefa Czystego Transportu",
    //         "tytulEn": "Clean Transport Zone",
    //         "tresc": "<p>W kategorii&nbsp;Komunikacja, transport, bezpieczeństwo opublikowaliśmy <a href=\"https://testmapa.um.warszawa.pl/mapa/698c6487-a887-4a21-afbd-84ca1ed64080\"><u><strong>mapę</strong></u></a> z obszarem Strefy Czystego Transportu.  Więcej informacji można znaleźć na stronie:&nbsp;<a href=\"https://transport.um.warszawa.pl/sct\"><u>https://transport.um.warszawa.pl/sct</u></a></p>",
    //         "trescEn": "<p>In the category Communication, transport, safety we have published <a href=\"https://testmapa.um.warszawa.pl/mapa/698c6487-a887-4a21-afbd-84ca1ed64080\"><u><strong>a map</strong></u></a> with the&nbsp;area of the Clean Transport Zone.   More information: <a href=\"https://transport.um.warszawa.pl/sct\"><u>https://transport.um.warszawa.pl/sct</u></a></p>",
    //         "trescProsta": "W kategorii Komunikacja, transport, bezpieczeństwo opublikowaliśmy mapę z obszarem Strefy Czystego Transportu. Więcej informacji można znaleźć na stronie: https://transport.um.warszawa.pl/sct",
    //         "trescEnProsta": "In the category Communication, transport, safety we have published a map with the area of the Clean Transport Zone. More information: https://transport.um.warszawa.pl/sct",
    //         "dataUtworzenia": "2024-05-08T12:01:49.379Z",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     },
    //     {
    //         "uuid": "e7af0a05-1578-499d-8182-efbf8154dfd4",
    //         "tytul": "Klimatyczna mapa szkół",
    //         "tytulEn": "Climate map of schools",
    //         "tresc": "<p>W kategorii Edukacja opublikowaliśmy\nnową mapę:\n</p><p> <strong><u><a href=\"https://mapa.um.warszawa.pl/klimatyczna-mapa-szkol/\">Klimatyczna Mapa Szkół</a></u></strong>&nbsp;to projekt, realizowany przez Urząd m.st. Warszawy, w oparciu o\npotrzebę stworzenia narzędzia, które ułatwi młodym warszawiakom wybór\nodpowiedniej szkoły ponadpodstawowej. Pozwala na filtrowanie bazy publicznych\nszkół ponadpodstawowych w oparciu o szereg kryteriów - m.in. wyposażenie i\ndostępność placówki, podejmowaną aktywność społeczną czy ofertę zajęć\ndodatkowych. Dzięki temu dostarcza informacji na temat „klimatu”, czyli\natmosfery panującej w stołecznych szkołach.\nDla każdej z placówek w oknie\ninformacyjnym obiektu dostępna jest wizytówka ze szczegółowymi danymi o szkole.</p>",
    //         "trescEn": "<p>We have published a new map in the Education category: </p><p><a href=\"https://mapa.um.warszawa.pl/klimatyczna-mapa-szkol/\"><u> Climate map of schools&nbsp;</u></a>is a project, implemented by the Warsaw City Hall, based on the need to create a tool that will make it easier for young Varsovians to choose the right secondary school. </p><p> The map allows you to filter the database of public of secondary schools using many criteria - such as the facilities and availability of the  accessibility of an institution, social activity or offer of additional classes activities. In this way, it provides information on the \"climate\", that is the atmosphere in the capital's schools. For each school, a presentation card with detailed information about the school is available in the information window.</p>",
    //         "trescProsta": "W kategorii Edukacja opublikowaliśmy nową mapę: Klimatyczna Mapa Szkół to projekt, realizowany przez Urząd m.st. Warszawy, w oparciu o potrzebę stworzenia narzędzia, które ułatwi młodym warszawiakom wybór odpowiedniej szkoły ponadpodstawowej. Pozwala na filtrowanie bazy publicznych szkół ponadpodstawowych w oparciu o szereg kryteriów - m.in. wyposażenie i dostępność placówki, podejmowaną aktywność społeczną czy ofertę zajęć dodatkowych. Dzięki temu dostarcza informacji na temat „klimatu”, czyli atmosfery panującej w stołecznych szkołach. Dla każdej z placówek w oknie informacyjnym obiektu dostępna jest wizytówka ze szczegółowymi danymi o szkole.",
    //         "trescEnProsta": "We have published a new map in the Education category: Climate map of schools is a project, implemented by the Warsaw City Hall, based on the need to create a tool that will make it easier for young Varsovians to choose the right secondary school. The map allows you to filter the database of public of secondary schools using many criteria - such as the facilities and availability of the accessibility of an institution, social activity or offer of additional classes activities. In this way, it provides information on the \"climate\", that is the atmosphere in the capital's schools. For each school, a presentation card with detailed information about the school is available in the information window.",
    //         "dataUtworzenia": "2024-05-06T13:21:12.990Z",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     },
    //     {
    //         "uuid": "00e2af1d-3d86-4165-915c-b6841c6b1917",
    //         "tytul": "Ortofotomapa 2023",
    //         "tytulEn": "Orthophotmap 2023",
    //         "tresc": "<p>W serwisie mapowym&nbsp;</p><p><a href=\"https://testmapa.um.warszawa.pl\"><u>testmapa.um.warszawa.pl</u></a>&nbsp;</p><p>opublikowaliśmy ortofotomapę opracowaną w 2023 roku, którą pozyskaliśmy z\nGłównego Urzędu Geodezji i Kartografii.\nNową ortofotomapę można znaleźć pod kafelkiem w lewym dolnym\nrogu widoku dowolnej mapy.</p>",
    //         "trescEn": "<p>We have published an orthophotomap developed in 2023, which we obtained from the Head Office of Geodesy and Cartography. The new orthophotomap can be found under the tile in the bottom left corner of any map view.</p>",
    //         "trescProsta": "W serwisie mapowym testmapa.um.warszawa.pl opublikowaliśmy ortofotomapę opracowaną w 2023 roku, którą pozyskaliśmy z Głównego Urzędu Geodezji i Kartografii. Nową ortofotomapę można znaleźć pod kafelkiem w lewym dolnym rogu widoku dowolnej mapy.",
    //         "trescEnProsta": "We have published an orthophotomap developed in 2023, which we obtained from the Head Office of Geodesy and Cartography. The new orthophotomap can be found under the tile in the bottom left corner of any map view.",
    //         "dataUtworzenia": "2024-02-26T12:11:37.867Z",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     },
    //     {
    //         "uuid": "91628664-d56b-43e3-871a-ac7ecf4d9c1f",
    //         "tytul": "Mapy średnich cen transakcyjnych dla I kwartału 2023 roku",
    //         "tytulEn": "Maps of average prices for the first quarter of 2023",
    //         "tresc": "<p>W serwisie „<u><strong><a href=\"https://testmapa.um.warszawa.pl/mapa/39b58fd4-42bd-4d43-939b-4b9a5baa7e56\">Rejestr Cen</a></strong></u>”\nudostępniliśmy mapy średnich cen transakcyjnych 1 m² lokali mieszkalnych (rynek\npierwotny i wtórny) oraz średnich cen transakcyjnych 1 m² gruntów\nniezabudowanych dla \nI kwartału 2023 roku.</p>",
    //         "trescEn": "<p>On the&nbsp;<a href=\"https://testmapa.um.warszawa.pl/mapa/39b58fd4-42bd-4d43-939b-4b9a5baa7e56\"><u>Register of Real Estate Prices</u></a> map new data has been published - average transaction prices in the residential flats for&nbsp;the first quarter of 2023 (primary and secondary market) and average transaction prices of undeveloped land for&nbsp;the first quarter of 2023.<br></p>",
    //         "trescProsta": "W serwisie „Rejestr Cen” udostępniliśmy mapy średnich cen transakcyjnych 1 m² lokali mieszkalnych (rynek pierwotny i wtórny) oraz średnich cen transakcyjnych 1 m² gruntów niezabudowanych dla I kwartału 2023 roku.",
    //         "trescEnProsta": "On the Register of Real Estate Prices map new data has been published - average transaction prices in the residential flats for the first quarter of 2023 (primary and secondary market) and average transaction prices of undeveloped land for the first quarter of 2023.",
    //         "dataUtworzenia": "2024-02-14T11:07:07.703Z",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     },
    //     {
    //         "uuid": "fdf489e4-df87-40de-9bde-e6f51aa0a765",
    //         "tytul": "Mapy gęstości zaludnienia",
    //         "tytulEn": "Population density maps",
    //         "tresc": "<p>Na mapie <a href=\"https://testmapa.um.warszawa.pl/mapa/5df94342-808f-4de5-8274-9f20c4aee0c9\"><u>Demografia</u></a>\nopublikowaliśmy warstwy gęstości zaludnienia w 2023 roku dla całego miasta i w\nposzczególnych dzielnicach.</p>",
    //         "trescEn": "<p>On the <a href=\"https://testmapa.um.warszawa.pl/mapa/5df94342-808f-4de5-8274-9f20c4aee0c9\"><u>Demography map</u></a>  we have published population density layers in 2023 for the whole city and in individual districts.</p>",
    //         "trescProsta": "Na mapie Demografia opublikowaliśmy warstwy gęstości zaludnienia w 2023 roku dla całego miasta i w poszczególnych dzielnicach.",
    //         "trescEnProsta": "On the Demography map we have published population density layers in 2023 for the whole city and in individual districts.",
    //         "dataUtworzenia": "2024-02-08T14:45:35.453Z",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     },
    //     {
    //         "uuid": "0044a5f5-5197-49db-93d0-f3fb950111ec",
    //         "tytul": "Bursy, internaty i schroniska",
    //         "tytulEn": "Boarding schools and hostels",
    //         "tresc": "<p>W kategorii Edukacja opublikowaliśmy mapę <a href=\"https://testmapa.um.warszawa.pl/mapa/f30ff01b-ed64-44ae-85c4-b6d9214e2f3b\"><u>Bursy, internaty i schroniska.</u></a></p>",
    //         "trescEn": "<p>In the Education category we have published the map <a href=\"https://testmapa.um.warszawa.pl/mapa/f30ff01b-ed64-44ae-85c4-b6d9214e2f3b\"><strong><u>Boarding schools and hostels.</u></strong></a></p>",
    //         "trescProsta": "W kategorii Edukacja opublikowaliśmy mapę Bursy, internaty i schroniska.",
    //         "trescEnProsta": "In the Education category we have published the map Boarding schools and hostels.",
    //         "dataUtworzenia": "2024-01-31",
    //         "archiwum": false,
    //         "czyWlasciciel": false
    //     }
    // ];
  }


}

