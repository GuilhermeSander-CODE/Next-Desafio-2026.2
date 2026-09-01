'use client'

import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useTransition} from "react";
import ModalVisualizar, { ProdutoModal } from "../modais-adm/visualizar";
import ModalEditar from "../modais-adm/atualizar";
import ModalCriar from "../modais-adm/criar";
import ModalExcluir from "../modais-adm/deletar";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface TabelaGerenciamentoProps {
    produtos: ProdutoModal[];
    termoBusca: string;
}

    
export default function TabelaGerenciamento({ produtos, termoBusca }: TabelaGerenciamentoProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [termoInput, setTermoInput] = useState(termoBusca);

    const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoModal | null>(null);
    const [modalAberto, setModalAberto] = useState<'visualizar' | 'editar' | 'excluir' | 'criar' | null>(null);

    const atualizarBuscaURL = (termo: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (termo.trim()) {
            params.set("busca", termo.trim());
        } else {
            params.delete("busca");
        }

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        atualizarBuscaURL(termoInput);
    };

    const handleAbrirModal = (tipo: 'visualizar' | 'editar' | 'excluir', produto: ProdutoModal) => {
        setProdutoSelecionado(produto);
        setModalAberto(tipo);
    };

    const handleAbrirCriar = () => {
        setProdutoSelecionado(null);
        setModalAberto('criar');
    };

    const handleFecharModal = () => {
        setModalAberto(null);
        setProdutoSelecionado(null);
    };

    return(
        <>
        
            <div className="flex flex-colsm:flex-row items-center justify-between gap-4 mb-6 bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-300/80 shadow-sm"
            >
                <form onSubmit={handleFormSubmit} className="relative w-full sm:w-80">
                    <Search className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                        isPending ? "text-purple-600 animate-pulse" : "text-gray-400"
                    }`} />
                    
                    <input
                        type="text"
                        value={termoInput}
                        onChange={(e) => {
                            setTermoInput(e.target.value);
                            if (e.target.value === "") {
                                atualizarBuscaURL("");
                            }
                        }}
                        placeholder="Busque pelo nome e pressione Enter..."
                        className="w-full bg-gray-200/80 text-xs font-medium text-gray-800 placeholder-gray-500 rounded-full pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-black transition-all"
                    />
                </form>
            
                <button
                    type="button"
                    onClick={handleAbrirCriar}
                    className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-black font-semibold text-xs px-5 py-2.5 rounded-xl border border-gray-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                    <span>Adicionar</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-300/80 shadow-sm">
                <div className="hidden sm:grid grid-cols-12 text-xs font-bold text-gray-700 px-4 pb-3 border-b border-gray-300/60">
                    <span className="col-span-2">Capa</span>
                    <span className="col-span-3">Nome</span>
                    <span className="col-span-4">Descrição</span>
                    <span className="col-span-2">Preço</span>
                    <span className="col-span-1 text-right">Ações</span>
                </div>

                <div className="divide-y divide-gray-200/60 my-2">
                    {produtos.length === 0 ? 
                        (
                            <div className="py-12 text-center text-sm text-gray-500 font-medium">
                                Nenhum produto encontrado para `${termoBusca}`.
                            </div>
                        ) 
                        : 
                        (
                            produtos.map((produto) => (
                                <div
                                    key={produto.id}
                                    className="py-4 px-2 sm:px-4 grid grid-cols-1 sm:grid-cols-12 
                                    items-center gap-4 hover:bg-gray-50/80 transition-colors rounded-xl"
                                >
                                    <div className="sm:col-span-2 flex justify-start">
                                        <div className="relative w-14 h-20 bg-gray-100 rounded-md overflow-hidden border border-gray-300 shrink-0">
                                            <Image
                                                src={produto.imagem || "/Capa-default-1.png"}
                                                alt={produto.titulo}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <h3 className="font-bold text-sm text-black line-clamp-1">
                                            {produto.titulo}
                                        </h3>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                            {produto.descricao || "Sem descrição cadastrada."}
                                        </p>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <span className="font-bold text-sm text-black">
                                            R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
                                        </span>
                                    </div>

                                    <div className="sm:col-span-1 flex items-center justify-end gap-2.5 text-black">
                                        <button
                                        type="button"
                                        onClick={() => handleAbrirModal('visualizar', produto)}
                                        className="hover:text-electric-violet transition-colors cursor-pointer"
                                        aria-label="Visualizar"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAbrirModal('editar', produto)}
                                        className="hover:text-electric-violet transition-colors cursor-pointer"
                                        aria-label="Editar"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAbrirModal('excluir', produto)}
                                        className="hover:text-red-600 transition-colors cursor-pointer"
                                        aria-label="Excluir"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>

            <ModalVisualizar
                produto={produtoSelecionado}
                isOpen={modalAberto === 'visualizar'}
                onClose={handleFecharModal}
            />

            
            <ModalEditar
                produto={produtoSelecionado}
                isOpen={modalAberto === 'editar'}
                onClose={handleFecharModal}
            />

            
            <ModalCriar
                isOpen={modalAberto === 'criar'}
                onClose={handleFecharModal}
            />

            
            {modalAberto === 'excluir' && produtoSelecionado && (
                <ModalExcluir
                    produto={produtoSelecionado}
                    isOpen={modalAberto === 'excluir'}
                    onClose={handleFecharModal}
                />
            )}
        </>
    );
}
