import {Layer} from "./layer";
import {Universe} from "./universe";

export interface WMSTileLayerOptions {
  universe: Universe;
  tileLayerConfig: any;
  wmsServerURL: string;
  urlBuilderOptions: {
    dataSource: string,
    version: string,
    srs: string,
    format: string,
    bgcolor: string,
    antialiase: string,
    layers: string
  }
}


export interface WMSTileLayer extends Layer {

  new(name: string, options: WMSTileLayerOptions): WMSTileLayer;
}
