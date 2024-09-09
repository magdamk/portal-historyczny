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
import { PageableObject } from './pageable-object';
import { Sort } from './sort';
import { WidokMapyWarstwaDto } from './widok-mapy-warstwa-dto';


export interface PageWidokMapyWarstwaDto {
    totalElements?: number;
    totalPages?: number;
    number?: number;
    size?: number;
    content?: Array<WidokMapyWarstwaDto>;
    sort?: Sort;
    numberOfElements?: number;
    pageable?: PageableObject;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
}

