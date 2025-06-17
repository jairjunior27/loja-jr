import { Produto } from "@/generated/prisma";
import { FormatDecimal } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCart } from "@/store/cart";

type prop = {
  dados: Produto;
};
export const DadosItem = ({ dados }: prop) => {
  const cart = useCart()

  const handleAddItem = () => {
    cart.addItem({
      produtoId: dados.id,
      quantidade: 1
    })

  };
  return (
    <div className="flex flex-col items-center mb-6">
      <Image src={dados.imagem} alt={dados.imagem} width={70} height={70} />

      <div className="flex flex-col items-center text-xs lg:text-sm ">
        <h2 className="text-gray-600 font-bold text-xl my-1 ">{dados.name}</h2>
        <p>{FormatDecimal(dados.preco)}</p>
        <p className="line-clamp-2 w-[200px] text-center xl:w-[300px]  ">
          {dados.descricao}
        </p>
      </div>
      <Button className="mt-4 text-xs cursor-pointer" onClick={handleAddItem}>
        Adcionar Carrinho
      </Button>
    </div>
  );
};
