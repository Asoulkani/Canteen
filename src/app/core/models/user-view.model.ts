import {Order} from './order.model';

export interface UserView {
  name: string;
  email: string;
  orders: Order[]
}
