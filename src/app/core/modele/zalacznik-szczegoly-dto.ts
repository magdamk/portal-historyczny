/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface ZalacznikSzczegolyDto { 
    uuid?: string;
    lokalizacja: ZalacznikSzczegolyDto.LokalizacjaEnum;
    sciezkaDoKatalogu?: string;
    host?: string;
    port?: number;
    schemat?: string;
    login?: string;
    haslo?: string;
    tabela?: string;
    kolumna?: string;
    kolumnaIdObiektow?: string;
    kolumnaNazwaPliku?: string;
    warstwaUuid?: string;
    nazwaMVC?: string;
    zrodloDanychMVC?: string;
}
export namespace ZalacznikSzczegolyDto {
    export type LokalizacjaEnum = 'REPOZYTORIUM_PLIKOW' | 'UDZIAL_SIECIOWY';
    export const LokalizacjaEnum = {
        RepozytoriumPlikow: 'REPOZYTORIUM_PLIKOW' as LokalizacjaEnum,
        UdzialSieciowy: 'UDZIAL_SIECIOWY' as LokalizacjaEnum
    };
}

