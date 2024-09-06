import {Geometry} from './geometry';

export interface Polygon extends Geometry{

  new(ordinates: number[] | number[][], srd: number, dim?: number): Geometry;

  getArea(): number;
}
