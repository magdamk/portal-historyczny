import {Map} from './map';
import {Point} from './point';
import {Geometry} from './geometry';
import {Style} from './style';
import {Tool} from './tool';

export interface CircleTool extends Tool{

  new(map: Map): CircleTool;

  clear(): void

  getCenter(): Point;

  getGeometry(): Geometry;

  getRadius(unit: string, callBack: any): number;

  getStatus(): number;

  setDrawingStyle(style: Style): Tool;

  setStyle(style: Style): Tool;

  start(): CircleTool;
}
