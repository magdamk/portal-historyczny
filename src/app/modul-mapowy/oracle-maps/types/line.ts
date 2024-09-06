import {Style} from './style';
import {MarkerStyle} from './marker-style';

export interface LineConfig {
  styleName: string;
  stroke?: string;
  strokeThickness?: number;
  strokeOpacity?: number;
  strokeDash?: string[];
  fill?: string;
  fillOpacity?: number;
  fillWidth?: number;
  startMarker?: MarkerStyle;
  endMarker?: MarkerStyle;
  centerLine?: String;
  centerLineWidth?: number;
  centerLineDash?: string[];
  orientedMarker?: boolean;
  cased?: boolean;
  lengthUnit?: string;
  strokeLineCap?: string;
  strokeLineJoin?: string;
  markerPattern?: any;
}


export interface Line extends Style{

  new(config: LineConfig): Line;
}
