import {Style} from './style';

export interface ColorConfig {
  styleName: string;
  stroke?: string;
  strokeThickness?: number;
  strokeOpacity?: number;
  outlineStroke?: string;
  outlineStrokeThickness?: number;
  fill?: string;
  fillOpacity?: number;
  gradient?: string;
}


export interface Color extends Style{

  new(config: ColorConfig): Color;
}
