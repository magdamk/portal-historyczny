import { Component, OnInit } from '@angular/core';
import { SzablonyService } from '../../../../core/szablony/serwisy/szablony.service';
import { Observable, Subscription } from "rxjs";
import { TlumaczeniaService } from "../../../../core/tlumaczenia/serwisy/tlumaczenia.service";
import { map } from "rxjs/operators";
import { AktualnosciListaDto } from '../../../../core/modele/aktualnosci-lista-dto';
// import {  ControllerAktualnosciOpenService} from '../../../../core/api/controller-aktualnosci-open.service';
import { ControllerAktualnosciService } from 'src/app/core/api/controller-aktualnosci.service';
/**
 * Komponent strona archiwum aktualności
 */
@Component({
  selector: 'app-strona-archiwum-aktualnosci',
  templateUrl: './strona-archiwum-aktualnosci.component.html',
  styleUrls: ['./strona-archiwum-aktualnosci.component.scss']
})
export class StronaArchiwumAktualnosciComponent implements OnInit {

  jezyk: string | undefined;
  // $listaZarchiwuzowanychAktualnosci = new Observable<AktualnosciListaDto[] | undefined>();
  lista = new Array<AktualnosciListaDto>();
  subskrybcja = new Subscription();

  /**
   * Konstruktor
   * @param szablonyService - serwis szablonu
   * @param aktualnosciService - serwis aktualnosci
   * @param tlumaczeniaSerwis - serwis tlumaczen
   */
  constructor(private szablonyService: SzablonyService,
    // private aktualnosciService: ControllerAktualnosciOpenService,
    private aktualnosciService: ControllerAktualnosciService,
    private tlumaczeniaSerwis: TlumaczeniaService) {
  }

  /**
   * Cykl życia komponentu inicjalizacja
   */
  ngOnInit(): void {
    this.szablonyService.ustawTytulStrony('codes.aktualnosci.etykieta-archiwum');
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
   * Metoda sluzaca do wczytania aktualnosci
   */
  private wczytajListeAktualnosc() {
    // this.$listaZarchiwuzowanychAktualnosci = this.aktualnosciService.pobierzListeZarchiwizowanychAktualnosci().pipe(map(val => val));
    this.aktualnosciService.getArchiwum().subscribe((val)=>this.lista=val);
  //    [
  //     {
  //         "uuid": "846ab2ce-81cf-4c6a-9914-fb94e575aa80",
  //         "tytul": "Noc Muzeów 2024  - dwudziesta edycja",
  //         "tytulEn": "The 20th Long Night of Museums 2024",
  //         "tresc": "<p>W kategorii „Turystyka, kultura, historia” opublikowaliśmy informacje dotyczące obiektów, które będzie można zwiedzać w nocy z 18 na 19 maja 2024 roku w ramach imprezy <a href=\"https://testmapa.um.warszawa.pl/mapa/8ff10088-3208-451a-89a2-25e4c4f8855c\"><u>Noc Muzeów 2024</u></a>.</p>",
  //         "trescEn": "<p>In the \"Tourism, culture, history\" category, we have published information about the objects that can be visited on the night of May 18-19, 2024 as part of&nbsp;<a href=\"https://testmapa.um.warszawa.pl/mapa/8ff10088-3208-451a-89a2-25e4c4f8855c\"><u>the Long Night of Museums 2024</u></a>.</p>",
  //         "trescProsta": "W kategorii „Turystyka, kultura, historia” opublikowaliśmy informacje dotyczące obiektów, które będzie można zwiedzać w nocy z 18 na 19 maja 2024 roku w ramach imprezy Noc Muzeów 2024.",
  //         "trescEnProsta": "In the \"Tourism, culture, history\" category, we have published information about the objects that can be visited on the night of May 18-19, 2024 as part of the Long Night of Museums 2024.",
  //         "dataUtworzenia": "2024-05-16T12:43:08.055Z",
  //         "archiwum": true,
  //         "czyWlasciciel": false
  //     },
  //     {
  //         "uuid": "55cc59c6-6fcf-4996-8fb2-f986238c63cb",
  //         "tytul": "Remont wejścia głównego do siedziby BGiK",
  //         "tytulEn": "Renovation of the main entrance to the BGiK office",
  //         "tresc": "<p>Szanowni Państwo, <strong>od </strong><strong>13 marca do 30 czerwca</strong> z powodu remontu <strong>zamkniemy wejście główne do siedziby Biura Geodezji i Katastru</strong>. Do\n budynku można będzie wejść od strony wewnętrznego dziedzińca, przez \nbramę od strony ul. Rejtana. Więcej informacji na stronie <u><a href=\"https://architektura.um.warszawa.pl/-/remont-wejscia-bgik\" target=\"_blank\">architektury, planowania przestrzennego, geodezji i zabytków</a></u>.\n\t\t\t\t\t\t\t\t\tPrzepraszamy za utrudnienia.</p>",
  //         "trescEn": "<p><strong>From March 13 to June 30</strong>, due to renovation, <strong>we will close the main entrance to the headquarters of the Geodesy and Cadastre Office</strong>. It will be possible to enter the building from the inner courtyard, through the gate from the Rejtan street. More information on the <u><a href=\"https://architektura.um.warszawa.pl/-/remont-wejscia-bgik\" target=\"_blank\">architecture, spatial planning, geodesy and monuments website</a></u>. Sorry for the inconvenience.</p>",
  //         "trescProsta": "Szanowni Państwo, od 13 marca do 30 czerwca z powodu remontu zamkniemy wejście główne do siedziby Biura Geodezji i Katastru. Do budynku można będzie wejść od strony wewnętrznego dziedzińca, przez bramę od strony ul. Rejtana. Więcej informacji na stronie architektury, planowania przestrzennego, geodezji i zabytków. Przepraszamy za utrudnienia.",
  //         "trescEnProsta": "From March 13 to June 30, due to renovation, we will close the main entrance to the headquarters of the Geodesy and Cadastre Office. It will be possible to enter the building from the inner courtyard, through the gate from the Rejtan street. More information on the architecture, spatial planning, geodesy and monuments website. Sorry for the inconvenience.",
  //         "dataUtworzenia": "2024-03-13T11:27:56.624Z",
  //         "archiwum": true,
  //         "czyWlasciciel": false
  //     },
  //     {
  //         "uuid": "d7878b07-1a75-4e96-9c67-dee73d8765a2",
  //         "tytul": "Informacja ws. decyzji PB, WZ i ULICP",
  //         "tytulEn": "Information",
  //         "tresc": "<p>W związku z przebudową systemu rejestrowania decyzji niektóre decyzje  o pozwoleniu na budowę, o warunkach zabudowy i ustaleniu lokalizacji inwestycji celu publicznego z lat 2022-2023 mogą być niezaznaczone  w serwisie mapowym. Dane są w trakcie uzupełniania.</p><p> <br></p><p>\n \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tJednocześnie przypominamy, że:\n</p><p> \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t1.\tDane o pozwoleniach na budowę są dostępne w ogólnopolskiej wyszukiwarce Głównego Urzędu Nadzoru Budowlanego <a href=\"https://wyszukiwarka.gunb.gov.pl\"><u>https://wyszukiwarka.gunb.gov.pl </u></a></p><p> \n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t2.\tInformacje o wydanych decyzjach o warunkach zabudowy i ustaleniu lokalizacji celu publicznego udostępniamy w formie zestawień tabelarycznych, w rozbiciu na decyzje wydane w poszczególnych latach, procedowane w Biurze Architektury i Planowania Przestrzennego oraz  w wydziałach dzielnicowych na stronie <a href=\"https://architektura.um.warszawa.pl/postepowania-i-decyzje\"><u>https://architektura.um.warszawa.pl/postepowania-i-decyzje </u></a></p><p><br></p><p> \n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t Za utrudnienia przepraszamy.</p>",
  //         "trescEn": "<p>Due to the redevelopment of the decision recording system, some planning permission, zoning and public purpose decisions from 2022-2023 may not be marked in the map service. The data is in the process of being completed. </p><p><br></p><p> We would like to remind you that: </p><p> 1. data on building permits are available on the nationwide search engine of the General Office of Construction Supervision <a href=\"https://wyszukiwarka.gunb.gov.pl\"><u>https://wyszukiwarka.gunb.gov.pl </u></a></p><p>  2. information on issued decisions on land development conditions and establishing the location of public purposes is available in the form of tabular statements, broken down into decisions issued in particular years, processed in the Office of Architecture and Spatial Planning and in district departments at <a href=\"https://architektura.um.warszawa.pl/postepowania-i-decyzje\"><u>https://architektura.um.warszawa.pl/postepowania-i-decyzje </u></a></p><p><br></p><p> We apologise for any inconvenience.</p>",
  //         "trescProsta": "W związku z przebudową systemu rejestrowania decyzji niektóre decyzje o pozwoleniu na budowę, o warunkach zabudowy i ustaleniu lokalizacji inwestycji celu publicznego z lat 2022-2023 mogą być niezaznaczone w serwisie mapowym. Dane są w trakcie uzupełniania. Jednocześnie przypominamy, że: 1. Dane o pozwoleniach na budowę są dostępne w ogólnopolskiej wyszukiwarce Głównego Urzędu Nadzoru Budowlanego https://wyszukiwarka.gunb.gov.pl 2. Informacje o wydanych decyzjach o warunkach zabudowy i ustaleniu lokalizacji celu publicznego udostępniamy w formie zestawień tabelarycznych, w rozbiciu na decyzje wydane w poszczególnych latach, procedowane w Biurze Architektury i Planowania Przestrzennego oraz w wydziałach dzielnicowych na stronie https://architektura.um.warszawa.pl/postepowania-i-decyzje Za utrudnienia przepraszamy.",
  //         "trescEnProsta": "Due to the redevelopment of the decision recording system, some planning permission, zoning and public purpose decisions from 2022-2023 may not be marked in the map service. The data is in the process of being completed. We would like to remind you that: 1. data on building permits are available on the nationwide search engine of the General Office of Construction Supervision https://wyszukiwarka.gunb.gov.pl 2. information on issued decisions on land development conditions and establishing the location of public purposes is available in the form of tabular statements, broken down into decisions issued in particular years, processed in the Office of Architecture and Spatial Planning and in district departments at https://architektura.um.warszawa.pl/postepowania-i-decyzje We apologise for any inconvenience.",
  //         "dataUtworzenia": "2024-03-07T08:05:48.536Z",
  //         "archiwum": true,
  //         "czyWlasciciel": false
  //     }
  // ];
  }
}
