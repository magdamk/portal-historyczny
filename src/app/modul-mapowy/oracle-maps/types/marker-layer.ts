import {Layer} from './layer';
import {Feature} from "./feature";

export interface MarkerLayer extends Layer {

  new(layerName: string): MarkerLayer;

  layerName: string;

  addMapMarker(mapmarker: Feature): void;
  removeAllFeatures(): void;

}
