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
import { TypGrupyKonfiguracjiObiektDto } from './typ-grupy-konfiguracji-obiekt-dto';
import { KonfiguracjaDto } from './konfiguracja-dto';


export interface KonfiguracjaGrupaDto {
    uuid?: string;
    typGrupyKonfiguracji?: TypGrupyKonfiguracjiObiektDto;
    listaPodgrupKonfiguracji?: Array<KonfiguracjaGrupaDto>;
    listaKonfiguracji?: Array<KonfiguracjaDto>;
    kolejnosc?: number;
}
