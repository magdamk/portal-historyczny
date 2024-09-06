import {Map} from './map';
import {Geometry} from './geometry';

export interface Tool {

  new(map: Map): Tool;

  getStatus(): number;

  getGeometry(): Geometry;

  start(): void;

  addListener(eventType: string, f: (a: any) => void, context?: any): void;
}
