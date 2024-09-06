import {Geometry} from './geometry';

export interface MultiLineString extends Geometry {

  new(ordinates: number[] | number[][], srd: number, dim?: number): Geometry;

}
