/**
 * OM.Map is the main class of the Oracle Maps V2 API. It is associated with
 * a specific map DIV and contains various map layers, controls and tools.
 * Each Map instance must have a map universe which defines the overall
 * map bounds and zoom level details (such as number of zoom levels and map
 * scale at each zoom level). The universe can be modified or switched on the fly,
 * such as when switching from a cached map (or map tile layer) to a purely
 * thematic map (with no background map tiles).
 * The Map instance may fire various events througout its life cycle. These events
 * are typically instances of the class OM.event.MapEvent or OM.event.MouseEvent.
 * Applications can register listeners, or handlers, on these events to hook in specific application logic, such as
 * performing custom actions just before the map is to be zoomed in. For the type of
 * map events that can be listend on, check the event type constants defined in the
 * class OM.event.MapEvent and OM.event.MouseEvent.
 * Typically an application will create a Map instance, add a tile layer
 * that serves as the background map, and one or more interactive vector layers.
 * Vector layers can get their data from a variety of sources such as the database or service feeds.
 * These are defined in the VectorLayer's API documentation.
 *
 *
 * A vector layer has an associated rendering style. These can be predefined or
 * created dynamically in the client code. You can then assign
 * them to the vector layers to change how geographic features are rendered.
 * You can also specify the special styles to be used on mouse-over/hover,
 * or when a feature is selected/highlighted.
 */

import {Layer} from './layer';
import {Magnifier} from './magnifier';
import {MapDecoration} from './map-decoration';
import {ScaleBar} from './scale-bar';
import {Toolbar} from './toolbar';
import {Point} from './point';
import {VectorLayer} from './vector-layer';
import {MapContext} from './map-context';
import {Rectangle} from './rectangle';
import {TileLayer} from './tile-layer';
import {Universe} from './universe';

export interface Map {

  new(div: any, options: any): Map;

  ZOOM_KEEP_MOUSE_POINT: number;
  ZOOM_CENTER_ON_MOUSE: number;
  ZOOM_KEEP_CENTER: number;

  ScaleBar: ScaleBar;


  /**
   * The map container div.
   */
  div: any;
  /**
   * This is an object literal that specifies the initial map options. It can have the following properties.
   * Note: Only one of the poziomZoom, scale or resolution properties is needed to defined the initial map display scale.
   */
  options: any;

  /**
   * Add a layer to the map. This layer name must be unique. If a layer with the same name already exists,
   * then this layer won't be added into the map.
   * @param layer A map layer object.
   * @param type An optional String parameter that specifies the category of the vectorlayer, this category name will be displayed in
   * the layer control list.
   * @param layerIdx The index layer to be inserted at.
   */
  addLayer(layer: Layer, type?: string, layerIdx?: number): any;

  addLayer(layer: Layer, layerIdx?: number): any;

  /**
   * Add a magnifier tool to map
   * @param magnifier The magnifier tool instance to add.
   */
  addMagnifier(magnifier: Magnifier): void;

  /**
   * Add a MapDecoration object to the map. A map decoration is
   * a piece of user supplied HTML content (such as a map title string or a custom built
   * map control) that can be displayed on top of the map.
   * Once added, a map decoration will not move with the map when the map is recentered.
   * The map decoration can be set to be collapsible so that it can be minimized when
   * the user clicks on the minimize button. By default, a map decoration is
   * not collapsible.
   * The map decoration can be set to be draggable so that the user can move
   * the map decoration inside the map window by dragging it using the mouse.
   * @param mapDeco A MapDecoration object to be added to the map
   */
  addMapDecoration(mapDeco: MapDecoration): void;

  /**
   * Add a navigation panel to the map.
   */
  addNavigationPanelBar(): void;

  /**
   * Add a scalebar to map.
   */
  addScaleBar(): void;

  /**
   * Add a scalebar to map.
   * @param scaleDiv A div used to contain scale bar value.
   * @param scale The scale instance from the map.
   */
  addScaleBarDiv(scaleDiv: any, scale: ScaleBar): void;

  /**
   * Add scalebar value to a specified div.
   * @param unitDiv A div used to contain scale bar value.
   * @param scale The scale instance from the map.
   */
  addScaleBarUnit(unitDiv: any, scale: ScaleBar): void;

  /**
   * Add a toolbar to map.
   * @param toolbar The toolbar instance to add to the map.
   */
  addToolBar(toolbar: Toolbar): void;

  /**
   * Close all info-windows on the map.
   */
  closeInfoWindows(): void;

  /**
   * Destroy the map and all layers.
   */
  destroyMap(): void;

  /**
   * Display an information window on the map at a specified location.
   * The content of the information window is defined by an HTML string. The user can
   * close the information window by clicking the close ("X") button inside the window.
   * @param point A point geometry object that specifies the location of
   * the info window on the map. The point is in the map coordinate system. e.g. if
   * the map (or tile layer) is in WGS84 (SRID 8307) then the point's SRID should also be 8307.
   * If the width and height are omitted, the info window will automatically sized
   * to best fit the content.
   * @param htmlString An HTML content string to be displayed inside the information window.
   * @param options An object, or object literal, specifying various info-window properties.
   * ellipsis {boolean} Whether to truncate a title which will not fit and display ... at the end. Default is true.
   * width {number} The width of the information window in pixels.
   * height {number} The height of the information window in pixels.
   * title {string} An optional string parameter that specifies the info window title string.
   * infoWindowStyle {Object} The css object that specifies the custom infoWindow style parameters
   * titleStyle {Object} The css object that specifies the infoWindow title style parameters
   * contentStyle {Object} The css object that specifies the infoWindow content style parameters
   * tailStyle {Object} The object that specifies the infoWindow tail style parameters
   * The parameters object contains 2 attributes.
   * offset {number} An integer-valued parameter defining the offset of tail.
   * background {string} A string parameter defining the background of tail
   * closeButtonStyle {Object} The object that specifies the infoWindow close button style parameters
   * The parameters object contains 6 attributes.
   * mouseOutButton {object} This parameter defining the mouse out image src of the close button.
   * The parameters object contains 1 attribute.
   * src {string} A parameter defining the mouse out image src of the close button.
   * mouseOverButton {object} This parameter defining the mouse over image src of the close button.
   * The parameters object contains 1 attribute.
   * src {string} A parameter defining the mouse over image src of the close button.
   * width {number} An integer-valued parameter defining the width of close button.
   * height {number} An integer-valued defining the height of close button.
   * xOffset {number} An integer-valued defining the xOffset of close button.
   * yOffset {number} An integer-valued defining the yOffset of close button.
   */
  displayInfoWindow(point: Point, htmlString: string, options: any): void;

  /**
   * Enable or disable mouse double-click. When mouse double-click is enabled,
   * the user can zoom in by double click on map.
   * @param enabled If true then mouse double clicking is enabled, if false then it is disabled.
   */
  enableDoubleClick(enabled: boolean): void;

  /**
   * Enable event propagation from the info window. When enabled, events such as mouse clicks
   * and keyboard strokes are propagated, to other event listeners in the map client instance, after they are handled
   * inside the info window. When event propagation is diabled, events are trapped
   * inside the info window and not propapated outside. The latter is usally
   * preferred when the info window needs to handle some events that should only
   * occur within the map decoration itself. By default, event propagation for info
   * window is disabled.
   * @param enabled true (enable event propagation) or false (disable event propagation. default).
   */
  enableInfoWindowEventPropagation(enabled: boolean): void;

  /**
   * Enable or disable map dragging (panning).
   * @param enabled If true then map drag is enabled, if false then it is disabled.
   */
  enableMapDrag(enabled: boolean): void;

  /**
   * Enable or disable map wraparound.
   * @param enabled If true then wraparound is enabled, if false then it is disabled.
   */
  enableMapWraparound(enabled: boolean): void;

  /**
   * Enable or disable map zoom.
   * @param enabled If false, the map cannot be zoomed.
   */
  enableMapZoom(enabled: boolean): void;

  /**
   * Enable or disable mouse wheel zooming. When mouse wheel zooming is enabled,
   * the user can zoom in by scrolling the mouse wheel forward and zoom out
   * by scrolling the mouse wheel backward.
   * @param enabled
   * If true then mouse wheel zooming is enabled, if false then it is disabled.
   */
  enableMouseWheelZooming(enabled: boolean): void;

  /**
   * Enable or disable multiple vector layer infowindow. When it is set to false, the default setting,
   * only one feature's info is shown for a mouse event if ther eare overlapping features; when it is set to true, all
   * overlapping features' info in one vector layer or multiple vector layers is shown.
   * @param enabled
   * A boolean value to enable (true) or disable (false) of showing
   * multiple vector layer features in an infowindow.
   */
  enableMultiLayerInfoWindow(enabled: boolean): void;

  /**
   * Enable drag-n-drop of a datapack URL onto a map. If the URL is valid, a datapack layer
   * will be created and added to map.
   * @param enable Enable/Disable URL drag-n-drop.
   * @param options An object which may have following properties.
   * style {OM.style.Style} a style which is used to render the layer. Use a color style (OM.style.Color)
   * if the layer can contain a mix of points, lines, and polygons.
   * zoomToTheme {Boolean} If true the map center and zoom level are automatically adjusted so that all
   * features can be displayed inside the map window.
   */
  enableURLDragDrop(enable: boolean, options: any): void;

  /**
   * Enable or disable zoom animation.
   * If enabled is true an animation effect is used on zoom in or out.
   * @param enabled A boolean value which indicates whether or not to enable zoom animation
   */
  enableZoomAnimation(enabled: boolean): void;

  /**
   * Get the absolute ground coordinate for the current cursor position
   * @return Point
   */
  getAbsoluteCursorLocation(): Point;

  /**
   * Get the ground coordinate for the current cursor position
   * @return Point
   */
  getCursorLocation(): Point;

  /**
   * Return an array containing all feature layers added to the map.
   * These are typically OM.layer.VectorLayer instances.
   * @return An array of layers. Usually all added OM.layer.VectorLayer instances.
   */
  getFeatureLayers(): VectorLayer[];

  /**
   * Get the map content as an image
   * @param callBack The callback function to which the image will be passed.
   * @param width The width of the map image in pixels. If omitted, the map image width
   * will be set to the width of the current map div container.
   * @param height The height of the map image in pixels. If omitted, the map image
   * height will be set to the height of the current map div container.
   * @param options An object literal for specifying which map decorations (in this version, only scaleBar is supported)
   * should or should not be displayed; it may all specify a datasource name when applicable, e.g.:
   * {scaleBar:true, dataSource:"MVDEMO"}.
   */
  getFlattenedCanvas(callBack: any, width: number, height: number, options: any): void;

  /**
   * Find a specific layer by name
   * @param name The name of a desired layer
   * @return The specified layer or null if no such layer exists
   */
  getLayerByName(name: string): Layer;

  /**
   * Get the map content as an image URL
   * @param callBack The callback function to which the image URL will be passed.
   * @param width The width of the map image. If omitted, the map image width
   * will be set to the width of the current map div container.
   * @param height The height of the map image. If omitted, the map image
   * height will be set to the height of the current map div container.
   * @param options An object literal for specifying which map decorations (in this version, only scaleBar is supported)
   * should or should not be displayed; it may all specify a datasource name when applicable, eg.:
   * {scaleBar:true, dataSource:"MVDEMO"}.
   */
  getMapAsServerImage(callBack: any, width: number, height: number, options: any): void;

  /**
   * Get the map content as an SVG document.
   * @param callBack The callback function to which the SVG document (string) will be passed.
   */
  getMapAsSVG(callBack: any): void;

  /**
   * Get the XML map request for the current map. The xml map request can be used to render the current map as a single map image.
   * @param format The desired map image format (e.g. PNG or PNG_URL).
   * @param callBack The callback function to which the will be passed.
   * @param width The width of the map image in pixels. If omitted, the map image width will be set
   * to the width of the current map div container.
   * @param height The height of the map image in pixels. If omitted, the map image height will be set to the
   * height of the current map div container.
   * @param options An object literal for specifying which map decorations (in this version, only scaleBar is supported)
   * should or should not be displayed; it may all specify a datasource name when applicable, eg.:
   * {scaleBar:true, dataSource:"MVDEMO"}.
   */
  getMapAsXML(format: string, callBack: any, width: number, height: number, options: any): void;

  /**
   * Get map center
   * @return Point
   */
  getMapCenter(): Point;

  /**
   * Return the map context.
   */
  getMapContext(): MapContext;

  /**
   * Get the current map scale. Assumes a ration scale, i.e. grounds units per screen unit.
   * @return scale. The current map scale.
   */
  getMapScale(): number;

  /**
   * Get the bounds (bounding box) for the current map window.
   * @return the current map bounds
   */
  getMapWindowBoundingBox(): Rectangle;

  /**
   * Get map zoom level
   */
  getMapZoomLevel(): number;


  /**
   * Get the maskOutInfoWindow flag. When it is true (it may have been set to true for cases
   * such as a redline tool is selected), mouse events will not trigger the info window.
   */
  getMaskOutInfoWindow(): boolean;

  /**
   * Get the screen location for the specified ground coordinate
   * @param point The geometry point for the ground coordinates
   */
  getScreenLocation(point: Point): any;

  /**
   * Get the ground coordinate for the specified screen location
   * @param x The X ordinate in screen pixels
   * @param y The Y ordinate in screen pixels
   * @param isAbsolute Default is false
   */
  getScreenPointLocation(x: number, y: number, isAbsolute: boolean): Point;

  /**
   * Get the tile layers in a map. Returns an array containing all tile layers added to the map.
   * These are typically tile layer instances within a map div.
   * @return An array of OM.layer. Usually all added OM.layer.TileLayer instances.
   */
  getTileLayers(): TileLayer[];

  /**
   * Returns the map universe. If the map universe is not set by setUniverse,
   * this method returns a copy of the universe of the first visible tile layer if there is any.
   * @return universe
   */
  getUniverse(): Universe;

  /**
   * Hide the existing Overview map
   */
  hideOverviewMap(): void;

  /**
   * Initialize the map and display it.It needs to be called only once.
   * This is the same as MVMapView.display().
   */
  init(): void;

  /**
   * A shorthand name for the member function addListener.
   * @return nie wiadomo o co tu chodzi
   */
  on(): any;

  // tego niema w dokumentacji ale powinno
  addListener(eventType: string, f: (a: any) => void, context?: any): void;

  /**
   * Pan (move) the map by the specified X and Y offset.
   * Note: both zoom and pan operations will always consult the Universe to determine the exact behavior.
   * For instance, if the Universe contains pre-defined zoom levels, then zoom in/out will be based on the zoom levels.
   * If there is no zoom level (tile-layer) defined in the Universe, then zoom in/out will be simply
   * based on a default scaling behaviour, such as increasing/reducing map size by a factor of 2.
   */
  pan(): void;

  /**
   * Print the current map content
   */
  print(): void;

  /**
   * Redraw map and each layer. Simply re-renders existing layer data, i.e. without reload.
   * Use refreshMap() instead to reload the data before redrawing.
   */
  redrawMap(): void;

  /**
   * Refresh the map and all layers. Forces layers to reload data.
   */
  refreshMap(): void;

  /**
   * Remove all vector feature layers
   */
  removeAllFeatureLayers(): void;

  /**
   * Remove a specified layer from the map. The layer-deleted event will be fired.
   * @param layer The layer to remove.
   * @return The layer index
   */
  removeLayer(layer: Layer): number;

  /**
   * Remove a map decoration from the current map.
   * @param mapDeco The MapDecoration object to be removed
   */
  removeMapDecoration(mapDeco: MapDecoration): void;

  /**
   * Remove a toolbar from map
   * @param toolbar The toolbar to remove.
   */
  removeToolbar(toolbar: Toolbar): void;

  /**
   * Specify a subset of the zoom levels defined
   * in TileLayerConfig that will be enabled and visible. By default all zoom levels defined in
   * the TileLayerConfig object are enabled and visible on the map.
   * @param levels An integer array of zoom levels.
   */
  setEnabledZoomLevels(levels: number[]): void;


  /**
   * Set the home map location and zoom level. When the
   * home map location and zoom level is set, the user can click on the center
   * button of the navigation panel bar to bring the map back to the initial location
   * and zoom level that were set on initialization.
   * @param center The point specifies the home/original center.
   * @param zoomlevel An integer that specifies the home/original zoom level
   */
  setHomeMap(center: Point, zoomlevel: number): void;

  /**
   * Set the info-window style's properties.
   * @param options An object, or object literal, specifying various info-window properties.
   *
   * ellipsis {boolean} Whether to truncate a title which will not fit and display ... at the end. Default is true.
   * width {number} The width of the information window in pixels.
   * height {number} The height of the information window in pixels.
   * infoWindowStyle {Object} The css object that specifies the custom infoWindow style parameters
   * titleStyle {Object} The css object that specifies the infoWindow title style parameters
   * contentStyle {Object} The css object that specifies the infoWindow content style parameters
   * tailStyle {Object} The object that specifies the infoWindow tail style parameters
   * The parameters object contains 2 attributes.
   * offset {number} An integer-valued parameter defining the offset of tail.
   * background {string} A string parameter defining the background of tail
   * closeButtonStyle {Object} The object that specifies the infoWindow close button style parameters
   * The parameters object contains 6 attributes.
   * mouseOutButton {object} This parameter defining the mouse out image src of the close button.
   * The parameters object contains 1 attribute.
   * src {string} A parameter defining the mouse out image src of the close button.
   * mouseOverButton {object} This parameter defining the mouse over image src of the close button.
   * The parameters object contains 1 attribute.
   * src {string} A parameter defining the mouse over image src of the close button.
   * width {number} An integer-valued parameter defining the width of close button.
   * height {number} An integer-valued defining the height of close button.
   * xOffset {number} An integer-valued defining the xOffset of close button.
   * yOffset {number} An integer-valued defining the yOffset of close button.
   */
  setInfoWindowStyle(options: any): void;

  /**
   * Set the map center
   * @param p The point to set as the map center
   * @param smooth If true then use a smooth pan or zoom.
   */
  setMapCenter(p: Point, smooth?: boolean): void;

  /**
   * Set the map center and zoom level.
   * @param p The desired center point of the map
   * @param zoom The desired zoom level of the map
   * @param smoothPan Whether to use a smooth animated pan.
   */
  setMapCenterAndZoomLevel(p: Point, zoom: number | null, smoothPan: boolean): void;

  /**
   * Set map scale. Used for a map without predefined zoom levels
   * @param scale The map scale to use. Assumes a ratio scale. For instance, if the desired scale is 1:10000 then
   * set 10000 as the scale parameter value.
   */
  setMapScale(scale: number): void;

  /**
   * Set map zoom level
   * @param zoom The zoom level to set for the map. The map will zoom in or out to this level.
   */
  setMapZoomLevel(zoom: number): void;

  /**
   * Set the maskOutInfoWindow flag. When set to true, such as when a redline tool is selected,
   * mouse events will not trigger the info window.
   * @param flag Boolean value, true or false
   */
  setMaskOutInfoWindow(flag: boolean): void;

  /**
   * Set the mouse cursor style when the mouse is inside the map
   * container and not over any map content other than map tiles.
   * @param cursorStyle A string that specifies the cursor style to
   * be used, which must be one of the standard CSS cursor style names
   * such as "crosshair", "pointer" and "move".
   * @param cursorType A string that specifies when the cursor style
   * should be used. Its value can be one of the following:
   * default {string} Cursor style to be used when the mouse is on the map
   * and no mouse key has been pressed.
   * dragging {string} Cursor style to be used when the map is being dragged.
   */
  setMouseCursorStyle(cursorStyle: string, cursorType: string): void;

  /**
   * Set the desired behavior when zooming with the mouse wheel. Posible parameters are one of
   * OM.Map.ZOOM_KEEP_MOUSE_POINT (the default behavior),
   * OM.Map.ZOOM_CENTER_ON_MOUSE, or OM.Map.ZOOM_KEEP_CENTER.
   * @param One of the three parameter contants.
   */
  setMouseWheelZoomBehavior(One: number): void;

  /**
   * Set the options for the overview window.
   * The overview window is created when the map is initialized. However you can set various properties--
   * such as visibility, scale, rectangle and cursor style-- using this method.
   * @param options An object, or object literal, with the following properties:
   * {number} scaleRatio Must be greater than 1. scaleRatio means that if the resolution of the main map is X units per pixel
   * then the resolution of the Overview map will be scaleRatio*X units per pixel. E.g. if the main map is at 1Km/pixel and the
   * scaleRatio is 2 then the Overview map will be at 2Km per pixel. Similarly if the main map is at scale 1:25000 and the
   * scaleRatio is 2 then the Overview map will be at 1:50000.
   * {OM.layer.Layer} overviewLayer The layer object that will be displayed in the overview window
   * {object} panelOptions An object, or literal, which specifies the rectangle and cursor style
   * {OM.style.Style} style A color, or area, style used in displaying the current extent, or bounds, of the main map
   * {String} defaultCursorStyle The cursor style used when the mouse is inside this rectangular area
   * {String} draggingCursorStyle The cursor style used when drag rectangular area
   * {Boolean} display If true, show overview map panel. If false, no overview map panel is displayed
   * {Boolean} collapse If true the overview map panel is collapsible.
   */
  setOverviewMapOptions(options: any): void;

  /**
   * Set the tooltip style. This affects tooltips displayed on all map controls and layers.
   * @param options Object
   * Specifies the style properties. It may have the following attributes:
   * background {String}. The background style such as #rrggbbaa. Default value is "#ffffe1"
   * opacity {Number} A floating number between 0 and 1 indicating background opacity
   * borderColor {String}. The stroke color of the border
   * borderThickness {number} the width or thickness of the border
   * rx {number} rounded corner size x; 0 if prefer square corners
   * ry {number} rounded corner size y; 0 if perfer square corners
   * padding {Object}. Specify the padding (in pixels) between the background of the tooltip and its content.
   * The object must supply four values: top, lineBegin, bottom, lineEnd
   * textColor {String}: The color of the text
   * fontWeight {String} The font weight for the tooltip text
   * fontSize {number} The font size for the tooltip text
   * titleStyle {OM.style.Text} The style for the tooltip titles
   * headerStyle {OM.style.Text} The style for the tooltip headers
   * contentStyle {OM.style.Text} The style for the tooltip content
   */
  setTooltipStyle(options: any): void;

  /**
   * set the UTFGrid enabled layers' trigger type.
   * @param triggerType An OM.event.MouseEvent.MOUSE_CLICK, or MOUSE_OVER type. Default is OM.event.MouseEvent.MOUSE_CLICK
   */
  setUTFGridMouseEType(triggerType: any): void;

  /**
   * Show the existing Overview map
   */
  showOverviewMap(): void;

  /**
   * Zoom in by one level, i.e. current zoom level + 1
   */
  zoomIn(): void;

  /**
   * Zoom out by one level, i.e. current zoom level - 1
   */
  zoomOut(): void;

  /**
   * Zoom to the level required to display the expected rectangular area or bounds of the map.
   * The bounds will be fully contained in the current map extent, so area outside the defined rectangle may also
   * be displayed depending on the predefined zoom levels.
   * @param p A Rectangle defining the expected bounds of the displayed map.
   */
  zoomToExtent(p: Rectangle): void;


  getListeners(type: string): any[];

  deleteListeners(type: string): void;

  setZoomLevelRange(minZoom: number, maxZoom: number): void;
}
