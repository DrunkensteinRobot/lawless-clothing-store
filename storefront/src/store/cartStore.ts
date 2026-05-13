import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // usually slug + size + color
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const createCartState: StateCreator<CartState> = (set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item: CartItem) => {
    set((state: CartState) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, item], isOpen: true };
    });
  },

  removeItem: (id: string) => {
    set((state: CartState) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },

  updateQuantity: (id: string, quantity: number) => {
    set((state: CartState) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },

  toggleCart: () => set((state: CartState) => ({ isOpen: !state.isOpen })),

  clearCart: () => set({ items: [] }),

  getCartTotal: () => {
    return get().items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
  },
});

const isBrowser = typeof window !== 'undefined';

export const useCartStore = isBrowser
  ? create<CartState>()(
      persist(createCartState, {
        name: 'lawless-cart-storage',
        partialize: (state) => ({ items: state.items }),
      })
    )
  : create<CartState>()(createCartState);
