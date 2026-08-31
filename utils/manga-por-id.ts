import { Demografia, Genero } from "@/src/types/enum";
import {prisma} from "@/src/lib/prisma"

export type MangaCompleto = {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  volume: number;
  autor: string;
  ano: number;
  imagem: string;
  estoque: number;
  genero: Genero;
  demografia: Demografia;
  createdAt: Date;
  updatedAt: Date;
};

export async function getMangaPorID (id: string): Promise<MangaCompleto | null>{
    try{
        const produto = await prisma.produto.findUnique(
            {where: {id}}
        );

        if(!produto) return null;

        return{
            ...produto,
            preco: Number(produto.preco),
            genero: produto.genero as unknown as Genero,
            demografia: produto.demografia as unknown as Demografia,
        };
    }
    catch(error){
        console.error(`Erro ao buscar o produto com ID ${id}:`, error);
        return null;
    }
}