'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { realizarCadastro, realizarLogin } from "@/utils/autenticacao"; 

export default function PaginaAutenticacao() {
    const router = useRouter();

    const [modo, setModo] = useState<"login" | "cadastro">("login");
    const [carregando, setCarregando] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleCadastroSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setCarregando(true);

        const resultado = await realizarCadastro({
            nome,
            email,
            senha,
            confirmarSenha,
        });

        setCarregando(false);
        alert(resultado.mensagem);

        if (resultado.sucesso) {
            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");
            setModo("login");
        }
    };

    const handleLoginSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setCarregando(true);

        const resultado = await realizarLogin({ email, senha });

        setCarregando(false);

        if (resultado.sucesso) {
            router.push("/gerenciamento");
        } else {
            alert(resultado.mensagem);
        }
    };

    return (
        <main className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-[url('/Fundo-login.png')] bg-cover bg-center bg-no-repeat  z-0"
                aria-hidden="true"
            />

            <div className="absolute inset-0 bg-black/70 lg:bg-black/40 z-0" />

            <div className="relative z-10 w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
                
                
                <div className="w-full h-full md:rounded-br-2xl md:rounded-tr-2xl bg-black/95 lg:bg-black 
                    flex flex-col justify-between p-6 sm:p-10 lg:p-12 shadow-[inset_0_0_35px_rgba(139,92,246,0.40)] 
                    border-r border-electric-violet/40"
                >
    
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 
                            p-2.5 rounded-full transition-all hover:bg-white/20 w-fit"
                            title="Voltar para a Página Inicial"
                        >
                            <ArrowLeft className="w-5 h-5 text-white" />
                        </Link>
                    </div>

                    <div className="w-full max-w-md mx-auto my-auto py-8">
                        {modo === "login" ? (
                            <div className="flex flex-col gap-6">
                                <h1 className="text-3xl font-bold text-center text-white font-alkalami tracking-wide">
                                    Login
                                </h1>

                                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Digite seu email..."
                                            className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-electric-violet transition-all"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                                            Senha
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            placeholder="Digite sua senha..."
                                            className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-electric-violet transition-all"
                                        />
                                    </div>

                                    <p className="text-xs text-white/80">
                                        Não tem uma conta?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setModo("cadastro")}
                                            className="text-electric-violet font-bold hover:underline"
                                            >
                                            Cadastre-se
                                        </button>
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={carregando}
                                        className="w-full mt-4 bg-electric-violet hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                    >
                                        {carregando ? "Entrando..." : "Entrar"}
                                    </button>
                                </form>
                            </div>
                        ) 
                        : 
                        (
                            <div className="flex flex-col gap-6">
                                <h1 className="text-3xl font-bold text-center text-white font-alkalami tracking-wide">
                                    Cadastro
                                </h1>

                                <form onSubmit={handleCadastroSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            placeholder="Digite seu nome completo..."
                                            className="w-full px-4 py-2.5 rounded-xl bg-white text-black placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-electric-violet transition-all"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Digite seu email..."
                                            className="w-full px-4 py-2.5 rounded-xl bg-white text-black placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-electric-violet transition-all"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                                            Senha
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            placeholder="Digite sua senha..."
                                            className="w-full px-4 py-2.5 rounded-xl bg-white text-black placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-electric-violet transition-all"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                                            Confirmar Senha
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={confirmarSenha}
                                            onChange={(e) => setConfirmarSenha(e.target.value)}
                                            placeholder="Confirme sua senha..."
                                            className="w-full px-4 py-2.5 rounded-xl bg-white text-black placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-electric-violet transition-all"
                                        />
                                    </div>

                                    <p className="text-xs text-white/80 mt-1">
                                        Já tem uma conta?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setModo("login")}
                                            className="text-electric-violet font-bold hover:underline"
                                        >
                                            Voltar ao Login
                                        </button>
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={carregando}
                                        className="w-full mt-2 bg-electric-violet hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                    >
                                        {carregando ? "Cadastrando..." : "Cadastrar"}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden lg:block w-full h-full" />
            </div>
        </main>
    );
}