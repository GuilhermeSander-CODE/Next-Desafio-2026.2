'use client'

import Image from "next/image";
import Link from "next/link";
import BotaoAdicionarCarrinho from "../botao-adicionar-carrinho";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";

export type Manga = {
  id: string;
  titulo: string;
  descricao: string;
  preco: number | string; 
  imagem: string;
};

type MangaCardProps = {
  manga: Manga;
  className?: string;
};

export default function MangaCard({ manga, className = "w-48 h-72" }: MangaCardProps) {

    const [isActive, setIsActive] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const precoFormatado = typeof manga.preco == 'number' 
    ? manga.preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    : manga.preco;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCardClick = () => {
        if (!isActive) {
            setIsActive(true);
        }
    };
    
    return (
        <div
            ref={cardRef}
            onClick={handleCardClick}
            className={`
                group relative rounded-2xl overflow-hidden bg-white p-1.5 border border-white/20 
                transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/40 
                cursor-pointer select-none ${className}
            `}
        >
     
            <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                    src={manga.imagem}
                    alt={manga.titulo}
                    fill
                    unoptimized
                    loading="eager"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                
                <div 
                    className={`
                        absolute inset-0 bg-black/85 backdrop-blur-xs p-4 flex flex-col justify-between items-center text-center text-white
                        transition-opacity duration-300
                        md:opacity-0 md:group-hover:opacity-100
                        ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:pointer-events-auto"}
                    `}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsActive(false);
                        }}
                        className="md:hidden absolute top-2 right-2 text-white/80 hover:text-white p-1"
                        aria-label="Fechar informações"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <h3 className="font-alkalami text-2xl font-bold  line-clamp-2 tracking-wide text-white mt-1">
                        {manga.titulo}
                    </h3>
                    <p className="text-[11px] text-gray-300 line-clamp-4 leading-relaxed px-1">
                        {manga.descricao}
                    </p>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between px-2 my-1">
                        <span className="tex-base md:text-lg font-bold text-white">
                            {precoFormatado}
                        </span>

                        <BotaoAdicionarCarrinho 
                            produto={{
                                id: manga.id,
                                titulo: manga.titulo,
                                preco: Number(manga.preco),
                                imagem: manga.imagem || "/capas/Capa-default-3.png"
                            }} 
                        />
                    </div>

                    
                    <Link 
                        href={`/produtos/${manga.id}`} 
                        className="w-full border border-white/80 hover:bg-white hover:text-black text-white text-xs font-semibold py-1.5 rounded-lg transition-all text-center"
                    >
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}