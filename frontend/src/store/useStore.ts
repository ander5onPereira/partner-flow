import { create } from 'zustand';
import { User, Order, Commission } from '../types';
import * as api from '../services/api';

interface State {
  users: User[];
  orders: Order[];
  commissions: Commission[];
  loading: boolean;
  error?: string | null;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  fetchAll: () => Promise<void>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  updateOrder: (id: string, data: Partial<Order>) => Promise<void>;
}

export const useStore = create<State>((set) => ({
  users: [],
  orders: [],
  commissions: [],
  loading: false,
  error: null,
  // Don't read localStorage during initialization to keep SSR and hydration consistent.
  theme: 'light',
  setTheme: (t) => {
    try { if (typeof window !== 'undefined') localStorage.setItem('theme', t); } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', t === 'dark');
    }
    set({ theme: t });
  },
  toggleTheme: () => set((state) => {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    try { if (typeof window !== 'undefined') localStorage.setItem('theme', next); } catch {}
    if (typeof document !== 'undefined') document.documentElement.classList.toggle('dark', next === 'dark');
    return { theme: next } as Partial<State> as State;
  }),
  fetchAll: async () => {
    set({ loading: true, error: null });
    // Retry wrapper to handle transient/mock errors
    const fetchWithRetry = async <T>(fn: () => Promise<T>, attempts = 3, delayMs = 250): Promise<T> => {
      let lastErr: any;
      for (let i = 0; i < attempts; i++) {
        try {
          return await fn();
        } catch (err) {
          lastErr = err;
          // backoff
          await new Promise((r) => setTimeout(r, delayMs * (i + 1)));
        }
      }
      throw lastErr;
    };

    try {
      const [users, orders, commissions] = await Promise.all([
        fetchWithRetry(() => api.getUsers()),
        fetchWithRetry(() => api.getOrders()),
        fetchWithRetry(() => api.getCommissions()),
      ]);
      set({ users: users || [], orders: orders || [], commissions: commissions || [], loading: false });
    } catch (e: any) {
      set({ error: e.message || String(e), loading: false });
    }
  },
  updateUser: async (id, data) => {
    set({ loading: true });
    try {
      const u = await api.updateUser(id, data as any);
      set((s) => ({ users: s.users.map(x => x.id === id && u ? u : x), loading: false }));
    } catch (e: any) {
      set({ error: e.message || String(e), loading: false });
    }
  },
  updateOrder: async (id, data) => {
    set({ loading: true });
    try {
      const o = await api.updateOrder(id, data as any);
      set((s) => ({ orders: s.orders.map(x => x.id === id && o ? o : x), loading: false }));
    } catch (e: any) {
      set({ error: e.message || String(e), loading: false });
    }
  }
}));
