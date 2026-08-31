'use client'

import { ChangeEvent, useState, useTransition } from "react";
import Image from "next/image";
import { Search, ImagePlus, Loader2, X } from "lucide-react";
import { buscarMangaJikan } from "@/services/jikan";
import { editarManga } from "@/src/app/actions/produto-actions"; 
import { ProdutoModal } from "./visualizar";
import { createPortal } from "react-dom";
import { Demografia, Genero } from "@/src/types/enum"; 

interface ModalEditarProps {
    produto: ProdutoModal | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalEditar({ produto, isOpen, onClose }: ModalEditarProps) {
    if (!isOpen || !produto || typeof window === "undefined") return null;

    return createPortal(
        <div className="fixed  inset-0 z-999 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <FormularioEditar key={produto.id} produto={produto} onClose={onClose} />
        </div>,
        document.body
    );
}

function FormularioEditar({ produto, onClose }: { produto: ProdutoModal; onClose: () => void }) {
    const [isPending, startTransition] = useTransition();
    const [buscandoMal, setBuscandoMal] = useState(false);
    
    
    const [termoBusca, setTermoBusca] = useState("");
    const [titulo, setTitulo] = useState(produto.titulo || "");
    const [autor, setAutor] = useState(produto.autor || "");
    const [ano, setAno] = useState<number | string>(produto.ano || "");
    const [descricao, setDescricao] = useState(produto.descricao || "");
    const [preco, setPreco] = useState(produto.preco ? String(produto.preco) : "");
    const [imagemNova, setImagemNova] = useState("");
    const [genero, setGenero] = useState(produto.genero || "ACAO");
    const [demografia, setDemografia] = useState(produto.demografia || "SHOUNEN");
    const [volume, setVolume] = useState <number | string>(produto.volume ?? 0);
    const [estoque, setEstoque] = useState<number | string>(produto.estoque ?? 0);

    const handleBuscarMAL = async () => {
        if (!termoBusca.trim()) return;
        setBuscandoMal(true);

        const dados = await buscarMangaJikan(termoBusca);
        setBuscandoMal(false);

        if (dados) {
            setTitulo(dados.titulo);
            setDescricao(dados.descricao);
            setImagemNova(dados.imagem);
            setAutor(dados.autor);
            setAno(dados.ano);
            setVolume(dados.volume)
            setGenero(dados.genero);
            setDemografia(dados.demografia);
        } else {
            alert("Mangá não encontrado no MyAnimeList.");
        }
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (imagemNova) formData.set("imagem", imagemNova);

        startTransition(async () => {
            const res = await editarManga(produto.id, formData);
            if (res.sucesso) {
                onClose();
            } else {
                alert(res.erro || "Erro ao editar mangá");
            }
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagemNova(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative w-full max-w-xl bg-titanium-white rounded-3xl p-6 shadow-2xl border border-gray-300 max-h-[90vh] overflow-y-auto scrollbar-thumb-electric-violet">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
            </button>

            <h2 className="text-center font-bold text-gray-800 mb-4 text-base">
                Editar Manga
            </h2>

            <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleBuscarMAL())}
                        placeholder="Digite o nome ou id do manga..."
                        className="w-full bg-[#d0d0d0] text-xs font-medium text-gray-800 placeholder-gray-500 rounded-full pl-9 pr-4 py-2 outline-none focus:ring-1 focus:ring-black"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleBuscarMAL}
                    disabled={buscandoMal}
                    className="bg-[#c0c0c0] hover:bg-[#b0b0b0] text-xs font-semibold px-4 py-2 rounded-full border border-gray-400 text-gray-800 transition-colors flex items-center gap-1"
                >
                    {buscandoMal ? <Loader2 className="w-3 h-3 animate-spin" /> : "Buscar"}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-4 my-2">
                    <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Capa Atual</label>
                        <div className="relative w-full h-44 bg-white rounded-2xl border border-gray-300 overflow-hidden">
                            <Image
                                src={produto.imagem || "/Capa-default-1.png"}
                                alt="Capa Atual"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                            Capa Nova (Clique para alterar)
                        </label>
                       <label className="relative w-full h-44 bg-white rounded-2xl border border-dashed border-gray-400 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors">
                            {imagemNova ? 
                                (
                                    <Image 
                                        src={imagemNova} 
                                        alt="Capa Nova" 
                                        fill 
                                        className="object-cover" 
                                        unoptimized 
                                    />
                                ) 
                                : 
                                (
                                    <div className="flex flex-col items-center text-gray-500">
                                        <ImagePlus className="w-8 h-8 stroke-1 mb-1" />
                                        <span className="text-[10px] font-semibold">Selecione uma imagem</span>
                                    </div>
                                )
                            }
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                className="hidden" 
                            />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Gênero</label>
                        <select
                            name="genero"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value as Genero)}
                            className="w-full bg-[#d0d0d0] text-xs p-2.5 rounded-lg outline-none font-medium text-black cursor-pointer"
                        >
                            {Object.values(Genero).map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Demografia</label>
                        <select
                            name="demografia"
                            value={demografia}
                            onChange={(e) => setDemografia(e.target.value as Demografia)}
                            className="w-full bg-[#d0d0d0] text-xs p-2.5 rounded-lg outline-none font-medium text-black cursor-pointer"
                        >
                            {Object.values(Demografia).map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Título</label>
                    <input name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="w-full bg-[#d0d0d0] text-xs p-2.5 rounded-lg outline-none font-medium text-black" />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Autor</label>
                    <input name="autor" value={autor} onChange={(e) => setAutor(e.target.value)} required className="w-full bg-[#d0d0d0] text-xs p-2.5 rounded-lg outline-none font-medium text-black" />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Ano</label>
                    <input name="ano" type="number" value={ano} onChange={(e) => setAno(e.target.value)} required className="w-full bg-[#d0d0d0] text-xs p-2.5 rounded-lg outline-none font-medium text-black" />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Volume</label>
                    <input name="volume" type="number" min = "0" value={volume} onChange={(e) => setVolume(e.target.value)} required className="w-full bg-[#d0d0d0] text-xs p-2.5 rounded-lg outline-none font-medium text-black" />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Estoque</label>
                    <input name="estoque" type="number" min="1" value={estoque} onChange={(e) => setEstoque(e.target.value)} required className="w-full bg-[#d0d0d0] text-xs p-2.5 rounded-lg outline-none font-medium text-black" />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Descrição</label>
                    <textarea name="descricao" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full bg-[#d0d0d0] text-xs p-2.5 rounded-lg outline-none font-medium resize-none text-black" />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Preço</label>
                    <input name="preco" type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required className="w-full bg-[#d0d0d0] text-xs p-2.5 rounded-lg outline-none font-medium text-black" />
                </div>

                <div className="flex gap-3 pt-3">
                    <button type="submit" disabled={isPending} className="flex-1 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center">
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enviar"}
                    </button>
                    <button type="button" onClick={onClose} className="flex-1 bg-white border border-gray-300 text-gray-800 text-xs font-bold py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}