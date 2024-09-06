export interface MarkerStyleConfig {
  styleName: string;
  width: number;
  height: number;
  xOffset?: number;
  yOffset?: number;
  lengthUnit?: string;
  src?: string;
  textStyle?: any;
  textOffset?: any;
  vectorDef?: any[];
}

export interface MarkerStyle {

  new(config: MarkerStyleConfig): MarkerStyle;

  config: MarkerStyleConfig;

}
