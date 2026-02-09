export type Role = 'admin' | 'seller' | 'customer';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  country: string;
  status: UserStatus;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  date: string;
  items: OrderItem[];
}

export type CommissionStatus = 'pending' | 'paid';

export interface Commission {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  status: CommissionStatus;
  date: string;
}
