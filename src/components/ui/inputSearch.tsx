"use client";
import { useProduto } from "@/store/produto";
import { Search } from "lucide-react";

export const InputSearch = () => {

  const {busca,setBusca} = useProduto()
  const handleBusca = () => {
   
  };
  return (
    <div className="flex  items-center justify-between bg-white w-full md:max-w-[300px] rounded my-2 py-1 px-2">
      <input
        className="w-full outline-0 px-2 "
        type="search"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <Search className="mx-2 cursor-pointer" size={22} onClick={handleBusca} />
    </div>
  );
};
