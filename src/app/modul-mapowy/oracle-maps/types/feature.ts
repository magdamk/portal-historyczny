import {Geometry} from './geometry';
import {Style} from './style';

export interface FeatureOptions {
  attributes?: any;
  renderingStyle?: any; // TODO zaimplementować klase style
  label?: string;
  labelStyle?: any;
  draggable?: boolean;
  customContent?: any;
}

export interface Feature {

  new(id: string, geometry: Geometry, options: FeatureOptions): Feature;

  id: string;
  geometry: Geometry;
  options: FeatureOptions;

  getGeometry(): Geometry;

  getAttributeValue(name: string): any;

  setRenderingStyle(style: Style): void;

  getRenderingStyle(): Style;

  setPosition(x: number, y: number, srid: number): void;
}
