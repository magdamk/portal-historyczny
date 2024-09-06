import {Map} from './map';
import {Geometry} from './geometry';
import {Style} from './style';
import {Tool} from './tool';

export interface RectangleTool extends Tool{

  new(map: Map): RectangleTool;

  clear(): void

  getDraggingHeight(): number;

  getDraggingWidth(): number;

  getGeometry(): Geometry;

  getStatus(): number;

  setDrawingStyle(style: Style): Tool;

  setStyle(style: Style): Tool;

  start(): RectangleTool;
}
