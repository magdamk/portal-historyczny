/**
 * The zoom level scheme of the map is usually the same as that of the tile layer, in which case the application
 * does not need to explicitly set the zoom level scheme. The application needs to invoke this method only when
 * the map has multiple tile layers and the zoom level schemes of the tile layers are different.
 */
export interface ZoomLevel {
  resolution: number;
  options: any;

  // TODO opisać metody
}
