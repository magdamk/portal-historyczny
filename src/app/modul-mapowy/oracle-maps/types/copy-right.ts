import { MapDecoration } from "./map-decoration";

export interface CopyRight extends MapDecoration {
  options: any;

  new(options: any): CopyRight;

  isVisible(): boolean;

  setDraggable(draggable: boolean): void;

  setSize(width: number, height: number): void;

  setStyle(contentStyle: any): void;

  setVisible(visible: boolean): void;

  setPosition(offsetX: number, offsetY: number): void;

  /**
   * Funkcja ustawia pozycje paska skali
   * @param int - 1 -> upper left, 2 -> upper center, 3 -> upper right, 4 -> lower left, 5 -> lower center, 6 -> lower right
   */
  setAnchorPosition(int: number): void;
};
