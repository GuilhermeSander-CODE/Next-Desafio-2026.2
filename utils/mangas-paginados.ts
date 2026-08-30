import { prisma } from "@/src/lib/prisma";
import { Manga } from "@/components/card-manga";
import { Genero, Demografia, Prisma } from "../generated/prisma/client";

export type FiltroProdutos = {
    q?: string;
    genero?: Genero;
    demografia?: Demografia;
    minPreco?: number;
    maxPreco?: number;
    pagina?: number;
    limite?: number;
}

type RespostaPaginada = {
    mangas: Manga[];
    totalPaginas: number;
    paginaAtual: number;
}

export async function getProdutosPaginados(filtros: FiltroProdutos = {}): Promise<RespostaPaginada> {
    try{
        const{
            q,
            genero,
            demografia,
            minPreco,
            maxPreco,
            pagina = 1,
            limite = 15,
        } = filtros;

        const skip = (pagina - 1) * limite;

        const where: Prisma.ProdutoWhereInput = {};

        if(q){
            where.OR = [
                {titulo: {contains: q, mode: 'insensitive'}},
                {descricao: {contains: q, mode: 'insensitive'}},
            ];
        }

        if(genero) where.genero = genero;
        if(demografia) where.demografia = demografia;  

        if(minPreco !== undefined || maxPreco !== undefined) {
            where.preco = {};
            if(minPreco !== undefined) where.preco.gte = minPreco;
            if(maxPreco !== undefined) where.preco.lte = maxPreco;
        }

        const [produtos, totalProdutos] = await Promise.all([
            prisma.produto.findMany({
                where,
                take: limite,
                skip: skip,
                orderBy: { titulo: "asc"}
            }),
            prisma.produto.count({where}),
        ]);

        const mangas = produtos.map((p) => ({
            id: p.id,
            titulo: p.titulo,
            descricao: p.descricao,
            preco: Number(p.preco),
            imagem: p.imagem,
            genero: p.genero,
            demografia: p.demografia,
        }));

        return{
            mangas,
            totalPaginas: Math.ceil(totalProdutos/limite) || 1,
            paginaAtual: pagina,
        };
    }
    catch (error){
        console.error("Erro ao buscar produtos com filtros:", error);
        return{mangas:[], totalPaginas: 1, paginaAtual: 1};
    }
}

