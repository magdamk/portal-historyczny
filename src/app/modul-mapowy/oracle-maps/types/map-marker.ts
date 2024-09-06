import {MarkerStyle} from './marker-style';
import {Feature} from "./feature";

export interface MarkerPosition {
  x: number;
  y: number;
  srid: number;
}

export interface MarkerConfig {
  id: string;
  label?: string;
  labelStyle?: any; //  TODO dodać definicję OM.style.Text
  markerText?: string;
  markerTextStyle?: any; // TODO dodać definicję OM.style.Text
  draggable?: boolean;
  renderingStyle?: MarkerStyle; // TODO OM.style.Marker
  position: MarkerPosition;
  dragStart?: any;
  dragging?: any;
  dragEnd?: any;
}

export interface MapMarker extends Feature{

  new(mObj: MarkerConfig): MapMarker;

  mObj: MarkerConfig;

  setPosition(x: number, y: number, srid: number): void;

  setDraggable(isDraggable: boolean): void;
}
