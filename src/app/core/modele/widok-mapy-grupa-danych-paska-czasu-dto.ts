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
import { WidokMapyJezykDto } from './widok-mapy-jezyk-dto';
import { WidokMapyWarstwaPaskaCzasuDto } from './widok-mapy-warstwa-paska-czasu-dto';
// import { WidokMapyWarstwaPaskaCzasuDto } from './widok-mapy-warstwa-paska-czasu-dto';


export interface WidokMapyGrupaDanychPaskaCzasuDto {
    uuid?: string;
    nazwa?: WidokMapyJezykDto;
    warstwy?: Array<WidokMapyWarstwaPaskaCzasuDto>;
}

