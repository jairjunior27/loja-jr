import { Categoria, PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();
async function main() {
  const dadosProdutos = [
    {
      id: 1,
      name: "Calabresa com Cebola",
      imagem: "calabresa.png",
      preco: 42.9,
      descricao: "Pepperoni, mussarela, molho de tomate",
      categoria: "Pizza",
    },
    {
      id: 2,
      name: "Açai 200ml",
      imagem: "acai200.png",
      preco: 10,
      descricao: "Açai com banana",
      categoria: "Acai",
    },
    {
      id: 3,
      name: "Açai 300ml",
      imagem: "acai300.png",
      preco: 14,
      descricao: "Açai com chocolate",
      categoria: "Acai",
    },
    {
      id: 4,
      name: "Açai 700ml",
      imagem: "acai700.png",
      preco: 22,
      descricao: "Açai com amêndoas",
      categoria: "Acai",
    },
    {
      id: 5,
      name: "Açai 1lt",
      imagem: "acai1lt.png",
      preco: 40,
      descricao: "Açai com leite e castanha",
      categoria: "Acai",
    },
    {
      id: 6,
      name: "Salada de Frutas",
      imagem: "saladaFrutas.png",
      preco: 12,
      descricao: "Manga , Morango, uva, banana, maçã, melância, abacaxi e etc",
      categoria: "Acai",
    },
    {
      id: 7,
      name: "Portuguesa",
      imagem: "portuguesa.png",
      preco: 45.0,
      descricao: "Presunto, ovo, cebola, azeitona, mussarela, molho de tomate",
      categoria: "Pizza",
    },
    {
      id: 8,
      name: "Vegetariana",
      imagem: "vegetariana.png",
      preco: 41.5,
      descricao:
        "Pimentão, cebola, tomate, champignon, milho, mussarela, molho de tomate",
      categoria: "Pizza",
    },
    {
      id: 9,
      name: "Quatro Queijo",
      imagem: "quatro-queijo.png",
      preco: 47.5,
      descricao: "Mussarela, parmesão, gorgonzola, molho de tomate ",
      categoria: "Pizza",
    },
    {
      id: 10,
      name: "Pepperoni",
      imagem: "peperroni.png",
      preco: 44.9,
      descricao: "Pepperoni, mussarela, molho de tomate ",
      categoria: "Pizza",
    },
    {
      id: 11,
      name: "Margherita",
      imagem: "margherita.png",
      preco: 44,
      descricao: "Mussarela , tomate, manjericão, molho ",
      categoria: "Pizza",
    },
  ];

  for (let item of dadosProdutos) {
    await prisma.produto.upsert({
      where: { id: item.id },
      update: {},
      create: {
        name: item.name,
        preco: item.preco,
        descricao: item.descricao,
        imagem: item.imagem,
        categoria: item.categoria as Categoria,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
