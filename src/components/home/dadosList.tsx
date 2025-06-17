"use client";
import { Produto } from "@/generated/prisma";
import { useProduto } from "@/store/produto";
import { DadosItem } from "./dadosItem";
import { useEffect } from "react";

type prop = {
  dados: Produto[];
};

export const DadosList = ({ dados }: prop) => {
  const { produtos, setProdutos ,busca} = useProduto();

  useEffect(() => setProdutos(dados), [dados,setProdutos]);

  const filtrados = produtos.filter((p) =>
    p.name.toLowerCase().includes(busca.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busca.toLowerCase())
  )

  if (!produtos) return null;
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2   md:grid-cols-3 xl:grid-cols-4 gap-10">
      {filtrados.map((item) => (
        <DadosItem dados={item} key={item.id} />
      ))}
    </div>
  );
};
