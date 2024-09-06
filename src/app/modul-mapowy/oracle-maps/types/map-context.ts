import {Point} from './point';
import {Rectangle} from './rectangle';
import {Universe} from './universe';

export interface MapContext {

  getCenterPoint(): Point;

  getDeviceHeight(): number;

  getDeviceWidth(): number;

  getDeviceWindow(): any;

  getPreviousCenterPoint(): Point;

  getPreviousZoomLevel(): number;

  getQueryWindow(): Rectangle;

  getUniverse(): Universe;

  getZoomLevel(): number;

  // TODO dodać dokumentację

}
