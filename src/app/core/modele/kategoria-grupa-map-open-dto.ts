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
import { TypMapyObiektDto } from './typ-mapy-obiekt-dto';


export interface KategoriaGrupaMapOpenDto {
    nazwaMapy?: string;
    rodzaj?: string;
    typ?: TypMapyObiektDto;
    adresUrl?: string;
    opisKafelka?: string;
    status?: KategoriaGrupaMapOpenDto.StatusEnum;
    wersja?: KategoriaGrupaMapOpenDto.WersjaEnum;
    dostepnoscDlaWersjiDesktopowej?: boolean;
    dostepnoscDlaWersjiResponsywnej?: boolean;
    sciezkaDoPlikuZGrafika?: string;
    numerWTabeli?: number;
    uuidMapy?: string;
}
export namespace KategoriaGrupaMapOpenDto {
    export type StatusEnum = 'ROBOCZA' | 'UKRYTA' | 'OPUBLIKOWANA' | 'PRYWATNA';
    export const StatusEnum = {
        Robocza: 'ROBOCZA' as StatusEnum,
        Ukryta: 'UKRYTA' as StatusEnum,
        Opublikowana: 'OPUBLIKOWANA' as StatusEnum,
        Prywatna: 'PRYWATNA' as StatusEnum
    };
    export type WersjaEnum = 'DESKTOPOWA' | 'MOBILNA' | 'OBIE';
    export const WersjaEnum = {
        Desktopowa: 'DESKTOPOWA' as WersjaEnum,
        Mobilna: 'MOBILNA' as WersjaEnum,
        Obie: 'OBIE' as WersjaEnum
    };
}


