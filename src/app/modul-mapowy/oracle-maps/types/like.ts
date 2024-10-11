import {Filter} from './filter';

export interface Like extends Filter{

  new(filterAttribute: string, filerValue: string): Like;
}
