import {Geometry} from './geometry';

export interface MultiPolygon extends Geometry{

  new(ordinates: number[] | number[][], srd: number, dim?: number): Geometry;

}
