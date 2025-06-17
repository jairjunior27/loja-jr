import { prisma } from "@/lib/prisma";

export const pegarDadosBanco = async () => {
  return await prisma.produto.findMany();
};
