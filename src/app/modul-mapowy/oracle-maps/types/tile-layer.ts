import {Layer} from './layer';

export interface TileLayerOptions {
  /**
   * The data source where the mapviewer tile layer is defined.
   */
  dataSource: string;
  /**
   * The name of mapviewer tile layer.
   */
  tileLayer: string;
  /**
   * The mapviewer tile server URL. For example, "http://maps.oracle.com/mapviewer/mcserver".
   * This is only needed when the tiles are not served by the mapviewer server specified by mapViewerURL passed
   * to the Map constructor.
   */
  tileServerURL: string;
  /**
   * Mapviewer subdomains array. These are used to fetch tiles from multiple subdomains.
   * Example: ['instance1', 'instance2', 'instance3'] (Optional).
   */
  subdomains?: string[];
  /**
   * The URL for local storaged tiles, this is only valide when creating a tilelayer from a local folder
   */
  tileImageURL?: string;
  /**
   * tileLayerConfig {OM.layer.TileLayerConfig}: The tile layer configuration object. This is required
   * only when the tile layer is an custom tile layer.
   */
  tileLayerConfig?: any;
  /**
   * specify whether it is a local tilelayer or not
   */
  isLocalTileLayer?: boolean;
}

export interface TileLayer extends Layer {

  new(name: string, config: TileLayerOptions): TileLayer;

  name: string;
  config: TileLayerOptions;

  // TODO opisac metody
}
