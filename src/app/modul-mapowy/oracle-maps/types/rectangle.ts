import {Point} from './point';
import {Geometry} from './geometry';

export interface Rectangle extends Geometry{

  new(minX: number, minY: number, maxX: number, maxY: number, srid: number): Rectangle;

  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  srid: number;

  getMinX(): number;
  getMaxX(): number;
  getMinY(): number;
  getMaxY(): number;

  getCenter(): Point;



  // TODO do zaimplementowania metody
}
