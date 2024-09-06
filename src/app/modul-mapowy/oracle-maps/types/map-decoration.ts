export interface MapDecoration {

  new(content: string, options: any): MapDecoration;

  content: string;
  options: any;

  setAnchorPosition(numer: number): void;

  setPosition(offsetX: number, offsetY: number): void;

  setVisible(isVisible: boolean): void;

  // TODO opisać metody
}
