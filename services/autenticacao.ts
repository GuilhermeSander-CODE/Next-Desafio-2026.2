export type DadosCadastro = {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
};

export type DadosLogin = {
    email: string;
    senha: string;
};

export type RespostaAuth = {
    sucesso: boolean;
    mensagem?: string;
    token?: string;
};


export async function realizarCadastro(dados: DadosCadastro): Promise<RespostaAuth> {
    const { nome, email, senha, confirmarSenha } = dados;

    
    if (!nome.trim() || !email.trim() || !senha.trim()) {
        return { sucesso: false, mensagem: "Preencha todos os campos obrigatórios." };
    }

    if (senha !== confirmarSenha) {
        return { sucesso: false, mensagem: "As senhas não coincidem." };
    }

    try {
        
        const resposta = await fetch("https://treinamentoapi.codejr.com.br/api/register", {
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
        });

        const body = await resposta.json();

        if (resposta.ok) {
            return { sucesso: true, mensagem: "Cadastro realizado com sucesso!" };
        }

        
        if (body.errors?.email) {
            return { sucesso: false, mensagem: "Este e-mail já está cadastrado no sistema." };
        }

        return { sucesso: false, mensagem: body.message || "Erro ao realizar o cadastro." };
    } catch (error) {
        console.error("Erro na requisição de cadastro:", error);
        return { sucesso: false, mensagem: "Falha de conexão com o servidor." };
    }
}

// 🔹 Utilitário de Login
export async function realizarLogin(dados: DadosLogin): Promise<RespostaAuth> {
    const { email, senha } = dados;

    if (!email.trim() || !senha.trim()) {
        return { sucesso: false, mensagem: "Informe o e-mail e a senha." };
    }

    try {
        const resposta = await fetch("https://treinamentoapi.codejr.com.br/api/login", {
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

        const body = await resposta.json();

        if (resposta.ok) {
            return { 
                sucesso: true, 
                token: body.token || body.access_token,
                mensagem: "Login realizado com sucesso!" 
            };
        }

        return { sucesso: false, mensagem: body.message || "E-mail ou senha incorretos." };
    } catch (error) {
        console.error("Erro na requisição de login:", error);
        return { sucesso: false, mensagem: "Falha de conexão com o servidor." };
    }
}