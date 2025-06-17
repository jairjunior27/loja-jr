"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/store/cart";

export const AreaCarrinhoButtom = () => {
  const { items,setOpen } = useCart();
  const valorItem = items.length;
  const handleOpen = () => {
    setOpen(true)
  };
  return (
    <div className="flex items-center justify-between  mt-2  w-full md:max-w-[200px]">
      <div className="flex items-center">
        <span className="flex  text-gray-200 bg-red-600 px-1 rounded-full text-xs">{valorItem > 0 ? valorItem  : ""}</span>
        <ShoppingCart
          color="#c1c1c1"
          size={22}
          className="mx-1 cursor-pointer"
          onClick={handleOpen}
        />
      </div>
      <Button >Login / Cadastro</Button>
    </div>
  );
};
