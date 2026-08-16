import { prisma } from "@/utils/prisma";
import { Manga } from "@/components/card-manga";

export async function getMangaDestaque(): Promise<Manga | null> {
    try {
        const total = await prisma.produto.count();
        if (total === 0) return null;

        // Sorteia um índice baseado no dia do ano
        const diaDoAno = Math.floor(
            (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
        );
        const skip = diaDoAno % total;

        const produto = await prisma.produto.findFirst({
            skip: skip,
        });

        if (!produto) return null;

        return {
            id: produto.id,
            titulo: produto.titulo,
            descricao: produto.descricao,
            preco: Number(produto.preco),
            imagem: produto.imagem,
        };
    } catch (error) {
        console.error("Erro ao buscar o mangá em destaque:", error);
        return null;
    }
}