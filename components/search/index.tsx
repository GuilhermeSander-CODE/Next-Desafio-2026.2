"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [q, setQ] = useState(searchParams.get("q") || "");
    const [genero, setGenero] = useState(searchParams.get("genero") || "");
    const [demografia, setDemografia] = useState(searchParams.get("demografia") || "");
    const [minPreco, setMinPreco] = useState(searchParams.get("minPreco") || "");
    const [maxPreco, setMaxPreco] = useState(searchParams.get("maxPreco") || "");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Aplica os filtros atualizando a URL
    const aplicarFiltros = () => {
        const params = new URLSearchParams();

        if (q) params.set("q", q);
        if (genero) params.set("genero", genero);
        if (demografia) params.set("demografia", demografia);
        if (minPreco) params.set("minPreco", minPreco);
        if (maxPreco) params.set("maxPreco", maxPreco);
        params.set("page", "1");

        router.push(`/produtos?${params.toString()}`);
        setIsModalOpen(false);
    };

    // Limpa os filtros atualizando a URL
    const limparFiltros = () => {
        setQ("");
        setGenero("");
        setDemografia("");
        setMinPreco("");
        setMaxPreco("");

        router.push("/produtos");
        setIsModalOpen(false);
    };

    return (
        <div className="w-full mb-8">
            <div className=" flex gap-3 items-center p-3 mx-auto">

                <form 
                    onSubmit = {
                        (e) => {
                            e.preventDefault();
                            aplicarFiltros();
                        }
                    }

                    className="relative flex-1" autoComplete="off"
                >
                    <input 
                        type="text" 
                        placeholder="Buscar por titulo ou sinopse..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-quiet-gray focus:outline-none 
                        focus:ring-2 bg-whisper-white text-black"
                    />
                    <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-moon-gray"/>
                </form>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-whisper-white text-black px-4 py-2.5 
                    rounded-xl hover:bg-gray-300 transition-colors"
                >
                    <SlidersHorizontal  className="w-4 h-4"/>
                    <span className="hidden sm:inline">Filtros</span>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white text-black rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-black"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold mb-4">Filtrar Mangás</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Gênero</label>
                                <select
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    className="w-full p-2 border rounded-lg bg-gray-50"
                                >
                                    <option value="">Todos os Gêneros</option>
                                    <option value="ACAO">Ação</option>
                                    <option value="AVENTURA">Aventura</option>
                                    <option value="COMEDIA">Comédia</option>
                                    <option value="DRAMA">Drama</option>
                                    <option value="FANTASIA">Fantasia</option>
                                    <option value="FICCAO_CIENTIFICA">Ficção Científica</option>
                                    <option value="ROMANCE">Romance</option>
                                    <option value="SUSPENSE">Suspense</option>
                                    <option value="TERROR">Terror</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Demografia</label>
                                <select
                                    value={demografia}
                                    onChange={(e) => setDemografia(e.target.value)}
                                    className="w-full p-2 border rounded-lg bg-gray-50"
                                >
                                    <option value="">Todas as Demografias</option>
                                    <option value="SHONEN">Shonen</option>
                                    <option value="SEINEN">Seinen</option>
                                    <option value="SHOJO">Shojo</option>
                                    <option value="JOSEI">Josei</option>
                                    <option value="KODOMO">Kodomo</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Faixa de Preço (R$)</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="Min"
                                        value={minPreco}
                                        onChange={(e) => setMinPreco(e.target.value)}
                                        className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                                    />

                                    <span>até</span>

                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="Máx"
                                        value={maxPreco}
                                        onChange={(e) => setMaxPreco(e.target.value)}
                                        className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={limparFiltros}
                                className="w-full py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100"
                            >
                                Limpar
                            </button>
                            <button
                                onClick={aplicarFiltros}
                                className="w-full py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
