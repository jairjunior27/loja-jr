import { Produto } from "@/generated/prisma";
import { create } from "zustand";

type Store = {
  produtos: Produto[];
  setProdutos: (state: Produto[]) => void;
  busca: string;
  setBusca: (state: string) => void;
};

export const useProduto = create<Store>((set) => ({
  produtos: [],
  setProdutos: (state) => set({ produtos: state }),
  busca: "",
  setBusca: (state) => set({ busca: state }),
}));
