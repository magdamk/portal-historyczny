import {Filter} from './filter';

export interface Equals extends Filter{

  new(filterAttribute: string, filerValue: string): Equals;
}
