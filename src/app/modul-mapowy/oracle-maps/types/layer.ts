/**
 * Layer is an abstract base class for various types of map layers that can be
 * displayed. The two main sub-classes are OM.layer.TileLayer and
 * OM.layer.VectorLayer.
 * A map layer typically fires many different types of events throughout
 * its life cycle. Most events are are instances of OM.event.LayerEvent.
 * https://docs.oracle.com/en/database/oracle/oracle-database/18/jimjs/OM.layer.Layer.html
 */
import {Rectangle} from './rectangle';
import {Feature} from './feature';
import {Filter} from "./filter";
import {VectorLayerClusteringOption} from "./vector-layer";
import {Style} from './style';

export interface Layer {

  new(name: string, config: any): Layer;

  /**
   * name  String
   * The name of the layer to be created
   */
  name: string;
  /**
   * config  Object
   * An optional configuration object for the new layer.
   */
  config: any;

  /**
   * Bring the layer to the front by one step (closer to the top of the map).
   * @return The new z-index
   */
  bringForward(): number;

  /**
   * Bring the layer all the way to the top of the map
   * @return The new z-index
   */
  bringToTop(): number;

  /**
   * Enable or disable the feature info window.
   */
  enableInfoWindow(enable: boolean): void;

  /**
   * get the enable infowindow status: true for enabled and false otherwise
   * the info window is enabled.
   * @return true or false
   */
  getEnableInfoWindow(): boolean;

  /**
   * Get the layer name.
   * @return The layer name
   */
  getName(): string;

  /**
   * Get the layer's current opacity setting.
   * @return The layer's opacity. Is a value between 0 and 1.
   */
  getOpacity(): number;

  /**
   * Get the layer's z-index.
   * @return The z-index value. Returns -1 if the layer was not added to the map.
   */
  getZIndex(): number;

  /**
   * Checks if the current map zoom level is within this layer's visible zoom-level range.
   * @param curLevel Optional, the zoom level to check if it is within the minVisibleLevel and maxVisibleLevel
   * range. If not specified, then the current zoom level is used.
   * @return true if the current map level is within the layer's zoom level range for
   * it to be visible.
   */
  isInZoomLevelRange(curLevel: number): boolean;

  /**
   * Get the visibility of the layer.
   * @param curLevel
   * Optional, the zoom level to check if it is within the minVisibleLevel and maxVisibleLevel
   * range. If not specified, then the current zoom level is used.
   * @return True if the theme-based FOI layer is currently visible,
   * False if the theme-based FOI layer is currently not visible
   */
  isVisible(curLevel: number): boolean;

  /**
   * A shorthand name for the member function addListener.
   * Mixes In:
   * OM.event.EventSource.on
   */
  on(): void;

  /**
   * Refresh the display of the layer's existing data.
   */
  redraw(): void;

  /**
   * Refresh or reload layer data then redraws the data on the map.
   */
  refresh(): void;

  /**
   * Sendthe layer to the back by one step (closer to the bottom of the map).
   * @return The new z-index
   */
  sendBackward(): number;

  /**
   * Send the layer all the way to the bottom of the map
   * @return The new z-index
   */
  sendToBottom(): number;

  /**
   * Set the layer name with the given name.
   * @param newName The new layer name to be assigned to this layer.
   */
  setName(newName: string): void;

  /**
   * Set the layer's opacity. A value between 0 (transparnet) and 1 (opaque).
   * @param opacity It should be a number between 0 and 1. e.g. 0.5 means 50% opacity.
   */
  setOpacity(opacity: number): void;

  /**
   * Sets the visibility of the layer.
   * Note that the visibility change will NOT be made if the current map zoom level is
   * outside the layer's 'visible zoom level range' which is set by setZoomLevelRange() method.
   * @param visibility A Boolean true (show the layer, i.e. make it visible) or false
   * (hide the layer).
   */
  setVisible(visibility: boolean): void;

  /**
   * Set a bound (MBR) for the layer visibility. Only content within the supplied bound will be rendered.
   * That is, the map client will only fetch and display map content within this bound.
   * @param bound Specifies the layer boundary
   */
  setVisibleBound(bound: Rectangle): void;

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

  /**
   * Set the zoom level range within which this layer is visible. By default
   * a layer is set to be visible between a minmum zoom level of 0 and a maximum
   * (theoretical) zoom level of 100.
   * @param minLevel Specifies the min level. The layer will not be
   * visible if the zoom level is lower than this vlaue.
   * @param maxLevel Specifies the max level. The layer will not be
   * visible if the zoom level is higher than this value.
   */
  setZoomLevelRange(minLevel: number, maxLevel: number): void;

  getAllFeatures(): Feature[];

  setQueryParameters(...params: any[]): void;

  applyFilter(filter: Filter, replace: boolean): Layer;

  enableToolTip(enable: boolean): void;

  enableClustering(enable: boolean, options: VectorLayerClusteringOption): void;

  setLabelsVisible(visible: boolean): void;

  addFeature(feature: Feature): void;

  getFeature(id: string): Feature;

  addListener(eventType: string, f: (a: any) => void, context?: any): void;

  setRenderingStyle(style: Style, attributes?: any[]): void;

  enableFeatureEditing(enable: boolean): void;
}
