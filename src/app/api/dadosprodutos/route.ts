import { pegarDadosBanco } from "@/service/produto";
import { NextResponse } from "next/server";

export async function GET() {
  let dados = await pegarDadosBanco();
  dados = dados.map((item) => ({
    ...item,
    imagem: `${process.env.NEXT_PUBLIC_URL}/images/${item.imagem}`,
  }));
  return NextResponse.json({ dados});
}
