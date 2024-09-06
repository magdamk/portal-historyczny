/**
 * A static class that holds various configuration properties that are shared
 * among multiple Map instances on the same page.
 * In most cases an application should only make changes to these public properties
 * before it creates the first instance of OM.Map.
 */
export interface Gv {

  /**
   * Add a custom coordinate system transform function.
   * @param fromSrid  Add a custom coordinate  system transform function.
   * @param toSrid Target SRID.
   * @param func The transform function.
   */
  addCSTransformFunction(fromSrid: number, toSrid: number, func: any): void;

  /**
   * Add a customSpatial Reference System definition.
   * @param t type of the custom SRS, possible values are 'GEODETIC' and 'PROJECTED'
   * @param u The unit for the current srid.
   * @param s The srid for the custom SRS.
   */
  addSRS(t: string, u: string, s: number): void;

  /**
   * Control whether an editable feature is draggable.
   * Default value is true.
   * Note that this flag is ignored for point features which are always
   * draggable.
   */
  enableFeatureDragging(): void;

  /**
   * Enable (if flag = true) or disable (flag = false) the use of the proxy servlet.
   */
  enableProxy(): void;

  /**
   * By default Oracle Maps looks for all the required image and css files in
   * the "images" and "css" folders under the relative URL path "/mapviewer/jslib/v2/".
   * Use this method to change the resource path, provided all the resources
   * can be found using the same name and (if applicable) same sub-folder.
   * @param newPath the new URL path for the image and css resources.
   */
  setResourcePath(newPath: string): void;

  setLogLevel(level: string): void;

  setHttpMethod(method: string): void
}
