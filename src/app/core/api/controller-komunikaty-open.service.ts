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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from './encoder';
import { Observable }                                        from 'rxjs';

import { JsonObjectContainerKomunikatSzczegolyOpenDto } from '../modele/json-object-container-komunikat-szczegoly-open-dto';
// import { RequestErrorResponse } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from './variables';
import { Configuration }                                     from './configuration';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ControllerKomunikatyOpenService {

    protected basePath = environment.portalMapowyApiUrl;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public pobierzAktualnyKomunikat(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*' | 'application/json'}): Observable<JsonObjectContainerKomunikatSzczegolyOpenDto>;
    public pobierzAktualnyKomunikat(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*' | 'application/json'}): Observable<HttpResponse<JsonObjectContainerKomunikatSzczegolyOpenDto>>;
    public pobierzAktualnyKomunikat(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*' | 'application/json'}): Observable<HttpEvent<JsonObjectContainerKomunikatSzczegolyOpenDto>>;
    public pobierzAktualnyKomunikat(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*' | 'application/json'}): Observable<any> {

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*',
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<JsonObjectContainerKomunikatSzczegolyOpenDto>(`${this.configuration.basePath}/open/komunikaty/aktualny`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public pobierzKomunikatPortaluMapowego(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*' | 'application/json'}): Observable<JsonObjectContainerKomunikatSzczegolyOpenDto>;
    public pobierzKomunikatPortaluMapowego(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*' | 'application/json'}): Observable<HttpResponse<JsonObjectContainerKomunikatSzczegolyOpenDto>>;
    public pobierzKomunikatPortaluMapowego(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*' | 'application/json'}): Observable<HttpEvent<JsonObjectContainerKomunikatSzczegolyOpenDto>>;
    public pobierzKomunikatPortaluMapowego(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*' | 'application/json'}): Observable<any> {

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*',
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<JsonObjectContainerKomunikatSzczegolyOpenDto>(`${this.configuration.basePath}/open/komunikaty/komunikat-portalu-mapowego`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
