import {Rectangle} from './rectangle';
import {ZoomLevel} from './zoom-level';

export interface Universe {

  new(config: any): Universe;

  config: any;

  /**
   * Get the map bounds. That is, the maximum map extent of this universe.
   * @return The maximum map extent of this universe.
   */
  getMapBounds(): Rectangle;

  /**
   * Get the SRID for the map bounds.
   * @return The SRID for the map bounds.
   */
  getSRID(): number;

  /**
   * Get the number of defined zoom levels.
   * @return The number of zoom levels.;
   */
  getZoomLevelNumber(): number;

  /**
   * Get the map zoom level definitions array.
   * @return An array of OM.universe.ZoomLevel.
   */
  getZoomLevels(): ZoomLevel[];


}
