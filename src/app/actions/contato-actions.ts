'use server'

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function enviarContatoAction (formData: FormData){
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const assunto = formData.get("assunto") as string;
    const mensagem = formData.get("mensagem") as string;

    if(!nome || !email || !assunto || !mensagem){
        return{sucesso: false, mensagem: "Preencha todos os campos obrigatorios."};
    }

    try{
        await resend.emails.send({
            from: 'Paraíso do Mangá <onboarding@resend.dev>',
            to: 'guilherme.sander@codejr.com.br', 
            subject: `[Contato - Paraíso do Mangá] ${assunto}`,
            replyTo: email,
            html: `
                <h2>Nova mensagem de contato recebida</h2>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Assunto:</strong> ${assunto}</p>
                <p><strong>Mensagem:</strong></p>
                <blockquote style="background: #f4f4f4; padding: 12px; border-left: 4px solid #3b82f6; border-radius: 4px;">
                    ${mensagem}
                </blockquote>
            `,
        });
        
        return { sucesso: true, mensagem: "Mensagem enviada com sucesso!" };
    } 
    catch (error) {
        console.error("Erro ao enviar e-mail via Resend:", error);
        return { sucesso: false, mensagem: "Erro ao enviar a mensagem. Tente novamente." };
    }
}

