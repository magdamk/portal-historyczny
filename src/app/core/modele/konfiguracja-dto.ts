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


export interface KonfiguracjaDto { 
    uuid?: string;
    enumTypKonfiguracji?: KonfiguracjaDto.EnumTypKonfiguracjiEnum;
    tlumaczenie?: string;
    wartoscLiczbowa?: number;
    wartoscTekstowa?: string;
    wartoscLogiczna?: boolean;
    kolejnosc?: number;
}
export namespace KonfiguracjaDto {
    export type EnumTypKonfiguracjiEnum = 'LICZBA_AKTUALNOSCI' | 'PL_2000_STREFA_7' | 'PL_1992' | 'WGS_84' | 'XLS' | 'XLSX' | 'CSV' | 'SHP' | 'KML' | 'GPKG' | 'DXF' | 'GML' | 'GEOJSON' | 'GEO_PNG' | 'GEO_JPG' | 'GEO_TIFF' | 'PDF' | 'DOMYSLNA_DLA_ULIC' | 'DOMYSLNA_DLA_OBIEKTOW' | 'DOMYSLNA_DLA_BLEDNEGO_LINKU' | 'LIMIT_WIDOCZNYCH_WYNIKOW_WYSZUKIWANIA' | 'LIMIT_WARSTW' | 'DOPUSZCZALNA_WARTOSC_LIMITU_WARSTW' | 'CZASOWE_PRZECHOWYWANIE_MAP' | 'DOPUSZCZALNA_WARTOSC_CZASOWEGO_PRZECHOWYWANIA_MAP';
    export const EnumTypKonfiguracjiEnum = {
        LiczbaAktualnosci: 'LICZBA_AKTUALNOSCI' as EnumTypKonfiguracjiEnum,
        Pl2000Strefa7: 'PL_2000_STREFA_7' as EnumTypKonfiguracjiEnum,
        Pl1992: 'PL_1992' as EnumTypKonfiguracjiEnum,
        Wgs84: 'WGS_84' as EnumTypKonfiguracjiEnum,
        Xls: 'XLS' as EnumTypKonfiguracjiEnum,
        Xlsx: 'XLSX' as EnumTypKonfiguracjiEnum,
        Csv: 'CSV' as EnumTypKonfiguracjiEnum,
        Shp: 'SHP' as EnumTypKonfiguracjiEnum,
        Kml: 'KML' as EnumTypKonfiguracjiEnum,
        Gpkg: 'GPKG' as EnumTypKonfiguracjiEnum,
        Dxf: 'DXF' as EnumTypKonfiguracjiEnum,
        Gml: 'GML' as EnumTypKonfiguracjiEnum,
        Geojson: 'GEOJSON' as EnumTypKonfiguracjiEnum,
        GeoPng: 'GEO_PNG' as EnumTypKonfiguracjiEnum,
        GeoJpg: 'GEO_JPG' as EnumTypKonfiguracjiEnum,
        GeoTiff: 'GEO_TIFF' as EnumTypKonfiguracjiEnum,
        Pdf: 'PDF' as EnumTypKonfiguracjiEnum,
        DomyslnaDlaUlic: 'DOMYSLNA_DLA_ULIC' as EnumTypKonfiguracjiEnum,
        DomyslnaDlaObiektow: 'DOMYSLNA_DLA_OBIEKTOW' as EnumTypKonfiguracjiEnum,
        DomyslnaDlaBlednegoLinku: 'DOMYSLNA_DLA_BLEDNEGO_LINKU' as EnumTypKonfiguracjiEnum,
        LimitWidocznychWynikowWyszukiwania: 'LIMIT_WIDOCZNYCH_WYNIKOW_WYSZUKIWANIA' as EnumTypKonfiguracjiEnum,
        LimitWarstw: 'LIMIT_WARSTW' as EnumTypKonfiguracjiEnum,
        DopuszczalnaWartoscLimituWarstw: 'DOPUSZCZALNA_WARTOSC_LIMITU_WARSTW' as EnumTypKonfiguracjiEnum,
        CzasowePrzechowywanieMap: 'CZASOWE_PRZECHOWYWANIE_MAP' as EnumTypKonfiguracjiEnum,
        DopuszczalnaWartoscCzasowegoPrzechowywaniaMap: 'DOPUSZCZALNA_WARTOSC_CZASOWEGO_PRZECHOWYWANIA_MAP' as EnumTypKonfiguracjiEnum
    };
}

