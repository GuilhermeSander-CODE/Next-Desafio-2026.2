'use server'

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { Genero, Demografia } from "@/generated/prisma/client";

//Delete

export async function deletarManga(id: string) {
    try {
        await prisma.produto.delete({
            where: { id },
        });

        revalidatePath("/admin"); 

        return { sucesso: true };
    } 
    catch (error) {
        console.error("Erro ao deletar produto:", error);
        return { sucesso: false, erro: "Não foi possível excluir o produto." };
    }
}

//Create

export async function criarManga(formData: FormData) {
    try {
        const titulo = formData.get("titulo") as string;
        const autor = formData.get("autor") as string;
        const descricao = formData.get("descricao") as string;
        const imagem = formData.get("imagem") as string;
        const genero = formData.get("genero") as Genero;
        const demografia = formData.get("demografia") as Demografia;
        const ano = Number(formData.get("ano"));
        const volume = Number(formData.get("volume"));
        const estoque = Number(formData.get("estoque"));
        const preco = parseFloat(formData.get("preco") as string);

        if (!titulo || isNaN(preco) || !autor || isNaN(ano)) {
            return { 
                sucesso: false, 
                erro: "Preencha os campos obrigatórios." 
            };
        }

        await prisma.produto.create({
            data: {
                titulo,
                descricao,
                preco,
                genero,
                demografia,
                autor,
                ano,
                volume,
                estoque,
                imagem: imagem || "/Capa-default-1.png",
            },
        });

        revalidatePath("/admin");
        return { sucesso: true };
    } 
    catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        return { sucesso: false, erro: "Erro ao cadastrar novo produto." };
    }
}

//update

export async function editarManga(id: string, formData: FormData) {
    try {
        const titulo = formData.get("titulo") as string;
        const descricao = formData.get("descricao") as string;
        const preco = parseFloat(formData.get("preco") as string);
        const genero = formData.get("genero") as Genero;
        const demografia = formData.get("demografia") as Demografia;
        const imagem = formData.get("imagem") as string;
        const autor = formData.get("autor") as string;
        const anoStr = formData.get("ano") as string;
        const estoque = Number(formData.get("estoque"));
        const volume = Number(formData.get("volume"));

        if (!id) {
            return { sucesso: false, erro: "ID do produto não informado." };
        }

        await prisma.produto.update({
            where: { id },
            data: {
                titulo,
                descricao,
                preco,
                genero,
                demografia,
                volume,
                estoque,
                ...(autor && { autor }),
                ...(anoStr && !isNaN(parseInt(anoStr, 10)) && { ano: parseInt(anoStr, 10) }),
                ...(imagem && { imagem }),
            },
        });

        revalidatePath("/admin");
        return { sucesso: true };
    } 
    catch (error) {
        console.error("Erro ao editar produto:", error);
        return { sucesso: false, erro: "Erro ao atualizar informações do produto." };
    }
}

