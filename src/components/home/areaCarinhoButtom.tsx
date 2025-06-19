"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/store/cart";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useToken } from "@/store/auth";

type prop = {
  initialState: boolean;
};
export const AreaCarrinhoButtom = ({ initialState }: prop) => {
  const [authState, setAuthState] = useState<boolean>(initialState);

  const { items, setOpen } = useCart();
  const auth = useToken();
  useEffect(() => {
    setAuthState(auth.token ? true : false);
  }, [auth]);

  const valorItem = items.length;
  const handleOpen = () => {
    if (auth.token) {
      setOpen(true);
    }else{
      auth.setOpen(true)
    }
  };

  const handleLogout = () => {
    auth.setToken(null);
  };

  if (authState) {
    return (
      <>
        <div className="flex items-center justify-between  mt-2  w-full md:max-w-[250px]">
          <div className="flex items-center">
            <span className="flex  text-gray-200 bg-red-600 px-1 rounded-full text-xs">
              {valorItem > 0 ? valorItem : ""}
            </span>
            <ShoppingCart
              color="#c1c1c1"
              size={22}
              className="mx-1 cursor-pointer"
              onClick={handleOpen}
            />
          </div>
          <Link href="/pedidos">
            <Button className="mx-1">Meus Pedidos</Button>
          </Link>
          <Button onClick={handleLogout} className="mx-1">
            Sair
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex items-center justify-between  mt-2  w-full md:max-w-[200px]">
        <div className="flex items-center">
          <span className="flex  text-gray-200 bg-red-600 px-1 rounded-full text-xs">
            {valorItem > 0 ? valorItem : ""}
          </span>
          <ShoppingCart
            color="#c1c1c1"
            size={22}
            className="mx-1 cursor-pointer"
            onClick={handleOpen}
          />
        </div>
        <Button onClick={() => auth.setOpen(true)}>Login / Cadastro</Button>
      </div>
    );
  }
};
