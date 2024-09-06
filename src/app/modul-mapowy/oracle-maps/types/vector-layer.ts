/**
 * This class defines a Vector tile layer with MapBox format. It is derived from a Vector layer class.
 * The feature data of a vector tile layer comes from a predefined MapViewer theme.
 */
import {Layer} from './layer';

export interface VectorLayerOptions {
  def: VectorLayerOptionsDef;
}

export interface VectorLayerOptionsDef {
  /**
   * ype {String}: Use the pre-defined constant OM.layer.VectorLayer.TYPE_PREDEFINED
   */
  type: string;
  /**
   * dataSource {String}: The MapViewer data source name (e.g. 'mvdemo')
   */
  dataSource: string;
  /**
   * theme {String}: Name of the predefined theme (e.g. 'customers'
   */
  theme: string;
  /**
   * loadOnDemand {Boolean}: If true, load theme data on demand. If false, load all theme data at one time.
   * Default value is true. If true, then the current map extent is used to filter the theme content. Additional data
   * is loaded as need on pan or zoom.
   */
  loadOnDemand?: boolean;
  /**
   * url {String}: The MapViewer URL (e.g. http://localhost:8888/mapviewer)
   */
  url: string;
  /**
   * xRatio {float}: the factor to increase the internal data buffer width for retrieving features.
   * Value must be 1 or higher. Value 1 means that the features will be retrieved for current map width.
   * Default value is 2. Does not apply to heat map rendering, where this value is fixed to 1.2
   */
  xRatio?: number;
  /**
   * yRatio {float}: the factor to increase the internal data buffer height for retrieving features.
   * Value must be 1 or higher. Value 1 means that the features will be retrieved for current map height.
   * Default value is 2. Dos not apply to heat map rendering, where this value is fixed to 1.2
   */
  yRatio?: number;
  /**
   * workspace {String}: Oracle Workspace name to access versioned data.
   */
  workspace?: string;
}

export interface VectorLayerClusteringOption {
  threshold?: number;
  clusterStyle?: any;
  minPointCount?: number;
  maxClusteringLevel?: number;
  enableZoomIn?: boolean;
  zoomInLevels?: number;
  clickBehavior?: string;
}

export interface VectorLayer extends Layer {

  ERROR_COUNT?: number;
  MULTIPLE_SELECTION?: number;
  SINGLE_SELECTION?: number;
  TYPE_DATAPACK?: number;
  TYPE_GEORSS?: number;
  TYPE_JDBC?: number;
  TYPE_LOCAL?: number;
  TYPE_MAPBOX?: number;
  TYPE_PREDEFINED?: number;
  TYPE_WFS?: number;

  new(name: string, config: VectorLayerOptions): VectorLayer;

  name: string;
  config: VectorLayerOptions;

  /**
   * Set the z-index for the layer.
   * Note: A valid layer z-index should be a number between 1 and n, where n is
   * the number of layers that are currently displayed in the map. When the newIndex
   * parameter of setZIndex is less than 1, it will be set to 1. If it is
   * greater than n, it will be set to n. If z-Index value, newIndex, is already assigned
   * to another layer, then it will still be assigned to the current layer (on which this function is invoked).
   * One or more of the other layer will be assigned a different z-index value. The changes will depend on
   * whether this layer was inserted into the current layer stack or just moved within the layer stack.
   * @return The old z-index
   */
  setZIndex(zIndex: number): number;

}
