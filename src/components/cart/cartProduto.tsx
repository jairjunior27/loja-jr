import { FormatDecimal } from "@/lib/utils";
import { useProduto } from "@/store/produto";
import { CartItem } from "@/type/cartItem";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { useCart } from "@/store/cart";

type prop = {
  dados: CartItem;
};

export const CartProduto = ({ dados }: prop) => {
  const { produtos } = useProduto();
  const { removeItem, addItem } = useCart();

  const [qtd, setQtd] = useState(dados.quantidade);
  const prod = produtos.find((i) => i.id === dados.produtoId);
  if (!prod) return null;

  const handleMinus = () => {
    if (qtd - 1 <= 0) {
      removeItem(dados.produtoId);
    } else {
      addItem({ produtoId: dados.produtoId, quantidade: -1 });
      setQtd(qtd - 1);
    }
  };

  const handlePlus = () => {
    addItem({ produtoId: dados.produtoId, quantidade: +1 });

    setQtd(qtd + 1);
  };
  return (
    <div className="flex flex-col items-center justify-center mb-4  ">
      <div className="flex items-center w-full">
        <div className="w-[40px] sm:w-[60px]">
          <Image src={prod?.imagem} alt={prod?.name} width="100" height="100" />
        </div>
        <h2 className="mx-2 font-bold text-gray-500 truncate  text-sm">
          {prod.name}
        </h2>
        <p className="text-sm font-semibold">{FormatDecimal(prod.preco)}</p>
      </div>

      <div className="text-xs mt-1">
        <Button
          className="px-1 py-0.5 text-xs h-6 w-6 mr-1 "
          onClick={handleMinus}
        >
          -
        </Button>
        {qtd}
        <Button
          className="px-1 py-0.5 text-xs h-6 w-6 ml-1"
          onClick={handlePlus}
        >
          +
        </Button>
      </div>
    </div>
  );
};
