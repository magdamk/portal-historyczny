import {Tool} from './tool';
import {Map} from './map';
import {Point} from './point';
import {Geometry} from './geometry';
import {Style} from './style';

export interface RedlineToolOptions  {
  finishMode: number;
  simplified: boolean;
}


export interface RedlineTool extends Tool{

  TYPE_POINT: number;
  TYPE_LINESTRING: number;
  TYPE_POLYGON: number;
  FINISH_ON_CLICK: number;
  FINISH_ON_RELEASE: number;
  LINESTRING_FINISH_DEBOUNCE_TIME: number;

  new(map: Map, geoType: number, options?: RedlineToolOptions): RedlineTool;

  clear(): void

  getCenter(): Point;

  getGeometry(): Geometry;

  getRadius(unit: string, callBack: any): number;

  getStatus(): number;

  setDrawingStyle(opiton: {type: number, style: Style}): Tool;

  setStyle(opiton: {type: number, style: Style}): Tool;

  start(): RedlineTool;

  addVertex(index: number, vertex: Geometry, isRedo: boolean): void;
}
