import {Dishes} from './dishes.model';

export interface Order {
  dishes: Dishes;
  amount: number
}
