import { CartItem } from "@/type/cartItem";
import { create } from "zustand";

type Store = {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
};

export const useCart = create<Store>((set) => ({
  open: false,
  setOpen: (open) => set((state) => ({ ...state, open })),
  items: [],
  addItem: (item) =>
    set((state) => {
      let cloneDados = [...state.items];
      let existeItem = state.items.find((i) => i.produtoId === item.produtoId);

      if (existeItem) {
        for (let key in cloneDados) {
          if (cloneDados[key].produtoId === item.produtoId) {
            cloneDados[key].quantidade += item.quantidade;
          }
        }
      } else {
        cloneDados.push(item);
      }
      return { ...state, items: cloneDados };
    }),

  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((it) => it.produtoId !== itemId),
    })),
}));
