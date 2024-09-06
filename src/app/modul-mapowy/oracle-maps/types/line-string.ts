import {Geometry} from './geometry';

export interface LineString extends Geometry {

  new(ordinates: number[] | number[][], srd: number, dim?: number): Geometry;

  getLength(): number;
}
