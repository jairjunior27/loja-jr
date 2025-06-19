"use client";
import { useEffect, useState } from "react";
import { CartProduto } from "./cartProduto";
import { useCart } from "@/store/cart";
import { FormatDecimal } from "@/lib/utils";
import { useProduto } from "@/store/produto";
import { Button } from "../ui/button";
import { useToken } from "@/store/auth";

export const CartList = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [frete, setFrete] = useState(10);
  const { items } = useCart();
  const { produtos } = useProduto();

  const updateSubtotal = () => {
    let sub = 0;
    for (let item of items) {
      const prod = produtos.find((i) => i.id === item.produtoId);
      if (prod) sub += item.quantidade * parseFloat(prod.preco.toString());
    }
    setSubTotal(sub);
  };

  useEffect(updateSubtotal, [items]);

  return (
    <>
      <div className="max-h-[400px] p-2  overflow-hidden overflow-y-auto border-y-2 ">
        {items.map((item) => (
          <CartProduto dados={item} key={item.produtoId} />
        ))}
      </div>
      <div className="flex font-bold justify-end my-4">
        Total de Produtos:{" "}
        {items.length < 10 ? `0${items.length}` : items.length}
      </div>
      <div className="mb-8">
        <h2 className="font-semibold text-gray-700">
          Sub-total: {FormatDecimal(subTotal)}
        </h2>
        <p className="font-semibold text-gray-700">
          Frete: {FormatDecimal(frete)}
        </p>
        <p className="flex justify-end font-bold">
          Total: {FormatDecimal(subTotal + frete)}
        </p>
      </div>
      <Button>Finalizar Compra</Button>
    </>
  );
};
