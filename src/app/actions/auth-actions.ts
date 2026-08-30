'use server'

import { prisma } from "@/src/lib/prisma";
import {cookies} from "next/headers";


export type RespostaAuth = {
    sucesso: boolean;
    mensagem?: string;
};

export async function realizarCadastroAction(formData: FormData): Promise<RespostaAuth> {
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;
    const confirmarSenha = formData.get("confirmarSenha") as string;

    if (!nome || !email || !senha || !confirmarSenha) {
        return { sucesso: false, mensagem: "Preencha todos os campos obrigatórios." };
    }

    if (senha !== confirmarSenha) {
        return { sucesso: false, mensagem: "As senhas não coincidem." };
    }

    try{
        const respostaAPI = await fetch("https://treinamentoapi.codejr.com.br/api/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nome,
                email: email,
                password: senha,
            }),
        })

        const bodyAPI = await respostaAPI.json();

        if (!respostaAPI.ok) {
            return {
                sucesso: false,
                mensagem: bodyAPI.errors?.email 
                    ? "Este e-mail já está cadastrado na API de Treinamento." 
                    : (bodyAPI.message || "Erro ao realizar o cadastro.")
            };
        }
        try{

            await prisma.administrador.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: senha,
                }
            });
        }
        catch(dbError){
            console.error("Erro ao gravar no banco Prisma:", dbError);
            return { 
                sucesso: true, 
                mensagem: "Cadastro realizado na API, mas houve uma falha ao salvar no banco local." 
            };
        }

        return { sucesso: true, mensagem: "Cadastro realizado e salvo no banco de dados com sucesso!" };
        
    }
    catch(error){
        console.error("Erro na Server Action de Cadastro:", error);
        return { sucesso: false, mensagem: "Falha interna ao processar o cadastro." };
    }
}

export async function realizarLoginAction(formData: FormData): Promise<RespostaAuth> {
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;

    if (!email || !senha) {
        return { sucesso: false, mensagem: "Informe o e-mail e a senha." };
    }

    try{
        const respostaAPI = await fetch("https://treinamentoapi.codejr.com.br/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: senha,
            }),
        });

        const bodyAPI = await respostaAPI.json();

        if (respostaAPI.ok) {
            const token = bodyAPI.token || bodyAPI.access_token;

            
            const cookieStore = await cookies();
            cookieStore.set("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, 
                path: "/",
            });

            return { sucesso: true, mensagem: "Login efetuado com sucesso!" };
        }

        return { sucesso: false, mensagem: bodyAPI.message || "E-mail ou senha incorretos." };
    }
    catch(error){
        console.error("Erro na Server Action de Login:", error);
        return { sucesso: false, mensagem: "Falha na conexão com o servidor." };
    }
}

export async function realizarLogoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
}