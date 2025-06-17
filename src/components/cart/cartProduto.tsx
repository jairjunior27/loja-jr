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
      <div className="flex items-center justify-between  w-full">
        <Image src={prod?.imagem} alt={prod?.name} width={40} height={40} />
        <div className="flex text-sm truncate">
          <h2 className="mx-2 font-bold text-gray-500 truncate">{prod.name}</h2>
          <p className="text-sm font-semibold">{FormatDecimal(prod.preco)}</p>
        </div>
      </div>
      <div className="text-xs mt-2 text-center  w-full">
        <Button className="mr-1" onClick={handleMinus}>
          -
        </Button>
        {qtd}
        <Button className="ml-1" onClick={handlePlus}>
          +
        </Button>
      </div>
    </div>
  );
};
