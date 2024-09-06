import {Layer} from './layer';

export interface DynamiTileLayer extends Layer{

  new(name: string, dtl_props: any, objMapReq: any): DynamiTileLayer;
}
