import {Layer} from "./layer";

export interface WMTSTileLayerOptions {
  url: string;
  layerID: string;
  tileMatrixSetID: string;
  getTileTemplate?: string;
}


export interface WMTSTileLayer extends Layer{
  new(name: string, options: WMTSTileLayerOptions): WMTSTileLayer;
}
