import {Filter} from './filter';
import {Geometry} from './geometry';

export interface InsidePolygon extends Filter {

  new(geom: Geometry): InsidePolygon;

}
