import { Role, UserStatus, OrderStatus, CommissionStatus } from '../types';

export const roleMap: Record<Role, string> = {
  admin: 'Administrador',
  seller: 'Vendedor',
  customer: 'Cliente',
};

export const userStatusMap: Record<UserStatus, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
};

export const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  processing: 'Em processamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

export const commissionStatusMap: Record<CommissionStatus, string> = {
  pending: 'Pendente',
  paid: 'Pago',
};

export const tRole = (r: Role) => roleMap[r] ?? r;
export const tUserStatus = (s: UserStatus) => userStatusMap[s] ?? s;
export const tOrderStatus = (s: OrderStatus) => orderStatusMap[s] ?? s;
export const tCommissionStatus = (s: CommissionStatus) => commissionStatusMap[s] ?? s;
