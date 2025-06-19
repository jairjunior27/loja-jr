import { cookies } from "next/headers";
import { AreaCarrinhoButtom } from "../home/areaCarinhoButtom";
import { InputSearch } from "../ui/inputSearch";

export const Header = async () => {
  const cookiesStore = await cookies()
  const token = cookiesStore.get("token")
  return (
    <header className="bg-sky-400 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between ">
      <h1 className=" text-2xl md:text-3xl text-gray-200 font-bold">
        Loja-Jota
      </h1>
        <InputSearch />
  
      <AreaCarrinhoButtom initialState={token ? true : false} />
    </header>
  );
};
