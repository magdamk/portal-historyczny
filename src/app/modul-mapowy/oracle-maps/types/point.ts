import {Geometry} from "./geometry";

export interface Point extends Geometry{

  new(x: number, y: number, srid: number): Point;

  x: number;
  y: number;
  srid: number;

  getX(): number;

  getY(): number;

  getSRID(): number;

  transform(toSrid: number, callBack: (event: any) => void, mcsURL?: string, dataSource?: string, optObj?: any): any | undefined;

  // TODO opisać metody
}
