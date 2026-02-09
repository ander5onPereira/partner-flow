import usersData from '../data/users.json';
import ordersData from '../data/orders.json';
import commissionsData from '../data/commissions.json';
import { User, Order, Commission } from '../types';

type Delay = number;

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const simulate = <T>(data: T, delayRange: [number, number] = [500, 1500]): Promise<T> => {
  const delay: Delay = rand(delayRange[0], delayRange[1]);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Erro ao carregar dados (simulado)'));
        return;
      }
      resolve(JSON.parse(JSON.stringify(data)));
    }, delay);
  });
};

// In-memory mutable copies for session persistence
let users: User[] = usersData as User[];
let orders: Order[] = ordersData as Order[];
let commissions: Commission[] = commissionsData as Commission[];

export const getUsers = async (): Promise<User[]> => simulate(users);
export const getUserById = async (id: string): Promise<User | undefined> => simulate(users.find(u => u.id === id));
export const updateUser = async (id: string, data: Partial<User>): Promise<User | undefined> => {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return simulate(undefined);
  users[idx] = { ...users[idx], ...data };
  return simulate(users[idx]);
}

export const getOrders = async (): Promise<Order[]> => simulate(orders);
export const getOrderById = async (id: string): Promise<Order | undefined> => simulate(orders.find(o => o.id === id));
export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order | undefined> => {
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return simulate(undefined);
  orders[idx] = { ...orders[idx], ...data };
  return simulate(orders[idx]);
}

export const getCommissions = async (): Promise<Commission[]> => simulate(commissions);

export const resetData = () => {
  users = JSON.parse(JSON.stringify(usersData));
  orders = JSON.parse(JSON.stringify(ordersData));
  commissions = JSON.parse(JSON.stringify(commissionsData));
}
