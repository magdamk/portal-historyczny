import {Filter} from './filter';

export interface Or extends Filter{

  new(filter1: Filter, filer2: Filter): Or;
}
