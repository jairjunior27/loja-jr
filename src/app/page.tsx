import { DadosList } from "@/components/home/dadosList";
import { Header } from "@/components/layout/header";
import { Produto } from "@/generated/prisma";
import { api } from "@/lib/axios";

type produtoApi = {
  dados: Produto[];
};
export default async function Page() {
  const dadosReq = await api.get<produtoApi>("/dadosprodutos");

  const dadosl = dadosReq.data.dados ?? [];

  return (
    <div className="">
      <Header />
      <main className="flex justify-center flex-col items-center p-8">
        <h2 className="text-xl md:text-2xl font-bold my-5">
          Aproveite as Promoções
        </h2>
        <DadosList dados={dadosl} />
      </main>
    </div>
  );
}
