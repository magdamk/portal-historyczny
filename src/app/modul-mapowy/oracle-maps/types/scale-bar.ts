/**
 * This class defines the ScaleBar
 */
export interface ScaleBar {
  /**
   * An object, or literal, specifying the scale bar. It can contain the following attributes.
   */
  options: any;

  new(options: any): ScaleBar;

  setFormat(format: string): void;

  setDraggable(draggable: boolean): void;

  setStyle(contentStyle: any): void;

  setVisible(visible: boolean): void;

  setPosition(offsetX: number, offsetY: number): void;

  /**
   * Funkcja ustawia pozycje paska skali
   * @param int - 1 -> upper left, 2 -> upper center, 3 -> upper right, 4 -> lower left, 5 -> lower center, 6 -> lower right
   */
  setAnchorPosition(int: number): void;

  // TODO opisać metody
}
