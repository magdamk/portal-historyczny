import {Map} from './map';
import {MapContext} from './map-context';
import {TileLayer} from './tile-layer';
import {Point} from './point';
import {Gv} from './gv';
import {Universe} from './universe';
import {Rectangle} from './rectangle';
import {Layer} from './layer';
import {VectorLayer} from './vector-layer';
import {MapEvent} from './map-event';
import {MouseEvent} from './mouse-event';
import {ScaleBar} from './scale-bar';
import {MarkerLayer} from './marker-layer';
import {MapMarker} from './map-marker';
import {MarkerStyle} from './marker-style';
import {Geometry} from './geometry';
import {Filter} from "./filter";
import {AnyInteract} from "./any-interact";
import {Circle} from "./circle";
import {InsidePolygon} from './inside-polygon';
import {StyleStore} from "./style-store";
import {Or} from './or';
import {Style} from './style';
import {Color} from './color';
import {LayerEvent} from './layer-event';
import {Feature} from './feature';
import {LineString} from './line-string';
import {Polygon} from './polygon';
import {MultiLineString} from './multi-line-string';
import {MultiPolygon} from './multi-polygon';
import {CircleTool} from './circle-tool';
import {ToolEvent} from './tool-event';
import {RedlineTool} from './redline-tool';
import {RectangleTool} from './rectangle-tool';
import {Text} from './text';
import { MapDecoration } from './map-decoration';
import {DynamiTileLayer} from './dynami-tile-layer';
import {ServerMapRequest} from './server-map-request';
import {ServerPredefinedTheme} from './server-theme';
import {WMSTileLayer} from './wms-tile-layer';
import {WMTSTileLayer} from './wmts-tile-layer';
import {Line} from './line';
import {TileLayerConfig} from './tile-layer-config';
import { Like } from './like';
import { Equals } from './equals';

export interface LayerNameSpace {
  TileLayer: TileLayer;
  Layer: Layer;
  VectorLayer: VectorLayer;
  MarkerLayer: MarkerLayer;
  DynamicTileLayer: DynamiTileLayer;
  WMSTileLayer: WMSTileLayer;
  WMTSTileLayer: WMTSTileLayer;
  TileLayerConfig: TileLayerConfig;
}

export interface GeometryNameSpace {
  Point: Point;
  Rectangle: Rectangle;
  Geometry: Geometry;
  Circle: Circle;
  LineString: LineString;
  Polygon: Polygon;
  MultiLineString: MultiLineString;
  MultiPolygon: MultiPolygon;
}

export interface UniverseNameSpace {
  Universe: Universe;
}

export interface EventNameSpace {
  MapEvent: MapEvent;
  MouseEvent: MouseEvent;
  LayerEvent: LayerEvent;
  ToolEvent: ToolEvent;
}

export interface ControlNameSpace {
  ScaleBar: ScaleBar;
  MapDecoration: MapDecoration;
}

export interface StyleNamespace {
  Marker: MarkerStyle;
  StyleStore: StyleStore;
  Style: Style;
  Color: Color;
  Text: Text;
  Line: Line;
}

export interface FilterNamespace {
  Filter: Filter;
  AnyInteract: AnyInteract;
  InsidePolygon: InsidePolygon;
  Or: Or;
  Like: Like;
  Equals: Equals;
}

export interface ServerNamespace {
  ServerMapRequest: ServerMapRequest;
  ServerPredefinedTheme: ServerPredefinedTheme;
}

export interface ToolNamespace {
  CircleTool: CircleTool;
  RedlineTool: RedlineTool;
  RectangleTool: RectangleTool;
}

export interface OM {
  Map: Map;
  MapContext: MapContext;
  Column: any;
  MapMarker: MapMarker;
  TextFeature: any;
  gv: Gv;
  Feature: Feature;

  // Name spaces
  layer: LayerNameSpace;
  geometry: GeometryNameSpace;
  universe: UniverseNameSpace;
  event: EventNameSpace;
  control: ControlNameSpace;
  style: StyleNamespace;
  filter: FilterNamespace;
  tool: ToolNamespace;
  server: ServerNamespace;
}
