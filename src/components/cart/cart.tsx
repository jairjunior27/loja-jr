"use client";
import { useCart } from "@/store/cart";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";
import { useEffect, useState } from "react";
import { CartEmpty } from "./cartEmpty";
import { CartList } from "./cartList";

export const Cart = () => {
  const cart = useCart();
  const [open, setOpen] = useState(cart.open);

  useEffect(() => setOpen(cart.open), [cart]);
  return (
    <Drawer direction="right" open={open} onOpenChange={(e) => cart.setOpen(e)}>
      <DrawerContent className="p-4 ">
        <DrawerTitle className="text-center text-2xl mb-8">
          Carrinho
        </DrawerTitle>
        {cart.items.length <= 0 && <CartEmpty />}
        {cart.items.length > 0 && <CartList />}

       
      </DrawerContent>
    </Drawer>
  );
};
