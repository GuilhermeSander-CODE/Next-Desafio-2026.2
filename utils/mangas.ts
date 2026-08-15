import { prisma } from "@/utils/prisma";
import { Manga } from "@/components/card-manga";

export async function getMaisVendidos(): Promise<Manga[]> {
  try {
    const produtos = await prisma.produto.findMany({
      take: 10, 
      orderBy: {
        estoque: 'desc',
      },
    });

    // Converter o Decimal do Prisma para Number
    return produtos.map((p) => ({
      id: p.id,
      titulo: p.titulo,
      descricao: p.descricao,
      preco: Number(p.preco),
      imagem: p.imagem,
      genero: p.genero,
      demografia: p.demografia,
    }));
  } catch (error) {
    console.error("Erro ao buscar os mangás do banco:", error);
    return [];
  }
}