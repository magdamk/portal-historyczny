import {Geometry} from "./geometry";
import {Filter} from "./filter";

export interface AnyInteract extends Filter {

  new(geom: Geometry): AnyInteract;
}
