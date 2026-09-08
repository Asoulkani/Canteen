import {Order} from './order.model';

export interface UserReq {
  name: string;
  email: string;
  orders: Order[]
}
