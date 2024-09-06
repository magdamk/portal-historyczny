import {Geometry} from "./geometry";

export interface Circle extends Geometry {

  new(centerX: number, centerY: number, radius: number, srid: number): Circle;

  centerX: number;
  centerY: number;
  radius: number;
  srid: number;

  getArea(): number;
}
