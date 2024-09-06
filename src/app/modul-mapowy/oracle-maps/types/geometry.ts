import {Rectangle} from './rectangle';

export interface Geometry {

  new(srid: number): Geometry;

  srid: number;

  getType(): string;

  getMBR(): Rectangle;

  getOrdinates(): [];
}
