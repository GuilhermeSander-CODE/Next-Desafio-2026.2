'use client'

import Image from "next/image";
import { X } from "lucide-react";
import { Demografia, Genero } from "@/generated/prisma/enums";
import { createPortal } from "react-dom";

export interface ProdutoModal {
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
}

interface ModalVisualizarProps {
    produto: ProdutoModal | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalVisualizar({ produto, isOpen, onClose }: ModalVisualizarProps) {
    if (!isOpen || !produto || typeof window === "undefined") return null;

    return createPortal(
        <div className="fixed inset-0 z-999 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative  w-full max-w-md bg-titanium-white rounded-3xl p-6 shadow-2xl border border-gray-300 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto scrollbar-thumb-electric-violet">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-700 hover:text-black transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col gap-2 items-center justify-center mb-4">
                    <div className="relative w-48 h-72 rounded-2xl bg-white p-2 shadow-md overflow-hidden">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image 
                                src={produto.imagem || "/Capa-default-1.png"} 
                                alt={produto.titulo}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 text-left">

                        <div>
                            <label className="text-xs font-bold text-black  block mb-1">Titulo</label>
                            <h2 className="text-base text-gray-600 leading-snug">
                                {produto.titulo}
                            </h2>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-black  block mb-1">Autor</label>
                            <p className="text-xs text-gray-600 leading-relaxed max-h-28 overflow-y-auto pr-1">
                                {produto.autor}
                            </p>
                        </div>


                        <div>
                            <label className="text-xs font-bold text-black  block mb-1">Ano de Lançamento</label>
                            <p className="text-xs text-gray-600 leading-relaxed max-h-28 overflow-y-auto pr-1">
                                {produto.ano}
                            </p>
                        </div>
                        
                        <div>
                            <label className="text-xs font-bold text-black  block mb-1">Volume</label>
                            <p className="text-xs text-gray-600 leading-relaxed max-h-28 overflow-y-auto pr-1">
                                {produto.volume}
                            </p>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-black  block mb-1">Sinopse</label>
                            <p className="text-xs text-gray-600 leading-relaxed max-h-28 overflow-y-auto scrollbar-thumb-electric-violet pr-1">
                                {produto.descricao || "Sem descrição disponível."}
                            </p>
                        </div>

                        <div className="pt-2  text-sm text-gray-600">
                            <label className="text-xs font-bold text-black block mb-1">Preço</label>
                            R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}